import React from 'react';
import { Globe, Cpu, Database, ShieldCheck, Activity } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function VLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-cyan-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">V-LAYER: THE SOVEREIGN RUNTIME</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          The live execution environment where the kernel, agents, surfaces, and autonomic engine operate as one organism.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <ShieldCheck className="w-5 h-5 text-cyan-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">V1: Runtime Pillars</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li><span className="text-cyan-400 font-bold">Deterministic Execution:</span> Predictable, reversible, auditable.</li>
            <li><span className="text-cyan-400 font-bold">Unified Memory Plane:</span> Shared state backbone.</li>
            <li><span className="text-cyan-400 font-bold">Cross-Surface Coherence:</span> No divergence from kernel.</li>
            <li><span className="text-cyan-400 font-bold">Real-Time Enforcement:</span> Invariants checked at runtime.</li>
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Cpu className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">V2: Runtime Components</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li><span className="text-blue-400 font-bold">Execution Sandbox:</span> Side-effect-free evaluation.</li>
            <li><span className="text-blue-400 font-bold">Routing Spine:</span> Intent → Surface → Agent → Kernel → Output.</li>
            <li><span className="text-blue-400 font-bold">State Ledger:</span> Immutable record of transitions.</li>
            <li><span className="text-blue-400 font-bold">Autonomic Hooks:</span> Insight harvesting + optimization loops.</li>
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">V3: Runtime Guarantees</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-emerald-400/80">
            <li>✓ No rogue agents</li>
            <li>✓ No schema drift</li>
            <li>✓ No narrative drift</li>
            <li>✓ No silent failures</li>
            <li>✓ No unbounded evolution</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
