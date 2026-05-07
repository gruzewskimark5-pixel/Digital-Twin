"""
SpaceZgolf — Identity OS Pydantic Models
Schema Version: 1.0
Generated from: Identity OS Schema v1.0 Specification
FastAPI-compatible. Python 3.11+.

Partition key:
    IMMUTABLE  — write-once at genesis, integrity-hash verified on read
    VERSIONED  — mutable, monotonically versioned, Merkle-committed on-chain
    APPEND     — append-only, never updated after write
    ON-CHAIN   — Solana PDA; source of truth for state commitment
"""

from __future__ import annotations

from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field, field_validator, model_validator


# ─────────────────────────────────────────────
# ENUMS
# ─────────────────────────────────────────────

class EnrollmentSource(str, Enum):
    SELF = "SELF"
    LEAGUE = "LEAGUE"
    COACH = "COACH"
    DEVICE = "DEVICE"


class Archetype(str, Enum):
    VERTICAL_JUMPER = "VERTICAL_JUMPER"
    GROUND_COMPRESSOR = "GROUND_COMPRESSOR"
    ROTATIONAL_DRIVER = "ROTATIONAL_DRIVER"
    LAG_PRESERVATIONIST = "LAG_PRESERVATIONIST"
    TRANSITION_LOADER = "TRANSITION_LOADER"
    UNCLASSIFIED = "UNCLASSIFIED"  # valid only at genesis; hard-fails after 3 sessions


class DominanceClass(str, Enum):
    ELITE = "ELITE"           # DI >= 0.85
    CONTENDER = "CONTENDER"   # DI >= 0.70
    DEVELOPING = "DEVELOPING" # DI >= 0.50
    BASELINE = "BASELINE"     # DI < 0.50
    UNSCORED = "UNSCORED"     # insufficient data


class MutationTrigger(str, Enum):
    SESSION_CLOSE = "SESSION_CLOSE"
    INTERVENTION_FIRED = "INTERVENTION_FIRED"
    ARCHETYPE_TRANSITION = "ARCHETYPE_TRANSITION"
    LEAGUE_ENROLLMENT = "LEAGUE_ENROLLMENT"
    RIVALRY_UPDATE = "RIVALRY_UPDATE"
    ADMIN_CORRECTION = "ADMIN_CORRECTION"  # requires 2-of-3 multisig; logged immutably


class SessionStatus(str, Enum):
    OPEN = "OPEN"
    CLOSED = "CLOSED"
    ABANDONED = "ABANDONED"
    INVALIDATED = "INVALIDATED"


class CaptureMode(str, Enum):
    FULL_SENSOR = "FULL_SENSOR"
    VIDEO_ONLY = "VIDEO_ONLY"
    MANUAL_ENTRY = "MANUAL_ENTRY"
    SIMULATED = "SIMULATED"


class LeagueEnrollmentStatus(str, Enum):
    ACTIVE = "ACTIVE"
    SUSPENDED = "SUSPENDED"
    GRADUATED = "GRADUATED"
    WITHDRAWN = "WITHDRAWN"


# ─────────────────────────────────────────────
# SUPPORTING MODELS
# ─────────────────────────────────────────────

class WeightSnapshot(BaseModel):
    """Snapshot of v1.2 weight table at time of DI capture."""
    ec_weight: float = Field(..., ge=0.0, le=1.0, description="Typically 0.65")
    z_weight: float = Field(..., ge=0.0, le=1.0, description="Typically 0.35")
    captured_at: int = Field(..., description="Unix epoch")
    weight_table_version: str

    @model_validator(mode="after")
    def weights_sum_to_one(self) -> "WeightSnapshot":
        total = round(self.ec_weight + self.z_weight, 6)
        if abs(total - 1.0) > 1e-4:
            raise ValueError(f"ec_weight + z_weight must equal 1.0, got {total}")
        return self


class FusedStreamRef(BaseModel):
    """Pointer to v1.1 Fused Stream artifact for a session."""
    stream_id: str
    stream_version: str = Field(..., description="v1.1 or higher")
    artifact_uri: str
    checksum_sha256: str = Field(..., min_length=64, max_length=64)


class FusedStreamPayload(BaseModel):
    """Raw normalized stream payload at event time (v1.1 Fused Stream output)."""
    stream_id: str
    sequence_index: int = Field(..., ge=0)
    normalized_channels: dict[str, float] = Field(
        ..., description="Keyed by channel name; values normalized"
    )
    captured_at: int = Field(..., description="Unix epoch ms")
    frame_rate_hz: float = Field(..., gt=0)


