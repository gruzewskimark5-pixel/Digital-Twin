import React, { memo } from 'react';
import { Satellite } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOCK_NODES = ['SAT-ALPHA-01', 'SAT-BETA-02', 'SAT-GAMMA-03'];

interface NodeSelectorProps {
  activeNode: string;
  setActiveNode: (node: string) => void;
}

// ⚡ Bolt Optimization: Wrap component in React.memo to prevent unnecessary re-renders
// during the 1-second simulation tick. Since `setActiveNode` is already stable, this
// stops the DOM tree and class string generation from reconciling every second.
export const NodeSelector = memo(function NodeSelector({ activeNode, setActiveNode }: NodeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      {MOCK_NODES.map(node => (
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
  );
});
