# Authentication and Security

## 1. Password Security
User passwords are never stored in plain text.

Passwords are hashed using bcrypt before saving into the database.

Why hashing is important:
- Prevents password leakage
- Protects users even if database is compromised
- Follows real-world security practices

During login, the entered password is compared with the hashed password using bcrypt compare function.

---

## 2. Token Based Authentication

The application uses JSON Web Token (JWT) for authentication.

When a user logs in:
1. Server verifies credentials
2. Server generates a JWT token
3. Token is sent to the client
4. Client sends token in every protected request

The token contains the user ID.

---

## 3. identifyUser Middleware

Protected routes use a custom middleware called `identifyUser`.

Responsibilities:
- Read token from request header
- Verify JWT token
- Extract user id
- Attach user data to request object

Example:
req.user = userId

This allows controllers to know which user is making the request.

---

## 4. Protected Routes

The following operations require authentication:
- Creating a post
- Liking a post
- Following a user
- Viewing personalized feed

If token is missing or invalid:
Server returns 401 Unauthorized.

---

## 5. Environment Variables

Sensitive data is stored in `.env` file:
- JWT Secret Key
- Database Connection URL

This prevents exposure of secrets in public repository.

.env is ignored using .gitignore.