class ArchetypeTransition(BaseModel):
    """Archetype transition record — append-only."""
    transition_id: str
    from_archetype: Archetype
    to_archetype: Archetype
    transitioned_at: int
    trigger_session_id: str
    confidence_score: float = Field(..., ge=0.0, le=1.0)

    @field_validator("to_archetype")
    @classmethod
    def cannot_transition_to_unclassified(cls, v: Archetype) -> Archetype:
        if v == Archetype.UNCLASSIFIED:
            raise ValueError("Cannot transition TO UNCLASSIFIED; only valid at genesis")
        return v


class LeagueEnrollment(BaseModel):
    """League enrollment binding."""
    enrollment_id: str
    league_id: str
    cluster_id: Optional[str] = None
    enrolled_at: int
    status: LeagueEnrollmentStatus


class RivalryEdge(BaseModel):
    """Rivalry edge from Apex League Heat Engine v1."""
    edge_id: str
    rival_usih: str
    heat_score: float = Field(..., ge=0.0, le=1.0)
    force_event_eligible: bool
    last_updated_at: int


class InterventionLog(BaseModel):
    """Intervention log entry — causal bridge between SwingEvent and DISnapshot."""
    intervention_id: str
    session_id: str
    trigger_event_id: str = Field(..., description="FK → SwingEvent.event_id — Narrative Causality anchor")
    intervention_type: str
    intervention_code: str
    fired_at: int
    di_delta_attributed: float = Field(..., description="Signed — DI impact attributed to this intervention")


# ─────────────────────────────────────────────
# CORE MODELS
# ─────────────────────────────────────────────

class PlayerIdentity(BaseModel):
    """
    PARTITION: IMMUTABLE
    STORAGE: Off-chain (Postgres) + on-chain integrity hash
    ZHP: Irreversible Identity Commitments
    """
    # Root keys
    usih: str = Field(..., description="Universal Swing Identity Hash — PDA seed")
    player_id: str = Field(..., description="UUID v4 — internal system key")
    genesis_timestamp: int = Field(..., description="Unix epoch — WRITE ONCE")

    # Biographical core
    display_name: str
    legal_name: Optional[str] = Field(None, description="Optional; stored encrypted")
    enrollment_source: EnrollmentSource
    jurisdiction_code: str = Field(..., min_length=2, max_length=2, description="ISO 3166-1 alpha-2")

    # Biomechanical archetype
    genesis_archetype: Archetype
    archetype_classified_at: int

    # Integrity
    schema_version: str = Field("1.0", pattern=r"^1\.0$")
    integrity_hash: str = Field(..., min_length=64, max_length=64, description="SHA-256 of immutable fields")

    model_config = {"frozen": True}  # enforce immutability at model level


class DISnapshot(BaseModel):
    """
    PARTITION: APPEND
    STORAGE: Off-chain (Postgres)
    Formula: DI = EC × 0.65 + normalizeZ(z) × 0.35
    Produced by: v1.2 Dynamic Weighting Engine
    """
    snapshot_id: str
    usih: str
    session_id: str
    captured_at: int

    # Composite score
    di: float = Field(..., ge=0.0, le=1.0)
    ec: float = Field(..., ge=0.0, le=1.0, description="Execution Competency component")
    z_normalized: float = Field(..., description="normalizeZ(z) output")

    weight_snapshot: WeightSnapshot
    interventions_fired: list[str] = Field(default_factory=list, description="InterventionLog.intervention_id[]")
    dominance_class: DominanceClass

    @model_validator(mode="after")
    def validate_di_formula(self) -> "DISnapshot":
        expected = round(
            self.ec * self.weight_snapshot.ec_weight
            + self.z_normalized * self.weight_snapshot.z_weight,
            4,
        )
        if abs(self.di - expected) > 0.01:
            raise ValueError(
                f"DI formula mismatch: expected ~{expected}, got {self.di}"
            )
        return self

    @model_validator(mode="after")
    def validate_dominance_class(self) -> "DISnapshot":
        if self.dominance_class == DominanceClass.UNSCORED:
            return self
        thresholds = {
            DominanceClass.ELITE: 0.85,
            DominanceClass.CONTENDER: 0.70,
            DominanceClass.DEVELOPING: 0.50,
            DominanceClass.BASELINE: 0.0,
        }
        expected_class = DominanceClass.BASELINE
        for cls, threshold in thresholds.items():
            if self.di >= threshold:
                expected_class = cls
                break
        if self.dominance_class != expected_class:
            raise ValueError(
                f"DominanceClass mismatch: DI={self.di} → expected {expected_class}, got {self.dominance_class}"
            )
        return self


