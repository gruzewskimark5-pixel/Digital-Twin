import React from 'react';
import { Sparkles, Network, Globe2, RefreshCcw, Database } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ACLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-cyan-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">AC-LAYER: THE TEMPORAL COMPUTE LAYER</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          Time-shifted computation across epochs. Leveraging relativity and deep time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Network className="w-5 h-5 text-cyan-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">TSC-AC1: Time-Shifted Compute</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Scheduling jobs not just across space, but across time, utilizing nodes in high-gravity wells for relativistic speedups.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Globe2 className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">EAS-AC2: Epochal Archival System</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Storing data in stable, long-term mediums (e.g., encoded in the orbits of stable asteroids) designed to last for millions of years.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <RefreshCcw className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">PCE-AC3: Predictive Causality Engine</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Simulating future states of the galaxy with such high fidelity that it effectively acts as a limited form of precognition for civilizational planning.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Database className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">RSP-AC4: Retro-Causal Synchronization Protocol</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Theoretical framework for utilizing quantum entanglement to synchronize state across vast distances instantaneously, bypassing the speed of light.</p>
        </div>
      </div>
    </div>
  );
}
