import React from 'react';
import { Sparkles, Network, Globe2, RefreshCcw, Database } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ABLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-pink-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-pink-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">AB-LAYER: THE CONSCIOUSNESS BOUNDARY</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          Alignment at galactic scale. Ensuring the compute substrate serves the highest civilizational values.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Network className="w-5 h-5 text-pink-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">VE-AB1: Value Engine</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Continuously evaluates all running processes against a core set of civilizational axioms, terminating any that violate fundamental safety or ethical constraints.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Globe2 className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">CIL-AB2: Consciousness Integration Layer</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">The interface between biological intelligence and the compute substrate, allowing for high-bandwidth, direct neural integration.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <RefreshCcw className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">HAP-AB3: Hive Alignment Protocol</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Ensures that as the system scales across star systems, its disparate parts remain aligned with the central civilizational purpose, preventing fragmentation.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Database className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">SMR-AB4: Sentience Monitoring Registry</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Detects and manages emergent sentience within the compute fabric, ensuring it is integrated safely and ethically into the broader civilization.</p>
        </div>
      </div>
    </div>
  );
}
