import React from 'react';
import { Code2, ShieldCheck, Network, TerminalSquare } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function HLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-blue-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <TerminalSquare className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">H-LAYER: KERNEL IMPLEMENTATION PLAN</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          Turning Kernel v1.0 into a working, enforceable software layer. The governance engine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Code2 className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">H1: Kernel Core</h2>
          </div>
          <p className="text-xs font-mono text-gray-400 mb-2">The minimal viable kernel enforcing coherence.</p>
          <ul className="flex flex-col gap-2 text-xs font-mono text-gray-500">
            <li>• identity.ts</li>
            <li>• objectModel.ts</li>
            <li>• stateMachine.ts</li>
            <li>• router.ts</li>
            <li>• contracts.ts</li>
          </ul>
          <div className="mt-auto pt-3 border-t border-gray-800 text-[10px] text-emerald-400">
            Guarantee: No agent bypasses the kernel.
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">H2: Kernel Middleware</h2>
          </div>
          <p className="text-xs font-mono text-gray-400 mb-2">The traffic controller and enforcement layer.</p>
          <ul className="flex flex-col gap-2 text-xs font-mono text-gray-500">
            <li>• validateIntent()</li>
            <li>• validateObjectModel()</li>
            <li>• validateStateTransition()</li>
            <li>• validateConstraints()</li>
            <li>• validateOutput()</li>
          </ul>
          <div className="mt-auto pt-3 border-t border-gray-800 text-[10px] text-red-400">
            Outcome: Reject drift & schema divergence.
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Network className="w-5 h-5 text-purple-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">H3: Integration Layer</h2>
          </div>
          <p className="text-xs font-mono text-gray-400 mb-2">The single source of truth for all surfaces.</p>
          <ul className="flex flex-col gap-2 text-xs font-mono text-gray-500">
            <li>• zexz → kernel</li>
            <li>• Jules → kernel</li>
            <li>• AI Studio → kernel</li>
            <li>• all agents → kernel</li>
          </ul>
          <div className="mt-auto pt-3 border-t border-gray-800 text-[10px] text-indigo-400">
            Contract: All surfaces call kernel.route().
          </div>
        </div>
      </div>
    </div>
  );
}
