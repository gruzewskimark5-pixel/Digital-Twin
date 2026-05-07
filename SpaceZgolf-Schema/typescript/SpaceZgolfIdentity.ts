/**
 * SpaceZgolf — Identity OS Type Definitions
 * Schema Version: 1.0
 * Generated from: Identity OS Schema v1.0 Specification
 *
 * Partition key:
 *   IMMUTABLE  — write-once at genesis, integrity-hash verified on read
 *   VERSIONED  — mutable, monotonically versioned, Merkle-committed on-chain
 *   APPEND     — append-only, never updated after write
 *   ON-CHAIN   — Solana PDA; source of truth for state commitment
 */

// ─────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────

export type EnrollmentSource = "SELF" | "LEAGUE" | "COACH" | "DEVICE";

export type Archetype =
  | "VERTICAL_JUMPER"
  | "GROUND_COMPRESSOR"
  | "ROTATIONAL_DRIVER"
  | "LAG_PRESERVATIONIST"
  | "TRANSITION_LOADER"
  | "UNCLASSIFIED"; // valid only at genesis; hard-fails ingestion after 3 sessions

export type DominanceClass =
  | "ELITE"       // DI >= 0.85
  | "CONTENDER"   // DI >= 0.70
  | "DEVELOPING"  // DI >= 0.50
  | "BASELINE"    // DI < 0.50
  | "UNSCORED";   // insufficient data

export type MutationTrigger =
  | "SESSION_CLOSE"
  | "INTERVENTION_FIRED"
  | "ARCHETYPE_TRANSITION"
  | "LEAGUE_ENROLLMENT"
  | "RIVALRY_UPDATE"
  | "ADMIN_CORRECTION"; // requires 2-of-3 multisig; logged immutably

export type SessionStatus = "OPEN" | "CLOSED" | "ABANDONED" | "INVALIDATED";

export type CaptureMode =
  | "FULL_SENSOR"
  | "VIDEO_ONLY"
  | "MANUAL_ENTRY"
  | "SIMULATED";

// ─────────────────────────────────────────────
// SUPPORTING TYPES
// ─────────────────────────────────────────────

/** Snapshot of v1.2 weight table at time of DI capture */
export interface WeightSnapshot {
  ecWeight: number;        // typically 0.65
  zWeight: number;         // typically 0.35
  capturedAt: number;      // Unix epoch — reflects live weight at scoring time
  weightTableVersion: string;
}

/** Pointer to v1.1 Fused Stream artifact for a session */
export interface FusedStreamRef {
  streamId: string;
  streamVersion: string;   // v1.1 or higher
  artifactUri: string;     // storage URI
  checksumSha256: string;
}

/** Raw normalized stream payload at event time (v1.1 Fused Stream output) */
export interface FusedStreamPayload {
  streamId: string;
  sequenceIndex: number;
  normalizedChannels: Record<string, number>; // keyed by channel name
  capturedAt: number;
  frameRateHz: number;
}

/** Archetype transition record — append-only */
export interface ArchetypeTransition {
  transitionId: string;
  fromArchetype: Archetype;
  toArchetype: Archetype;
  transitionedAt: number;      // Unix epoch
  triggerSessionId: string;    // session that caused the reclassification
  confidenceScore: number;     // [0.0, 1.0]
}

/** League enrollment binding */
export interface LeagueEnrollment {
  enrollmentId: string;
  leagueId: string;            // e.g. Apex League OS league key
  clusterId?: string;          // Apex League cluster assignment
  enrolledAt: number;
  status: "ACTIVE" | "SUSPENDED" | "GRADUATED" | "WITHDRAWN";
}

/** Rivalry edge from Apex League Heat Engine v1 */
export interface RivalryEdge {
  edgeId: string;
  rivalUsih: string;           // opposing player USIH
  heatScore: number;           // [0.0, 1.0] from Heat Engine
  forceEventEligible: boolean;
  lastUpdatedAt: number;
}

/** Intervention log entry — causal bridge between SwingEvent and DISnapshot */
export interface InterventionLog {
  interventionId: string;
  sessionId: string;
  triggerEventId: string;      // FK → SwingEvent.eventId — Narrative Causality anchor
  interventionType: string;    // from v1.2 Intervention mapping table
  interventionCode: string;
  firedAt: number;
  diDeltaAttributed: number;   // signed — DI impact attributed to this intervention
}

// ─────────────────────────────────────────────
// CORE ENTITIES
// ─────────────────────────────────────────────

/**
 * PlayerIdentity
 * PARTITION: IMMUTABLE
 * STORAGE: Off-chain (Postgres) + on-chain integrity hash
 * ZHP: Irreversible Identity Commitments
 */
export interface PlayerIdentity {
  // Root keys
  usih: string;                    // Universal Swing Identity Hash — PDA seed
  playerId: string;                // UUID v4 — internal system key
  genesisTimestamp: number;        // Unix epoch — WRITE ONCE

  // Biographical core (write-once at enrollment)
  displayName: string;
  legalName?: string;              // optional; stored encrypted
  enrollmentSource: EnrollmentSource;
  jurisdictionCode: string;        // ISO 3166-1 alpha-2

  // Biomechanical archetype (genesis classification)
  genesisArchetype: Archetype;
  archetypeClassifiedAt: number;   // Unix epoch

  // Integrity
  schemaVersion: "1.0";
  integrityHash: string;           // SHA-256 of all immutable fields — verified on read
}

