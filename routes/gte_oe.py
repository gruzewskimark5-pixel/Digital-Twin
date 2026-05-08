from fastapi import APIRouter
from models import ShotEvent, DIComposite, BadgeStatus
from engines.di_engine import compute_di
from typing import List

router = APIRouter()

@router.post("/validate")
def validate_shot(shot: ShotEvent):
    return {"status": "validated", "shot": shot}

@router.post("/di")
def compute_di_endpoint(shots: List[ShotEvent]) -> DIComposite:
    # Stub: fetch real session_count and current_badge
    session_count = 1
    current_badge = BadgeStatus.NONE

    return compute_di(shots, session_count, current_badge)

@router.post("/badge")
def trigger_badge(player_id: str, new_badge: BadgeStatus):
    return {"status": "badge_transitioned", "player": player_id, "badge": new_badge}
