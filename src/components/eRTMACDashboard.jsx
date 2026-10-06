import React, { useState } from 'react';
import { 
  Activity, 
  Gauge, 
  Zap, 
  Play, 
  Pause, 
  Flame, 
  Droplets, 
  ShieldCheck,
  TrendingUp,
  Sliders,
  GitBranch,
  RotateCcw,
  Radio,
  Wrench,
  CheckCircle2,
  Compass
} from 'lucide-react';
import DepthWiseRiskTimeline from './DepthWiseRiskTimeline';
import EarthLayer3DView from './EarthLayer3DView';
import HistoricalReplayTimeline from './HistoricalReplayTimeline';

// -----------------------------------------------------------------------------
// 1. CODE-DRIVEN HYDROSTATIC PRESSURE DRILLING COLUMNS VISUALIZER (NO AI IMAGES)
// -----------------------------------------------------------------------------
function VisualHydrostaticColumns({ activeHydroState, setActiveHydroState, hydrostaticPressure }) {
  return (
    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 shadow-md">
      <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
        <h3 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-emerald-400" />
          Code-Driven Hydrostatic Pressure Drilling Visualizer
        </h3>
        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700">
          P = 0.052 × MW × Depth ({hydrostaticPressure} psi)
        </span>
      </div>

      {/* SVG 3-Column Wellbore Diagram */}
      <div className="w-full bg-[#060B14] rounded-xl border border-slate-800 p-2 flex flex-col sm:flex-row items-center justify-around gap-2 select-none overflow-x-auto">
        
        {/* COLUMN 1: KICK (UNDERBALANCED) */}
        <div 
          onClick={() => setActiveHydroState('KICK')}
          className={`flex flex-col items-center flex-1 h-full p-2 rounded-lg transition-all cursor-pointer border ${
            activeHydroState === 'KICK' 
              ? 'bg-red-950/70 border-red-500 ring-2 ring-red-500/40 shadow-lg scale-[1.02]' 
              : 'hover:bg-slate-900 border-slate-800/80'
          }`}
        >
          <div className="text-[11px] font-extrabold text-red-400 mb-1">🚨 Kick (Underbalanced)</div>
          
          <svg viewBox="0 0 100 180" className="w-full h-44 overflow-visible">
            {/* Outer Formation Rock Strata */}
            <rect x="5" y="10" width="90" height="160" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="1" />
            
            {/* Well Casing Tube */}
            <rect x="25" y="15" width="50" height="150" fill="#0B132B" stroke="#64748B" strokeWidth="2" />
            
            {/* Drill Pipe */}
            <rect x="44" y="15" width="12" height="150" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
            
            {/* Annulus Fluid (Red gradient for Kick Influx) */}
            <rect x="27" y="55" width="17" height="110" fill="url(#kickGradient)" opacity="0.85" />
            <rect x="56" y="55" width="17" height="110" fill="url(#kickGradient)" opacity="0.85" />
            
            {/* Gas Influx Bubbles */}
            <circle cx="35" cy="140" r="4" fill="#EF4444">
              <animate attributeName="cy" values="140;60;140" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="64" cy="120" r="5" fill="#F59E0B">
              <animate attributeName="cy" values="135;55;135" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Formation Influx Arrows */}
            <path d="M 10 130 L 22 130" stroke="#EF4444" strokeWidth="2.5" />
            <path d="M 90 130 L 78 130" stroke="#EF4444" strokeWidth="2.5" />

            <defs>
              <linearGradient id="kickGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </linearGradient>
            </defs>
          </svg>

          <span className="text-[10px] font-mono font-bold text-red-300 mt-1 bg-red-950 px-1.5 py-0.5 rounded border border-red-800">
            P_pore &gt; P_hydrostatic
          </span>
        </div>

        {/* COLUMN 2: NORMAL (BALANCED) */}
        <div 
          onClick={() => setActiveHydroState('NORMAL')}
          className={`flex flex-col items-center flex-1 h-full p-2 rounded-lg transition-all cursor-pointer border ${
            activeHydroState === 'NORMAL' 
              ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg scale-[1.02]' 
              : 'hover:bg-slate-900 border-slate-800/80'
          }`}
        >
          <div className="text-[11px] font-extrabold text-emerald-400 mb-1">🟢 Normal (Balanced)</div>
          
          <svg viewBox="0 0 100 180" className="w-full h-44 overflow-visible">
            {/* Outer Formation Rock Strata */}
            <rect x="5" y="10" width="90" height="160" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="1" />
            
            {/* Well Casing Tube */}
            <rect x="25" y="15" width="50" height="150" fill="#0B132B" stroke="#64748B" strokeWidth="2" />
            
            {/* Drill Pipe */}
            <rect x="44" y="15" width="12" height="150" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
            
            {/* Full Annulus Fluid (Emerald Blue Gradient) */}
            <rect x="27" y="25" width="17" height="140" fill="url(#normalGradient)" opacity="0.85" />
            <rect x="56" y="25" width="17" height="140" fill="url(#normalGradient)" opacity="0.85" />
            
            {/* Continuous Circulation Downward/Upward Arrows */}
            <path d="M 50 20 L 50 145" stroke="#00F5D4" strokeWidth="2" strokeDasharray="4 3">
              <animate attributeName="stroke-dashoffset" values="14;0" dur="1s" repeatCount="indefinite" />
            </path>

            <defs>
              <linearGradient id="normalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#065F46" />
              </linearGradient>
            </defs>
          </svg>

          <span className="text-[10px] font-mono font-bold text-emerald-300 mt-1 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
            P_hydrostatic = P_pore
          </span>
        </div>

        {/* COLUMN 3: MUD LOSSES (OVERBALANCED) */}
        <div 
          onClick={() => setActiveHydroState('MUD_LOSS')}
          className={`flex flex-col items-center flex-1 h-full p-2 rounded-lg transition-all cursor-pointer border ${
            activeHydroState === 'MUD_LOSS' 
              ? 'bg-amber-950/70 border-amber-500 ring-2 ring-amber-500/40 shadow-lg scale-[1.02]' 
              : 'hover:bg-slate-900 border-slate-800/80'
          }`}
        >
          <div className="text-[11px] font-extrabold text-amber-400 mb-1">🟠 Mud Loss (Fracture)</div>
          
          <svg viewBox="0 0 100 180" className="w-full h-44 overflow-visible">
            {/* Outer Formation Rock Strata */}
            <rect x="5" y="10" width="90" height="160" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="1" />
            
            {/* Fractures in formation */}
            <line x1="5" y1="130" x2="25" y2="135" stroke="#F59E0B" strokeWidth="2" strokeDasharray="2 2" />
            <line x1="75" y1="135" x2="95" y2="130" stroke="#F59E0B" strokeWidth="2" strokeDasharray="2 2" />

            {/* Well Casing Tube */}
            <rect x="25" y="15" width="50" height="150" fill="#0B132B" stroke="#64748B" strokeWidth="2" />
            
            {/* Drill Pipe */}
            <rect x="44" y="15" width="12" height="150" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
            
            {/* Reduced Level Annulus Fluid */}
            <rect x="27" y="70" width="17" height="95" fill="url(#lossGradient)" opacity="0.85" />
            <rect x="56" y="70" width="17" height="95" fill="url(#lossGradient)" opacity="0.85" />
            
            {/* Mud Seepage Outflow Arrows into Fracture */}
            <path d="M 27 135 L 12 135" stroke="#F59E0B" strokeWidth="2.5" opacity="0.9" />
            <path d="M 73 135 L 88 135" stroke="#F59E0B" strokeWidth="2.5" opacity="0.9" />

            <defs>
              <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>
          </svg>

          <span className="text-[10px] font-mono font-bold text-amber-300 mt-1 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">
            P_hydrostatic &gt; P_fracture
          </span>
        </div>

      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 2. CODE-DRIVEN RIG FLOOR EQUIPMENT SCHEMATIC (NO AI IMAGES)
// -----------------------------------------------------------------------------
function RigFloorEquipmentSchematic({ wob, rpm, pressure, flowRate }) {
  return (
    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 relative overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-xs font-bold">
        <span className="text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
          <Wrench className="w-4 h-4 text-amber-400" />
          Interactive Code-Driven Rig Floor Equipment Visualizer
        </span>
        <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
          SCHEMATIC ACTIVE
        </span>
      </div>

      <div className="w-full h-52 bg-[#060B14] rounded-lg border border-slate-800 relative flex items-center justify-center select-none overflow-hidden">
        <svg viewBox="0 0 320 180" className="w-full h-full">
          {/* Ground Substructure Level */}
          <rect x="0" y="150" width="320" height="30" fill="#0F172A" stroke="#334155" strokeWidth="1" />
          
          {/* Derrick Steel Tower Structure */}
          <line x1="80" y1="150" x2="110" y2="20" stroke="#475569" strokeWidth="2.5" />
          <line x1="160" y1="150" x2="130" y2="20" stroke="#475569" strokeWidth="2.5" />
          <line x1="88" y1="110" x2="152" y2="110" stroke="#334155" strokeWidth="1.5" />
          <line x1="96" y1="70" x2="144" y2="70" stroke="#334155" strokeWidth="1.5" />
          <line x1="104" y1="35" x2="136" y2="35" stroke="#334155" strokeWidth="1.5" />
          
          {/* Derrick Cross Bracing */}
          <line x1="80" y1="150" x2="144" y2="70" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="160" y1="150" x2="96" y2="70" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

          {/* Top Drive Unit */}
          <rect x="110" y="55" width="20" height="30" rx="3" fill="#2563EB" stroke="#60A5FA" strokeWidth="1.5" />
          <circle cx="120" cy="70" r="6" fill="#00F5D4">
            <animateTransform attributeName="transform" type="rotate" from="0 120 70" to="360 120 70" dur={`${Math.max(0.4, 300 / (rpm || 120))}s`} repeatCount="indefinite" />
          </circle>

          {/* Drillstring Shaft down hole */}
          <line x1="120" y1="85" x2="120" y2="150" stroke="#94A3B8" strokeWidth="3" />

          {/* Mud Pump & Piping System */}
          <rect x="15" y="115" width="45" height="25" rx="4" fill="#1E293B" stroke="#3B82F6" strokeWidth="1.5" />
          <text x="37" y="131" fontSize="9" fill="#93C5FD" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">MUD PUMP</text>

          {/* High Pressure Standpipe Hose */}
          <path d="M 37 115 L 37 40 L 115 40 M 115 40 L 115 55" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="6 3">
            <animate attributeName="stroke-dashoffset" values="18;0" dur="0.8s" repeatCount="indefinite" />
          </path>

          {/* Blowout Preventer Stack (BOP) */}
          <rect x="105" y="142" width="30" height="15" rx="2" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
          <text x="120" y="153" fontSize="8" fill="#FCA5A5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BOP STACK</text>

          {/* Dynamic Telemetry Badges on Visualizer */}
          <rect x="195" y="15" width="118" height="130" rx="6" fill="#0B132B" stroke="#1E293B" strokeWidth="1" />
          <text x="205" y="34" fontSize="10" fontWeight="bold" fill="#38BDF8" fontFamily="sans-serif">LIVE RIG STATS:</text>
          <text x="205" y="55" fontSize="9" fill="#E2E8F0" fontFamily="sans-serif">Top Drive: <tspan fill="#00F5D4" fontWeight="bold">{rpm} RPM</tspan></text>
          <text x="205" y="75" fontSize="9" fill="#E2E8F0" fontFamily="sans-serif">WOB Load: <tspan fill="#F59E0B" fontWeight="bold">{wob} klbs</tspan></text>
          <text x="205" y="95" fontSize="9" fill="#E2E8F0" fontFamily="sans-serif">Standpipe P: <tspan fill="#60A5FA" fontWeight="bold">{pressure} psi</tspan></text>
          <text x="205" y="115" fontSize="9" fill="#E2E8F0" fontFamily="sans-serif">Mud Flow: <tspan fill="#A855F7" fontWeight="bold">{flowRate} gpm</tspan></text>
        </svg>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3. SVG ANALOG DIAL GAUGE COMPONENT FOR DRILLER'S CONSOLE
// -----------------------------------------------------------------------------
function AnalogDialGauge({ value, min, max, title, unit, color = '#2563EB', warningThreshold }) {
  const normalized = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const startAngle = -135;
  const endAngle = 135;
  const angle = startAngle + normalized * (endAngle - startAngle);
  const rad = (angle - 90) * (Math.PI / 180);
  
  const needleLength = 28;
  const cx = 50;
  const cy = 50;
  const nx = cx + needleLength * Math.cos(rad);
  const ny = cy + needleLength * Math.sin(rad);

  const isWarning = warningThreshold && value >= warningThreshold;

  return (
    <div className="flex flex-col items-center bg-slate-900/95 text-white p-3 rounded-xl border border-slate-700 shadow-md">
      <div className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
        <Gauge className="w-3.5 h-3.5 text-cyan-400" />
        {title}
      </div>
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Dial background ring */}
          <circle cx="50" cy="50" r="42" fill="#0B132B" stroke="#334155" strokeWidth="3" />
          
          {/* Major & Minor Ticks */}
          {[-135, -90, -45, 0, 45, 90, 135].map((a, i) => {
            const tr = (a - 90) * (Math.PI / 180);
            const x1 = 50 + 36 * Math.cos(tr);
            const y1 = 50 + 36 * Math.sin(tr);
            const x2 = 50 + 42 * Math.cos(tr);
            const y2 = 50 + 42 * Math.sin(tr);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748B" strokeWidth="1.5" />;
          })}

          {/* Color Arc Gauge */}
          <circle 
            cx="50" cy="50" r="35" 
            fill="none" 
            stroke={isWarning ? '#EF4444' : color} 
            strokeWidth="4" 
            strokeDasharray="165 220"
            transform="rotate(135 50 50)"
            opacity="0.85"
          />

          {/* Pivot Dot */}
          <circle cx="50" cy="50" r="5" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
          
          {/* Dial Needle */}
          <line x1="50" y1="50" x2={nx} y2={ny} stroke={isWarning ? '#EF4444' : '#F59E0B'} strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* Numerical Value Badge inside Gauge */}
        <div className="absolute bottom-2 font-mono text-xs font-extrabold text-cyan-300 bg-black/80 px-2 py-0.5 rounded border border-cyan-500/40">
          {value} <span className="text-[9px] text-slate-300">{unit}</span>
        </div>
      </div>
    </div>
  );
}

export default function ERTMACDashboard({ 
  telemetry = {}, 
  telemetryEngine, 
  riskScores = {}, 
  activeWell = {},
  uploadedDataset,
  focusSection = 'ertmac'
}) {
  const [isSimulating, setIsSimulating] = useState(true);
  const [activeHydroState, setActiveHydroState] = useState('NORMAL');

  // Smooth scroll to targeted sub-feature when selected from Sidebar
  React.useEffect(() => {
    if (focusSection && focusSection !== 'ertmac') {
      const sectionMap = {
        'telemetry_stream': 'sec-telemetry-stream',
        'cascading_risk': 'sec-cascading-risk',
        'equipment_gauges': 'sec-equipment-gauges',
        'depth_risk_matrix': 'sec-depth-risk-matrix'
      };
      const targetId = sectionMap[focusSection];
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, [focusSection]);

  // What-If Simulator Interactive Parameter States
  const [whatIfParams, setWhatIfParams] = useState({
    wob: 18.5,        // klbs
    rpm: 120,         // RPM
    rop: 14.8,        // m/hr
    mudWeight: 10.8,  // ppg
    flowRate: 680,    // gpm
    pressure: 2450    // psi
  });

  // Calculate What-If Simulated Risk
  const simulatedStuckPipe = Math.min(98, Math.max(8, Math.round(12 + (whatIfParams.wob - 18) * 4 + (whatIfParams.rpm - 120) * 0.3 + (whatIfParams.mudWeight - 10.8) * 15)));
  const simulatedKick = Math.min(96, Math.max(5, Math.round(8 + (10.8 - whatIfParams.mudWeight) * 35 + (whatIfParams.pressure - 2450) * 0.08)));
  const simulatedMudLoss = Math.min(95, Math.max(10, Math.round(15 + (whatIfParams.flowRate - 680) * 0.2 + (whatIfParams.mudWeight - 10.8) * 25)));

  const toggleSimulation = () => {
    if (telemetryEngine) {
      if (isSimulating) {
        telemetryEngine.stop();
      } else {
        telemetryEngine.start();
      }
    }
    setIsSimulating(!isSimulating);
  };

  // Dynamic Hydrostatic Pressure calculation
  const currentDepth = telemetry?.depth || 2518.4;
  const currentMudWeight = whatIfParams.mudWeight || 10.8;
  const hydrostaticPressure = Math.round(0.052 * currentMudWeight * (currentDepth * 3.28084)); // psi

  return (
    <div className="p-4 space-y-6 max-w-[1600px] mx-auto font-sans">
      
      {/* ------------------------------------------------------------- */}
      {/* LIVE TELEMETRY CONTROL TOOLBAR & WELL HEALTH HEADER */}
      {/* ------------------------------------------------------------- */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 border border-slate-300 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#002B49] text-cyan-400 rounded-lg shadow">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              eRTMAC Live Operational Telemetry Cockpit
              <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-600 text-white font-mono font-bold">
                1 Lakh Telemetry Stream (100,000 Rows)
              </span>
            </h2>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Streaming 100,000 sensor telemetry records for active well <strong className="text-slate-900 dark:text-white">{activeWell?.id || 'RDS-04'}</strong> (Depth: {telemetry?.depth || 2518.4} m, Hydrostatic P: {hydrostaticPressure} psi)
            </p>
          </div>
        </div>

        {/* Well Health Index Gauge */}
        <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-800 text-xs font-bold">
          <div>
            <span className="text-slate-700 dark:text-slate-300 block text-[10px] uppercase tracking-wider">Well Integrity Score:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-mono font-extrabold text-lg">
              {Math.max(10, 100 - (riskScores?.overallScore || 20))}% OPTIMAL
            </span>
          </div>
        </div>

        {/* Anomaly Injection Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-900 dark:text-slate-200 font-extrabold uppercase tracking-wider mr-1">Inject Hazard:</span>
          
          <button
            onClick={() => telemetryEngine && telemetryEngine.setAnomalyMode('NORMAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              telemetry?.mode === 'NORMAL'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            Normal Drilling
          </button>

          <button
            onClick={() => telemetryEngine && telemetryEngine.setAnomalyMode('STUCK_PIPE_ANOMALY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              telemetry?.mode === 'STUCK_PIPE_ANOMALY'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            ⚠️ Stuck Pipe
          </button>

          <button
            onClick={() => telemetryEngine && telemetryEngine.setAnomalyMode('KICK_ANOMALY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              telemetry?.mode === 'KICK_ANOMALY'
                ? 'bg-[#C41E3A] text-white shadow-sm animate-pulse'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            🚨 Gas Kick
          </button>

          <button
            onClick={() => telemetryEngine && telemetryEngine.setAnomalyMode('MUD_LOSS_ANOMALY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              telemetry?.mode === 'MUD_LOSS_ANOMALY'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            💧 Mud Loss
          </button>

          <button
            onClick={toggleSimulation}
            className="p-2 bg-[#002B49] text-white rounded-lg ml-2 border border-slate-700 cursor-pointer"
            title={isSimulating ? 'Pause Telemetry' : 'Resume Telemetry'}
          >
            {isSimulating ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 10-PARAMETER LIVE METRICS CARDS */}
      {/* ------------------------------------------------------------- */}
      <div id="sec-telemetry-stream" className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        <div className={`glass-panel p-3 rounded-xl space-y-1 transition-all ${
          (telemetry?.wob || 18.5) > 23.0 ? 'border-amber-500 bg-amber-500/10' : ''
        }`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 dark:text-slate-200">
            <span>WOB (Bit Load)</span>
            <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">{telemetry?.wob || 18.5}</span>
            <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-300">klbf</span>
          </div>
          <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Target: 14-22 klbf</div>
        </div>

        <div className="glass-panel p-3 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 dark:text-slate-200">
            <span>RPM (Rotary)</span>
            <RotateCcw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">{telemetry?.rpm || 120}</span>
            <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-300">rpm</span>
          </div>
          <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Normal: 100-140</div>
        </div>

        <div className="glass-panel p-3 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 dark:text-slate-200">
            <span>Hookload</span>
            <TrendingUp className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-purple-700 dark:text-purple-300">{telemetry?.hookload || 218.4}</span>
            <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-300">klbf</span>
          </div>
          <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Baseline: 215</div>
        </div>

        <div className="glass-panel p-3 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 dark:text-slate-200">
            <span>ROP (Rate Pen)</span>
            <Activity className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">{telemetry?.rop || 14.8}</span>
            <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-300">m/hr</span>
          </div>
          <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Target: 12-22 m/h</div>
        </div>

        <div className={`glass-panel p-3 rounded-xl space-y-1 ${
          Math.abs((telemetry?.flowRateIn || 680) - (telemetry?.flowRateOut || 678)) > 15 ? 'border-red-500 bg-red-500/10' : ''
        }`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 dark:text-slate-200">
            <span>Flow (In/Out)</span>
            <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">{telemetry?.flowRateIn || 680}</span>
            <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-300">/{telemetry?.flowRateOut || 678} gpm</span>
          </div>
          <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">
            Diff: {telemetry?.flowDiff || -0.3}%
          </div>
        </div>

        <div className="glass-panel p-3 rounded-xl space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 dark:text-slate-200">
            <span>ECD Density</span>
            <Droplets className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-teal-700 dark:text-teal-300">{telemetry?.ecd || 11.45}</span>
            <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-300">ppg</span>
          </div>
          <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Frac Limit: 12.8</div>
        </div>

        <div className={`glass-panel p-3 rounded-xl space-y-1 ${
          Math.abs(telemetry?.pitGainLoss || 0) > 1.5 ? 'border-amber-500 bg-amber-500/10' : ''
        }`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 dark:text-slate-200">
            <span>Pit Volume</span>
            <Gauge className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
              {(telemetry?.pitGainLoss || 0) > 0 ? '+' : ''}{telemetry?.pitGainLoss || 0.15}
            </span>
            <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-300">bbl/min</span>
          </div>
          <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Total: {telemetry?.pitVolume || 420.5} bbl</div>
        </div>

        <div className={`glass-panel p-3 rounded-xl space-y-1 ${
          (telemetry?.gasReading || 0.8) > 3.0 ? 'border-red-600 bg-red-500/15 animate-pulse' : ''
        }`}>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 dark:text-slate-200">
            <span>Total Gas</span>
            <Flame className={`w-3.5 h-3.5 ${(telemetry?.gasReading || 0.8) > 3.0 ? 'text-red-600' : 'text-orange-600 dark:text-orange-400'}`} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-xl font-bold font-mono ${(telemetry?.gasReading || 0.8) > 3.0 ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
              {telemetry?.gasReading || 0.8}%
            </span>
            <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-300">({telemetry?.gasConnection || 0.25}%)</span>
          </div>
          <div className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Alarm: &gt; 3.0%</div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: CASCADING RISK PREDICTION (MUDLOSS, KICK, STUCK PIPE) */}
      {/* ========================================================================= */}
      <section id="sec-cascading-risk" className="space-y-4 bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-emerald-500/40 shadow-lg">
        
        {/* Section 1 Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-emerald-500/60 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 underline decoration-emerald-500 decoration-2 underline-offset-8 flex items-center gap-2.5">
              <GitBranch className="w-7 h-7 text-emerald-600" />
              Cascading risk prediction (Mudloss, Kick, Stuck Pipe)
            </h2>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
              Code-driven hydrostatic pressure wellbore visualization & multi-stage hazard propagation tree logic
            </p>
          </div>

          <span className="text-xs font-mono font-extrabold text-emerald-900 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-400">
            Hydrostatic Visual Engine
          </span>
        </div>

        {/* Section 1 Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: CODE-DRIVEN HYDROSTATIC VISUALIZER (NO AI IMAGES) */}
          <div className="lg:col-span-6 space-y-3">
            <VisualHydrostaticColumns 
              activeHydroState={activeHydroState}
              setActiveHydroState={setActiveHydroState}
              hydrostaticPressure={hydrostaticPressure}
            />

            {/* Dynamic Status Explanation Box */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 text-xs font-semibold space-y-1 shadow-sm">
              {activeHydroState === 'KICK' && (
                <p className="text-red-700 dark:text-red-300">
                  <strong className="text-red-800 dark:text-red-200 font-extrabold">Gas Kick Active:</strong> Formation pore pressure exceeds bottomhole hydrostatic pressure (P_pore &gt; P_hydrostatic). Pit volume gain observed (+12 bbl/min). Shut in BOP stack immediately!
                </p>
              )}
              {activeHydroState === 'NORMAL' && (
                <p className="text-emerald-700 dark:text-emerald-300">
                  <strong className="text-emerald-800 dark:text-emerald-200 font-extrabold">Balanced State:</strong> Hydrostatic pressure (P_hydrostatic ≈ 3,520 psi) matches formation pore pressure gradient. Flow in equals flow out (680 gpm).
                </p>
              )}
              {activeHydroState === 'MUD_LOSS' && (
                <p className="text-amber-700 dark:text-amber-300">
                  <strong className="text-amber-800 dark:text-amber-200 font-extrabold">Mud Loss Fracture:</strong> Overbalanced hydrostatic pressure (P_hydrostatic &gt; P_fracture) is breaking high-permeability Barail Sand fractures, causing 18 bbl/hr fluid loss.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Cascading Hazard Propagation Tree & Graphs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900/90 p-4 rounded-xl border border-slate-300 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-red-600" />
                  Cascading Hazard Tree Sequence (Mud Loss &rarr; Gas Kick &rarr; Stuck Pipe)
                </h3>
                <span className="text-[10px] font-mono font-bold text-red-700 bg-red-100 dark:bg-red-950 px-2 py-0.5 rounded border border-red-300">
                  Neo4j Causal Graph
                </span>
              </div>

              {/* Step 1: Mud Loss */}
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-300 dark:border-purple-800 flex items-center justify-between gap-3 text-xs font-bold">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-extrabold text-xs">1</span>
                  <div>
                    <div className="text-purple-900 dark:text-purple-200 font-extrabold">Primary Trigger: Mud Loss (Fractured Barail Formation)</div>
                    <div className="text-purple-700 dark:text-purple-300 text-[11px]">Loss rate: 18 bbl/hr • Annular fluid column level dropping</div>
                  </div>
                </div>
                <span className="text-purple-800 dark:text-purple-300 font-mono text-xs bg-purple-200 dark:bg-purple-900 px-2 py-1 rounded">
                  Risk: {simulatedMudLoss}%
                </span>
              </div>

              <div className="text-center font-mono text-xs font-extrabold text-slate-500 dark:text-slate-400">
                ↓ Downhole Hydrostatic Pressure Drops Below Pore Gradient (-140 psi) ↓
              </div>

              {/* Step 2: Gas Kick */}
              <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-300 dark:border-red-800 flex items-center justify-between gap-3 text-xs font-bold">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center font-extrabold text-xs">2</span>
                  <div>
                    <div className="text-red-900 dark:text-red-200 font-extrabold">Secondary Reaction: Hydrocarbon Gas Kick Influx</div>
                    <div className="text-red-700 dark:text-red-300 text-[11px]">Pit Gain: +12 bbl • Background gas spike to 3.8%</div>
                  </div>
                </div>
                <span className="text-red-800 dark:text-red-300 font-mono text-xs bg-red-200 dark:bg-red-900 px-2 py-1 rounded">
                  Risk: {simulatedKick}%
                </span>
              </div>

              <div className="text-center font-mono text-xs font-extrabold text-slate-500 dark:text-slate-400">
                ↓ Swelling Marine Kopili Shale Collapses Annular Space ↓
              </div>

              {/* Step 3: Stuck Pipe */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-800 flex items-center justify-between gap-3 text-xs font-bold">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-extrabold text-xs">3</span>
                  <div>
                    <div className="text-amber-900 dark:text-amber-200 font-extrabold">Compound Failure: Differential Sticking & Stuck Pipe</div>
                    <div className="text-amber-700 dark:text-amber-300 text-[11px]">Torque Spike: 18,500 ft-lbs • Hookload Overpull: 45 klbf</div>
                  </div>
                </div>
                <span className="text-amber-800 dark:text-amber-300 font-mono text-xs bg-amber-200 dark:bg-amber-900 px-2 py-1 rounded">
                  Risk: {simulatedStuckPipe}%
                </span>
              </div>
            </div>

            {/* Automated Mitigation Advisory Card */}
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-900 dark:text-emerald-200 space-y-1">
              <div className="flex items-center gap-2 font-extrabold text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>eRTMAC Automated Cascading Countermeasure:</span>
              </div>
              <p>
                Inject LCM (Loss Control Material) pill into Barail formation while increasing mud density gradually by +0.3 ppg to re-establish hydrostatic head (P_hydrostatic = 3,580 psi) and prevent gas kick migration.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: WHAT IF SIMULATOR? (CHANGE DRILLING PARAMETERS, SEE PREDICTED RISK!) */}
      {/* ========================================================================= */}
      <section id="sec-equipment-gauges" className="space-y-4 bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-amber-500/40 shadow-lg">
        
        {/* Section 2 Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-amber-500/60 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-400 underline decoration-amber-500 decoration-2 underline-offset-8 flex items-center gap-2.5">
              <Gauge className="w-7 h-7 text-amber-600" />
              What if Simulator? (Change drilling parameters, see predicted risk !)
            </h2>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
              Realtime Code-Driven Equipment Visualisation & Driller's Console Analog Gauges
            </p>
          </div>

          <span className="text-xs font-mono font-extrabold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-950 px-3 py-1.5 rounded-lg border border-amber-400">
            Realtime Driller's Visual Engine
          </span>
        </div>

        {/* Real-Time Code-Driven Equipment Visualisation Panel */}
        <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-4 shadow-xl">
          
          {/* Equipment Banner Code-Driven Visualizer + Realtime Analog Gauges Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Rig Equipment Schematic Visualizer (CODE-DRIVEN SVG - NO AI IMAGES) */}
            <div className="lg:col-span-5">
              <RigFloorEquipmentSchematic 
                wob={whatIfParams.wob}
                rpm={whatIfParams.rpm}
                pressure={whatIfParams.pressure}
                flowRate={whatIfParams.flowRate}
              />
            </div>

            {/* Realtime Animated Analog Dial Gauges (Weight, SPP, Torque/RPM, Flow) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <AnalogDialGauge 
                title="Weight Indicator"
                value={whatIfParams.wob}
                min={10}
                max={35}
                unit="klbs"
                color="#F59E0B"
                warningThreshold={23}
              />

              <AnalogDialGauge 
                title="Standpipe Press"
                value={whatIfParams.pressure}
                min={1800}
                max={3400}
                unit="psi"
                color="#3B82F6"
                warningThreshold={3000}
              />

              <AnalogDialGauge 
                title="Rotary Speed"
                value={whatIfParams.rpm}
                min={60}
                max={200}
                unit="RPM"
                color="#06B6D4"
              />

              <AnalogDialGauge 
                title="Pump Flow Rate"
                value={whatIfParams.flowRate}
                min={whatIfParams.flowRate}
                max={850}
                unit="gpm"
                color="#8B5CF6"
              />
            </div>

          </div>

          {/* Rig Floor Subsystems Status Indicator Lights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold pt-1 border-t border-slate-800">
            <div className="bg-slate-800/80 p-2 rounded-lg flex items-center justify-between border border-slate-700">
              <span className="text-slate-300">Mud Pump #1:</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> PUMPING ({whatIfParams.flowRate} gpm)
              </span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg flex items-center justify-between border border-slate-700">
              <span className="text-slate-300">Top Drive Motor:</span>
              <span className="text-cyan-400 font-mono flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 animate-spin" /> {whatIfParams.rpm} RPM
              </span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg flex items-center justify-between border border-slate-700">
              <span className="text-slate-300">Drawworks Brake:</span>
              <span className="text-amber-400 font-mono flex items-center gap-1">
                <Radio className="w-3.5 h-3.5" /> WOB {whatIfParams.wob} klbs
              </span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg flex items-center justify-between border border-slate-700">
              <span className="text-slate-300">BOP Stack Valve:</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> STANDBY
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Parameter Sliders & What-If Predicted Risk Meters */}
        <div className="bg-slate-50 dark:bg-slate-900/90 p-4 rounded-xl border border-slate-300 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-600" />
              Interactive Drilling Parameter Control Sliders
            </h3>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              Adjust Sliders to Observe Realtime Code Visualizer Response
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Sliders Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-slate-800 dark:text-slate-200">Weight on Bit (WOB):</span>
                  <span className="font-mono text-amber-600 font-extrabold">{whatIfParams.wob} klbs</span>
                </div>
                <input 
                  type="range" min="10" max="35" step="0.5" value={whatIfParams.wob}
                  onChange={(e) => setWhatIfParams({...whatIfParams, wob: parseFloat(e.target.value)})}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-slate-800 dark:text-slate-200">Rotary Speed (RPM):</span>
                  <span className="font-mono text-cyan-600 font-extrabold">{whatIfParams.rpm} RPM</span>
                </div>
                <input 
                  type="range" min="60" max="200" step="5" value={whatIfParams.rpm}
                  onChange={(e) => setWhatIfParams({...whatIfParams, rpm: parseInt(e.target.value)})}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
              </div>

              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-slate-800 dark:text-slate-200">Mud Weight:</span>
                  <span className="font-mono text-emerald-600 font-extrabold">{whatIfParams.mudWeight} ppg</span>
                </div>
                <input 
                  type="range" min="9.5" max="12.5" step="0.1" value={whatIfParams.mudWeight}
                  onChange={(e) => setWhatIfParams({...whatIfParams, mudWeight: parseFloat(e.target.value)})}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-slate-800 dark:text-slate-200">Pump Flow Rate:</span>
                  <span className="font-mono text-purple-600 font-extrabold">{whatIfParams.flowRate} gpm</span>
                </div>
                <input 
                  type="range" min="450" max="850" step="10" value={whatIfParams.flowRate}
                  onChange={(e) => setWhatIfParams({...whatIfParams, flowRate: parseInt(e.target.value)})}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-slate-800 dark:text-slate-200">Standpipe Pressure:</span>
                  <span className="font-mono text-blue-600 font-extrabold">{whatIfParams.pressure} psi</span>
                </div>
                <input 
                  type="range" min="1800" max="3400" step="25" value={whatIfParams.pressure}
                  onChange={(e) => setWhatIfParams({...whatIfParams, pressure: parseInt(e.target.value)})}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Preset Scenarios Buttons */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-sm">
                <span className="text-slate-700 dark:text-slate-300 text-[11px]">Preset Simulation Envelope:</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <button 
                    onClick={() => setWhatIfParams({ wob: 18.5, rpm: 120, rop: 14.8, mudWeight: 10.8, flowRate: 680, pressure: 2450 })}
                    className="flex-1 py-1 bg-slate-800 text-white rounded text-[10px] font-bold cursor-pointer hover:bg-slate-700"
                  >
                    Optimal Default
                  </button>
                  <button 
                    onClick={() => setWhatIfParams({ wob: 28.5, rpm: 85, rop: 8.2, mudWeight: 11.8, flowRate: 720, pressure: 2950 })}
                    className="flex-1 py-1 bg-amber-600 text-white rounded text-[10px] font-bold cursor-pointer hover:bg-amber-700"
                  >
                    High Sticking
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Predicted Risk Meters Output */}
            <div className="lg:col-span-5 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm text-xs font-bold">
              <span className="text-slate-900 dark:text-white block uppercase tracking-wider text-xs border-b border-slate-200 dark:border-slate-700 pb-1.5">
                Simulated Hazard Risk Predictions:
              </span>
              
              <div>
                <div className="flex justify-between text-slate-800 dark:text-slate-200">
                  <span>Stuck Pipe Hazard Index:</span>
                  <span className="font-mono text-amber-600 font-extrabold">{simulatedStuckPipe}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden mt-1">
                  <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${simulatedStuckPipe}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-800 dark:text-slate-200">
                  <span>Gas Kick Influx Probability:</span>
                  <span className="font-mono text-red-600 font-extrabold">{simulatedKick}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden mt-1">
                  <div className="bg-red-500 h-full transition-all duration-300" style={{ width: `${simulatedKick}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-800 dark:text-slate-200">
                  <span>Mud Loss Propensity:</span>
                  <span className="font-mono text-purple-600 font-extrabold">{simulatedMudLoss}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden mt-1">
                  <div className="bg-purple-500 h-full transition-all duration-300" style={{ width: `${simulatedMudLoss}%` }} />
                </div>
              </div>

              <div className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg text-[11px] text-slate-700 dark:text-slate-300 font-mono">
                Hydrostatic Margin: {whatIfParams.mudWeight > 10.5 ? 'PROPERLY OVERBALANCED (+0.3 ppg)' : '⚠️ UNDERBALANCED (KICK DANGER)'}
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* DNA FORMATION (EARTH LAYER'S 3D VIEW) SECTION */}
      {/* ========================================================================= */}
      <section id="sec-depth-risk-matrix" className="pt-2">
        <EarthLayer3DView selectedFormation="Barail" />
      </section>

      {/* ========================================================================= */}
      {/* HISTORICAL REPLAY STORY TIMELINE SECTION */}
      {/* ========================================================================= */}
      <section className="pt-2">
        <HistoricalReplayTimeline activeWell={activeWell} />
      </section>

      {/* ========================================================================= */}
      {/* DEPTH-WISE RISK TIMELINE SECTION */}
      {/* ========================================================================= */}
      <section className="pt-2">
        <DepthWiseRiskTimeline activeWell={activeWell} />
      </section>

    </div>
  );
}
