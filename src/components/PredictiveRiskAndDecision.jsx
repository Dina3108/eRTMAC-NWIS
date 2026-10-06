import React from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  CheckSquare, 
  Clock, 
  Award, 
  ArrowUpRight,
} from 'lucide-react';
import { getRecommendedOffsetWells } from '../utils/aiEngines';

export default function PredictiveRiskAndDecision({ telemetry, riskScores, activeWell, uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};
  const activeDepth = row.depth_m ?? row.measured_depth ?? telemetry.depth;
  const activeFormation = row.formation_name || activeWell.currentFormation;
  const recommendedWells = getRecommendedOffsetWells(activeDepth, activeFormation);

  const mlModels = [
    { risk: "Mud Loss Propensity", model: "XGBoost Classifier", accuracy: "94.2%", status: "Active", leadTime: "45 mins prior" },
    { risk: "Gas Kick Influx", model: "Random Forest Ensemble", accuracy: "96.8%", status: "Active", leadTime: "20 mins prior" },
    { risk: "Stuck Pipe / Differential Sticking", model: "LSTM Recurrent Net", accuracy: "91.5%", status: "Active", leadTime: "60 mins prior" },
    { risk: "Torque & Drag Surge", model: "ARIMA Time-Series", accuracy: "89.4%", status: "Active", leadTime: "15 mins prior" },
    { risk: "Pore Pressure Anomaly", model: "Isolation Forest", accuracy: "93.1%", status: "Active", leadTime: "30 mins prior" }
  ];

  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto font-sans">
      {/* Header Bar */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#002B49] text-amber-400 rounded-lg">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Modules 5 & 7: Similar Well Finder & AI Decision Support Engine
              <span className="text-xs px-2 py-0.5 rounded bg-amber-600 text-white font-mono font-bold">
                NPT Prevention
              </span>
            </h2>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Matching operational telemetry against high-similarity offset wells to predict hazards and recommend preemptive actions
            </p>
          </div>
        </div>

        {/* NPT Savings Summary Badge */}
        <div className="flex items-center gap-3 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-400 px-4 py-2 rounded-xl text-emerald-900 dark:text-emerald-400 text-xs font-bold">
          <Clock className="w-5 h-5 shrink-0 text-emerald-700" />
          <div>
            <span className="font-extrabold text-slate-900 dark:text-white block">Est. NPT Prevention Impact:</span>
            <span className="text-emerald-800 dark:text-emerald-400 font-extrabold">{riskScores.nptSavingsEst || "Avoided 18 hrs NPT / ₹22,500,000"}</span>
          </div>
        </div>
      </div>

      {/* Grid Row 1: Module 5 Recommended High-Similarity Offset Wells */}
      <div className="glass-panel p-4 rounded-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            Module 5: Recommended High-Similarity Offset Wells
          </h3>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Vector Trajectory & Pressure Match</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recommendedWells.slice(0, 3).map((well) => (
            <div key={well.id} className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 space-y-2 hover:border-slate-400 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">{well.id} ({well.field})</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-extrabold bg-[#002B49] text-cyan-300">
                  {well.computedSimilarity}% Similarity
                </span>
              </div>
              <div className="text-xs text-slate-800 dark:text-slate-200 font-semibold grid grid-cols-2 gap-1 border-t border-b border-slate-200 dark:border-slate-800 py-1.5">
                <div>Distance: <strong>{well.distanceKm} km</strong></div>
                <div>Avg ROP: <strong>{well.ropAvg} m/hr</strong></div>
                <div>Status: <strong>{well.status}</strong></div>
                <div>Max Mud Wt: <strong>{well.mudProgram.maxMudWeight} ppg</strong></div>
              </div>
              <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Key Incidents: <strong className="text-amber-700 dark:text-amber-400">{well.incidents.map(i => i.type).join(', ')}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Row 2: ML Model Cockpit & Decision Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* ML Predictive Models */}
        <div className="glass-panel p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Machine Learning Predictive Model Architecture
            </h3>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Live eRTMAC Stream</span>
          </div>

          <div className="space-y-2 text-xs font-bold">
            {mlModels.map((m, idx) => (
              <div key={idx} className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">{m.risk}</span>
                  <span className="text-slate-700 dark:text-slate-300 text-[11px] font-semibold">Model: {m.model}</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono font-extrabold block">{m.accuracy} Acc</span>
                  <span className="text-slate-600 dark:text-slate-400 text-[10px]">Lead Time: {m.leadTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rig Supervisor Action Checklist */}
        <div className="glass-panel p-4 rounded-xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-emerald-600" />
                Rig Supervisor AI Decision Support Checklist
              </h3>
              <span className="text-xs text-emerald-700 font-extrabold">1-Click Execution</span>
            </div>

            <div className="space-y-2.5 mt-3">
              {[
                { step: 1, action: "Verify KCL Polymer concentration is maintained above 5.5%", status: "COMPLETE" },
                { step: 2, action: "Pre-mix 40 bbl Fibrous LCM pill (Nutplug + Mica) in reserve slug tank", status: "PENDING" },
                { step: 3, action: "Set rotary torque high warning limit at 16,000 ft-lbs on driller console", status: "COMPLETE" },
                { step: 4, action: "Monitor trip tank continuously during bit connection", status: "IN_PROGRESS" }
              ].map((item) => (
                <div key={item.step} className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#002B49] text-cyan-300 font-mono flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <span className="text-slate-900 dark:text-slate-100 font-semibold">{item.action}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    item.status === 'COMPLETE' ? 'bg-emerald-600 text-white' :
                    item.status === 'IN_PROGRESS' ? 'bg-amber-600 text-white' : 'bg-slate-300 text-slate-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-cyan-50 dark:bg-cyan-500/10 rounded-lg border border-cyan-300 dark:border-cyan-500/30 text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between mt-4">
            <span>Linked Evidence: <strong>WCR-OIL-102 (2021)</strong> & <strong>WCR-OIL-145 (2023)</strong></span>
            <ArrowUpRight className="w-4 h-4 text-cyan-700 cursor-pointer" />
          </div>
        </div>

      </div>
    </div>
  );
}
