# Multi-Tenant-E-Commerce-API
This project is a backend API for a multi-tenant e-commerce system. It allows multiple vendors to register, manage their products, and handle orders. Built using **Node.js**, **Express.js**, and **MongoDB**, the API ensures data isolation and security using JWT-based authentication.

---

## Features

1. **Vendor Management**
   - Vendors can register and log in.
   - JWT-based authentication.
   - Vendors can manage only their products and orders.

2. **Product Management**
   - Vendors can add, update, delete, and list their products.
   - Pagination is implemented for listing products.

3. **Order Management**
   - Vendors can view orders placed for their products.
   - Vendors can mark orders as shipped.

4. **Validation and Security**
   - Data validation using `express-validator`.
   - Protected routes using JWT authentication.
   - Vendors can only access their own data.

5. **Optimized Queries**
   - MongoDB indexes are used to improve query performance.

6. **Standardized Error Handling**
   - Custom error handler for consistent responses.

---

## Prerequisites

Ensure the following are installed on your system:

- Node.js (v14 or above)
- MongoDB (compass)
- npm 

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/babludangi6266/Multi-Tenant-E-Commerce-API.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Multi-Tenant-E-Commerce-API
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/multi-tenant-ecommerce
   JWT_SECRET=your_jwt_secret_key
   ```

5. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints

### Authentication

1. **Register Vendor**  
   `POST /api/vendors/register`
   - Body:
     ```json
     {
       "name": "Bablu",
       "email": "bablu@gmail.com",
       "password": "123456"
     }
     ```

2. **Login Vendor**  
   `POST /api/vendors/login`
   - Body:
     ```json
     {
       "email": "bablu@gmail.com",
       "password": "123456"
     }
     ```

### Product Management

1. **Add Product**  
   `POST /api/products`
   - Headers:
     ```
     Authorization: Bearer <JWT_TOKEN>
     ```
   - Body:
     ```json
     {
       "name": "Product A",
       "price": 100,
       "stock": 10
     }
     ```

2. **List Products**  
   `GET /api/products?page=1&limit=10`
   - Headers:
     ```
     Authorization: Bearer <JWT_TOKEN>
     ```

3. **Update Product**  
   `PUT /api/products/:id`
   - Headers:
     ```
     Authorization: Bearer <JWT_TOKEN>
     ```
   - Body:
     ```json
     {
       "price": 150,
       "stock": 20
     }
     ```

4. **Delete Product**  
   `DELETE /api/products/:id`
   - Headers:
     ```
     Authorization: Bearer <JWT_TOKEN>
     ```

### Order Management

1. **List Orders**  
   `GET /api/orders`
   - Headers:
     ```
     Authorization: Bearer <JWT_TOKEN>
     ```

2. **Mark Order as Shipped**  
   `PUT /api/orders/:id`
   - Headers:
     ```
     Authorization: Bearer <JWT_TOKEN>
     ```

---

## Folder Structure

```
.
├── controllers       # Business logic for each route
├── middlewares       # Authentication, validation, error handling
├── models            # Mongoose schemas for Vendors, Products, Orders
├── routes            # Route definitions for Vendors, Products, Orders
├── .env              # Environment variables (included in repo)
├── index.js         # Entry point of the application
```

---

## Technologies Used

- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for routing and middleware.
- **MongoDB**: NoSQL database for storing vendors, products, and orders.
- **Mongoose**: ODM library for MongoDB.
- **express-validator**: Validation of incoming data.
- **JWT**: Secure token-based authentication.

---

## Testing the API

1. Use **Postman** to test the API endpoints.
2. Include the `Authorization: Bearer <JWT_TOKEN>` header for protected routes.
3. Check for proper responses and validation errors.

## Author

Developed by **Bablu Dangi**. For queries or feedback, reach out via [GitHub](https://github.com/babludangi6266).

