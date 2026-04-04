import React from 'react';
import { TestTube2, GitCompare, LayoutDashboard, History, ShieldCheck } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ILayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-emerald-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <TestTube2 className="w-6 h-6 text-emerald-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">I-LAYER: MULTI-AGENT TEST HARNESS</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          Validating coherence across all agents automatically. A self-testing intelligence ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">I1: Agent Compliance Tests</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Every agent must pass identity, routing, object model, state machine, and narrative compliance.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <GitCompare className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">I2: Cross-Agent Consistency</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Testing pairs of agents (e.g., Jules ↔ zexz) to validate same object definitions, state transitions, and identity.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <LayoutDashboard className="w-5 h-5 text-purple-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">I3: Surface Integration Tests</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Testing each surface (zexz, Jules, AI Studio) through the kernel to output, validating routing and schema alignment.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <History className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">I4: Regression Tests</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Running the full suite whenever the kernel evolves to detect drift, schema breakage, and narrative inconsistency.</p>
        </div>
      </div>
    </div>
  );
}
