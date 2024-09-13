### Prerequisites

Ensure you have the following installed on your system:

- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download/prebuilt-installer/current)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Docker & Docker Compose (optional, for containerization)](https://docs.docker.com/desktop/)

### Instructions for setting up locally

#### Backend Setup (FastAPI)

1. **Clone the Repository:**

    ```
    git clone https://github.com/eugeneanokye99/directdrop.git
    ```
    ```
       cd your-cloned-repo
    ```

2. **Set Up Virtual Environment:**

    ```
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install Dependencies:**

    ```
    pip install -r requirements.txt
    ```

4. **Navigate to Backend Directory:**

    ```
    cd Backend/app
    ```

5. **Run Database Migrations:**

    ```
    alembic upgrade head
    ```
    
6. **Start the backend server with FastAPI CLI:**

    ```
    fastapi run dev
    ```

7.  **View the endpoints with Postman(Optional, but recommended):**

    ```
    http://localhost:8000
    ```


#### Frontend Setup (React with ChakraUI and TailwindCSS)

1. **Navigate to Frontend Directory:**

    ```
    cd Frontend/directdrop
    ```

2. **Install Dependencies:**

    ```
    npm install
    ```

3. **Start the frontend server with Vite:**

    ```
    npm run dev
    ```


#### Asynchronous Tasks (Celery & Redis)

1. **Ensure Redis is Running:**
 
    
    ```
    docker run -d -p 6379:6379 redis
    ```
    or 
    ```
    redis-cli
    ```

2. **Start Celery Worker:**

    ```
    celery -A your_project worker - --loglevel=info
    ```
    ```


#### Environment Variables

Create a `.env` file in the root directory and configure the necessary variables. You can use `.env` as a template.


*Variables used in this project in the `.env` file are given below:*

```

SECRET_KEY=40ed6d187870438c4bf02ed014293b3df00e15888ae915f615ae183b0fb6e7af


```

# Untitled

1. **`FastAPI`:**
    - A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
2. **`user_auth`:**
    - This module is assumed to contain authentication-related routes. `user_auth.router` adds a collection of routes (such as login, register, etc.) that handle user authentication.
3. **`engine`:**
    - This likely refers to a database engine, possibly set up using SQLAlchemy or another ORM (Object-Relational Mapper). It connects your app to a database.

---

### Code Breakdown:

1. **`from fastapi import FastAPI`:**
    - Imports the FastAPI class from the FastAPI framework, which is used to create the app.
2. **`from app.auth import user_auth`:**
    - Imports `user_auth`, a module that likely contains authentication logic. The `.router` within this module will have a series of routes related to user authentication.
3. **`from app.database.db import engine`:**
    - Imports the `engine` object from the `db` module inside the `database` directory. The engine connects to the database and allows the application to execute queries.
4. **`app = FastAPI()`:**
    - Initializes the FastAPI app instance. This is the main application object that defines your API's behavior.
5. **`app.include_router(user_auth.router)`:**
    - This includes the routes defined in `user_auth.router` (presumably, authentication routes such as login, register, etc.) in the main FastAPI app. The routes will be accessible under the `app`.
6. **`@app.get('/')`:**
    - This is a route decorator that defines a GET endpoint at the root URL (`/`). When users visit the base URL (e.g., `http://localhost:8000/`), this route will return a welcome message.
7. **`def root():`:**
    - This is the function that handles requests to the root URL. It returns a JSON object with a message about the app's upcoming release.

    

