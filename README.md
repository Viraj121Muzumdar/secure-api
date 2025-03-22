# Secure API with JWT & FakeStore

 **Node.js/Express API** with **JWT authentication, Role-Based Access Control (RBAC), and integration with FakeStore API**.

---

## API Endpoints
### Register a User**
- **URL:** `POST /register`
- **Request Body:**
  ```json
  {
      "username": "admin",
      "email": "admin@example.com",
      "password": "securepassword",
      "role": "admin"
  }
