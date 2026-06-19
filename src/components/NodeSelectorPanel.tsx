import React, { memo } from 'react';
import { Satellite } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NodeSelectorPanelProps {
  nodes: string[];
  activeNode: string;
  setActiveNode: (node: string) => void;
}

export const NodeSelectorPanel = memo(function NodeSelectorPanel({ nodes, activeNode, setActiveNode }: NodeSelectorPanelProps) {
  return (
    <div className="glass-panel rounded-xl p-4 flex flex-col gap-4">
      <h2 className="text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2">Active Node</h2>
      <div className="flex flex-col gap-2">
        {nodes.map(node => (
          <button
            key={node}
            onClick={() => setActiveNode(node)}
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
      </div>
    </div>
  );
});
