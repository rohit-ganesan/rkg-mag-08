# RKG MAG 08 Project

This project contains two main components:

1. **Spring Boot Application**: A backend service that handles user data management.
2. **React Application**: A frontend application that allows users to interact with the backend service.

## Project Structure

- **Spring Boot Application**: Located in the `rkg-mag-08/mag` directory.
- **React Application**: Located in the `rkg-mag-08/mag-react-app` directory.

## Running the Applications

### Prerequisites

Make sure you have the following installed:

- **Java 19 or higher** (for Spring Boot)
- **Maven** (for building the Spring Boot application)
- **Node.js and npm** (for running the React application)

### 1. Running the Spring Boot Application

#### Steps:

1. Open a terminal and navigate to the Spring Boot application directory:

```bash
cd rkg-mag-08/mag
```
```bash
mvn clean install
```
```bash
mvn spring-boot:run
```

## 2. Running the React Application

### Steps:

Open a new terminal window and navigate to the React application directory:

```bash
cd rkg-mag-08/mag-react-app
```

Install the dependencies:
```bash
npm install
```
Start the React application:
```bash
npm start
```

The React application will start on http://localhost:3000.

## API Endpoints (Spring Boot)
The Spring Boot application exposes the following endpoints:

### 1. Get All Users
URL: 
```
/api/users 
```

Method: **GET**

Description: Retrieves a list of all users.

### 2. Get User by ID
URL: 
```
/api/users/{id}
```
Method: **GET**

Description: Retrieves a user by their ID.

### 3. Get Users by Date Range
URL: 
```
/api/users/date-range
```
Method: **GET**

#### Parameters:

startDate (required): The start date in YYYY-MM-DD format.

endDate (required): The end date in YYYY-MM-DD format.

Description: Retrieves a list of users created within the specified date range.

### 4. Get Users by Profession
URL: 
```
/api/users/profession
```
Method: **GET**

#### Parameters:

profession (required): The profession to filter users by.

Description: Retrieves a list of users with the specified profession.

### 5. Get All Professions
URL: 
```
/api/users/all-professions
```

Method: **GET**

Description: Retrieves a list of all distinct professions.

### 6. Add New User

URL: 

```
/api/users
```
Method: **POST**

Request Body:
``` 
id (string): User ID
firstName (string): User's first name
lastName (string): User's last name
email (string): User's email address
profession (string): User's profession
country (string): User's country
city (string): User's city
createdDate (string): The date the user was created in YYYY-MM-DD format
```
Description: Adds a new user to the system.

### Notes

Ensure both the backend (Spring Boot) and frontend (React) applications are running simultaneously for full functionality.
The frontend React app communicates with the backend Spring Boot app on http://localhost:8080.


