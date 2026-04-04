import React from 'react';
import { Activity, Radio, ShieldAlert, HeartPulse, Network } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function PLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-blue-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">P-LAYER: KERNEL RUNTIME DASHBOARD</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          Real-time visibility layer for intents, state transitions, agent behavior, and system health. The operator cockpit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Radio className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">P1.1: Intent Stream</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Live feed of every intent entering the system. Air traffic control.</p>
          <ul className="flex flex-col gap-1 text-[10px] font-mono text-gray-500 mt-2">
            <li>• Source surface</li>
            <li>• Agent identity</li>
            <li>• Normalized intent</li>
            <li>• Timestamp</li>
            <li>• Routing path</li>
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Network className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">P1.2: State Transition Viewer</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">State machine oscilloscope for each intent.</p>
          <ul className="flex flex-col gap-1 text-[10px] font-mono text-gray-500 mt-2">
            <li>• Previous & Next state</li>
            <li>• Constraints applied</li>
            <li>• Next action computed</li>
            <li>• Contract checks passed/failed</li>
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <ShieldAlert className="w-5 h-5 text-purple-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">P1.3: Agent Identity Monitor</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Agent integrity radar.</p>
          <ul className="flex flex-col gap-1 text-[10px] font-mono text-gray-500 mt-2">
            <li>• Active agents & Domain</li>
            <li>• Identity compliance</li>
            <li>• Drift warnings</li>
            <li>• Contract violations</li>
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <HeartPulse className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">P1.4: Kernel Health</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Kernel vitals and metrics.</p>
          <ul className="flex flex-col gap-1 text-[10px] font-mono text-gray-500 mt-2">
            <li>• Routing latency</li>
            <li>• Validation errors</li>
            <li>• Contract failures</li>
            <li>• Schema mismatches</li>
            <li>• Surface integration errors</li>
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Activity className="w-5 h-5 text-pink-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">P1.5: Surface Telemetry</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Multi-surface coherence map.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
            <div className="bg-black/40 p-2 rounded border border-gray-800 text-center"><span className="text-[10px] font-mono text-gray-500">Request Vol</span></div>
            <div className="bg-black/40 p-2 rounded border border-gray-800 text-center"><span className="text-[10px] font-mono text-gray-500">Error Rate</span></div>
            <div className="bg-black/40 p-2 rounded border border-gray-800 text-center"><span className="text-[10px] font-mono text-gray-500">Drift Risk</span></div>
            <div className="bg-black/40 p-2 rounded border border-gray-800 text-center"><span className="text-[10px] font-mono text-gray-500">Adapter Health</span></div>
            <div className="bg-black/40 p-2 rounded border border-gray-800 text-center"><span className="text-[10px] font-mono text-gray-500">Version Align</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
