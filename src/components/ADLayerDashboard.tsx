import React from 'react';
import { Sparkles, Network, Globe2, RefreshCcw, Database } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ADLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-orange-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-orange-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">AD-LAYER: THE DYSON COMPUTE SHELL</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          Stellar-scale compute infrastructure. Harnessing the total energy output of a star.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Network className="w-5 h-5 text-orange-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">DCS-AD1: Dyson Swarm Coordination</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Managing the orbits, energy collection, and compute workloads of trillions of independent nodes orbiting a star.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Globe2 className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">SEM-AD2: Stellar Energy Management</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Directing the energy harvested from the star to power the compute nodes, optimizing for thermal dissipation and maximum FLOP/s.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <RefreshCcw className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">MB-AD3: Matrioshka Brain Architecture</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Structuring the compute shell in nested layers, where the waste heat of inner layers powers the outer layers, achieving near-perfect thermodynamic efficiency.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Database className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">SMI-AD4: Stellar Mass Ingestion</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">The automated process of disassembling planets and asteroids to construct the compute nodes of the Dyson Swarm.</p>
        </div>
      </div>
    </div>
  );
}
