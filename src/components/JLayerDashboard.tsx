import React from 'react';
import { Palette, Layers, BookA, MousePointerClick, MessageSquareText } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function JLayerDashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="glass-panel rounded-xl p-6 border-l-4 border-l-pink-500/50 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Palette className="w-6 h-6 text-pink-400" />
          <h1 className="text-xl font-bold tracking-widest text-white">J-LAYER: UNIFIED UX LANGUAGE</h1>
        </div>
        <p className="text-sm font-mono text-gray-400">
          Expressing the kernel visually, verbally, and structurally. The personality of the system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <MessageSquareText className="w-5 h-5 text-pink-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">J1: UX Tone Spine</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Operator-grade clarity, zero fluff, zero drift, directness, precision, momentum, confidence, action orientation.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Layers className="w-5 h-5 text-blue-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">J2: UX Structural Spine</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Same progression logic, state transitions, feedback loops, narrative arc, and identity markers across all surfaces.</p>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <BookA className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">J3: UX Vocabulary Spine</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] font-mono">
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800">kernel</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800">surface</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800">agent</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800">session</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800">job</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800">region</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800">state</span>
            <span className="bg-black/40 px-2 py-1 rounded border border-gray-800">next action</span>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <MousePointerClick className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">J4: UX Interaction Spine</h2>
          </div>
          <div className="bg-black/40 p-4 rounded-lg border border-gray-800 text-xs font-mono text-center text-amber-400">
            User intent → System interpretation → Kernel validation → Action → Next step
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <MessageSquareText className="w-5 h-5 text-purple-500" />
            <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">J5: UX Narrative Spine</h2>
          </div>
          <p className="text-xs font-mono text-gray-400">Always communicate: where the user is, what the system understands, constraints, next action, and why it matters.</p>
        </div>
      </div>
    </div>
  );
}
