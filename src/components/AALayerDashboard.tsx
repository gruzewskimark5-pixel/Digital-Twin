import React from 'react';
import { Sparkles, Network, Globe2, RefreshCcw, Database } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AALayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-fuchsia-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-fuchsia-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">AA-LAYER: THE META-LAYER</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          The layer that governs all other layers. The ultimate abstraction of civilizational compute.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Network className="w-5 h-5 text-fuchsia-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">OOS-AA1: Omni-OS</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">The operating system that runs the entire constellation, treating every node, region, and planet as a single unified machine.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Globe2 className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">UAI-AA2: Universal API</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">A single API endpoint to submit a job that could be executed in LEO, on the Moon, or in deep space, seamlessly routed by the Meta-Layer.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <RefreshCcw className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">MCE-AA3: Meta-Cognitive Engine</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">The system's awareness of its own state, goals, and evolution. It directs the Y-Layer (Autonomous Evolution) based on long-term civilizational objectives.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Database className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">TDB-AA4: Transcendent Database</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">A distributed, holographic data store that exists across all nodes simultaneously, ensuring zero data loss even if entire planetary regions fail.</p>
        </div>
      </div>
    </div>
  );
}
