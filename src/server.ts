import 'module-alias/register';
// import 'dotenv/config';
import Jimp from 'jimp';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = process.env.PORT ? process.env.PORT : 4040;

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use(require('express-log-url'));

app.set('view engine', 'pug');

app.get('/favicon.ico', (req, res, next) => {
  res.status(200);
  res.end();
});

app.get('/health-check', async (req, res, next) => {
  let dbStatus = 200;
  let err;
  res.status(dbStatus);
  res.json({
    healthy: dbStatus === 200,
    time   : Date.now(),
    err,
  });
});

app.get('/image/:message', async (req, res, next) => {
  const { message = 'Hello!' } = req.params;
  let image = new Jimp(1200, 630, 'black', (err, image) => {
    if (err) throw err
  })
  
  let font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);

  image.print(font, 10, 10, {
      text: message,
  }, 1190, 630);
  image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': buffer.length
    });
    res.end(buffer);
  });
});

// main app
app.get('/', async (req, res, next) => {
  console.log(req.body);
  res.render('index', { message: 'Hello!' });
});

app.post('/', async (req, res, next) => {
  console.log(req.body);
  res.render('index', { message: req.body.untrustedData.inputText || 'Hello!' });
});

// collider
const gallery = [
  'https://farcaster.s3.eu-central-1.amazonaws.com/photo_2024-02-04+16.05.36.jpeg',
  'https://farcaster.s3.eu-central-1.amazonaws.com/photo_2024-02-04+16.05.34.jpeg',
  'https://farcaster.s3.eu-central-1.amazonaws.com/photo_2024-02-04+16.05.31.jpeg',
  'https://farcaster.s3.eu-central-1.amazonaws.com/photo_2024-02-04+16.05.27.jpeg',
  'https://farcaster.s3.eu-central-1.amazonaws.com/photo_2024-02-04+16.05.25.jpeg',
  'https://farcaster.s3.eu-central-1.amazonaws.com/photo_2024-02-04+16.05.22.jpeg',
  'https://farcaster.s3.eu-central-1.amazonaws.com/photo_2024-02-04+16.05.14.jpeg',
];
app.get('/collider-gallery', async (req, res, next) => {
  res.render('collider-gallery', { image: gallery[0], current: 0 });
});

app.post('/collider-gallery', async (req, res, next) => {
  const { current } = req.query;
  const { buttonIndex } = req.body.untrustedData;
  console.log(req.body);
  let newIndex = current;
  if (buttonIndex === 2) {
    newIndex = gallery.length - 1 > current ? Number(current) + 1 : 0;
  } else if (buttonIndex === 1) {
    newIndex = current > 0 ? Number(current) - 1 : gallery.length - 1;
  }
  res.render('collider-gallery', { image: gallery[newIndex], current: newIndex });
});

// 404: catch 404 and forward to error handler

app.use((req, res, next) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * error handler
 */

app.use((err: any, req: Request, res, next: NextFunction) => {
  err.status = err.status || 500;

  console.log(req.url, err);

  res.status(err.status)
    .json({
      status     : 'error',
      status_code: err.status,
      message    : err.message,
    });
});

const server = app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
