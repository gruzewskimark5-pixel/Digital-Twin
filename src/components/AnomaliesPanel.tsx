import React, { memo } from 'react';
import { ShieldAlert, AlertTriangle, Satellite, Terminal, CheckSquare } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

interface AnomaliesPanelProps {
  anomalies: Anomaly[];
  onInjectAnomaly: () => void;
  onExecutePlaybook: (id: string) => void;
}

export const AnomaliesPanel = memo(function AnomaliesPanel({
  anomalies,
  onInjectAnomaly,
  onExecutePlaybook
}: AnomaliesPanelProps) {
  return (
    <div className="glass-panel rounded-xl p-5 border-l-4 border-l-red-500/50 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">M-Layer: Playbooks</h2>
        </div>
        <button
          onClick={onInjectAnomaly}
          className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors font-mono text-xs cursor-pointer"
        >
          <AlertTriangle className="w-3 h-3" /> FAULT INJECT
        </button>
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-[250px] pr-2">
        {anomalies.map(anomaly => (
          <div key={anomaly.id} className={cn(
            "flex flex-col gap-3 p-3 border rounded-lg font-mono text-xs transition-colors",
            anomaly.severity === 'CRITICAL' ? "bg-red-500/10 border-red-500/30" :
            anomaly.severity === 'WARNING' ? "bg-amber-500/10 border-amber-500/30" :
            "bg-emerald-500/10 border-emerald-500/30 opacity-60"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "font-bold",
                  anomaly.severity === 'CRITICAL' ? "text-red-400" :
                  anomaly.severity === 'WARNING' ? "text-amber-400" :
                  "text-emerald-400"
                )}>{anomaly.id}</span>
                <span className="text-gray-300">{anomaly.type}</span>
              </div>
              <span className="text-gray-500">{anomaly.timestamp.split('T')[1].slice(0, 8)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-black/40 text-gray-400 rounded border border-gray-700 flex items-center gap-1">
                <Satellite className="w-3 h-3" /> {anomaly.node}
              </span>

              {anomaly.severity !== 'RESOLVED' ? (
                <button
                  onClick={() => onExecutePlaybook(anomaly.id)}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded border border-gray-600 transition-colors cursor-pointer"
                >
                  <Terminal className="w-3 h-3" /> EXEC {anomaly.playbook}
                </button>
              ) : (
                <span className="flex items-center gap-1 text-emerald-500">
                  <CheckSquare className="w-4 h-4" /> RESOLVED
                </span>
              )}
            </div>
          </div>
        ))}
        {anomalies.length === 0 && (
          <div className="text-center text-gray-500 font-mono text-xs py-8">
            NO ACTIVE ANOMALIES.
          </div>
        )}
      </div>
    </div>
  );
});
