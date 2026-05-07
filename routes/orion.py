from fastapi import APIRouter

router = APIRouter()

@router.post("/coach")
def get_coaching(player_id: str):
    return {"routed_to": "claude", "response": "Keep your head down."}

@router.get("/circuit-breakers")
def get_circuit_breakers():
    return {"claude": "CLOSED", "gemini": "CLOSED", "haiku": "CLOSED"}
