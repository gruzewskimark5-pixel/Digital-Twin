import React from 'react';
import { Dna, LineChart, Target, Shield, BookOpen } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function YLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-rose-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Dna className="w-6 h-6 text-rose-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">Y-LAYER: THE ADAPTIVE DOCTRINE ENGINE</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          The layer that rewrites the system's doctrine — safely, coherently, and under operator control.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <LineChart className="w-5 h-5 text-rose-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">Y1: Doctrine Inputs</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li>• Telemetry</li>
            <li>• Operator behavior</li>
            <li>• User patterns</li>
            <li>• Stress test outcomes</li>
            <li>• Autonomic insights</li>
            <li>• Governance decisions</li>
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Target className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">Y2: Doctrine Outputs</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li><span className="text-amber-400 font-bold">Updated:</span> Heuristics</li>
            <li><span className="text-amber-400 font-bold">Updated:</span> Constraints</li>
            <li><span className="text-amber-400 font-bold">Updated:</span> Routing weights</li>
            <li><span className="text-amber-400 font-bold">Updated:</span> Risk envelopes</li>
            <li><span className="text-amber-400 font-bold">Updated:</span> Narrative patterns</li>
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">Y3: Doctrine Guarantees</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-emerald-400/80">
            <li>✓ Doctrine evolves, but identity does not.</li>
            <li>✓ Doctrine adapts, but invariants remain fixed.</li>
            <li>✓ Doctrine expands, but sovereignty stays intact.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
