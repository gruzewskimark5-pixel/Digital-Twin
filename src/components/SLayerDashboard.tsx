import React from 'react';
import { ShieldCheck, Fingerprint, Box, Route, Zap, Landmark, BrainCircuit } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function SLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-red-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-red-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">S-LAYER: THE INVARIANT REGISTRY</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          The 31 non-negotiable truths the system must uphold. The laws of physics for the intelligence engine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* S1 */}
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Fingerprint className="w-5 h-5 text-pink-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">S1: Identity (1-5)</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li><span className="text-pink-400 font-bold">1.</span> One intelligence, not many.</li>
            <li><span className="text-pink-400 font-bold">2.</span> All agents inherit same persona.</li>
            <li><span className="text-pink-400 font-bold">3.</span> No agent may invent new persona.</li>
            <li><span className="text-pink-400 font-bold">4.</span> Tone must remain operator-grade.</li>
            <li><span className="text-pink-400 font-bold">5.</span> Identity cannot drift across surfaces.</li>
          </ul>
        </div>

        {/* S2 */}
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Box className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">S2: Object Model (6-11)</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li><span className="text-blue-400 font-bold">6.</span> Canonical objects cannot change shape.</li>
            <li><span className="text-blue-400 font-bold">7.</span> No surface may introduce new types.</li>
            <li><span className="text-blue-400 font-bold">8.</span> Objects must have identity, intent, context, constraints, next_action.</li>
            <li><span className="text-blue-400 font-bold">9.</span> State transitions must be deterministic.</li>
            <li><span className="text-blue-400 font-bold">10.</span> No orphan objects may exist.</li>
            <li><span className="text-blue-400 font-bold">11.</span> All objects must be serializable.</li>
          </ul>
        </div>

        {/* S3 */}
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Route className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">S3: Routing (12-16)</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li><span className="text-emerald-400 font-bold">12.</span> All work must route through kernel.</li>
            <li><span className="text-emerald-400 font-bold">13.</span> No agent may call another directly.</li>
            <li><span className="text-emerald-400 font-bold">14.</span> Intent must be normalized before execution.</li>
            <li><span className="text-emerald-400 font-bold">15.</span> Surface → Agent → Kernel is only path.</li>
            <li><span className="text-emerald-400 font-bold">16.</span> Routing must be reversible/auditable.</li>
          </ul>
        </div>

        {/* S4 */}
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">S4: Execution (17-22)</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li><span className="text-amber-400 font-bold">17.</span> Every action must declare constraints.</li>
            <li><span className="text-amber-400 font-bold">18.</span> Every action must compute next_action.</li>
            <li><span className="text-amber-400 font-bold">19.</span> No action may mutate identity.</li>
            <li><span className="text-amber-400 font-bold">20.</span> Execution must be side-effect free.</li>
            <li><span className="text-amber-400 font-bold">21.</span> All errors must be surfaced.</li>
            <li><span className="text-amber-400 font-bold">22.</span> Execution must be monotonic.</li>
          </ul>
        </div>

        {/* S5 */}
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Landmark className="w-5 h-5 text-purple-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">S5: Governance (23-27)</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li><span className="text-purple-400 font-bold">23.</span> Only operator approves evolution.</li>
            <li><span className="text-purple-400 font-bold">24.</span> All overrides must be logged.</li>
            <li><span className="text-purple-400 font-bold">25.</span> Kernel versions pinned/compatible.</li>
            <li><span className="text-purple-400 font-bold">26.</span> No agent may modify invariants.</li>
            <li><span className="text-purple-400 font-bold">27.</span> Evolution must pass simulation.</li>
          </ul>
        </div>

        {/* S6 */}
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <BrainCircuit className="w-5 h-5 text-orange-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">S6: Autonomic (28-31)</h2>
          </div>
          <ul className="flex flex-col gap-2 text-[10px] font-mono text-gray-400">
            <li><span className="text-orange-400 font-bold">28.</span> Proposals cannot enforce themselves.</li>
            <li><span className="text-orange-400 font-bold">29.</span> Insights cannot mutate state directly.</li>
            <li><span className="text-orange-400 font-bold">30.</span> Optimization must remain bounded.</li>
            <li><span className="text-orange-400 font-bold">31.</span> Behavior never violates identity.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
