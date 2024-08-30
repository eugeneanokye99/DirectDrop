# **Secure P2P File Sharing Application**

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Architecture](#architecture)
5. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
        - [Backend Setup (FastAPI)](#backend-setup-fastapi)
        - [Frontend Setup (React with ChakraUI and TailwindCSS)](#frontend-setup-react-with-chakraui)
        - [Asynchronous Tasks (Celery & Redis)](#asynchronous-tasks-celery--redis)
        - [Database Setup (PostgreSQL)](#database-setup-postgresql)
        - [Environment Variables](#environment-variables)
6. [Usage](#usage)
    - [Running the Application](#running-the-application)
    - [Development](#development)
7. [API Documentation](#api-documentation)
8. [Testing](#testing)
9. [Roadmap](#roadmap)
10. [Contributing](#contributing)
11. [License](#license)
12. [Acknowledgements](#acknowledgements)

---

## Introduction
Welcome to the **Secure P2P File Sharing Application**! This project facilitates decentralized and secure file sharing between users, ensuring data confidentiality, integrity, and privacy. Built with a modern tech stack, it leverages React for the frontend, FastAPI for the backend, and incorporates Celery and Redis for asynchronous task management.

## Features

- **Decentralized Architecture:** Enables direct file sharing between peers without a central server.
- **End-to-End Encryption:** Protects data during transmission using robust encryption methods.
- **User Authentication:** Secure user verification with JWT and OAuth2 Authentication.
- **Profile Management:** Users can manage their profiles and settings.
- **Real-time File Transfer:** Efficient file sharing with progress tracking and notifications.
- **Role-Based Access Control:** Manage permissions for shared files.
- **Responsive UI:** Built with React and ChakraUI for a seamless user experience across devices.

## Technologies Used

- **Frontend:** React.js, ChakraUI, Redux, Axios
- **Backend:** FastAPI, Celery, Redis, PostgreSQL, Postman
- **Database and ORM:** PostgreSQL, SQLAlchemy
- **Others:** Docker, Docker Compose, Nginx, GitHub Actions

## Architecture
```
[Frontend (React + ChakraUI)] <--> [FastAPI Backend] <--> [PostgreSQL Database]
                                       |
                                       --> [Celery Workers] <--> [Redis]
```

- **Frontend:** Handles user interactions and communicates with the backend via RESTful APIs.
- **Backend:** Manages business logic, authentication, and API endpoints.
- **Celery & Redis:** Handle asynchronous tasks such as file processing and sending notifications.
- **Database:** Stores user data, file metadata, and other persistent information.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Python 3.10+**
- **Node.js 14+ & npm**
- **PostgreSQL 13+**
- **Redis 6+**
- **Docker & Docker Compose** (optional, for containerization)

### Installation

#### Backend Setup (FastAPI)

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/eugeneanokye99/directdrop.git
    cd your-repo
    ```

2. **Set Up Virtual Environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Run Database Migrations:**
    ```bash
    alembic upgrade head
    ```

#### Frontend Setup (React with ChakraUI and TailwindCSS)

1. **Navigate to Frontend Directory:**
    ```bash
    cd frontend
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Configure ChakraUI:**
    Follow [ChakraUI's documentation](https://v2.chakra-ui.com/) to set up and customize your UI components.

#### Asynchronous Tasks (Celery & Redis)

1. **Ensure Redis is Running:**
    ```bash
    # Using Docker
    docker run -d -p 6379:6379 redis
    ```

2. **Start Celery Worker:**
    ```bash
    celery -A your_project worker --loglevel=info
    ```

#### Database Setup (PostgreSQL)

1. **Install PostgreSQL:**
    Follow the official [PostgreSQL installation guide](https://www.postgresql.org/download/) for your OS.

2. **Create Database and User:**
    ```sql
    CREATE DATABASE your_db_name;
    CREATE USER your_db_user WITH PASSWORD 'your_password';
    GRANT ALL PRIVILEGES ON DATABASE your_db_name TO your_db_user;
    ```

3. **Update Database Configuration:**
    Ensure your backend's environment variables point to the correct database URL.

#### Environment Variables

Create a `.env` file in the root directory and configure the necessary variables. You can use `.env.example` as a template.

*Example `.env`:*

```env
# Backend
DATABASE_URL=postgresql://your_db_user:your_password@localhost:5432/your_db_name
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=your_secret_key
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# Frontend
REACT_APP_API_URL=http://localhost:8000/api
```

## Usage

### Running the Application

#### Using Docker Compose (Recommended)

1. **Ensure Docker and Docker Compose are Installed.**

2. **Build and Start Containers:**
    ```bash
    docker-compose up --build
    ```

3. **Access the Application:**
    - Frontend: `http://localhost:3000`
    - Backend API: `http://localhost:8000`

#### Running Locally

1. **Start Backend:**
    ```bash
    cd backend
    uvicorn main:app --reload
    ```

2. **Start Frontend:**
    ```bash
    cd frontend
    npm start
    ```

3. **Start Celery Worker:**
    ```bash
    celery -A your_project worker --loglevel=info
    ```

## API Documentation

FastAPI automatically generates interactive API docs. Access them at:

- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`


## Testing

Outline to run tests for both frontend and backend.

### Backend Testing

1. **Run Tests with pytest:**
    ```bash
    pytest
    ```

2. **Coverage Report:**
    ```bash
    pytest --cov=your_project tests/
    ```

### Frontend Testing

1. **Run Tests with Jest:**
    ```bash
    npm test
    ```

2. **End-to-End Testing with Cypress:**
    ```bash
    npx cypress open
    ```

## Roadmap

Organize your project roadmap into phases, aligning with your 2-week sprints. Here’s a suggested structure:

### Phase 1: Core Foundation and User Management (Weeks 1-2)

- **User Authentication and Authorization**
  - Set up FastAPI backend with user authentication endpoints.
  - Implement JWT-based authentication in FastAPI.
  - Create React components for login and registration.
  - Integrate frontend with backend using Axios for API requests.
  - **Milestone:** User login and registration with authentication.

- **Profile Management**
  - Develop API endpoints in FastAPI for managing user profiles.
  - Create React components for viewing and editing profiles.
  - Implement profile update functionality and API integration.
  - **Milestone:** Complete user profile management system.

- **API Development**
  - Design RESTful API structure for core features.
  - Implement API documentation using Swagger (FastAPI).
  - **Milestone:** Finalize core API development and documentation.

### Phase 2: File Management and Security (Weeks 3-4)

- **File Management**
  - Set up file upload/download API endpoints in FastAPI.
  - Integrate S3 (or similar service) with FastAPI for file storage.
  - Build React components for file upload and download.
  - Implement encryption/decryption of files using Python's `cryptography` library.
  - **Milestone:** Secure file management system with encryption.

- **Database Management**
  - Configure PostgreSQL database and integrate with FastAPI.
  - Implement ORM models for storing user and file data.
  - Optimize database queries and set up Redis for caching.
  - **Milestone:** Efficient database management with caching.

- **Security Features**
  - Implement security middleware in FastAPI for CSRF, rate limiting, etc.
  - Set up HTTPS with SSL/TLS for secure communication.
  - **Milestone:** Implemented security features and hardened API.

### Phase 3: Advanced File Sharing and Real-Time Features (Weeks 5-6)

- **Peer-to-Peer Communication**
  - Integrate WebRTC for peer-to-peer file sharing.
  - Set up signaling server using FastAPI or another suitable method.
  - Develop React UI for initiating and managing P2P connections.
  - **Milestone:** Fully functional P2P file sharing feature.

- **Notifications**
  - Implement real-time notifications with WebSockets in FastAPI.
  - Develop notification components in React.
  - Integrate real-time notifications with file sharing and user activity.
  - **Milestone:** Real-time notification system.

### Additional Tools and Technologies (Ongoing)

- **Containerization with Docker**
  - Set up Docker for both frontend and backend.
  - Use Docker Compose for environment management.
  - **Milestone:** Containerized application for consistent development and production environments.

- **CI/CD Pipelines**
  - Configure GitHub Actions for automated testing and deployment.
  - **Milestone:** Continuous Integration and Deployment setup.

## Contributing

1. **Fork the Repository**
2. **Create a Feature Branch:**
    ```bash
    git checkout -b feature/YourFeature
    ```
3. **Commit Your Changes:**
    ```bash
    git commit -m "Add your feature"
    ```
4. **Push to the Branch:**
    ```bash
    git push origin feature/YourFeature
    ```
5. **Open a Pull Request**

Please ensure your code adheres to the project's coding standards and passes all tests.

## License


## Acknowledgements

- [React.js](https://reactjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Celery](https://docs.celeryproject.org/)
- [Redis](https://redis.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [ChakraUI](https://v2.chakra-ui.com/)

---

