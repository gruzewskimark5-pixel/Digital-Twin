import React from 'react';
import { Landmark, Users, FileLock2, AlertTriangle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function RLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-purple-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Landmark className="w-6 h-6 text-purple-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">R-LAYER: KERNEL GOVERNANCE LAYER</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          The constitutional layer defining who can change what, when, and how. The sovereignty layer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Users className="w-5 h-5 text-purple-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">R1: Governance Roles</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-300">Operator</span>
              <span className="text-[10px] font-mono text-gray-500">Full visibility, approve evolution, override agents, modify invariants.</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-300">Kernel</span>
              <span className="text-[10px] font-mono text-gray-500">Enforces contracts, blocks unsafe changes, validates identity.</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-300">Agents</span>
              <span className="text-[10px] font-mono text-gray-500">Propose changes, cannot enforce, must obey contracts.</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-gray-300">Surfaces</span>
              <span className="text-[10px] font-mono text-gray-500">Consume kernel, cannot modify, must remain compliant.</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <FileLock2 className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">R2: Governance Objects</h2>
          </div>
          <ul className="flex flex-col gap-2 text-xs font-mono text-gray-400">
            <li><span className="text-emerald-400">Invariants:</span> Non-negotiable truths.</li>
            <li><span className="text-emerald-400">Enforcement Points:</span> Where invariants are checked.</li>
            <li><span className="text-emerald-400">Version Registry:</span> Tracks compatibility matrix.</li>
            <li><span className="text-emerald-400">Override Ledger:</span> Logged, timestamped, justified, auditable.</li>
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">R3: Governance Protocols</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/40 p-4 rounded-lg border border-gray-800">
              <h3 className="text-xs font-bold text-amber-400 mb-2">Change Approval</h3>
              <p className="text-[10px] font-mono text-gray-400">All kernel changes require simulation, validation, and operator approval.</p>
            </div>
            <div className="bg-black/40 p-4 rounded-lg border border-gray-800">
              <h3 className="text-xs font-bold text-red-400 mb-2">Emergency Override</h3>
              <p className="text-[10px] font-mono text-gray-400">Operator can freeze agents, isolate surfaces, lock routing, revert kernel version.</p>
            </div>
            <div className="bg-black/40 p-4 rounded-lg border border-gray-800">
              <h3 className="text-xs font-bold text-orange-400 mb-2">Drift Arbitration</h3>
              <p className="text-[10px] font-mono text-gray-400">If drift detected: kernel halts offending agent, isolates surfaces, preserves state, alerts operator.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
