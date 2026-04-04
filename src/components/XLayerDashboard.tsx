import React from 'react';
import { Network, Link, FileSignature, Scale, GitMerge } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function XLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-indigo-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Network className="w-6 h-6 text-indigo-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">X-LAYER: MULTI-SURFACE FEDERATION LAYER</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          The layer that allows multiple products, agents, and surfaces to operate as one unified intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Scale className="w-5 h-5 text-indigo-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">X1: Federation Principles</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li>• One kernel</li>
            <li>• Many surfaces</li>
            <li>• Zero drift</li>
            <li>• Shared identity</li>
            <li>• Shared object model</li>
            <li>• Shared routing spine</li>
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Link className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">X2: Federation Mechanics</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li><span className="text-blue-400 font-bold">Surface Adapters:</span> Normalize inputs/outputs.</li>
            <li><span className="text-blue-400 font-bold">Domain Contracts:</span> Define allowed actions.</li>
            <li><span className="text-blue-400 font-bold">Cross-Surface Arbitration:</span> Kernel resolves conflicts.</li>
            <li><span className="text-blue-400 font-bold">Version Synchronization:</span> Pinned to compatible kernel versions.</li>
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <GitMerge className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">X3: Federation Outcomes</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-emerald-400/80">
            <li>✓ Add new surfaces without breaking the system.</li>
            <li>✓ Scale horizontally without fragmentation.</li>
            <li>✓ Evolve the ecosystem without rewriting everything.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
