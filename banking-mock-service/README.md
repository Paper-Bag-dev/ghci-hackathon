# Express.js + TypeScript + MongoDB Starter Kit ✨

A robust and modern **Express.js** starter template built with **TypeScript** and **MongoDB**, designed for scalability, maintainability, and fast development. This starter kit includes essential configurations and tools to jumpstart your backend project.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Features

✅ Built with **Express.js** for backend routing and APIs.  
✅ Powered by **TypeScript** for type safety and better developer experience.  
✅ Includes **MongoDB** integration with modular database connection handling.  
✅ Integrated **Winston** for advanced logging.  
✅ Configured **Morgan** middleware for HTTP request logging.  
✅ Scalable and modular folder structure for easy extension.  
✅ Pre-configured development and production environments.  

---

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:

- **Node.js**: [Download Here](https://nodejs.org/)
- **npm**: Comes with Node.js installation.
- **MongoDB**: [Download Here](https://www.mongodb.com/try/download/community)
- **Git**: [Download Here](https://git-scm.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abdev1205/express-ts-mongodb-template.git
   ```

2. Navigate to the project directory:
   ```bash
   cd express-ts-mongodb-template
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up your environment variables in a `.env` file (see [Environment Variables](#environment-variables)).

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to:
   [http://localhost:4000](http://localhost:4000)

---

## Scripts

| Command             | Description                               |
|---------------------|-------------------------------------------|
| `npm install`       | Installs the required dependencies.       |
| `npm run dev`       | Starts the development server.            |
| `npm run build`     | Compiles TypeScript files into JavaScript.|
| `npm start`         | Runs the production server.               |
| `npm run watch`     | Watches TypeScript files for changes.     |
| `npm run server`    | Starts the server using Node.js.          |

---

## Folder Structure

```plaintext
├── express-ts-mongodb-template
 ├── README.md        # Project documentation
 ├── package.json     # Project dependencies and scripts
 ├── tsconfig.json    # TypeScript configuration
 ├── .gitignore       # Git ignore file
 ├── .env            # Environment variables (not committed)
 ├── src              # Source code
 │   ├── index.ts     # Application entry point
 │   ├── config       # Configuration files
 │   │   ├── ENV.ts         # Environment variables configuration
 │   │   └── mongoDb.ts     # MongoDB connection setup
 │   ├── middleware   # Custom middleware
 │   │   └── morgan.middleware.ts # HTTP request logging
 │   └── utils         # Utility functions
 │       └── logger.ts          # Winston logging configuration
 ├── dist            # Compiled JavaScript files (auto-generated)
```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
PORT=4000
FRONTEND_URL=http://localhost:3000
MONGO_URL=mongodb://localhost:27017/your_database_name
NODE_ENV=development
```

---

## License

This project is licensed under the **MIT License**. Feel free to use it for personal or commercial purposes.

---

### Developed with ❤️ by [Abhay Mishra](https://abhaymishra.in)

