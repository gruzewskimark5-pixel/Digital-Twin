import React from 'react';
import { Terminal, Activity, Sliders, ShieldAlert, Network } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function WLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-fuchsia-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Terminal className="w-6 h-6 text-fuchsia-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">W-LAYER: THE OPERATOR CONSOLE</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          Your cockpit. Your command center. Your sovereign interface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Network className="w-5 h-5 text-fuchsia-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">W1: Core Panels</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black/40 p-2 rounded border border-gray-800 flex flex-col gap-1">
              <span className="text-[10px] font-bold text-fuchsia-400">Intent Stream</span>
              <span className="text-[9px] font-mono text-gray-500">Every user action, normalized.</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-gray-800 flex flex-col gap-1">
              <span className="text-[10px] font-bold text-fuchsia-400">State Machine Viewer</span>
              <span className="text-[9px] font-mono text-gray-500">Every transition, visualized.</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-gray-800 flex flex-col gap-1">
              <span className="text-[10px] font-bold text-fuchsia-400">Invariant Monitor</span>
              <span className="text-[9px] font-mono text-gray-500">Violations, risks, drift precursors.</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-gray-800 flex flex-col gap-1">
              <span className="text-[10px] font-bold text-fuchsia-400">Autonomic Activity Feed</span>
              <span className="text-[9px] font-mono text-gray-500">Proposed rules, insights, optimizations.</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-gray-800 flex flex-col gap-1 col-span-2">
              <span className="text-[10px] font-bold text-fuchsia-400">Surface Health Map</span>
              <span className="text-[9px] font-mono text-gray-500">Product, distribution, architecture — all in one view.</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Sliders className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">W2: Operator Powers</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li>• Approve or reject autonomic proposals</li>
            <li>• Freeze agents</li>
            <li>• Roll back kernel versions</li>
            <li>• Trigger stress tests</li>
            <li>• Modify sovereign intent</li>
            <li>• Inspect any object, any state, any transition</li>
          </ul>
          
          <div className="mt-auto pt-4 border-t border-gray-800">
            <div className="flex items-center gap-2 pb-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-mono text-gray-300 uppercase tracking-widest">W3: Guarantees</h3>
            </div>
            <div className="flex gap-4 text-[10px] font-mono text-amber-400/80 font-bold">
              <span>✓ Full visibility</span>
              <span>✓ Full control</span>
              <span>✓ Full sovereignty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
