import React, { useState } from 'react';
import { 
  Wrench, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Sliders, 
  Compass, 
  ShieldAlert, 
  Flame, 
  Zap,
  BarChart2
} from 'lucide-react';

export default function ToolLifePrediction({ uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};

  const [drillingHours, setDrillingHours] = useState(row.drilling_hours_on_bit !== undefined ? Number(row.drilling_hours_on_bit) : 48); // hours on bit
  const [wobLoad, setWobLoad] = useState(row.wob_klbf !== undefined ? Number(row.wob_klbf) : 18.5); // klbf
  const [rpmSpeed, setRpmSpeed] = useState(row.rpm !== undefined ? Number(row.rpm) : 120); // rpm

  // Wear Calculations
  const bitWearPercentage = Math.min(100, Math.round((drillingHours / 75) * 100));
  const dullGradeScale = row.iadc_dull_grade !== undefined ? Number(row.iadc_dull_grade) : Math.min(8, Math.round((drillingHours / 75) * 8)); // IADC Dull Grade 0-8
  const remainingBitHours = row.remaining_bit_life_hours !== undefined ? Number(row.remaining_bit_life_hours) : Math.max(0, 75 - drillingHours);

  const mudPump1HoursLeft = row.mud_pump1_valve_life_hours !== undefined ? Number(row.mud_pump1_valve_life_hours) : 142;
  const mudPump2HoursLeft = row.mud_pump2_valve_life_hours !== undefined ? Number(row.mud_pump2_valve_life_hours) : 180;
  const topDriveMotorTemp = row.topdrive_motor_temp_c !== undefined ? Number(row.topdrive_motor_temp_c) : Math.round(65 + (wobLoad * 1.8)); // C

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-slate-50 dark:bg-[#060B14] min-h-screen text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-amber-500/50 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-extrabold bg-amber-600 text-white uppercase tracking-wider">
              IADC DULL GRADE STANDARDS
            </span>
            <span className="text-xs font-mono font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              EQUIPMENT LIFE PREDICTION
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2.5">
            <Wrench className="w-8 h-8 text-amber-500" />
            Tool Life Prediction (Remaining Life of Drill Bit, Pump & Motor)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1">
            Real-time cutter wear degradation model, mud pump valve longevity, and top-drive motor health.
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Bit IADC Dull Grade</div>
            <div className={`text-lg font-black font-mono ${dullGradeScale >= 6 ? 'text-red-500' : 'text-emerald-500'}`}>
              Dull Grade: {dullGradeScale} / 8 {dullGradeScale >= 6 ? '⚠️ TRIP' : '✅ OK'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: 3 Equipment Status Cards (Bit, Mud Pump, Top Drive Motor) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Cols: Drill Bit PDC Cutter Wear Visualizer */}
        <div className="lg:col-span-6 bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-500" />
              PDC Drill Bit Cutter Wear Visualizer
            </h2>
            <span className="text-xs font-mono font-bold text-amber-500">
              8-Blade Matrix PDC Bit
            </span>
          </div>

          {/* SVG PDC Bit Head Diagram */}
          <div className="w-full h-56 bg-slate-950 rounded-xl border border-slate-800 p-3 flex items-center justify-center select-none relative">
            <svg viewBox="0 0 240 200" className="w-full h-full">
              {/* Outer PDC Bit Crown Body */}
              <circle cx="120" cy="100" r="75" fill="#1E293B" stroke="#475569" strokeWidth="4" />
              <circle cx="120" cy="100" r="30" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
              
              {/* 8 PDC Cutter Blades */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <g key={i} transform={`rotate(${angle} 120 100)`}>
                  <rect x="114" y="30" width="12" height="35" rx="3" fill={dullGradeScale >= 6 ? '#EF4444' : '#F59E0B'} stroke="#FCD34D" strokeWidth="1" />
                  <circle cx="120" cy="40" r="4" fill="#FFFFFF" />
                </g>
              ))}

              <text x="120" y="104" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                NOZZLE
              </text>
            </svg>

            {/* Wear Overlay Label */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 p-2 rounded border border-slate-700 text-[11px] font-mono font-bold">
              <span>Remaining Bit Life: </span>
              <span className="text-emerald-400">{remainingBitHours} Hours</span>
            </div>
          </div>

          {/* Wear Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">Drill Bit Cutter Wear:</span>
              <span className="text-amber-500 font-mono">{bitWearPercentage}% Worn</span>
            </div>
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${bitWearPercentage}%` }} />
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Mud Pump & Top Drive Motor Life Cards */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Mud Pump #1 & #2 Wear Card */}
          <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              Triplex Mud Pump Liners & Valve Wear Status
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">Mud Pump #1 (1,600 HP)</div>
                  <div className="text-[11px] text-slate-500">Fluid End Valves & Piston Liners</div>
                </div>
                <div className="text-right font-mono font-extrabold">
                  <div className="text-emerald-600 dark:text-emerald-400 text-sm">{mudPump1HoursLeft} Hrs Left</div>
                  <div className="text-[10px] text-slate-400">Health: {Math.min(100, Math.round((mudPump1HoursLeft / 160) * 100))}%</div>
                </div>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">Mud Pump #2 (1,600 HP)</div>
                  <div className="text-[11px] text-slate-500">Fluid End Valves & Piston Liners</div>
                </div>
                <div className="text-right font-mono font-extrabold">
                  <div className="text-cyan-600 dark:text-cyan-400 text-sm">{mudPump2HoursLeft} Hrs Left</div>
                  <div className="text-[10px] text-slate-400">Health: {Math.min(100, Math.round((mudPump2HoursLeft / 190) * 100))}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Drive Motor Thermal Health Card */}
          <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-500" />
              Top Drive AC Motor Health & Winding Temp
            </h3>

            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-black text-purple-700 dark:text-purple-300">AC Motor Winding Temp</div>
                <div className="text-[11px] text-slate-500">Normal Range: 50°C - 85°C</div>
              </div>
              <div className="text-right font-mono font-extrabold">
                <div className="text-purple-600 dark:text-purple-400 text-base">{topDriveMotorTemp}°C</div>
                <div className="text-[10px] text-emerald-500">Optimal Thermal Load</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
