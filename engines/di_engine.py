import math
import statistics
from typing import List, Optional
from models import ShotEvent, DIComposite, BadgeStatus

# DI thresholds
PROVISIONAL_THRESHOLD = 0.72
VERIFIED_THRESHOLD = 0.85
VERIFIED_MIN_SESSIONS = 3

# DI formula weights
EC_WEIGHT = 0.65
Z_WEIGHT = 0.35


def normalize_z(z: float) -> float:
    """Sigmoid normalization of z-score to [0.0, 1.0]."""
    return 1.0 / (1.0 + math.exp(-z))


def compute_execution_consistency(shots: List[ShotEvent]) -> float:
    """
    Compute EC score from a session's shot events.
    EC = 1 - (CV of smash_factor + CV of club_path_deg normalized) / 2
    CV = coefficient of variation (std/mean).
    Returns 0.0–1.0.
    """
    if len(shots) < 2:
        return 0.5  # insufficient data baseline

    smash_factors = [s.smash_factor for s in shots]
    club_paths = [abs(s.club_path_deg) for s in shots]

    def cv(values: List[float]) -> float:
        mean = statistics.mean(values)
        if mean == 0:
            return 1.0
        return statistics.stdev(values) / mean

    smash_cv = cv(smash_factors)
    path_cv = cv(club_paths)

    # Normalize CVs — lower CV = higher consistency
    ec_raw = 1.0 - (smash_cv + path_cv) / 2.0
    return max(0.0, min(1.0, ec_raw))


def compute_z_score(shots: List[ShotEvent], population_mean: float = 270.0, population_std: float = 30.0) -> float:
    """
    Compute performance z-score from session carry distance vs population baseline.
    population_mean/std are default priors — override with cold-start Bayesian priors when available.

    HIGH PRIORITY gap: replace population_mean/std with context-filtered baseline per archetype.
    """
    if not shots:
        return 0.0
    session_mean = statistics.mean([s.carry_distance_yards for s in shots])
    return (session_mean - population_mean) / population_std


def compute_di(
    shots: List[ShotEvent],
    session_count: int,
    current_badge: BadgeStatus,
    # Extension hooks — HIGH PRIORITY
    bayesian_prior: Optional[dict] = None,         # {"mean": float, "std": float}
    context_filter: Optional[dict] = None,         # {"archetype": Archetype, "peer_group_mean": float}
) -> DIComposite:
    """
    Core DI computation.
    DI = EC × 0.65 + normalizeZ(z) × 0.35

    Args:
        shots: Validated ShotEvents for the session.
        session_count: Total sessions for this player (for VERIFIED gate).
        current_badge: Player's current badge status.
        bayesian_prior: Cold-start prior (HIGH PRIORITY — None until implemented).
        context_filter: Archetype-filtered baseline (HIGH PRIORITY — None until implemented).
    """
    if not shots:
        raise ValueError("Cannot compute DI with no shot events")

    # Execution Consistency
    ec = compute_execution_consistency(shots)

    # Z-score — apply priors if available
    pop_mean = 270.0
    pop_std = 30.0

    if bayesian_prior:
        # TODO: Implement cold-start Bayesian prior blending
        pop_mean = bayesian_prior.get("mean", pop_mean)
        pop_std = bayesian_prior.get("std", pop_std)

    if context_filter:
        # TODO: Implement context-filtered baseline (archetype peer group)
        pop_mean = context_filter.get("peer_group_mean", pop_mean)

    z_raw = compute_z_score(shots, pop_mean, pop_std)
    z_norm = normalize_z(z_raw)

    # DI composite
    di = (ec * EC_WEIGHT) + (z_norm * Z_WEIGHT)
    di = max(0.0, min(1.0, di))

    # Badge eligibility
    badge_eligible = False
    if current_badge == BadgeStatus.NONE and di >= PROVISIONAL_THRESHOLD:
        badge_eligible = True
    elif current_badge == BadgeStatus.PROVISIONAL and di >= VERIFIED_THRESHOLD and session_count >= VERIFIED_MIN_SESSIONS:
        badge_eligible = True

    player_id = shots[0].player_id
    session_id = shots[0].session_id

    return DIComposite(
        player_id=player_id,
        session_id=session_id,
        execution_consistency=round(ec, 4),
        z_score_raw=round(z_raw, 4),
        z_score_normalized=round(z_norm, 4),
        di_score=round(di, 4),
        badge_eligible=badge_eligible,
        current_badge=current_badge,
        session_count=session_count,
        bayesian_prior_applied=bayesian_prior is not None,
        context_filtered=context_filter is not None,
    )
