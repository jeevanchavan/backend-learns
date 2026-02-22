# API Documentation

Base URL:
http://localhost:PORT/api

All responses are in JSON format.

---

# 1. Authentication APIs

## Register User
POST /api/auth/register

Request Body:
{
  "username": "john",
  "email": "john@example.com",
  "password": "123456"
}

Response:
{
  "message": "User registered successfully"
}

---

## Login User
POST /api/auth/login

Request Body:
{
  "email": "john@example.com",
  "password": "123456"
}

Response:
{
  "token": "JWT_TOKEN"
}

---

# 2. User APIs

## Get User Profile
GET /api/users/:id

Headers:
Authorization: Bearer <token>

Response:
{
  "username": "john",
  "bio": "Hello world"
}

---

## Follow User
POST /api/users/:id/follow

Headers:
Authorization: Bearer <token>

Response:
{
  "message": "User followed successfully"
}

---

# 3. Post APIs

## Create Post
POST /api/posts

Headers:
Authorization: Bearer <token>

Request Body:
{
  "caption": "My first post",
  "image": "image_url"
}

Response:
{
  "message": "Post created successfully"
}

---

## Like Post
POST /api/posts/:id/like

Headers:
Authorization: Bearer <token>

Response:
{
  "message": "Post liked"
}

---

<!-- not implemented yet -->
## Get Feed
GET /api/posts/feed

Headers:
Authorization: Bearer <token>

Response:
[
  {
    "caption": "Post 1",
    "user": "john"
  }
]