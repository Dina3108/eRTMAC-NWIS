import React from 'react';
import { 
  Cpu, 
  Database, 
  Layers, 
  FileText, 
  Activity, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Workflow,
  Radio,
  Server
} from 'lucide-react';
import { TECHNICAL_APPROACH_LAYERS } from '../data/technicalApproachData';

export default function TechnicalApproachViewer() {
  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto font-sans">
      {/* SIH Header Banner */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#002B49] text-amber-400 rounded-lg shadow-md">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              SIH 2026 TECHNICAL APPROACH & ARCHITECTURE
              <span className="text-xs px-2.5 py-0.5 rounded bg-[#C41E3A] text-white font-mono font-bold">
                TEAM LUCIFER
              </span>
            </h2>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              End-to-End Enterprise 12-Layer System Architecture for Oil India Limited (eRTMAC-NWIS)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-800 text-xs">
          <Radio className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          <div>
            <span className="font-extrabold text-slate-900 dark:text-white block">Pipeline Execution:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold font-mono">12/12 LAYERS INTEGRATED</span>
          </div>
        </div>
      </div>

      {/* 12-Layer System Architecture Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TECHNICAL_APPROACH_LAYERS.map((layer) => (
          <div 
            key={layer.step}
            className="glass-panel p-4 rounded-xl space-y-3 relative overflow-hidden hover:shadow-xl transition-all border border-slate-300 dark:border-slate-800"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Server className="w-4 h-4 text-cyan-600" />
                {layer.title}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-extrabold border ${layer.badgeBg}`}>
                {layer.status}
              </span>
            </div>

            <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              {layer.description}
            </p>

            {/* Technology Stack Pills */}
            <div className="pt-1">
              <span className="text-[10px] font-extrabold text-slate-600 dark:text-slate-400 block mb-1 uppercase tracking-wider">
                Tech Stack Components:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {layer.technologies.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Flow Summary Banner */}
      <div className="p-4 bg-gradient-to-r from-[#002B49] via-[#001A30] to-[#800020] text-white rounded-xl shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>
            <strong>eRTMAC-NWIS Architectural Verification:</strong> Real-time 50Hz Kafka ingestion, PaddleOCR NLP pipeline, PostGIS spatial queries, XGBoost/LSTM predictive risk models, and React decision dashboard operating synchronously.
          </span>
        </div>
        <span className="font-mono text-cyan-300 font-extrabold">Smart India Hackathon 2026</span>
      </div>
    </div>
  );
}
