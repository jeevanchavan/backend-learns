# Database Design

## 1. Database Used
The project uses **MongoDB**, a NoSQL document-based database.

Each entity in the system is stored as a separate collection.

Collections used:
- users
- posts
- likes
- follows

MongoDB is chosen because social media data is unstructured and grows rapidly. It allows flexible schema and faster development.

---

## 2. User Collection

Represents all registered users of the platform.

### Main Fields
- username : String (unique)
- email : String (unique)
- password : String (hashed)
- profilePic : String (image URL)
- bio : String
- createdAt : Date

### Purpose
Stores authentication and profile information.

Password is stored in hashed form for security.

---

## 3. Post Collection

Represents posts created by users.

### Main Fields
- user : ObjectId (reference to User)
- image : String (image URL)
- caption : String
- createdAt : Date

### Relationship
One User → Many Posts

A post always belongs to one user.

---

## 4. Like Collection

Represents likes on posts.

### Main Fields
- user : ObjectId (reference to User)
- post : ObjectId (reference to Post)
- createdAt : Date

### Relationship
Many Users ↔ Many Posts

A user can like multiple posts and a post can be liked by multiple users.

This is implemented as a separate collection instead of storing likes inside post document to improve scalability.

---

## 5. Follow Collection

Represents follower-following relationship between users.

### Main Fields
- follower : ObjectId (User who follows)
- following : ObjectId (User being followed)
- createdAt : Date

### Relationship
Many Users ↔ Many Users

This is a self-referencing relationship.

---

## 6. Relationships Overview

User → Post : One-to-Many  
User → Like → Post : Many-to-Many  
User → Follow → User : Many-to-Many

---

## 7. Why Separate Collections?

Likes and Follows are stored in separate collections because:

- Prevents very large documents
- Improves performance
- Makes querying faster
- Scales for large number of users

This approach is used in real-world social media systems.