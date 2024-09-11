### Prerequisites

Ensure you have the following installed on your system:

- **Python 3.10+**
- **Node.js 14+ & npm**
- **PostgreSQL 13+**
- **Redis 6+**
- **Docker & Docker Compose** (optional, for containerization)

### Instructions for setting up locally

#### Backend Setup (FastAPI)

1. **Clone the Repository:**

    ```
    git clone https://github.com/eugeneanokye99/directdrop.git
    cd your-repo
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
    
6. **Start the backend server with uvicorn:**

    ```
    uvicorn main:app --reload
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

3. **Start the frontend server with:**

    ```
    npm run dev
    ```
    

