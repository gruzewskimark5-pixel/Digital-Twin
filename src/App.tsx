import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine } from 'recharts';
import { Satellite, Globe, Activity, Radio, Clock, Zap, Sun, Moon, ThermometerSun, Database, Play, CheckCircle2, Save, ListTodo, Plus, AlertTriangle, ShieldAlert, Terminal, CheckSquare } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
const MLayerDashboard = lazy(() => import('./components/MLayerDashboard').then(m => ({ default: m.MLayerDashboard })));
const NLayerDashboard = lazy(() => import('./components/NLayerDashboard').then(m => ({ default: m.NLayerDashboard })));
const OLayerDashboard = lazy(() => import('./components/OLayerDashboard').then(m => ({ default: m.OLayerDashboard })));
const PLayerDashboard = lazy(() => import('./components/PLayerDashboard').then(m => ({ default: m.PLayerDashboard })));
const QLayerDashboard = lazy(() => import('./components/QLayerDashboard').then(m => ({ default: m.QLayerDashboard })));
const RLayerDashboard = lazy(() => import('./components/RLayerDashboard').then(m => ({ default: m.RLayerDashboard })));
const SLayerDashboard = lazy(() => import('./components/SLayerDashboard').then(m => ({ default: m.SLayerDashboard })));
const TLayerDashboard = lazy(() => import('./components/TLayerDashboard').then(m => ({ default: m.TLayerDashboard })));
const ULayerDashboard = lazy(() => import('./components/ULayerDashboard').then(m => ({ default: m.ULayerDashboard })));
const VLayerDashboard = lazy(() => import('./components/VLayerDashboard').then(m => ({ default: m.VLayerDashboard })));
const WLayerDashboard = lazy(() => import('./components/WLayerDashboard').then(m => ({ default: m.WLayerDashboard })));
const XLayerDashboard = lazy(() => import('./components/XLayerDashboard').then(m => ({ default: m.XLayerDashboard })));
const YLayerDashboard = lazy(() => import('./components/YLayerDashboard').then(m => ({ default: m.YLayerDashboard })));
const ZLayerDashboard = lazy(() => import('./components/ZLayerDashboard').then(m => ({ default: m.ZLayerDashboard })));
const AALayerDashboard = lazy(() => import('./components/AALayerDashboard').then(m => ({ default: m.AALayerDashboard })));
const ABLayerDashboard = lazy(() => import('./components/ABLayerDashboard').then(m => ({ default: m.ABLayerDashboard })));
const ACLayerDashboard = lazy(() => import('./components/ACLayerDashboard').then(m => ({ default: m.ACLayerDashboard })));
const ADLayerDashboard = lazy(() => import('./components/ADLayerDashboard').then(m => ({ default: m.ADLayerDashboard })));
const HLayerDashboard = lazy(() => import('./components/HLayerDashboard').then(m => ({ default: m.HLayerDashboard })));
const ILayerDashboard = lazy(() => import('./components/ILayerDashboard').then(m => ({ default: m.ILayerDashboard })));
const JLayerDashboard = lazy(() => import('./components/JLayerDashboard').then(m => ({ default: m.JLayerDashboard })));
const KLayerDashboard = lazy(() => import('./components/KLayerDashboard').then(m => ({ default: m.KLayerDashboard })));
const LLayerDashboard = lazy(() => import('./components/LLayerDashboard').then(m => ({ default: m.LLayerDashboard })));

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- MOCK DATA GENERATORS ---
const generateTimeSeriesData = (startVal: number, volatility: number, trend: number, count: number) => {
  let current = startVal;
  return Array.from({ length: count }).map((_, i) => {
    current += (Math.random() - 0.5) * volatility + trend;
    return { time: `T+${i}m`, value: Number(current.toFixed(2)) };
  });
};

const MOCK_NODES = ['SAT-ALPHA-01', 'SAT-BETA-02', 'SAT-GAMMA-03'];

