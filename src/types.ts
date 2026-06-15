export type JobStatus = 'QUEUED' | 'RUNNING' | 'CHECKPOINTED' | 'COMPLETED' | 'FAILED';

export interface Job {
  id: string;
  task: string;
  status: JobStatus;
  node: string | null;
  progress: number;
  energyReq: number;
}

export type AnomalySeverity = 'CRITICAL' | 'WARNING' | 'RESOLVED';

export interface Anomaly {
  id: string;
  type: string;
  node: string;
  severity: AnomalySeverity;
  timestamp: string;
  playbook: string;
}
