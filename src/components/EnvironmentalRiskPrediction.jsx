import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Droplets, 
  Wind, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Compass, 
  Sliders, 
  Flame, 
  Activity,
  Layers
} from 'lucide-react';

export default function EnvironmentalRiskPrediction({ uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};

  const [spillVolumeBbls, setSpillVolumeBbls] = useState(row.spill_volume_bbl !== undefined ? Number(row.spill_volume_bbl) : 15); // bbls
  const [rainfallMmPerHour, setRainfallMmPerHour] = useState(row.rainfall_intensity_mm_hr !== undefined ? Number(row.rainfall_intensity_mm_hr) : 12); // mm/h
  const [containmentActive, setContainmentActive] = useState(row.containment_boom_status !== undefined ? row.containment_boom_status === 'DEPLOYED' || row.containment_boom_status === true : true);

  // Risk Calculations
  const calculatedPlumeRadiusMeters = row.spill_dispersion_radius_m !== undefined ? Number(row.spill_dispersion_radius_m) : Math.round(spillVolumeBbls * 4.2 + (rainfallMmPerHour * 2.5));
  const distanceToNearestStream = row.distance_to_nearest_stream_m !== undefined ? Number(row.distance_to_nearest_stream_m) : 480; // meters
  const isStreamThreatened = calculatedPlumeRadiusMeters >= distanceToNearestStream;

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-slate-50 dark:bg-[#060B14] min-h-screen text-slate-900 dark:text-slate-100">
      {/* Top Banner Header */}
      <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-purple-500/50 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-extrabold bg-purple-600 text-white uppercase tracking-wider">
              MINISTRY OF ENVIRONMENT & FORESTS (MoEFCC) COMPLIANCE
            </span>
            <span className="text-xs font-mono font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              ENVIRONMENTAL HAZARD MODEL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2.5">
            <Droplets className="w-8 h-8 text-purple-500" />
            Environmental Risk Prediction & Spill Runoff Trajectory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1">
            GIS terrain contour analysis, surface hydrocarbon runoff dispersion model, and stream buffer protection monitoring.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Spill Dispersion Radius</div>
            <div className="text-lg font-black font-mono text-purple-600 dark:text-purple-400">{calculatedPlumeRadiusMeters} meters</div>
          </div>
          <div className="w-px h-8 bg-slate-300 dark:bg-slate-700" />
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Nearest River Buffer</div>
            <div className={`text-lg font-black font-mono ${isStreamThreatened ? 'text-red-500' : 'text-emerald-500'}`}>
              480m {isStreamThreatened ? '⚠️ RISK' : '✅ SAFE'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Code-Driven SVG GIS Risk Map + Simulation Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Code-Driven SVG Environmental GIS Map */}
        <div className="lg:col-span-8 bg-white dark:bg-[#001A30] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-500" />
              GIS Hydrocarbon Spill Trajectory Map
            </h2>

            <div className="flex items-center gap-2 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-purple-400">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                Spill Plume
              </span>
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
                Stream Protection Buffer
              </span>
            </div>
          </div>

          {/* SVG GIS Map Canvas */}
          <div className="relative w-full h-[420px] bg-slate-950 rounded-xl border border-slate-800 p-2 overflow-hidden select-none">
            
            {/* GIS Topo Contours */}
            <svg viewBox="0 0 700 400" className="w-full h-full">
              
              {/* TERRAIN TOPOGRAPHY CONTOURS */}
              <path d="M 0,100 C 150,50 350,150 700,80" fill="none" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 0,220 C 200,180 400,260 700,200" fill="none" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 0,340 C 250,300 450,380 700,320" fill="none" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* BRAHMAPUTRA TRIBUTARY STREAM (Cyan River Channel) */}
              <path d="M 520,0 C 540,120 580,260 620,400" fill="none" stroke="#06B6D4" strokeWidth="16" opacity="0.4" />
              <path d="M 520,0 C 540,120 580,260 620,400" fill="none" stroke="#38BDF8" strokeWidth="4" />
              <text x="560" y="80" fill="#7DD3FC" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                Brahmaputra Tributary Stream (500m Buffer)
              </text>

              {/* 500m ENVIRONMENTAL BUFFER LINE */}
              <line x1="450" y1="0" x2="490" y2="400" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 4" />
              <text x="400" y="30" fill="#FCD34D" fontSize="10" fontWeight="bold">500m Regulatory Protection Line</text>

              {/* DRILLING RIG SITE CENTER */}
              <rect x="180" y="180" width="80" height="80" rx="8" fill="#0F172A" stroke="#A855F7" strokeWidth="2" />
              <circle cx="220" cy="220" r="10" fill="#A855F7" />
              <text x="180" y="280" fill="#E9D5FF" fontSize="11" fontWeight="extrabold">
                WELL PAD SITE #7
              </text>

              {/* SIMULATED SPILL PLUME CONTOUR (Purple Animated Circle/Ellipse) */}
              <g transform="translate(220, 220)">
                <ellipse 
                  cx="0" 
                  cy="0" 
                  rx={calculatedPlumeRadiusMeters * 0.8} 
                  ry={calculatedPlumeRadiusMeters * 0.6} 
                  fill="url(#spillGradient)" 
                  opacity="0.65"
                  className="animate-pulse"
                />
                <ellipse 
                  cx="0" 
                  cy="0" 
                  rx={calculatedPlumeRadiusMeters * 0.8} 
                  ry={calculatedPlumeRadiusMeters * 0.6} 
                  fill="none" 
                  stroke="#C084FC" 
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <defs>
                  <radialGradient id="spillGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#9333EA" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#A855F7" stopOpacity="0.1" />
                  </radialGradient>
                </defs>
              </g>

              {/* RUNOFF FLOW VECTOR ARROWS */}
              <path d="M 270 220 L 370 220" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrow-yellow)" />
              <text x="290" y="210" fill="#FCD34D" fontSize="10" fontWeight="bold">Slope Runoff Gradient (2.4° SE)</text>

              {/* CONTAINMENT BOOMS IF ACTIVE */}
              {containmentActive && (
                <g>
                  <path d="M 320,160 L 340,280" stroke="#10B981" strokeWidth="5" strokeDasharray="4 2" />
                  <text x="350" y="220" fill="#6EE7B7" fontSize="10" fontWeight="extrabold">
                    CONTAINMENT BOOM BARRIER DEPLOYED
                  </text>
                </g>
              )}
            </svg>
          </div>

        </div>

        {/* Right 4 Cols: Spill Parameters & Compliance Checklist */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Simulation Sliders */}
          <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-500" />
              Spill Trajectory Simulator Controls
            </h3>

            {/* Spill Volume Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-400">Hydrocarbon Spill Volume:</span>
                <span className="text-purple-600 dark:text-purple-400 font-mono">{spillVolumeBbls} Barrels (bbl)</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                step="1"
                value={spillVolumeBbls} 
                onChange={(e) => setSpillVolumeBbls(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Rainfall Rate Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-400">Rainfall Runoff Rate:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-mono">{rainfallMmPerHour} mm/hr</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                step="2"
                value={rainfallMmPerHour} 
                onChange={(e) => setRainfallMmPerHour(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Containment Boom Toggle */}
            <button
              onClick={() => setContainmentActive(!containmentActive)}
              className={`w-full py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                containmentActive
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {containmentActive ? 'Containment Boom Barrier Deployed' : 'Deploy Containment Boom Barrier'}
            </button>
          </div>

          {/* Environmental Compliance Checklist */}
          <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-500" />
              Environmental Mitigation Checklist
            </h3>

            <ul className="space-y-2 text-xs font-semibold">
              <li className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-between border border-slate-200 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300">Retention Pit Reserve Capacity</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">1,200 bbl (OK)</span>
              </li>
              <li className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-between border border-slate-200 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300">Oil Skimmer Pump Readiness</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">Standby (100%)</span>
              </li>
              <li className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-between border border-slate-200 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300">Aquatic Bio-Toxicity Rating</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">Low Risk</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
