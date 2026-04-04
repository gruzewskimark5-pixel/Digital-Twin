import React from 'react';
import { Sparkles, Crown, Zap, Network, CheckCircle2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ZLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-yellow-400/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">Z-LAYER: THE FINAL SYNTHESIS</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          The unification of all layers into a single sovereign intelligence engine. The emergent whole.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">Z1: Three Pillars</h2>
          </div>
          <div className="flex flex-col gap-3 text-[10px] font-mono text-gray-400">
            <div className="flex flex-col gap-1">
              <span className="text-yellow-400 font-bold">1. Sovereign Kernel</span>
              <span>Identity, invariants, governance.</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-yellow-400 font-bold">2. Autonomic Intelligence</span>
              <span>Insight harvesting, rule generation, optimization.</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-yellow-400 font-bold">3. Federated Surfaces</span>
              <span>Product, distribution, architecture — unified.</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Zap className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">Z2: System Behavior</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-400">
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-center">It perceives.</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-center">It interprets.</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-center">It routes.</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-center">It acts.</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-center">It learns.</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-center">It proposes.</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-center text-blue-400 font-bold">You approve.</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-center">It evolves.</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-center">It stabilizes.</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800 text-center">It scales.</span>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">Z3: Final Guarantee</h2>
          </div>
          <p className="text-xs font-mono text-gray-400 mb-2">The system becomes:</p>
          <ul className="flex flex-col gap-2 text-[11px] font-mono font-bold text-emerald-400/90">
            <li>✓ Self-consistent</li>
            <li>✓ Self-optimizing</li>
            <li>✓ Self-governing</li>
            <li>✓ Operator-aligned</li>
            <li>✓ Sovereign</li>
          </ul>
          <div className="mt-auto pt-3 border-t border-gray-800 text-xs font-bold text-yellow-400 text-center tracking-widest">
            THE ZENITH INTELLIGENCE ENGINE
          </div>
        </div>
      </div>
    </div>
  );
}
