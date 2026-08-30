import React, { memo } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TabType = 'TWIN' | 'H_LAYER' | 'I_LAYER' | 'J_LAYER' | 'K_LAYER' | 'L_LAYER' | 'M_LAYER' | 'N_LAYER' | 'O_LAYER' | 'P_LAYER' | 'Q_LAYER' | 'R_LAYER' | 'S_LAYER' | 'T_LAYER' | 'U_LAYER' | 'V_LAYER' | 'W_LAYER' | 'X_LAYER' | 'Y_LAYER' | 'Z_LAYER';

const TABS: { id: TabType; label: string }[] = [
  { id: 'TWIN', label: 'TWIN' },
  { id: 'H_LAYER', label: 'H-LAYER' },
  { id: 'I_LAYER', label: 'I-LAYER' },
  { id: 'J_LAYER', label: 'J-LAYER' },
  { id: 'K_LAYER', label: 'K-LAYER' },
  { id: 'L_LAYER', label: 'L-LAYER' },
  { id: 'M_LAYER', label: 'M-LAYER' },
  { id: 'N_LAYER', label: 'N-LAYER' },
  { id: 'O_LAYER', label: 'O-LAYER' },
  { id: 'P_LAYER', label: 'P-LAYER' },
  { id: 'Q_LAYER', label: 'Q-LAYER' },
  { id: 'R_LAYER', label: 'R-LAYER' },
  { id: 'S_LAYER', label: 'S-LAYER' },
  { id: 'T_LAYER', label: 'T-LAYER' },
  { id: 'U_LAYER', label: 'U-LAYER' },
  { id: 'V_LAYER', label: 'V-LAYER' },
  { id: 'W_LAYER', label: 'W-LAYER' },
  { id: 'X_LAYER', label: 'X-LAYER' },
  { id: 'Y_LAYER', label: 'Y-LAYER' },
  { id: 'Z_LAYER', label: 'Z-LAYER' }
];

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

// ⚡ Bolt Optimization: Memoize individual tab items to prevent evaluating `cn(...)`/`twMerge`
// for all ~20 tabs on every single render (every 1s tick in the parent `App`).
const TabItem = memo(({ tab, isActive, onClick }: { tab: { id: TabType; label: string }, isActive: boolean, onClick: (tabId: TabType) => void }) => (
  <button
    onClick={() => onClick(tab.id)}
    className={cn(
      "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
      isActive ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
    )}
  >
    {tab.label}
  </button>
));

export const TabNavigation = memo(function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex items-center gap-2 bg-black/40 p-1 rounded-lg border border-gray-800 overflow-x-auto max-w-full">
      {TABS.map(tab => (
        <TabItem
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={onTabChange}
        />
      ))}
    </div>
  );
});
