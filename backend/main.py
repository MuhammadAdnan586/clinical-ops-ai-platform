from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth

app = FastAPI(title="Clinical Ops AI Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)


@app.get("/")
def read_root():
    return {"status": "ok", "service": "clinical-ops-backend"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}