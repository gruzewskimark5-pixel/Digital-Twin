import React from 'react';
import { RefreshCw, Eye, Lightbulb, TrendingUp, Maximize2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function TLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-amber-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 text-amber-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">T-LAYER: THE AUTONOMIC ENGINE</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          The self-optimization loop. Controlled autonomy without breaking invariants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Eye className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">T1: Insight Harvesting Engine</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Continuously extracts from telemetry:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-amber-400">Anomalies</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-amber-400">Patterns</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-amber-400">Correlations</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-amber-400">Drift Precursors</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-amber-400">Operator Tendencies</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-amber-400">Threat Signatures</span>
          </div>
          <div className="mt-auto pt-3 border-t border-gray-800 text-[10px] text-gray-500">
            Enforced by: Invariants 28–31
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Lightbulb className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">T2: Autocatalytic Rule Generator</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Generates proposed rules based on:</p>
          <ul className="flex flex-col gap-1 text-[10px] font-mono text-gray-500 mt-2">
            <li>• Simulation outcomes</li>
            <li>• Stress tests</li>
            <li>• Distributed state patterns</li>
            <li>• Governance decisions</li>
            <li>• Autonomic feedback</li>
          </ul>
          <div className="mt-auto pt-3 border-t border-gray-800 text-[10px] text-blue-400">
            Key: Rules are proposed, never enforced.
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Maximize2 className="w-5 h-5 text-purple-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">T3: Scenario Expansion Engine</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Expands the simulation sandbox:</p>
          <ul className="flex flex-col gap-1 text-[10px] font-mono text-gray-500 mt-2">
            <li>• Deterministic scenarios</li>
            <li>• Stochastic scenarios</li>
            <li>• Failure injection</li>
            <li>• Multi-node stress tests</li>
            <li>• Adversarial sequences</li>
          </ul>
          <div className="mt-auto pt-3 border-t border-gray-800 text-[10px] text-purple-400">
            This is the system training itself.
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">T4: Yield-Driven Optimization</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Optimizes within invariant bounds:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-emerald-400">Thresholds</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-emerald-400">Constraints</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-emerald-400">Routing Weights</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-emerald-400">Risk Envelopes</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-emerald-400">Scheduling Heuristics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
