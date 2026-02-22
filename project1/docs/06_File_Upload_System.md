# File Upload System

## 1. Purpose
The application allows users to upload images for posts and profile pictures.

To handle media uploads, the backend integrates a file upload middleware and a cloud storage service.

---

## 2. Technologies Used
- Multer (for handling multipart/form-data)
- ImageKit (cloud image storage and CDN)

---

## 3. Upload Flow

1. User selects an image from frontend
2. Frontend sends a multipart/form-data request
3. Multer middleware processes the file
4. Server uploads image to ImageKit
5. ImageKit returns image URL
6. URL is stored in MongoDB database
7. URL is sent back to client

The server does not store images locally.  
Only the image URL is stored in database.

---

## 4. Why Cloud Storage?

Images are stored in ImageKit instead of the server because:

- Saves server storage
- Faster image delivery (CDN)
- Scalable
- Used in real production systems

---

## 5. Security Considerations

- Only authenticated users can upload images
- File type validation is applied
- Large files are restricted

---

## 6. Benefits of This Approach

- Backend remains lightweight
- Faster frontend loading
- Supports large number of users