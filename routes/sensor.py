from fastapi import APIRouter
from models import ShotEvent
import random

router = APIRouter()

@router.post("/ingest")
def ingest_shot(payload: dict) -> ShotEvent:
    # Stub: convert payload to ShotEvent
    return ShotEvent(
        player_id=payload.get("player_id", "default_player"),
        session_id=payload.get("session_id", "default_session"),
        smash_factor=payload.get("smash_factor", random.uniform(1.3, 1.5)),
        club_path_deg=payload.get("club_path_deg", random.uniform(-5.0, 5.0)),
        carry_distance_yards=payload.get("carry_distance_yards", random.uniform(200.0, 300.0))
    )
