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
    

