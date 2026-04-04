import React from 'react';
import { RefreshCw, Zap, CheckCircle2, Rocket } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function QLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-emerald-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 text-emerald-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">Q-LAYER: KERNEL EVOLUTION PROTOCOL</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          How the kernel upgrades itself safely. Controlled autonomy and self-improvement without drift.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">Q1: Evolution Triggers</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Detected by the runtime dashboard:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-amber-400">New Patterns</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-amber-400">New Constraints</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-amber-400">New Surfaces</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-amber-400">New Agents</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-amber-400">Drift Precursors</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-[10px] font-mono text-amber-400">Bottlenecks</span>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">Q3: Evolution Guarantees</h2>
          </div>
          <ul className="flex flex-col gap-2 text-xs font-mono text-emerald-400/80">
            <li>✓ No breaking changes</li>
            <li>✓ No silent drift</li>
            <li>✓ No schema divergence</li>
            <li>✓ No narrative inconsistency</li>
            <li>✓ No rogue evolution</li>
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Rocket className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">Q2: Evolution Pipeline</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-2">
            <div className="flex flex-col gap-2">
              <div className="bg-blue-500/20 text-blue-400 text-center py-1 rounded text-[10px] font-bold font-mono border border-blue-500/30">1. PROPOSE</div>
              <p className="text-[9px] font-mono text-gray-500">Agent, surface, autonomic engine, or operator proposes change.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-blue-500/20 text-blue-400 text-center py-1 rounded text-[10px] font-bold font-mono border border-blue-500/30">2. SIMULATE</div>
              <p className="text-[9px] font-mono text-gray-500">Deterministic/stochastic scenarios, failure injection, stress tests.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-blue-500/20 text-blue-400 text-center py-1 rounded text-[10px] font-bold font-mono border border-blue-500/30">3. VALIDATE</div>
              <p className="text-[9px] font-mono text-gray-500">Must pass identity, routing, object, execution, and narrative contracts.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-blue-500/20 text-blue-400 text-center py-1 rounded text-[10px] font-bold font-mono border border-blue-500/30">4. APPROVE</div>
              <p className="text-[9px] font-mono text-gray-500">Governance layer (R) signs off.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-blue-500/20 text-blue-400 text-center py-1 rounded text-[10px] font-bold font-mono border border-blue-500/30">5. DEPLOY</div>
              <p className="text-[9px] font-mono text-gray-500">Versioned rollout, canary surfaces, regression tests, rollback hooks.</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-blue-500/20 text-blue-400 text-center py-1 rounded text-[10px] font-bold font-mono border border-blue-500/30">6. MONITOR</div>
              <p className="text-[9px] font-mono text-gray-500">Runtime dashboard watches for drift, anomalies, regressions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
