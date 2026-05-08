from enum import Enum
from pydantic import BaseModel, ConfigDict
from typing import Optional

class BadgeStatus(str, Enum):
    NONE = "NONE"
    PROVISIONAL = "PROVISIONAL"
    VERIFIED = "VERIFIED"

class Archetype(str, Enum):
    UNCLASSIFIED = "UNCLASSIFIED"
    # To be expanded...

class ShotEvent(BaseModel):
    model_config = ConfigDict(extra="forbid")
    player_id: str
    session_id: str
    smash_factor: float
    club_path_deg: float
    carry_distance_yards: float

class DIComposite(BaseModel):
    model_config = ConfigDict(extra="forbid")
    player_id: str
    session_id: str
    execution_consistency: float
    z_score_raw: float
    z_score_normalized: float
    di_score: float
    badge_eligible: bool
    current_badge: BadgeStatus
    session_count: int
    bayesian_prior_applied: bool
    context_filtered: bool
