# OpenAI Chatbot

## Overview

This repository contains the source code for the OpenAI Chatbot project. It is a Next.js application using Emotion for styling, Material-UI for UI components, and Redux Toolkit for state management.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Recommended: Use [NVM](https://github.com/nvm-sh/nvm) with the included `.nvmrc` file)
- [Docker](https://www.docker.com/) (Optional, for containerized deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/openai-chatbot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd openai-chatbot
   ```

3. Use Node.js version specified in `.nvmrc`:

   ```bash
   nvm use
   ```

   If you don't have NVM installed, you can install it using [NVM installation instructions](https://github.com/nvm-sh/nvm#installing-and-updating).

4. Install dependencies:

   ```bash
   npm install
   ```

### Scripts

- **Development:**

  ```bash
  npm run dev
  ```

  Starts the development server on port 3080.

- **Build:**

  ```bash
  npm run build
  ```

  Builds the Next.js application.

- **Build Docker Image:**

  ```bash
  npm run build:docker
  ```

  Builds a Docker image named 'openai-chatbot'.

- **Start:**

  ```bash
  npm start
  ```

  Starts the production server on port 3080.

- **Start Docker Container:**

  ```bash
  npm run start:docker
  ```

  Runs the Docker container on port 3080.

- **Lint:**

  ```bash
  npm run lint
  ```

  Runs ESLint for linting the code.

## License

This project is licensed under the [MIT License](LICENSE.md).

