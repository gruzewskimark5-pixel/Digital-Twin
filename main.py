from fastapi import FastAPI
from routes import gte_oe, sensor, orion

app = FastAPI(title="SpaceZgolf API")

app.include_router(sensor.router, prefix="/sensor", tags=["sensor"])
app.include_router(gte_oe.router, prefix="/gte-oe", tags=["gte-oe"])
app.include_router(orion.router, prefix="/orion", tags=["orion"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
