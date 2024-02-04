OpenAI: Certainly! Here's the updated README file for the "Frames" project :)

---

# Frames

## Introduction

Frames is a social network embedded application platform designed to enhance interactive experiences by embedding customizable frames within social network posts. It leverages dynamic image generation, personalized content delivery, and an interactive gallery feature to engage users in a unique and compelling way.

## Requirements

- Node.js (version 12.x or higher recommended)
- Express.js
- Jimp for image processing
- Body-parser for request parsing
- Cors for cross-origin resource sharing support
- Pug for templating

## Installation

1. **Clone the repository:**

```sh
git clone <repository-url>
cd frames
```

2. **Install dependencies using Yarn:**

```sh
yarn install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory and define the `PORT` variable (optional, defaults to 4040).

```env
PORT=4040
```

4. **Start the server with Yarn:**

```sh
yarn start
```

## Usage

- **Homepage:** Access the homepage by navigating to `http://localhost:<PORT>/`. The homepage utilizes Pug templating to render dynamic content and integrates meta tags for frame information.
- **Image Generation:** Generate dynamic images with custom messages by accessing `http://localhost:<PORT>/image/:message`.
- **Health Check:** Verify the application's health at `http://localhost:<PORT>/health-check`.
- **Collider Gallery:** Interact with a gallery of images through the `/collider-gallery` endpoint, navigating through the images with forward and backward controls.

## API Endpoints

- `GET /`: The main page that renders with a default message or a user-provided message.
- `POST /`: Submit a message through the form to render the main page with the submitted message.
- `GET /image/:message`: Dynamically generates an image with the provided message.
- `GET /health-check`: Returns the health status of the application.
- `GET /collider-gallery`: Displays the first image from the gallery.
- `POST /collider-gallery`: Navigates through the gallery based on user input.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`yarn commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

This README assumes the use of Yarn as the package manager for installing dependencies and running the project. Modify it further as needed to fit your project's specific requirements or additional guidelines.