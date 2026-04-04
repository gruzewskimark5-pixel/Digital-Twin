import React from 'react';
import { Rocket, Server, Shield, Activity, GitBranch } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function OLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-orange-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Rocket className="w-6 h-6 text-orange-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">O-LAYER: KERNEL DEPLOYMENT BLUEPRINT</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          How to deploy the kernel across all surfaces in a real environment. The operational backbone.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Server className="w-5 h-5 text-orange-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">O1: Deployment Architecture</h2>
          </div>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-[10px] text-gray-400 overflow-x-auto text-center">
{`                ┌──────────────┐
                │   Jules      │
                └──────┬───────┘
                       │
                ┌──────▼───────┐
                │   Kernel     │
                └──────┬───────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐
│    zexz      │ │ AI Studio  │ │ Future     │
│  (product)   │ │ (backend)  │ │ surfaces   │
└───────────────┘ └────────────┘ └────────────┘`}
          </pre>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <GitBranch className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">O2: Deployment Steps</h2>
          </div>
          <div className="flex flex-col gap-3 text-xs font-mono text-gray-400">
            <div className="flex flex-col gap-1">
              <span className="text-blue-400 font-bold">Step 1: Deploy Kernel as a Service</span>
              <span>Containerized, versioned, stateless, horizontally scalable.</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blue-400 font-bold">Step 2: Deploy Agent SDK</span>
              <span>All surfaces import from same package, version pinned.</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blue-400 font-bold">Step 3: Deploy Surface Adapters</span>
              <span>zexz → kernel, Jules → kernel, AI Studio → kernel.</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blue-400 font-bold">Step 4: Enforce Contracts</span>
              <span>CI runs kernel test suite; violations block deployment.</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blue-400 font-bold">Step 5: Activate Telemetry</span>
              <span>Log intents, state transitions, agent identities, violations.</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">O3: Deployment Guarantees</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
            <div className="bg-black/40 p-3 rounded border border-gray-800 text-center">
              <span className="text-[10px] font-mono text-emerald-400">No Surface Drift</span>
            </div>
            <div className="bg-black/40 p-3 rounded border border-gray-800 text-center">
              <span className="text-[10px] font-mono text-emerald-400">No Agent Drift</span>
            </div>
            <div className="bg-black/40 p-3 rounded border border-gray-800 text-center">
              <span className="text-[10px] font-mono text-emerald-400">No Schema Drift</span>
            </div>
            <div className="bg-black/40 p-3 rounded border border-gray-800 text-center">
              <span className="text-[10px] font-mono text-emerald-400">No Narrative Drift</span>
            </div>
            <div className="bg-black/40 p-3 rounded border border-gray-800 text-center">
              <span className="text-[10px] font-mono text-emerald-400">No Routing Drift</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
