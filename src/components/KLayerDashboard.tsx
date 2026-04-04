import React from 'react';
import { Code2, FolderTree, FileCode2, ShieldCheck } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function KLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-emerald-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Code2 className="w-6 h-6 text-emerald-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">K-LAYER: KERNEL CODE SKELETON</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          Implementation-ready TypeScript scaffolding for Kernel v1.0. Enforces identity, routing, and state.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <FolderTree className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">K1: Directory Structure</h2>
          </div>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-xs text-gray-400 overflow-x-auto">
{`/kernel
  /identity
    identity.ts
    tone.ts
    reasoning.ts
  /objects
    user.ts
    session.ts
    job.ts
  /state
    stateMachine.ts
    transitions.ts
  /routing
    router.ts
  /contracts
    identityContract.ts
  /middleware
    validateIntent.ts
  kernel.ts`}
          </pre>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <FileCode2 className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">K2: Kernel Entry Point</h2>
          </div>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-xs text-blue-400 overflow-x-auto">
{`export class Kernel {
  route(intent, surface, agent, context) {
    this.contracts.identity.validate(agent);
    this.contracts.routing.validate(intent);
    
    const nextState = this.stateMachine
      .transition(context, intent);

    return {
      state: nextState,
      next_action: this.stateMachine
        .nextAction(nextState),
    };
  }
}`}
          </pre>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Network className="w-5 h-5 text-purple-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">K3: State Machine</h2>
          </div>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-xs text-purple-400 overflow-x-auto">
{`export const StateMachine = {
  transition(context, intent) {
    return {
      identity: context.identity,
      intent,
      context,
      constraints: this.compute(context),
    };
  },
  nextAction(state) {
    return this.lookup(state.intent);
  }
};`}
          </pre>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">K4: Contracts</h2>
          </div>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-xs text-amber-400 overflow-x-auto">
{`export const IdentityContract = {
  validate(agent) {
    if (agent.identity !== "kernel-compliant") {
      throw new Error("Identity violation");
    }
  }
};`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function Network(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
}
