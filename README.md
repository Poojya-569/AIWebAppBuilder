# AI-Powered Web Application Builder

## Overview

This project is a full-stack AI-powered platform that enables users to create web applications using natural language descriptions. Users can describe their ideas through a conversational interface, and the system generates complete HTML, CSS, and JavaScript code using Google Gemini AI. The platform helps reduce development time by transforming ideas into functional web applications within seconds.

## Features

### User Authentication

* Secure user registration and login
* JWT-based authentication
* Password encryption using bcrypt
* Protected routes and secure sessions

### Project Management

* Create and manage multiple projects
* Rename and delete projects
* Store project history and generated code
* Persistent data storage using MongoDB Atlas

### AI Code Generation

* Generate complete web applications from text prompts
* AI-assisted frontend code creation
* Support for iterative modifications and refinements
* Fast and intelligent code generation

### Interactive Chat Interface

* Conversational user experience
* Real-time communication with AI
* Continuous improvement of generated applications

### Live Preview

* Instant rendering of generated applications
* Real-time visualization inside the browser
* Interactive preview environment

### Code Editor

* View generated source code
* Modify and customize generated output
* Maintain complete ownership of the code

### Download Functionality

* Download generated applications as standalone files
* Easy sharing and deployment

## Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Axios
* JavaScript

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose

### AI Integration

* Google Gemini AI

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd project-folder
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
```

Run the backend:

```bash
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Usage

1. Register or log in to the platform.
2. Create a new project.
3. Describe the desired application in plain English.
4. Generate code using AI.
5. Preview the generated application instantly.
6. Refine the application through additional prompts.
7. Edit the source code if needed.
8. Download the final application.

## Future Enhancements

* Multi-page application generation
* React component generation
* Tailwind CSS support
* Collaboration features
* One-click deployment
* AI-assisted debugging
* Template marketplace

## Author

Poojya Kavuru

B.Tech Computer Science and Engineering

MLR Institute of Technology

## License

This project is intended for educational and learning purposes.

