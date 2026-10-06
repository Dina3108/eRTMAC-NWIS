import React, { useState } from 'react';
import { 
  Flame, 
  Zap, 
  TrendingDown, 
  Leaf, 
  Activity, 
  BarChart2, 
  Gauge, 
  CheckCircle2, 
  Sliders, 
  Compass, 
  RefreshCw,
  Award
} from 'lucide-react';

export default function CarbonAwareDrillingAdvisor({ uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};

  const [ecoMode, setEcoMode] = useState(row.eco_drilling_mode !== undefined ? row.eco_drilling_mode === 'ENABLED' || row.eco_drilling_mode === true : true);
  const [targetPowerLoad, setTargetPowerLoad] = useState(1850); // kW

  // Engine usage calculations
  const engine1Load = row.engine1_load_percent !== undefined ? Number(row.engine1_load_percent) : (ecoMode ? 82 : 95);
  const engine2Load = row.engine2_load_percent !== undefined ? Number(row.engine2_load_percent) : (ecoMode ? 78 : 92);
  const engine3Load = row.engine3_load_percent !== undefined ? Number(row.engine3_load_percent) : (ecoMode ? 65 : 88);
  const engine4Load = row.engine4_load_percent !== undefined ? Number(row.engine4_load_percent) : (ecoMode ? 0 : 70); // Idle engine off in eco mode

  const totalFuelLitersPerHour = row.fuel_consumption_liters_hr !== undefined ? Number(row.fuel_consumption_liters_hr) : Math.round((engine1Load + engine2Load + engine3Load + engine4Load) * 2.85);
  const totalCO2TonsPerDay = row.co2_emissions_tons_day !== undefined ? Number(row.co2_emissions_tons_day).toFixed(2) : ((totalFuelLitersPerHour * 24 * 2.68) / 1000).toFixed(2);
  const carbonSavingsPercent = ecoMode ? '18.4%' : '0%';

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-slate-50 dark:bg-[#060B14] min-h-screen text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-emerald-500/50 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-extrabold bg-emerald-600 text-white uppercase tracking-wider flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5" /> GREEN DRILLING ESG INITIATIVE
            </span>
            <span className="text-xs font-mono font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              OIL INDIA DECARBONIZATION DESK
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2.5">
            <Flame className="w-8 h-8 text-emerald-500" />
            Carbon Aware Drilling Advisor (Engine & Emission Visualizer)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1">
            Real-time rig engine fuel consumption monitoring, CO2 emission reduction telemetry, and energy load balancing.
          </p>
        </div>

        {/* Eco Mode Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setEcoMode(!ecoMode)}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md ${
              ecoMode 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-500/40' 
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
            }`}
          >
            <Leaf className="w-4 h-4 text-emerald-300" />
            {ecoMode ? '🌱 ECO-DRILLING OPTIMIZER ACTIVE' : 'ACTIVATE ECO-DRILLING OPTIMIZER'}
          </button>
        </div>
      </div>

      {/* KPI Stats Row (4 Metric Cards matching user diagram) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase font-mono">TOTAL FUEL CONSUMPTION</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">{totalFuelLitersPerHour}</span>
            <span className="text-xs font-bold text-slate-400">Liters / Hr</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-500 block">📉 -145 L/hr in Eco Mode</span>
        </div>

        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase font-mono">TOTAL CO2 EMISSIONS</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">{totalCO2TonsPerDay}</span>
            <span className="text-xs font-bold text-slate-400">Tons / Day</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-500 block">🌿 Net Zero Alignment Stage 2</span>
        </div>

        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase font-mono">CARBON REDUCTION INDEX</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black font-mono text-amber-500">{carbonSavingsPercent}</span>
            <span className="text-xs font-bold text-slate-400">CO2 Cut</span>
          </div>
          <span className="text-[10px] font-bold text-amber-500 block">⚡ Hybrid Battery Buffer Active</span>
        </div>

        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase font-mono">RIG POWER DEMAND</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black font-mono text-purple-600 dark:text-purple-400">{targetPowerLoad}</span>
            <span className="text-xs font-bold text-slate-400">kW</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 block">Generator Capacity: 3,200 kW</span>
        </div>
      </div>

      {/* Main Grid: 4 Rig Engine Gauges + Fuel/CO2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Cols: 4 Rig Diesel Engine Generators Load Bars */}
        <div className="lg:col-span-6 bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              Rig Generator Engine Power Usage Dials (#1 - #4)
            </h2>
            <span className="text-xs font-mono font-bold text-emerald-500">
              4x Caterpillar 3512 Gensets
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* ENGINE #1 */}
            <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-extrabold">
                <span className="text-slate-700 dark:text-slate-300">Engine #1 (Main)</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400">{engine1Load}% Load</span>
              </div>
              <div className="w-full h-3 bg-slate-300 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${engine1Load}%` }} />
              </div>
              <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                <span>280 L/hr</span>
                <span>Optimal Efficiency</span>
              </div>
            </div>

            {/* ENGINE #2 */}
            <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-extrabold">
                <span className="text-slate-700 dark:text-slate-300">Engine #2 (Mud Pump)</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">{engine2Load}% Load</span>
              </div>
              <div className="w-full h-3 bg-slate-300 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${engine2Load}%` }} />
              </div>
              <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                <span>254 L/hr</span>
                <span>Optimal Efficiency</span>
              </div>
            </div>

            {/* ENGINE #3 */}
            <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-extrabold">
                <span className="text-slate-700 dark:text-slate-300">Engine #3 (Drawworks)</span>
                <span className="font-mono text-amber-500">{engine3Load}% Load</span>
              </div>
              <div className="w-full h-3 bg-slate-300 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${engine3Load}%` }} />
              </div>
              <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                <span>198 L/hr</span>
                <span>Medium Load</span>
              </div>
            </div>

            {/* ENGINE #4 (STANDBY / OFF IN ECO MODE) */}
            <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-extrabold">
                <span className="text-slate-700 dark:text-slate-300">Engine #4 (Auxiliary)</span>
                <span className={`font-mono ${engine4Load === 0 ? 'text-slate-400' : 'text-purple-400'}`}>
                  {engine4Load === 0 ? '0% (ECO OFF)' : `${engine4Load}% Load`}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-300 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${engine4Load}%` }} />
              </div>
              <div className="text-[10px] font-mono text-slate-500 flex justify-between">
                <span>{engine4Load === 0 ? '0 L/hr' : '210 L/hr'}</span>
                <span>{engine4Load === 0 ? 'Standby Shutdown' : 'Active'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Code-Driven SVG Fuel vs Power Curve Chart */}
        <div className="lg:col-span-6 bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-500" />
              Fuel Consumption vs Rig Power Demand Curve
            </h2>
            <span className="text-xs font-mono font-bold text-slate-400">
              kW vs L/hr
            </span>
          </div>

          <div className="w-full h-56 bg-slate-950 rounded-xl border border-slate-800 p-3 select-none">
            <svg viewBox="0 0 500 200" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#1E293B" strokeWidth="1" />
              <line x1="40" y1="70" x2="480" y2="70" stroke="#1E293B" strokeWidth="1" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="#1E293B" strokeWidth="1" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="#334155" strokeWidth="1.5" />

              {/* Baseline Standard Curve (Red Dashed) */}
              <path 
                d="M 40,160 Q 200,120 480,30" 
                fill="none" 
                stroke="#EF4444" 
                strokeWidth="2" 
                strokeDasharray="4 4" 
              />

              {/* Eco Mode Optimized Curve (Green Solid) */}
              <path 
                d="M 40,165 Q 220,140 480,60" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="3" 
              />

              {/* Current Operating Point Marker */}
              <circle cx="280" cy="115" r="7" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" className="animate-ping" />
              <circle cx="280" cy="115" r="5" fill="#F59E0B" />
              
              <text x="290" y="110" fill="#FCD34D" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Current: {targetPowerLoad} kW ({totalFuelLitersPerHour} L/h)
              </text>

              <text x="50" y="190" fill="#94A3B8" fontSize="9" fontFamily="monospace">500 kW</text>
              <text x="250" y="190" fill="#94A3B8" fontSize="9" fontFamily="monospace">1,800 kW</text>
              <text x="440" y="190" fill="#94A3B8" fontSize="9" fontFamily="monospace">3,200 kW</text>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
