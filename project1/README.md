# InstaClone Backend API

A REST API backend for a social media platform similar to Instagram.
Users can register, login, upload posts, like posts, and follow other users.

---

## Features
- User Authentication (JWT)
- Secure Password Hashing (bcrypt)
- Create Posts
- Upload Images (Multer + ImageKit)
- Like / Unlike Posts
- Follow / Unfollow Users
- Personalized Feed

---

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- ImageKit

---

## Project Structure

src/
  config/
  controllers/
  models/
  routes/
  middlewares/
  app.js

server.js

---

## How to Run Locally

1. Clone the repository
git clone https://github.com/jeevanchavan/backend-learns.git

2. Install dependencies
npm install

3. Create .env file in root folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_endpoint

4. Start the server
npm run dev

Server will run on:
http://localhost:5000

---

## API Base URL
http://localhost:5000/api

---

## Future Improvements
- Comments system
- Notifications
- Real-time chat
- Stories feature