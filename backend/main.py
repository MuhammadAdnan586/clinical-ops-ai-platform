from fastapi import FastAPI

app = FastAPI(title="Clinical Ops AI Platform API")

@app.get("/")
def read_root():
    return {"status": "ok", "service": "clinical-ops-backend"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}