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

## Breakdown
- **Frontend:** Handles user interactions and communicates with the backend via RESTful APIs.
- **Backend:** Manages business logic, authentication, and API endpoints.
- **Celery & Redis:** Handle asynchronous tasks such as file processing and sending email notifications.
- **Database:** Stores user data, file metadata, and other persistent information.