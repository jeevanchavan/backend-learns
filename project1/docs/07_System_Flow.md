# End-to-End System Flow

This project works as a client-server architecture.

Frontend: React Application  
Backend: Node.js + Express API  
Database: MongoDB

---

## Application Flow

1. User opens React frontend
2. User registers or logs in
3. Backend verifies credentials
4. Backend returns JWT token
5. Frontend stores token (localStorage/cookie)
6. Frontend sends token in API requests
7. Backend verifies token using middleware
8. Backend performs requested action (post, like, follow)
9. Backend interacts with MongoDB
10. Response sent back to frontend
11. Frontend updates UI

---

## Example: Creating a Post

1. User uploads image
2. React sends multipart/form-data request
3. Multer processes file
4. Image uploaded to ImageKit
5. Image URL stored in database
6. Post appears in feed

---

## Why This Architecture?

- Separation of frontend and backend
- Scalable
- Secure authentication
- Common industry architecture