class SwingEvent(BaseModel):
    """
    PARTITION: IMMUTABLE after write
    STORAGE: Off-chain (Postgres)
    The atomic attributed unit of performance.
    """
    event_id: str
    session_id: str
    usih: str
    sequence_index: int = Field(..., ge=0)
    captured_at: int

    stream_payload: FusedStreamPayload
    ec_contribution: float
    z_value: float
    di_contribution_delta: float = Field(..., description="Signed")

    event_signature: str = Field(..., description="HMAC-SHA256(usih + session_id + sequence_index + captured_at)")
    signature_algorithm: str = Field("HMAC-SHA256", pattern=r"^HMAC-SHA256$")

    model_config = {"frozen": True}


class SessionRecord(BaseModel):
    """
    PARTITION: APPEND-ONLY
    STORAGE: Off-chain (Postgres)
    """
    session_id: str
    usih: str
    session_start: int
    session_end: int = Field(..., description="Set on SESSION_CLOSE")
    session_status: SessionStatus

    fused_stream_ref: FusedStreamRef
    swing_events: list[SwingEvent]
    intervention_log: list[InterventionLog]

    opening_di: DISnapshot
    closing_di: DISnapshot
    session_delta: float = Field(..., description="closing_di.di - opening_di.di")

    # Reserved — finalized in Edge-Device Binary Packing Spec
    device_id: Optional[str] = None
    capture_mode: CaptureMode

    @model_validator(mode="after")
    def validate_session_delta(self) -> "SessionRecord":
        expected = round(self.closing_di.di - self.opening_di.di, 6)
        if abs(self.session_delta - expected) > 1e-4:
            raise ValueError(
                f"session_delta mismatch: expected {expected}, got {self.session_delta}"
            )
        return self

    @model_validator(mode="after")
    def validate_swing_sequence(self) -> "SessionRecord":
        indices = [e.sequence_index for e in self.swing_events]
        if indices != list(range(len(indices))):
            raise ValueError("SwingEvent sequence_index must be contiguous and zero-based")
        return self


class IdentityState(BaseModel):
    """
    PARTITION: VERSIONED (MUTABLE)
    STORAGE: Off-chain (Postgres); Merkle root committed on-chain per session
    ZHP: stateVersion gaps → session INVALIDATED
    """
    usih: str
    state_version: int = Field(..., ge=1, description="Monotonically incrementing — NO GAPS ALLOWED")
    last_mutated_at: int
    mutation_trigger: MutationTrigger

    current_di: DISnapshot
    di_history: list[DISnapshot]

    current_archetype: Archetype
    archetype_history: list[ArchetypeTransition]

    league_enrollments: list[LeagueEnrollment]
    rivalry_edges: list[RivalryEdge]

    lifetime_sessions: int = Field(..., ge=0)
    lifetime_swing_events: int = Field(..., ge=0)
    lifetime_interventions: int = Field(..., ge=0)

    state_commit: str = Field(..., min_length=64, max_length=64, description="Merkle root — must match on-chain")


class IdentityHash(BaseModel):
    """
    PARTITION: ON-CHAIN (Solana PDA)
    Source of truth for state commitment.
    Mirrors Rust Anchor account struct.
    """
    usih: str = Field(..., min_length=64, max_length=64, description="32-byte SHA-256 as hex")
    state_commit: str = Field(..., min_length=64, max_length=64, description="32-byte Merkle root as hex")
    genesis_timestamp: int
    state_version: int = Field(..., ge=0)
    chain_log_count: int = Field(..., ge=0)
    authority: str = Field(..., description="Solana Pubkey as base58")
    bump: int = Field(..., ge=0, le=255)


class ChainLogEntry(BaseModel):
    """On-chain append-only audit trail entry."""
    identity_hash_key: str = Field(..., description="FK → IdentityHash (Solana Pubkey as base58)")
    sequence: int = Field(..., ge=0)
    prev_state_commit: str = Field(..., min_length=64, max_length=64)
    next_state_commit: str = Field(..., min_length=64, max_length=64)
    mutation_trigger: MutationTrigger
    timestamp: int
    authority_sig: str = Field(..., description="Ed25519 signature as base64")


# ─────────────────────────────────────────────
# INGESTION CONTRACT MODELS
# ─────────────────────────────────────────────

class SwingEventIngestionPayload(BaseModel):
    """Input to the ingestion pipeline from v1.1 Fused Stream."""
    usih: str
    session_id: str
    stream_payload: FusedStreamPayload
    captured_at: int


class SessionCloseResult(BaseModel):
    """Output of SESSION_CLOSE — triggers on-chain state commit."""
    session_id: str
    usih: str
    closing_di: DISnapshot
    new_state_version: int
    new_state_commit: str = Field(..., min_length=64, max_length=64, description="Merkle root to write on-chain")
    # Pre-signature chain log payload — authority_sig added by signing service
    chain_log_entry: ChainLogEntry
