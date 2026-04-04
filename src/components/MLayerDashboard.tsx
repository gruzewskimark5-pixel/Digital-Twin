import React from 'react';
import { Puzzle, Link, Box, Network } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function MLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-indigo-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Puzzle className="w-6 h-6 text-indigo-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">M-LAYER: SURFACE INTEGRATION KIT</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          How zexz, Jules, and AI Studio plug into the kernel without drift. The glue layer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Link className="w-5 h-5 text-indigo-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">M1: Surface Adapters</h2>
          </div>
          <p className="text-xs font-mono text-gray-400 mb-2">Thin adapters that normalize input/output and enforce the object model.</p>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-xs text-indigo-400 overflow-x-auto">
{`export const ZexzAdapter = {
  toKernel(intent, userState) {
    return {
      intent,
      surface: "product",
      context: userState,
    };
  },
  fromKernel(kernelOutput) {
    return {
      next: kernelOutput.next_action,
      state: kernelOutput.state,
    };
  }
};`}
          </pre>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Box className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">M2: Surface Contracts</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Each surface must declare:</p>
          <ul className="flex flex-col gap-2 text-xs font-mono text-gray-500">
            <li>• domain (product, distribution, architecture)</li>
            <li>• allowed intents</li>
            <li>• allowed state transitions</li>
            <li>• allowed object types</li>
          </ul>
          <div className="mt-auto pt-3 border-t border-gray-800 text-[10px] text-emerald-400">
            Prevents surfaces from inventing new flows.
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Network className="w-5 h-5 text-purple-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">M3: Surface Bootstrapping</h2>
          </div>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-xs text-purple-400 overflow-x-auto">
{`const kernel = new Kernel(config);
const agentClient = new AgentClient(kernel);
const agent = agentClient.createAgent("product"); // or distribution / architecture`}
          </pre>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="bg-black/40 p-3 rounded border border-gray-800 text-center">
              <span className="text-[10px] font-mono text-gray-400">Shared Kernel Instance</span>
            </div>
            <div className="bg-black/40 p-3 rounded border border-gray-800 text-center">
              <span className="text-[10px] font-mono text-gray-400">Inherited Identity</span>
            </div>
            <div className="bg-black/40 p-3 rounded border border-gray-800 text-center">
              <span className="text-[10px] font-mono text-gray-400">Centralized Routing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
