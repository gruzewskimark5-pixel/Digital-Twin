import React, { memo } from 'react';
import { Satellite } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NodeSelectorProps {
  nodes: string[];
  activeNode: string;
  onNodeSelect: (node: string) => void;
}

// ⚡ Bolt Optimization: Wrap NodeSelector in React.memo
// 💡 What: Extracted the MOCK_NODES inline map into a memoized component.
// 🎯 Why: In a fast-ticking simulation loop (1s ticks), inline map blocks execute string-parsing utilities like cn() on every render, even when the data (nodes list) hasn't changed.
// 📊 Impact: Prevents unnecessary reconciliation and execution of the cn() function for each node on every simulation tick, significantly reducing CPU cycles and avoiding main thread blocking.
export const NodeSelector = memo(function NodeSelector({ nodes, activeNode, onNodeSelect }: NodeSelectorProps) {
  return (
    <>
      {nodes.map(node => (
        <button
          key={node}
          onClick={() => onNodeSelect(node)}
          className={cn(
            "flex items-center justify-between p-3 rounded-lg border transition-all text-left font-mono text-sm",
            activeNode === node
              ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
              : "bg-black/40 border-gray-800 text-gray-400 hover:border-gray-600"
          )}
        >
          <div className="flex items-center gap-2">
            <Satellite className="w-4 h-4" />
            {node}
          </div>
          {activeNode === node && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
        </button>
      ))}
    </>
  );
});
