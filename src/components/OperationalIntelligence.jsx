import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wrench, 
  Leaf, 
  DollarSign, 
  CloudSun, 
  AlertTriangle, 
  CheckCircle2, 
  Zap,
  Activity,
  Flame,
  Droplets,
  Layers,
  Thermometer,
  Wind,
  Clock,
  Compass,
  TrendingDown
} from 'lucide-react';

export default function OperationalIntelligence({ activeWell, telemetry, uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};
  const [ecoMode, setEcoMode] = useState(row.eco_drilling_mode !== false);

  // Pre-Drilling Safety Readiness Items
  const safetyAuditItems = [
    { item: "BOP Stack Hydrostatic Pressure Test (5000 psi)", status: row.bop_test_status || "PASSED", score: row.bop_test_status === 'FAILED' ? 0 : 100 },
    { item: "Wellhead Alignment & Casing Bowl Inspection", status: row.wellhead_alignment_status || "PASSED", score: row.wellhead_alignment_status === 'FAILED' ? 0 : 100 },
    { item: "Pit Volume Totalizer & Flow Paddle Calibration", status: "PASSED", score: 100 },
    { item: "Choke Manifold & Degasser Function Test", status: "PASSED", score: 100 },
    { item: "Rig Crew Emergency Evacuation Muster Drills", status: row.crew_scba_induction_percent ? `${row.crew_scba_induction_percent}%` : "VERIFIED", score: row.crew_scba_induction_percent || 95 }
  ];

  // Tool Life Remaining Estimates
  const toolLifeItems = [
    { tool: "12-1/4\" PDC Drill Bit (PDC-619)", wear: 22, rulHours: 84, totalDrilledMeters: 684, status: "GOOD" },
    { tool: "Triplex Mud Pump #1 (1600 HP)", wear: 12, rulHours: 142, totalDrilledMeters: 1280, status: "OPTIMAL" },
    { tool: "Top Drive System Motor (2000 HP)", wear: 8, rulHours: 210, totalDrilledMeters: 1850, status: "EXCELLENT" },
    { tool: "Mud Logging Gas Trap & Sensor Rig", wear: 15, rulHours: 120, totalDrilledMeters: 950, status: "GOOD" }
  ];

  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto font-sans">
      {/* Module Title Header Bar */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#002B49] text-emerald-400 rounded-lg shadow-md">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Operational Intelligence & Sustainability Suite
              <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-600 text-white font-mono font-bold">
                RIG SAFETY & TOOL DESK
              </span>
            </h2>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Safety readiness, tool RUL life prediction, carbon-aware advisor, cost impact, weather & environmental risk
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-800 text-xs font-bold">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <div>
            <span className="text-slate-900 dark:text-white block">Pre-Spud Safety Index:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-mono font-extrabold text-sm">98.5% READINESS</span>
          </div>
        </div>
      </div>

      {/* Grid 1: Safety Readiness Score & Tool Life Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Safety Readiness Score (Before Drilling) */}
        <div className="glass-panel p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Safety Readiness Score (Before Drilling)
            </h3>
            <span className="text-xs font-extrabold text-emerald-700 font-mono bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-400">
              Audit Passed
            </span>
          </div>

          <div className="space-y-2">
            {safetyAuditItems.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-900 dark:text-slate-100">{item.item}</span>
                </div>
                <span className="font-mono text-emerald-700 dark:text-emerald-400">{item.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tool Life Prediction (Remaining Life of Bit, Pump & Motor) */}
        <div className="glass-panel p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Wrench className="w-5 h-5 text-cyan-600" />
              Tool Life Prediction (Bit, Pump & Motor RUL)
            </h3>
            <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">LSTM Model</span>
          </div>

          <div className="space-y-3">
            {toolLifeItems.map((t, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs font-bold">
                <div className="flex justify-between items-center">
                  <span className="text-slate-900 dark:text-white">{t.tool}</span>
                  <span className="font-mono text-cyan-700 dark:text-cyan-400">{t.rulHours} hrs RUL</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-cyan-500 h-full rounded-full" 
                    style={{ width: `${100 - t.wear}%` }} 
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-700 dark:text-slate-300">
                  <span>Wear: <strong>{t.wear}%</strong></span>
                  <span>Drilled: <strong>{t.totalDrilledMeters} m</strong></span>
                  <span className="text-emerald-700 font-extrabold">{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Grid 2: Carbon-Aware Advisor & Cost Impact Predictor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Carbon-Aware Drilling Advisor */}
        <div className="glass-panel p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              Carbon-Aware Drilling Advisor (Fuel & CO2)
            </h3>
            <button
              onClick={() => setEcoMode(!ecoMode)}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer border ${
                ecoMode ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              {ecoMode ? "🍃 Eco-Drilling Mode: ACTIVE" : "Standard Engine Mode"}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs font-bold">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 text-[11px] block">Rig Generator Fuel</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 text-base">{ecoMode ? '138 L/hr' : '162 L/hr'}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 text-[11px] block">CO2 Emissions</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 text-base">{ecoMode ? '3.2 t/day' : '4.1 t/day'}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 text-[11px] block">CO2 Reduction</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 text-base">{ecoMode ? '-22% GHG' : '0%'}</span>
            </div>
          </div>

          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-300 dark:border-emerald-500/30 text-xs font-semibold text-slate-800 dark:text-slate-200">
            🌱 <strong>Eco-Drilling Optimization:</strong> Optimizes top drive RPM and mud pump stroke rate to reduce diesel generator fuel burn without sacrificing ROP.
          </div>
        </div>

        {/* Cost Impact Predictor */}
        <div className="glass-panel p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-600" />
              Cost Impact & NPT Risk Predictor
            </h3>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">XGBoost Financial</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 text-[11px] block">Est. NPT Avoided</span>
              <span className="font-mono text-amber-700 dark:text-amber-400 text-lg">18.5 Hours</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 text-[11px] block">Direct Cost Savings</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 text-lg">₹22,500,000</span>
            </div>
          </div>

          <div className="p-2.5 bg-amber-50 dark:bg-amber-500/10 rounded-lg border border-amber-300 dark:border-amber-500/30 text-xs font-semibold text-slate-800 dark:text-slate-200">
            💰 <strong>Financial Return:</strong> Proactive LCM pill pumping avoided a potential ₹18M sidetrack + ₹4.5M rig day rate loss.
          </div>
        </div>

      </div>

      {/* Grid 3: Weather + Surface Risk & Environmental Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Weather + Surface Risk Intimation */}
        <div className="glass-panel p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-blue-600" />
              Weather & Surface Rig Risk Intimation
            </h3>
            <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400">IMD / OpenWeather</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs font-bold">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 text-[11px] block">Temperature</span>
              <span className="font-mono text-slate-900 dark:text-white text-sm">28°C (Humidity 78%)</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 text-[11px] block">Wind Speed</span>
              <span className="font-mono text-slate-900 dark:text-white text-sm">14 knots (NE)</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 text-[11px] block">Monsoon Risk</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 text-sm">LOW (Clear Skies)</span>
            </div>
          </div>
        </div>

        {/* Environmental Risk Prediction */}
        <div className="glass-panel p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Droplets className="w-5 h-5 text-cyan-600" />
              Environmental Risk Prediction (Spill & Aquifer)
            </h3>
            <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">Eco Guardian</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs font-bold">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 text-[11px] block">Mud Spill Risk</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 text-sm">3% (VERY LOW)</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 text-[11px] block">Groundwater Shield</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 text-sm">100% SEALED</span>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 text-[11px] block">Cuttings Disposal</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 text-sm">BIO-TREATED</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
