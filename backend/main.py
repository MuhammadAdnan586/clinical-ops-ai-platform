from fastapi import FastAPI
from routes import auth

app = FastAPI(title="Clinical Ops AI Platform API")

app.include_router(auth.router)


@app.get("/")
def read_root():
    return {"status": "ok", "service": "clinical-ops-backend"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}