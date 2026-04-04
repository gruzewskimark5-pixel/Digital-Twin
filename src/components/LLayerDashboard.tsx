import React from 'react';
import { Blocks, Terminal, Box, Cpu } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function LLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-blue-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Blocks className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">L-LAYER: THE AGENT SDK</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          The official interface every agent must use to prevent schema, routing, and identity drift.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Terminal className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">L2: Agent Base Class</h2>
          </div>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-xs text-blue-400 overflow-x-auto">
{`export class Agent {
  constructor(kernel, domain) {
    this.kernel = kernel;
    this.domain = domain;
    this.identity = "kernel-compliant";
  }

  async act(intent, context) {
    return this.kernel.route(
      intent, this.domain, this, context
    );
  }
}`}
          </pre>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Box className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">L3: Agent Client</h2>
          </div>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-xs text-emerald-400 overflow-x-auto">
{`export class AgentClient {
  constructor(kernel) {
    this.kernel = kernel;
  }

  createAgent(domain) {
    return new Agent(this.kernel, domain);
  }
}`}
          </pre>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Cpu className="w-5 h-5 text-purple-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">L4-L6: Agent Implementations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/40 p-4 rounded-lg border border-gray-800">
              <h3 className="text-xs font-bold text-purple-400 mb-2">JulesAgent</h3>
              <pre className="font-mono text-[10px] text-gray-400">
{`class JulesAgent extends Agent {
  constructor(kernel) {
    super(kernel, "distribution");
  }
}`}
              </pre>
            </div>
            <div className="bg-black/40 p-4 rounded-lg border border-gray-800">
              <h3 className="text-xs font-bold text-pink-400 mb-2">ZexzAgent</h3>
              <pre className="font-mono text-[10px] text-gray-400">
{`class ZexzAgent extends Agent {
  constructor(kernel) {
    super(kernel, "product");
  }
}`}
              </pre>
            </div>
            <div className="bg-black/40 p-4 rounded-lg border border-gray-800">
              <h3 className="text-xs font-bold text-amber-400 mb-2">AIStudioAgent</h3>
              <pre className="font-mono text-[10px] text-gray-400">
{`class AIStudioAgent extends Agent {
  constructor(kernel) {
    super(kernel, "architecture");
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
