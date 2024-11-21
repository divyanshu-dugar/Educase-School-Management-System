# Educase-School-Management-System

This project implements a simple Node.js application to manage school data. It provides APIs for adding schools and retrieving a list of schools sorted by proximity to a specified location. The application uses **Express.js** for the server, **MySQL** for the database, and **Sequelize** as the ORM.

---

## **Features**

1. **Add School API**  
   Allows users to add new schools with a name, address, latitude, and longitude.

2. **List Schools API**  
   Retrieves a list of schools sorted by proximity to a user-specified location.

---

## **Setup Instructions**

### **Prerequisites**
- Node.js (v16 or above)
- MySQL server
- Postman for testing

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/divyanshu-dugar/educase-school-management-system.git
   cd educase-school-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add your MySQL credentials:
   ```env
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=YourPassword
   DB_NAME=school_management
   DB_PORT=3306
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000`.
---

## **API Endpoints**

### **1. Add School API**
- **Endpoint:** `/addSchool`  
- **Method:** `POST`  
- **Request Body:**
   ```json
   {
     "name": "Springfield Elementary",
     "address": "742 Evergreen Terrace",
     "latitude": 37.7749,
     "longitude": -122.4194
   }
   ```
- **Response:**
   - **Success (201):**
     ```json
     {
       "message": "School added successfully",
       "school": {
         "id": 1,
         "name": "Springfield Elementary",
         "address": "742 Evergreen Terrace",
         "latitude": 37.7749,
         "longitude": -122.4194
       }
     }
     ```
   - **Validation Error (400):**
     ```json
     {
       "error": "Validation error: All fields are required."
     }
     ```

---

### **2. List Schools API**
- **Endpoint:** `/listSchools`  
- **Method:** `GET`  
- **Query Parameters:**
   - `latitude`: User's current latitude (e.g., `37.7749`)
   - `longitude`: User's current longitude (e.g., `-122.4194`)

- **Example Request:**  
   `GET /listSchools?latitude=37.7749&longitude=-122.4194`

- **Response:**
   - **Success (200):**
     ```json
     {
       "schools": [
         {
           "id": 2,
           "name": "Shelbyville High",
           "address": "123 Shelbyville Rd",
           "latitude": 37.8044,
           "longitude": -122.2711,
           "distance": 10.5
         },
         {
           "id": 1,
           "name": "Springfield Elementary",
           "address": "742 Evergreen Terrace",
           "latitude": 37.7749,
           "longitude": -122.4194,
           "distance": 20.3
         }
       ]
     }
     ```
   - **Validation Error (400):**
     ```json
     {
       "error": "Latitude and longitude are required."
     }
     ```

---

## **Postman Collection**

1. Download the Postman collection file:  
   [Download Postman Collection](https://your-repo-link/SchoolManagement.postman_collection.json)

2. Import the collection into Postman to test the APIs. It includes:
   - **Add School API**: Pre-filled request body example.
   - **List Schools API**: Pre-configured query parameters.

---

## **Folder Structure**
```
school-management-api/
├── modules/           # JS Files
│   └── connection.js  # School model
│   └── db.js          # Sequelize configuration
│   └── School.js      # School model
├── .env               # Environment variables
├── package.json       # Project metadata and dependencies
├── README.md          # Documentation
└── index.js           # Entry point of the application, Routes for School APIs
```

---

## **Technologies Used**
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- Postman (for API testing)