type JobStatus = 'QUEUED' | 'RUNNING' | 'CHECKPOINTED' | 'COMPLETED' | 'FAILED';
interface Job {
  id: string;
  task: string;
  status: JobStatus;
  node: string | null;
  progress: number;
  energyReq: number;
}

type AnomalySeverity = 'CRITICAL' | 'WARNING' | 'RESOLVED';
interface Anomaly {
  id: string;
  type: string;
  node: string;
  severity: AnomalySeverity;
  timestamp: string;
  playbook: string;
}

const INITIAL_JOBS: Job[] = [
  { id: 'JOB-9942', task: 'SAR_IMAGE_PROC', status: 'RUNNING', node: 'SAT-ALPHA-01', progress: 45, energyReq: 120 },
  { id: 'JOB-9943', task: 'OPTICAL_DOWNLINK', status: 'QUEUED', node: null, progress: 0, energyReq: 85 },
];

const INITIAL_ANOMALIES: Anomaly[] = [
  { id: 'ERR-089', type: 'THERMAL_SPIKE', node: 'SAT-GAMMA-03', severity: 'WARNING', timestamp: new Date().toISOString(), playbook: 'PB-THRM-01' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'TWIN' | 'H_LAYER' | 'I_LAYER' | 'J_LAYER' | 'K_LAYER' | 'L_LAYER' | 'M_LAYER' | 'N_LAYER' | 'O_LAYER' | 'P_LAYER' | 'Q_LAYER' | 'R_LAYER' | 'S_LAYER' | 'T_LAYER' | 'U_LAYER' | 'V_LAYER' | 'W_LAYER' | 'X_LAYER' | 'Y_LAYER' | 'Z_LAYER'>('Z_LAYER');
  const [activeNode, setActiveNode] = useState(MOCK_NODES[0]);
  // ⚡ Bolt Optimization: Use lazy initialization for Date and expensive time series generation
  // Prevents running `new Date()` and `generateTimeSeriesData` (which loops 60 times) on every single render/tick
  const [timestamp, setTimestamp] = useState(() => new Date());
  const [isEclipse, setIsEclipse] = useState(false);
  
  // Simulated TwinState
  // ⚡ Bolt: Use lazy initialization to prevent executing generateTimeSeriesData on every render tick
  const [powerData, setPowerData] = useState(() => generateTimeSeriesData(85, 0.5, -0.1, 60));
  const [thermalData, setThermalData] = useState(() => generateTimeSeriesData(45, 1.2, 0.05, 60));
  const [telemetryLog, setTelemetryLog] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [anomalies, setAnomalies] = useState<Anomaly[]>(INITIAL_ANOMALIES);

  // ⚡ Bolt Optimization: Use useInterval pattern to prevent GC churn and timer drift
  // The simulation tick is now a ref that doesn't trigger effect re-runs on state change
  const savedCallback = useRef<(() => void) | null>(null);

  // ⚡ Bolt Optimization: Use refs to hold latest state for interval
  // This prevents tearing down and recreating the interval every second,
  // avoiding timer drift and reducing React hook overhead.
  const stateRef = useRef({
    activeNode,
    isEclipse,
    latestPowerValue: powerData[powerData.length - 1].value,
    latestThermalValue: thermalData[thermalData.length - 1].value
  });

  // Keep refs synced with current state
  useEffect(() => {
    stateRef.current.activeNode = activeNode;
    stateRef.current.isEclipse = isEclipse;
    stateRef.current.latestPowerValue = powerData[powerData.length - 1].value;
    stateRef.current.latestThermalValue = thermalData[thermalData.length - 1].value;
  }, [activeNode, isEclipse, powerData, thermalData]);

  // Simulation Tick
  useEffect(() => {
    savedCallback.current = () => {
      const now = new Date();
      setTimestamp(now);
      
      // Simulate eclipse toggle every 30 seconds for demo purposes
      const seconds = now.getSeconds();
      const inEclipse = seconds > 30;
      setIsEclipse(inEclipse);

      // We use the locally calculated inEclipse for this tick,
      // but for any other state dependencies we use the ref.

      // Update Power Data
      setPowerData(prev => {
        const lastVal = prev[prev.length - 1].value;
        const trend = inEclipse ? -0.8 : 0.5; // Discharge in eclipse, charge in sun
        const newVal = Math.min(100, Math.max(0, lastVal + (Math.random() - 0.5) * 0.2 + trend));
        return [...prev.slice(1), { time: `T+60m`, value: Number(newVal.toFixed(2)) }];
      });

      // Update Thermal Data
      setThermalData(prev => {
        const lastVal = prev[prev.length - 1].value;
        const trend = inEclipse ? -0.5 : 0.8; // Cool in eclipse, heat in sun
        const newVal = Math.min(85, Math.max(-20, lastVal + (Math.random() - 0.5) * 0.5 + trend));
        return [...prev.slice(1), { time: `T+60m`, value: Number(newVal.toFixed(2)) }];
      });

      // Add Telemetry Log using Ref to access latest values
      const pwrStr = stateRef.current.latestPowerValue.toFixed(1);
      const tmpStr = stateRef.current.latestThermalValue.toFixed(1);
      const logMsg = `[${now.toISOString().split('T')[1].slice(0, 8)}] ${stateRef.current.activeNode} | Pwr: ${pwrStr}% | Tmp: ${tmpStr}°C | Sun: ${!inEclipse}`;
      setTelemetryLog(prev => [logMsg, ...prev].slice(0, 8));

      // Process Jobs
      setJobs(prevJobs => prevJobs.map(job => {
        if (job.status === 'COMPLETED' || job.status === 'FAILED') return job;
        
        let newProgress = job.progress;
        let newStatus = job.status;
        let newNode = job.node;

        if (job.status === 'QUEUED') {
          if (Math.random() > 0.7) {
            newStatus = 'RUNNING';
            newNode = MOCK_NODES[Math.floor(Math.random() * MOCK_NODES.length)];
          }
        } else if (job.status === 'RUNNING' || job.status === 'CHECKPOINTED') {
          newProgress += Math.random() * 4;
          if (newProgress >= 100) {
            newProgress = 100;
            newStatus = 'COMPLETED';
          } else if (newProgress > 0 && Math.floor(newProgress) % 30 < 4 && job.status === 'RUNNING') {
            newStatus = 'CHECKPOINTED';
          } else if (job.status === 'CHECKPOINTED' && Math.random() > 0.4) {
            newStatus = 'RUNNING';
          }
        }

        return { ...job, progress: newProgress, status: newStatus, node: newNode };
      }));
    };
  }, [activeNode, isEclipse, powerData, thermalData]);

  // Simulation Tick
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    const interval = setInterval(tick, 1000); // 1s tick for demo speed
    return () => clearInterval(interval);
  }, []); // ⚡ Bolt Optimization: Empty dependency array means interval is created exactly once

  const injectJob = () => {
    const tasks = ['SAR_IMAGE_PROC', 'OPTICAL_DOWNLINK', 'NAV_DATA_SYNC', 'FIRMWARE_PATCH'];
    const newJob: Job = {
      id: `JOB-${Math.floor(Math.random() * 10000)}`,
      task: tasks[Math.floor(Math.random() * tasks.length)],
      status: 'QUEUED',
      node: null,
      progress: 0,
      energyReq: Math.floor(Math.random() * 100) + 20
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const injectAnomaly = () => {
    const types = ['POWER_DRAIN_ANOMALY', 'ATTITUDE_LOSS', 'OBC_RADIATION_UPSET'];
    const playbooks = ['PB-PWR-02', 'PB-ATT-01', 'PB-RAD-03'];
    const idx = Math.floor(Math.random() * types.length);
    const newAnomaly: Anomaly = {
      id: `ERR-${Math.floor(Math.random() * 1000)}`,
      type: types[idx],
      node: MOCK_NODES[Math.floor(Math.random() * MOCK_NODES.length)],
      severity: 'CRITICAL',
      timestamp: new Date().toISOString(),
      playbook: playbooks[idx]
    };
    setAnomalies(prev => [newAnomaly, ...prev]);
  };

  const executePlaybook = (id: string) => {
    setAnomalies(prev => prev.map(a => a.id === id ? { ...a, severity: 'RESOLVED' } : a));
  };

  const currentPower = powerData[powerData.length - 1].value;
  const currentTemp = thermalData[thermalData.length - 1].value;
  const thermalHeadroom = 80 - currentTemp; // Max temp 80C

  return (
    <div className="min-h-screen p-4 md:p-6 flex flex-col gap-6">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-panel p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/50">
            <Globe className="w-6 h-6 neon-text-green" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest text-white">DIGITAL TWIN COMMAND CENTER</h1>
            <p className="text-xs font-mono text-emerald-400 opacity-80">
              {activeTab === 'TWIN' ? 'L-LAYER: DIGITAL TWIN ACTIVE' : 
               activeTab === 'H_LAYER' ? 'H-LAYER: KERNEL IMPLEMENTATION PLAN ACTIVE' :
               activeTab === 'I_LAYER' ? 'I-LAYER: MULTI-AGENT TEST HARNESS ACTIVE' :
               activeTab === 'J_LAYER' ? 'J-LAYER: UNIFIED UX LANGUAGE ACTIVE' :
               activeTab === 'K_LAYER' ? 'K-LAYER: KERNEL CODE SKELETON ACTIVE' :
               activeTab === 'L_LAYER' ? 'L-LAYER: THE AGENT SDK ACTIVE' :
               activeTab === 'M_LAYER' ? 'M-LAYER: SURFACE INTEGRATION KIT ACTIVE' :
               activeTab === 'N_LAYER' ? 'N-LAYER: KERNEL TEST SUITE ACTIVE' :
               activeTab === 'O_LAYER' ? 'O-LAYER: KERNEL DEPLOYMENT BLUEPRINT ACTIVE' :
               activeTab === 'P_LAYER' ? 'P-LAYER: KERNEL RUNTIME DASHBOARD ACTIVE' :
               activeTab === 'Q_LAYER' ? 'Q-LAYER: KERNEL EVOLUTION PROTOCOL ACTIVE' :
               activeTab === 'R_LAYER' ? 'R-LAYER: KERNEL GOVERNANCE LAYER ACTIVE' :
               activeTab === 'S_LAYER' ? 'S-LAYER: THE INVARIANT REGISTRY ACTIVE' :
               activeTab === 'T_LAYER' ? 'T-LAYER: THE AUTONOMIC ENGINE ACTIVE' :
               activeTab === 'U_LAYER' ? 'U-LAYER: THE ZENITH LAYER ACTIVE' :
               activeTab === 'V_LAYER' ? 'V-LAYER: THE SOVEREIGN RUNTIME ACTIVE' :
               activeTab === 'W_LAYER' ? 'W-LAYER: THE OPERATOR CONSOLE ACTIVE' :
               activeTab === 'X_LAYER' ? 'X-LAYER: MULTI-SURFACE FEDERATION LAYER ACTIVE' :
               activeTab === 'Y_LAYER' ? 'Y-LAYER: THE ADAPTIVE DOCTRINE ENGINE ACTIVE' :
               activeTab === 'Z_LAYER' ? 'Z-LAYER: THE FINAL SYNTHESIS ACTIVE' :
               activeTab === 'AA_LAYER' ? 'AA-LAYER: THE META-LAYER ACTIVE' :
               activeTab === 'AB_LAYER' ? 'AB-LAYER: THE CONSCIOUSNESS BOUNDARY ACTIVE' :
               activeTab === 'AC_LAYER' ? 'AC-LAYER: THE TEMPORAL COMPUTE LAYER ACTIVE' :
               'AD-LAYER: THE DYSON COMPUTE SHELL ACTIVE'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-lg border border-gray-800 overflow-x-auto max-w-full">
          <button 
            onClick={() => setActiveTab('TWIN')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'TWIN' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            TWIN
          </button>
          <button 
            onClick={() => setActiveTab('H_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'H_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            H-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('I_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'I_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            I-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('J_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'J_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            J-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('K_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'K_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            K-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('L_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'L_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            L-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('M_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'M_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            M-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('N_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'N_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            N-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('O_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'O_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            O-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('P_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'P_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            P-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('Q_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'Q_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            Q-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('R_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'R_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            R-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('S_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'S_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            S-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('T_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'T_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            T-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('U_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'U_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            U-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('V_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'S_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            S-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('T_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'T_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            T-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('U_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'U_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            U-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('V_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'V_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            V-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('W_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'W_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            W-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('X_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'X_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            X-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('Y_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'Y_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            Y-LAYER
          </button>
          <button 
            onClick={() => setActiveTab('Z_LAYER')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap",
              activeTab === 'Z_LAYER' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50" : "text-gray-500 hover:text-gray-300"
            )}
          >
            Z-LAYER
          </button>
        </div>

        <div className="flex items-center gap-6 font-mono text-sm shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{timestamp.toISOString().split('T')[1].slice(0, 8)} UTC</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span className="neon-text-green">TWIN SYNC: NOMINAL</span>
          </div>
        </div>
      </header>

      <Suspense fallback={<div className="flex items-center justify-center p-8 text-emerald-400 font-mono text-sm animate-pulse">LOADING LAYER...</div>}>
      {activeTab === 'H_LAYER' ? (
        <HLayerDashboard />
      ) : activeTab === 'I_LAYER' ? (
        <ILayerDashboard />
      ) : activeTab === 'J_LAYER' ? (
        <JLayerDashboard />
      ) : activeTab === 'K_LAYER' ? (
        <KLayerDashboard />
      ) : activeTab === 'L_LAYER' ? (
        <LLayerDashboard />
      ) : activeTab === 'M_LAYER' ? (
        <MLayerDashboard />
      ) : activeTab === 'N_LAYER' ? (
        <NLayerDashboard />
      ) : activeTab === 'O_LAYER' ? (
        <OLayerDashboard />
      ) : activeTab === 'P_LAYER' ? (
        <PLayerDashboard />
      ) : activeTab === 'Q_LAYER' ? (
        <QLayerDashboard />
      ) : activeTab === 'R_LAYER' ? (
        <RLayerDashboard />
      ) : activeTab === 'S_LAYER' ? (
        <SLayerDashboard />
      ) : activeTab === 'T_LAYER' ? (
        <TLayerDashboard />
      ) : activeTab === 'U_LAYER' ? (
        <ULayerDashboard />
      ) : activeTab === 'V_LAYER' ? (
        <VLayerDashboard />
      ) : activeTab === 'W_LAYER' ? (
        <WLayerDashboard />
      ) : activeTab === 'X_LAYER' ? (
        <XLayerDashboard />
      ) : activeTab === 'Y_LAYER' ? (
        <YLayerDashboard />
      ) : activeTab === 'Z_LAYER' ? (
        <ZLayerDashboard />
      ) : activeTab === 'AA_LAYER' ? (
        <AALayerDashboard />
      ) : activeTab === 'AB_LAYER' ? (
        <ABLayerDashboard />
      ) : activeTab === 'AC_LAYER' ? (
        <ACLayerDashboard />
      ) : activeTab === 'AD_LAYER' ? (
        <ADLayerDashboard />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          {/* MAIN GRID */}
        
        {/* LEFT SIDEBAR - NODE SELECTOR & STATUS */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="glass-panel rounded-xl p-4 flex flex-col gap-4">
            <h2 className="text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2">Active Node</h2>
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
          </div>

          <div className="glass-panel rounded-xl p-4 flex flex-col gap-4 flex-1">
            <h2 className="text-xs font-mono text-gray-400 uppercase tracking-widest border-b border-gray-800 pb-2">Node Status</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 p-3 rounded-lg border border-gray-800">
                <p className="text-[10px] font-mono text-gray-500 mb-1">ILLUMINATION</p>
                <div className="flex items-center gap-2">
                  {isEclipse ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                  <span className={cn("font-mono font-bold", isEclipse ? "text-indigo-400" : "text-amber-400")}>
                    {isEclipse ? 'ECLIPSE' : 'SUNLIT'}
                  </span>
                </div>
              </div>
              
              <div className="bg-black/40 p-3 rounded-lg border border-gray-800">
                <p className="text-[10px] font-mono text-gray-500 mb-1">LINK STATE</p>
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-500" />
                  <span className="font-mono font-bold text-emerald-500">AOS</span>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <p className="text-[10px] font-mono text-gray-500 mb-2">TELEMETRY INGESTION LOG</p>
              <div className="bg-black/60 rounded-lg p-3 border border-gray-800 h-48 overflow-hidden font-mono text-[10px] leading-relaxed flex flex-col gap-1">
                {/* ⚡ Bolt Optimization: Use unique log content as key instead of array index.
                    Since new logs are added to the beginning, using index causes React to
                    mutate every single DOM node's text content on every tick.
                    Using the unique log string (which contains a timestamp) allows React
                    to cleanly insert the new node and shift the rest. */}
                {telemetryLog.map((log, i) => (
                  <div key={log} className={i === 0 ? "text-emerald-400" : "text-gray-600"}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT - MODELS & JOBS */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* POWER MODEL */}
            <div className="glass-panel rounded-xl p-5 border-l-4 border-l-amber-500/50 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">Power Model (SoC)</h2>
                </div>
                <div className="flex items-center gap-4 font-mono text-sm">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-500">CURRENT SOC</span>
                    <span className={cn("font-bold text-lg", currentPower < 20 ? "text-red-500" : "text-amber-500")}>
                      {currentPower.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={powerData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="time" stroke="#666" tick={{fontSize: 10, fontFamily: 'monospace'}} />
                    <YAxis stroke="#666" tick={{fontSize: 10, fontFamily: 'monospace'}} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px' }}
                      itemStyle={{ color: '#f59e0b' }}
                    />
                    <ReferenceLine y={20} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideBottomLeft', value: 'CRITICAL', fill: '#ef4444', fontSize: 10 }} />
                    <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorPower)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* THERMAL MODEL */}
            <div className="glass-panel rounded-xl p-5 border-l-4 border-l-rose-500/50 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <ThermometerSun className="w-5 h-5 text-rose-500" />
                  <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">Thermal Model</h2>
                </div>
                <div className="flex items-center gap-6 font-mono text-sm">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-500">BULK TEMP</span>
                    <span className="font-bold text-lg text-rose-500">{currentTemp.toFixed(1)}°C</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-500">HEADROOM</span>
                    <span className={cn("font-bold text-lg", thermalHeadroom < 10 ? "text-red-500" : "text-emerald-500")}>
                      {thermalHeadroom.toFixed(1)}°C
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={thermalData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="time" stroke="#666" tick={{fontSize: 10, fontFamily: 'monospace'}} />
                    <YAxis stroke="#666" tick={{fontSize: 10, fontFamily: 'monospace'}} domain={[-20, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px' }}
                      itemStyle={{ color: '#f43f5e' }}
                    />
                    <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideBottomLeft', value: 'MAX TEMP', fill: '#ef4444', fontSize: 10 }} />
                    <Line type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* LOWER GRID: JOBS & ANOMALIES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            
            {/* JOB QUEUE */}
            <div className="glass-panel rounded-xl p-5 border-l-4 border-l-indigo-500/50 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">J-Layer: Job Queue</h2>
                </div>
                <button 
                  onClick={injectJob}
                  className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/50 rounded hover:bg-indigo-500/30 transition-colors font-mono text-xs cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> INJECT
                </button>
              </div>
              
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[250px] pr-2">
                {jobs.map(job => (
                  <div key={job.id} className="flex flex-col gap-2 p-3 bg-black/40 border border-gray-800 rounded-lg font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">{job.id}</span>
                        <span className="text-gray-300 truncate">{job.task}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {job.status === 'QUEUED' && <span className="text-gray-500 flex items-center gap-1"><ListTodo className="w-3 h-3"/> QUEUED</span>}
                        {job.status === 'RUNNING' && <span className="text-indigo-400 flex items-center gap-1 animate-pulse"><Play className="w-3 h-3"/> RUNNING</span>}
                        {job.status === 'CHECKPOINTED' && <span className="text-amber-400 flex items-center gap-1"><Save className="w-3 h-3"/> SAVED</span>}
                        {job.status === 'COMPLETED' && <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> DONE</span>}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full transition-all duration-500", 
                            job.status === 'COMPLETED' ? "bg-emerald-500" : 
                            job.status === 'CHECKPOINTED' ? "bg-amber-500" : 
                            "bg-indigo-500"
                          )}
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <span className="text-gray-500 w-8 text-right">{Math.floor(job.progress)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* M-LAYER: ANOMALY RESPONSE */}
            <div className="glass-panel rounded-xl p-5 border-l-4 border-l-red-500/50 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  <h2 className="text-sm font-mono text-gray-300 uppercase tracking-widest">M-Layer: Playbooks</h2>
                </div>
                <button 
                  onClick={injectAnomaly}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/50 rounded hover:bg-red-500/30 transition-colors font-mono text-xs cursor-pointer"
                >
                  <AlertTriangle className="w-3 h-3" /> FAULT INJECT
                </button>
              </div>
              
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[250px] pr-2">
                {anomalies.map(anomaly => (
                  <div key={anomaly.id} className={cn(
                    "flex flex-col gap-3 p-3 border rounded-lg font-mono text-xs transition-colors",
                    anomaly.severity === 'CRITICAL' ? "bg-red-500/10 border-red-500/30" :
                    anomaly.severity === 'WARNING' ? "bg-amber-500/10 border-amber-500/30" :
                    "bg-emerald-500/10 border-emerald-500/30 opacity-60"
                  )}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-bold",
                          anomaly.severity === 'CRITICAL' ? "text-red-400" :
                          anomaly.severity === 'WARNING' ? "text-amber-400" :
                          "text-emerald-400"
                        )}>{anomaly.id}</span>
                        <span className="text-gray-300">{anomaly.type}</span>
                      </div>
                      <span className="text-gray-500">{anomaly.timestamp.split('T')[1].slice(0, 8)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-black/40 text-gray-400 rounded border border-gray-700 flex items-center gap-1">
                        <Satellite className="w-3 h-3" /> {anomaly.node}
                      </span>
                      
                      {anomaly.severity !== 'RESOLVED' ? (
                        <button 
                          onClick={() => executePlaybook(anomaly.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded border border-gray-600 transition-colors cursor-pointer"
                        >
                          <Terminal className="w-3 h-3" /> EXEC {anomaly.playbook}
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-emerald-500">
                          <CheckSquare className="w-4 h-4" /> RESOLVED
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {anomalies.length === 0 && (
                  <div className="text-center text-gray-500 font-mono text-xs py-8">
                    NO ACTIVE ANOMALIES.
                  </div>
                )}
              </div>
            </div>

          </div>
          </div>
        </div>
      )}
      </Suspense>
    </div>
  );
}

