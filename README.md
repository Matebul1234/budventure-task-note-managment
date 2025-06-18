Encrypted Notes Manager (ENM)

A secure, end-to-end encrypted notes management application built with the MERN stack (MongoDB, Express, React, Node.js) and AES-256 encryption. This app allows users to safely store, access, and manage their personal notes with full backend-side encryption.

Features

User authentication using JWT
Create, view, edit, and delete notes
AES-256 encrypted storage for all note content (title & body)
User passwords hashed using bcrypt
Backend-only encryption & decryption (never exposed on frontend)
rotected routes and session-based access control
Built using React (Vite) on frontend with clean, user-friendly UI

Tech Stack

Frontend: React (Vite), Axios, React Router
Backend: Node.js, Express.js, MongoDB, Mongoose, Bcrypt, JSON Web Token, Node.js `crypto` module
Database: MongoDB Atlas / Local MongoDB
Security: AES-256-CBC encryption, JWT, Bcrypt

 Getting Started

Clone the Repository

bash:: 

git clone https://github.com/Matebul1234/budventure-task-note-managment

after clone
Now 
open code any IDE like VS Code etc 

set .env file
this backend .env variable :: 
VITE_API_BASE_URL=http://localhost:8080

and this is the frontend .env variables :: 
PORT=8080
MONGODB_CONECTION="t/"
JWT_SECRET=your-secret-key
ENCRYPTION_SECRET=your_32_char_secret_here     /// note: it is required to 32 characters here


-> open terminal and write this command 
cd backend 
npm install or npm i 
npm start

cd frontend
npm install or npm i
npm run dev or npm start  // I already set the npm start command to start UI in the Browser
