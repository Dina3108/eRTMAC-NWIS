import React, { useState } from 'react';
import { 
  Dna, 
  Lightbulb, 
  BookOpen,
  Layers,
  Box
} from 'lucide-react';
import { FORMATION_DNA } from '../data/formationDNAData';
import EarthLayer3DView from './EarthLayer3DView';

export default function FormationDNAViewer({ uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};
  const [selectedFormation, setSelectedFormation] = useState(row.formation_name || 'Barail');
  const [view3D, setView3D] = useState(true);
  const dna = FORMATION_DNA[selectedFormation];

  // Casing Decision Support Specifications
  const casingSpecs = [
    { type: "Surface Casing (13-3/8\")", depth: "0 - 1200 m", grade: "K-55 (54.5#)", purpose: "Isolates fresh groundwater aquifers in Girujan clay.", status: "SET & CEMENTED" },
    { type: "Intermediate Casing (9-5/8\")", depth: "1200 - 2100 m", grade: "N-80 (40.0#)", purpose: "Seals high-loss Tipam porous sandstones before entering Barail.", status: "SET @ 2100m" },
    { type: "Production Casing / Liner (7\" / 4-1/2\")", depth: "2100 - 3450 m", grade: "P-110 (29.0#)", purpose: "High-collapse rating casing for Barail Main Pay reservoir & Kopili gas.", status: "RECOMMENDED" }
  ];

  return (
    <div className="p-4 space-y-5 max-w-[1600px] mx-auto font-sans">
      {/* Title & Formation Selector Header */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#002B49] text-purple-400 rounded-lg shadow-md">
            <Dna className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              DNA Formation (Earth layer's 3D View)
              <span className="text-xs px-2.5 py-0.5 rounded bg-purple-700 text-white font-mono font-bold">
                3D Subterranean Cutaway
              </span>
            </h2>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              3D Earth stratigraphy layers, reservoir channel contacts (Overbank, Gas, Oil, OWC, Water) & Casing Decision Support
            </p>
          </div>
        </div>

        {/* Formation Stratigraphy Tabs & 3D Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setView3D(!view3D)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border shadow-sm ${
              view3D ? 'bg-purple-700 text-white border-purple-500' : 'bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >
            🧊 {view3D ? "3D Earth Layer View: ACTIVE" : "Show 3D View"}
          </button>

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-300 dark:border-slate-800 text-xs">
            {Object.keys(FORMATION_DNA).map((formKey) => (
              <button
                key={formKey}
                onClick={() => setSelectedFormation(formKey)}
                className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${
                  selectedFormation === formKey
                    ? 'bg-[#002B49] text-white shadow-md'
                    : 'text-slate-800 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {formKey}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Isometric Earth Layer Cutaway View Component */}
      {view3D && (
        <section>
          <EarthLayer3DView selectedFormation={selectedFormation} uploadedDataset={uploadedDataset} />
        </section>
      )}

      {/* Main Formation DNA Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Column (1/3): Lithology & Metrics */}
        <div className="glass-panel p-4 rounded-xl space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{dna.name}</h3>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#002B49] text-cyan-400">
                {dna.age}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">{dna.lithology}</p>
          </div>

          <div className="space-y-2 text-xs font-bold">
            <div className="flex justify-between p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300">Depth Range:</span>
              <span className="font-mono text-slate-900 dark:text-white">{dna.depthRange}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300">Typical ROP Envelope:</span>
              <span className="font-mono text-cyan-700 dark:text-cyan-400">{dna.typicalROP}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300">Historical Wells Analyzed:</span>
              <span className="font-mono text-amber-700 dark:text-amber-400">{dna.offsetIncidentsRecorded} Wells</span>
            </div>
          </div>
        </div>

        {/* Center Column (1/3): Casing Decision Support */}
        <div className="glass-panel p-4 rounded-xl space-y-3">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-600" />
              Casing Decision Support (Surface, Int. & Metal Casing)
            </h3>
            <span className="text-xs font-mono font-bold text-cyan-700">Decision Tree</span>
          </div>

          <div className="space-y-2 text-xs font-bold">
            {casingSpecs.map((c, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-900 dark:text-white font-extrabold">{c.type}</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400">{c.status}</span>
                </div>
                <div className="text-slate-700 dark:text-slate-300 text-[11px]">
                  Grade: <strong>{c.grade}</strong> • Depth: <strong>{c.depth}</strong>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-normal">{c.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1/3): Reusable Guidelines */}
        <div className="glass-panel p-4 rounded-xl space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-600" />
              Institutional Memory & Rules
            </h3>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">OIL Rules</span>
          </div>

          <div className="space-y-3">
            {dna.historicalMitigationRules.map((rule, idx) => (
              <div key={idx} className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 text-xs font-semibold flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-slate-800 dark:text-slate-200 leading-relaxed font-sans">{rule}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
