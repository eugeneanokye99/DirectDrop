from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def root():
    return {
        "message": 
            "DirectDrop is coming out live soon. Anticipate!"
    }