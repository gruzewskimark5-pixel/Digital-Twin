import React from 'react';
import { Crown, Compass, Scale, Clock } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ULayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-yellow-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Crown className="w-6 h-6 text-yellow-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">U-LAYER: THE ZENITH LAYER</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          The highest-level governance logic. The sovereignty layer and constitutional apex.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Compass className="w-5 h-5 text-yellow-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">U1: Sovereign Intent</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">The operator defines:</p>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-500 mt-2">
            <li>• Purpose</li>
            <li>• Boundaries</li>
            <li>• Values</li>
            <li>• Risk tolerance</li>
            <li>• Evolution direction</li>
          </ul>
          <div className="mt-auto pt-3 border-t border-gray-800 text-[10px] text-yellow-400">
            The north star for all autonomic behavior.
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Scale className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">U2: Constitutional Enforcement</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">The Zenith Layer enforces:</p>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-500 mt-2">
            <li>• Invariants</li>
            <li>• Governance rules</li>
            <li>• Evolution protocols</li>
            <li>• Override logic</li>
            <li>• Safety envelopes</li>
          </ul>
          <div className="mt-auto pt-3 border-t border-gray-800 text-[10px] text-blue-400">
            The supreme court of the system.
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Clock className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">U3: Epochal Synchronization</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">The system periodically:</p>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-500 mt-2">
            <li>• Snapshots state</li>
            <li>• Reconciles drift</li>
            <li>• Revalidates invariants</li>
            <li>• Replays stress tests</li>
            <li>• Recalibrates autonomic weights</li>
          </ul>
          <div className="mt-auto pt-3 border-t border-gray-800 text-[10px] text-emerald-400">
            Reset mechanism preventing long-term entropy.
          </div>
        </div>
      </div>
    </div>
  );
}
