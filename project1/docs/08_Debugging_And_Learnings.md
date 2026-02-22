# Debugging and Learnings

This file records real issues faced during development and how they were solved.

---

## 1. Multer Not Receiving File

### Problem
While uploading an image, `req.file` was undefined in the controller.

The backend was working but the file was not reaching the server.

### Cause
The request sent from the React frontend was not using `multipart/form-data`.

Also the field name in the frontend did not match the multer field name in the backend.

Example:
Frontend → image  
Backend → file

Because of this mismatch multer could not process the upload.

### Solution
- Used `FormData` in React
- Appended file correctly:
  formData.append("file", selectedFile)
- Ensured field name matched multer configuration
- Removed manual `Content-Type` header (browser sets it automatically)

### Learning
Multer only works when:
- request is multipart/form-data
- field name matches
- bodyParser.json() should not override the request

---

## 2. Token Undefined (Authentication Failing)

### Problem
Protected routes were always returning unauthorized.
`req.user` was undefined inside controller.

### Cause
JWT token was not being sent properly from frontend.

Authorization header format was wrong.

Wrong:
Authorization: token

Correct:
Authorization: Bearer <token>

### Solution
- Sent token in header:
  Authorization: Bearer ${token}
- Extracted token in middleware
- Verified using jwt.verify()

### Learning
Authentication fails not only due to backend logic but often due to request header format.

---

## 3. CORS Error

### Problem
Frontend was unable to call backend APIs.
Browser console showed CORS policy error.

### Cause
Frontend and backend were running on different ports.
Browser blocked cross-origin request.

Frontend: localhost:5173  
Backend: localhost:5000

### Solution
Installed and configured CORS middleware in Express:

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

### Learning
Browsers block cross-origin requests by default.
CORS must be enabled for frontend-backend communication.

---

## Overall Learning
Debugging required:
- Checking network tab
- Reading error messages carefully
- Verifying headers and request type
- Matching frontend and backend configurations

Most backend errors were actually integration issues between frontend and backend.