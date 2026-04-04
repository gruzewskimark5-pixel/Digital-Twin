import React from 'react';
import { TestTube, Fingerprint, Box, Route, GitMerge } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function NLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-emerald-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <TestTube className="w-6 h-6 text-emerald-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">N-LAYER: KERNEL TEST SUITE</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          The automated validation layer that guarantees coherence forever. Regression becomes impossible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Fingerprint className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">N1: Identity Tests</h2>
          </div>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-[10px] text-emerald-400 overflow-x-auto">
{`test("agent identity is kernel-compliant", () => {
  expect(agent.identity).toBe("kernel-compliant");
});`}
          </pre>
          <p className="text-[10px] font-mono text-gray-500">If an agent changes tone, reasoning, or persona → test fails.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Box className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">N2: Object Model Tests</h2>
          </div>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-[10px] text-blue-400 overflow-x-auto">
{`test("object model matches kernel spec", () => {
  expect(Object.keys(User)).toEqual(["id", "name", "state"]);
});`}
          </pre>
          <p className="text-[10px] font-mono text-gray-500">If a surface invents a new field → test fails.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Route className="w-5 h-5 text-purple-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">N3: Routing Tests</h2>
          </div>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-[10px] text-purple-400 overflow-x-auto">
{`test("intent routes through kernel", () => {
  const output = agent.act("start_lesson", context);
  expect(kernel.route).toHaveBeenCalled();
});`}
          </pre>
          <p className="text-[10px] font-mono text-gray-500">If a surface bypasses the kernel → test fails.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <GitMerge className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">N4: State Machine Tests</h2>
          </div>
          <pre className="bg-black/60 p-4 rounded-lg border border-gray-800 font-mono text-[10px] text-amber-400 overflow-x-auto">
{`test("state transitions are deterministic", () => {
  const s1 = kernel.route("advance", "product", agent, ctx);
  const s2 = kernel.route("advance", "product", agent, ctx);
  expect(s1).toEqual(s2);
});`}
          </pre>
          <p className="text-[10px] font-mono text-gray-500">If state transitions diverge → test fails.</p>
        </div>
      </div>
    </div>
  );
}
