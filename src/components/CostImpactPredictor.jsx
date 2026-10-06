import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  BarChart2, 
  Sliders, 
  Compass, 
  CheckCircle2, 
  Layers,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

export default function CostImpactPredictor({ uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};

  const [nptDelayDays, setNptDelayDays] = useState(row.npt_delay_days !== undefined ? Number(row.npt_delay_days) : 4.5); // days
  const [rigSpreadRateDay, setRigSpreadRateDay] = useState(row.daily_rig_spread_rate_usd !== undefined ? Number(row.daily_rig_spread_rate_usd) : 45000); // USD / day
  const [mudCostPerBbl, setMudCostPerBbl] = useState(row.mud_cost_per_bbl_usd !== undefined ? Number(row.mud_cost_per_bbl_usd) : 140); // USD / bbl

  // Cost Calculations
  const afeBudgetUSD = row.afe_budget_usd !== undefined ? Number(row.afe_budget_usd) : 3400000;
  const plannedDurationDays = row.planned_duration_days !== undefined ? Number(row.planned_duration_days) : 35;
  const totalDurationDays = plannedDurationDays + nptDelayDays;
  
  const dailySpreadCost = totalDurationDays * rigSpreadRateDay;
  const nptCostPenaltyUSD = row.npt_cost_penalty_usd !== undefined ? Number(row.npt_cost_penalty_usd) : Math.round(nptDelayDays * rigSpreadRateDay);
  const totalProjectCostUSD = afeBudgetUSD + nptCostPenaltyUSD;
  const budgetVariancePercent = ((nptCostPenaltyUSD / (afeBudgetUSD || 1)) * 100).toFixed(1);

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-slate-50 dark:bg-[#060B14] min-h-screen text-slate-900 dark:text-slate-100">
      {/* Top Banner Header */}
      <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-cyan-500/50 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-extrabold bg-cyan-600 text-white uppercase tracking-wider">
              AFE FINANCIAL CONTROLLER
            </span>
            <span className="text-xs font-mono font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              NPT COST VARIANCE ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2.5">
            <DollarSign className="w-8 h-8 text-cyan-500" />
            Cost Impact Predictor & AFE Budget S-Curve
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1">
            Real-time financial impact calculator for Non-Productive Time (NPT), rig day rate, and drilling AFE S-Curve tracking.
          </p>
        </div>

        {/* Budget Status Badge */}
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">AFE Budget Variance</div>
            <div className={`text-lg font-black font-mono ${nptDelayDays > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
              +${(nptCostPenaltyUSD / 1000).toFixed(0)}k ({budgetVariancePercent}%)
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row (Matching Image 2 in attached reference) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-extrabold text-slate-500 uppercase font-mono">PLANNED DAYS</span>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">{plannedDurationDays} Days</div>
          <span className="text-[10px] font-bold text-slate-400">AFE Schedule Target</span>
        </div>

        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-extrabold text-slate-500 uppercase font-mono">NPT DELAY</span>
          <div className="text-2xl font-black font-mono text-amber-500">+{nptDelayDays} Days</div>
          <span className="text-[10px] font-bold text-amber-500">Stuck Pipe / Circulation</span>
        </div>

        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-extrabold text-slate-500 uppercase font-mono">AFE BUDGET</span>
          <div className="text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">${(afeBudgetUSD / 1000000).toFixed(2)}M</div>
          <span className="text-[10px] font-bold text-slate-400">Baseline Sanction</span>
        </div>

        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-extrabold text-slate-500 uppercase font-mono">FORECAST TOTAL</span>
          <div className="text-2xl font-black font-mono text-purple-600 dark:text-purple-400">${(totalProjectCostUSD / 1000000).toFixed(2)}M</div>
          <span className="text-[10px] font-bold text-purple-400">Revised Estimate</span>
        </div>

        <div className="bg-white dark:bg-[#001A30] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-extrabold text-slate-500 uppercase font-mono">RIG SPREAD RATE</span>
          <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">${(rigSpreadRateDay / 1000).toFixed(0)}k / day</div>
          <span className="text-[10px] font-bold text-emerald-400">All-In Operational Cost</span>
        </div>
      </div>

      {/* Main Grid: Code-Driven SVG S-Curve Chart + Simulator Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Code-Driven SVG Cumulative Cost S-Curve Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-500" />
              Cumulative Expenditure S-Curve (Planned vs Actual)
            </h2>
            <span className="text-xs font-mono font-bold text-slate-400">
              Days vs Expenditure ($)
            </span>
          </div>

          <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 p-3 select-none">
            <svg viewBox="0 0 500 220" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#1E293B" strokeWidth="1" />
              <line x1="40" y1="70" x2="480" y2="70" stroke="#1E293B" strokeWidth="1" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="#1E293B" strokeWidth="1" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="#334155" strokeWidth="1.5" />

              {/* Planned AFE S-Curve (Cyan Solid) */}
              <path 
                d="M 40,165 C 150,160 250,90 440,30" 
                fill="none" 
                stroke="#06B6D4" 
                strokeWidth="3" 
              />

              {/* Actual NPT Impacted S-Curve (Amber Dashed) */}
              <path 
                d="M 40,165 C 150,160 280,110 480,15" 
                fill="none" 
                stroke="#F59E0B" 
                strokeWidth="3" 
                strokeDasharray="5 3" 
              />

              {/* Day Markers */}
              <text x="40" y="190" fill="#94A3B8" fontSize="9" fontFamily="monospace">Day 0</text>
              <text x="180" y="190" fill="#94A3B8" fontSize="9" fontFamily="monospace">Day 14 (Surface)</text>
              <text x="340" y="190" fill="#94A3B8" fontSize="9" fontFamily="monospace">Day 28 (Intermed)</text>
              <text x="440" y="190" fill="#94A3B8" fontSize="9" fontFamily="monospace">Day {totalDurationDays.toFixed(0)} TD</text>

              {/* Current Cost Penalty Indicator */}
              <circle cx="340" cy="80" r="6" fill="#EF4444" className="animate-ping" />
              <circle cx="340" cy="80" r="4" fill="#EF4444" />
              <text x="350" y="75" fill="#FCA5A5" fontSize="10" fontWeight="bold" fontFamily="monospace">
                NPT Penalty: +${(nptCostPenaltyUSD / 1000).toFixed(0)}k
              </text>
            </svg>
          </div>
        </div>

        {/* Right 5 Cols: Financial Simulator Sliders */}
        <div className="lg:col-span-5 bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <h2 className="text-xs font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-500" />
            Financial Cost Impact Sliders
          </h2>

          {/* NPT Delay Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">Non-Productive Time (NPT):</span>
              <span className="text-amber-500 font-mono">+{nptDelayDays} Days</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="20" 
              step="0.5"
              value={nptDelayDays} 
              onChange={(e) => setNptDelayDays(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Rig Spread Rate Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">Daily Rig Spread Day Rate:</span>
              <span className="text-emerald-500 font-mono">${rigSpreadRateDay.toLocaleString()} / day</span>
            </div>
            <input 
              type="range" 
              min="20000" 
              max="100000" 
              step="2500"
              value={rigSpreadRateDay} 
              onChange={(e) => setRigSpreadRateDay(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Cost Savings Advice */}
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-xs font-semibold text-cyan-800 dark:text-cyan-300 leading-relaxed">
            <strong className="font-extrabold uppercase block text-[10px] text-cyan-600 dark:text-cyan-400">AI Cost Optimization Note:</strong>
            Preventing stuck pipe events via eRTMAC early-warning alerts can save up to 4.5 NPT days, preserving <strong>${(nptCostPenaltyUSD / 1000).toFixed(0)}k</strong> in AFE budget contingency.
          </div>
        </div>

      </div>
    </div>
  );
}
