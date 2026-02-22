# System Architecture

## 1. Architecture Style
The InstaClone backend follows an MVC-like architecture pattern.

Flow of request:

Client (Frontend) → Routes → Controllers → Models → MongoDB Database → Response to Client

The frontend sends HTTP requests to the backend server.  
The backend processes the request and interacts with the database before sending a JSON response.

---

## 2. Folder Structure Explanation

### src/config
Contains configuration related code.

Responsibilities:
- Database connection setup
- Environment configuration
- External service configuration

---

### src/routes
Defines all API endpoints.

Responsibilities:
- Define URL paths
- Map routes to controller functions
- Handle HTTP methods (GET, POST, PUT, DELETE)

Example:
`POST /api/users/login`
`POST /api/posts/create`

Routes DO NOT contain business logic.

---

### src/controllers
Contains the main business logic of the application.

Responsibilities:
- Process client request
- Validate request data
- Call database models
- Send response to client

Controllers act as the bridge between routes and database models.

---

### src/models
Defines MongoDB schemas using Mongoose.

Responsibilities:
- Database schema design
- Data validation
- Database queries (create, find, update, delete)

Each model represents a collection in MongoDB.

Example:
User Model → users collection  
Post Model → posts collection

---

### src/middlewares
Contains custom Express middleware functions.

Responsibilities:
- Authentication (JWT verification)
- Error handling
- Request validation

Middleware runs before controllers.

Example:
Check if user is logged in before creating a post.

---

### src/app.js
Initializes the Express application.

Responsibilities:
- Create express app
- Apply middlewares
- Register routes

---

### server.js
Entry point of the application.

Responsibilities:
- Start the server
- Connect to database
- Listen on port

---

## 3. Request Lifecycle

1. User sends request from frontend (React app)
2. Request reaches Express server
3. Route file matches the endpoint
4. Middleware verifies authentication
5. Controller executes business logic
6. Model interacts with MongoDB
7. Response is returned as JSON

---

## 4. Environment Variables
Sensitive information is stored inside `.env` file:

Examples:
- Database URL
- JWT Secret Key
- Port Number

This prevents secrets from being exposed in source code.