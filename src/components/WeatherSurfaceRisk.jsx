import React, { useState } from 'react';
import { 
  Wind, 
  CloudRain, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  MapPin, 
  Sun,
  ShieldAlert,
  Activity
} from 'lucide-react';

export default function WeatherSurfaceRisk({ uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};

  const [lightningAlert, setLightningAlert] = useState(row.h2s_alarm_state !== undefined ? row.h2s_alarm_state === 'CRITICAL' || row.h2s_alarm_state === true : false);
  const [rainRateMm, setRainRateMm] = useState(row.rainfall_intensity_mm_hr !== undefined ? Number(row.rainfall_intensity_mm_hr) : 14); // mm/hr

  const windSpeedKnots = row.wind_speed_knots !== undefined ? Number(row.wind_speed_knots) : 18;
  const ambientTempC = row.ambient_temp_c !== undefined ? Number(row.ambient_temp_c) : 31;
  const roadAccessStatus = row.road_access_status !== undefined ? row.road_access_status : (rainRateMm > 25 ? 'FLOOD RISK' : 'ACCESSIBLE');

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-slate-50 dark:bg-[#060B14] min-h-screen text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-cyan-500/50 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-extrabold bg-cyan-600 text-white uppercase tracking-wider">
              INDIAN METEOROLOGICAL DEPT (IMD) FEED
            </span>
            <span className="text-xs font-mono font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              UPPER ASSAM RIG SITE METEO
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2.5">
            <Wind className="w-8 h-8 text-cyan-500" />
            Weather + Surface Risk Intimation Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1">
            Real-time storm tracking, lightning warning radius, logistics road flood risk, and rig mast wind hazard controls.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setLightningAlert(!lightningAlert)}
          className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md ${
            lightningAlert
              ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-500/40'
              : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          {lightningAlert ? '⚡ LIGHTNING ALERT ACTIVE' : 'TEST LIGHTNING STRIKE ALARM'}
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase font-mono">WIND VELOCITY</span>
          <div className="text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">{windSpeedKnots} Knots</div>
          <span className="text-[10px] font-bold text-emerald-500">Rig Mast Limit: 45 Knots</span>
        </div>

        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase font-mono">RAINFALL INTENSITY</span>
          <div className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">{rainRateMm} mm/hr</div>
          <span className="text-[10px] font-bold text-slate-400">Moderate Monsoon Rain</span>
        </div>

        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase font-mono">AMBIENT TEMP</span>
          <div className="text-2xl font-black font-mono text-amber-500">{ambientTempC}°C</div>
          <span className="text-[10px] font-bold text-slate-400">Relative Humidity: 82%</span>
        </div>

        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase font-mono">ROAD ACCESS RISK</span>
          <div className={`text-2xl font-black font-mono ${rainRateMm > 25 ? 'text-red-500' : 'text-emerald-500'}`}>
            {roadAccessStatus}
          </div>
          <span className="text-[10px] font-bold text-slate-400">Dibrugarh Access Route</span>
        </div>
      </div>

      {/* Main Grid: Code-Driven Weather Radar SVG + Safety Protocol Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Code-Driven Weather Radar Graphic */}
        <div className="lg:col-span-7 bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-500" />
              Live Doppler Weather Radar Sweep
            </h2>
            <span className="text-xs font-mono font-bold text-emerald-500">
              25 km Sweep Radius
            </span>
          </div>

          <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 p-2 flex items-center justify-center select-none relative">
            <svg viewBox="0 0 240 240" className="w-full h-full">
              {/* Radar Rings */}
              <circle cx="120" cy="120" r="100" fill="none" stroke="#1E293B" strokeWidth="1.5" />
              <circle cx="120" cy="120" r="70" fill="none" stroke="#1E293B" strokeWidth="1.5" />
              <circle cx="120" cy="120" r="40" fill="none" stroke="#1E293B" strokeWidth="1.5" />

              {/* Crosshairs */}
              <line x1="20" y1="120" x2="220" y2="120" stroke="#334155" strokeWidth="1" />
              <line x1="120" y1="20" x2="120" y2="220" stroke="#334155" strokeWidth="1" />

              {/* RIG CENTER MARKER */}
              <circle cx="120" cy="120" r="5" fill="#38BDF8" />
              <text x="120" y="110" fill="#38BDF8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                RIG #7
              </text>

              {/* LIGHTNING ALERTS IF ACTIVE */}
              {lightningAlert && (
                <g className="animate-ping">
                  <circle cx="160" cy="80" r="12" fill="#EF4444" opacity="0.6" />
                  <path d="M 160 72 L 156 82 L 160 82 L 158 90 L 164 80 L 160 80 z" fill="#FCD34D" />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Right 5 Cols: Safety Advisory Checklist */}
        <div className="lg:col-span-5 bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <h2 className="text-xs font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-500" />
            Rig Weather Safety Protocol Guidelines
          </h2>

          <ul className="space-y-2.5 text-xs font-semibold">
            <li className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Rig mast lightning grounding straps inspected and continuity verified.</span>
            </li>
            <li className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>If wind speeds exceed 35 knots, suspend pipe racking operations on monkey board.</span>
            </li>
            <li className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Maintain emergency drainage pumps active at pit perimeter during heavy monsoon rainfall.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