/**
 * DISnapshot
 * PARTITION: APPEND
 * STORAGE: Off-chain (Postgres)
 * Formula: DI = EC × 0.65 + normalizeZ(z) × 0.35
 * Produced by: v1.2 Dynamic Weighting Engine
 */
export interface DISnapshot {
  snapshotId: string;
  usih: string;                    // FK → PlayerIdentity.usih
  sessionId: string;               // FK → SessionRecord.sessionId
  capturedAt: number;

  // Composite score
  di: number;                      // [0.0, 1.0] — normalized
  ec: number;                      // Execution Competency component
  zNormalized: number;             // normalizeZ(z) output

  // Weight state at capture
  weightSnapshot: WeightSnapshot;

  // Intervention attribution — Narrative Causality chain
  interventionsFired: string[];    // InterventionLog.interventionId[]
  dominanceClass: DominanceClass;
}

/**
 * SwingEvent
 * PARTITION: IMMUTABLE after write
 * STORAGE: Off-chain (Postgres)
 * The atomic attributed unit of performance.
 */
export interface SwingEvent {
  eventId: string;
  sessionId: string;               // FK → SessionRecord.sessionId
  usih: string;                    // FK → PlayerIdentity.usih
  sequenceIndex: number;           // monotonic within session
  capturedAt: number;              // Unix epoch ms

  // Fused stream payload
  streamPayload: FusedStreamPayload;

  // Scoring contribution
  ecContribution: number;
  zValue: number;
  diContributionDelta: number;     // signed

  // Attribution signature — HMAC-SHA256(usih + sessionId + sequenceIndex + capturedAt)
  eventSignature: string;
  signatureAlgorithm: "HMAC-SHA256";
}

/**
 * SessionRecord
 * PARTITION: APPEND-ONLY
 * STORAGE: Off-chain (Postgres)
 */
export interface SessionRecord {
  sessionId: string;
  usih: string;                    // FK → PlayerIdentity.usih
  sessionStart: number;
  sessionEnd: number;              // set on SESSION_CLOSE
  sessionStatus: SessionStatus;

  // v1.1 Fused Stream binding
  fusedStreamRef: FusedStreamRef;

  // Event log
  swingEvents: SwingEvent[];
  interventionLog: InterventionLog[];

  // Session-scoped DI
  openingDI: DISnapshot;
  closingDI: DISnapshot;
  sessionDelta: number;            // closingDI.di - openingDI.di

  // Device context (reserved — finalized in Edge-Device Binary Packing Spec)
  deviceId?: string;
  captureMode: CaptureMode;
}

/**
 * IdentityState
 * PARTITION: VERSIONED (MUTABLE)
 * STORAGE: Off-chain (Postgres); Merkle root committed on-chain per session
 * ZHP: stateVersion gaps → session INVALIDATED
 */
export interface IdentityState {
  usih: string;                    // FK → PlayerIdentity.usih
  stateVersion: number;            // monotonically incrementing — NO GAPS ALLOWED
  lastMutatedAt: number;
  mutationTrigger: MutationTrigger;

  // DI composite
  currentDI: DISnapshot;
  diHistory: DISnapshot[];

  // Archetype evolution
  currentArchetype: Archetype;
  archetypeHistory: ArchetypeTransition[];

  // League / competitive context
  leagueEnrollments: LeagueEnrollment[];
  rivalryEdges: RivalryEdge[];     // Apex League Heat Engine bindings

  // Aggregate counters
  lifetimeSessions: number;
  lifetimeSwingEvents: number;
  lifetimeInterventions: number;

  // Merkle commitment — must match on-chain IdentityHash.stateCommit
  stateCommit: string;
}

/**
 * IdentityHash
 * PARTITION: ON-CHAIN (Solana PDA)
 * Source of truth for state commitment.
 * Mirrors Rust Anchor account struct.
 */
export interface IdentityHash {
  usih: string;                    // 32-byte SHA-256 as hex string
  stateCommit: string;             // 32-byte Merkle root as hex string
  genesisTimestamp: number;        // Unix epoch — immutable
  stateVersion: number;            // mirrors IdentityState.stateVersion
  chainLogCount: number;
  authority: string;               // Solana Pubkey as base58 string
  bump: number;
}

/** ChainLogEntry — on-chain append-only audit trail */
export interface ChainLogEntry {
  identityHashKey: string;         // FK → IdentityHash (Solana Pubkey as base58)
  sequence: number;
  prevStateCommit: string;         // 32-byte hex
  nextStateCommit: string;         // 32-byte hex
  mutationTrigger: MutationTrigger;
  timestamp: number;
  authoritySig: string;            // Ed25519 signature as base64
}

// ─────────────────────────────────────────────
// INGESTION CONTRACT TYPES
// ─────────────────────────────────────────────

/** Input to the ingestion pipeline from v1.1 Fused Stream */
export interface SwingEventIngestionPayload {
  usih: string;
  sessionId: string;
  streamPayload: FusedStreamPayload;
  capturedAt: number;
}

/** Output of SESSION_CLOSE — triggers on-chain state commit */
export interface SessionCloseResult {
  sessionId: string;
  usih: string;
  closingDI: DISnapshot;
  newStateVersion: number;
  newStateCommit: string;          // Merkle root to write on-chain
  chainLogEntry: Omit<ChainLogEntry, "authoritySig">; // pre-sig payload
}
