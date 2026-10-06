import React, { useState } from 'react';
import { 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Compass, 
  Wrench, 
  TrendingUp, 
  BarChart2, 
  Info,
  ChevronRight
} from 'lucide-react';

export default function CasingDecisionSupport({ uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};
  const [targetDepth, setTargetDepth] = useState(row.target_depth_m ?? row.surface_casing_depth_m ?? 3800);
  const [selectedMudWeight, setSelectedMudWeight] = useState(row.mud_weight_ppg ?? row.mud_weight_in ?? 11.8);
  const [selectedGrade, setSelectedGrade] = useState(row.casing_grade || 'P110');
  const [selectedCasingString, setSelectedCasingString] = useState('INTERMEDIATE');

  // Calculates casing collapse & burst safety factors
  const hydrostaticPressure = Math.round(0.052 * selectedMudWeight * (targetDepth * 3.28084)); // psi
  const collapseRating = selectedGrade === 'Q125' ? 12800 : selectedGrade === 'P110' ? 10400 : 8200; // psi
  const burstRating = selectedGrade === 'Q125' ? 14200 : selectedGrade === 'P110' ? 12100 : 9600; // psi
  
  const collapseSafetyFactor = (collapseRating / (hydrostaticPressure || 1)).toFixed(2);
  const burstSafetyFactor = (burstRating / (hydrostaticPressure * 1.15 || 1)).toFixed(2);

  const casingStrings = [
    {
      id: 'SURFACE',
      name: 'Surface Casing',
      diameter: '13-3/8"',
      depthRange: '0m – 850m',
      weight: '68 lb/ft',
      grade: 'N80',
      purpose: 'Isolates shallow freshwater aquifers and weak upper sediments.',
      safetyMargin: '1.45 (Optimal)'
    },
    {
      id: 'INTERMEDIATE',
      name: 'Intermediate Casing',
      diameter: '9-5/8"',
      depthRange: '850m – 2,400m',
      weight: '47 lb/ft',
      grade: 'P110',
      purpose: 'Seals reactive shale layers and prevents lost circulation in abnormally pressured zones.',
      safetyMargin: `${collapseSafetyFactor} (Calculated)`
    },
    {
      id: 'PRODUCTION',
      name: 'Production Metal Liner',
      diameter: '7" & 4-1/2"',
      depthRange: '2,400m – 3,800m',
      weight: '29 lb/ft Premium',
      grade: selectedGrade,
      purpose: 'Provides long-term structural integrity across high-pressure hydrocarbon gas reservoir.',
      safetyMargin: `${burstSafetyFactor} (Calculated)`
    }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-slate-50 dark:bg-[#060B14] min-h-screen text-slate-900 dark:text-slate-100">
      {/* Top Banner Header */}
      <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-cyan-500/50 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-extrabold bg-cyan-600 text-white uppercase tracking-wider">
              API SPEC 5CT / 5C3 DECISION MATRIX
            </span>
            <span className="text-xs font-mono font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              WELLBORE CASING PROGRAMME
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2.5">
            <Layers className="w-8 h-8 text-cyan-500" />
            Casing Decision Support & Wellbore Integrity Visualizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1">
            Visual stratigraphy depth alignment for Surface (13-3/8"), Intermediate (9-5/8"), and Production Metal Casing (7" & 4-1/2").
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Hydrostatic Head</div>
            <div className="text-lg font-black font-mono text-cyan-600 dark:text-cyan-400">{hydrostaticPressure} psi</div>
          </div>
          <div className="w-px h-8 bg-slate-300 dark:bg-slate-700" />
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Collapse Safety Factor</div>
            <div className={`text-lg font-black font-mono ${parseFloat(collapseSafetyFactor) >= 1.12 ? 'text-emerald-500' : 'text-red-500'}`}>
              {collapseSafetyFactor} {parseFloat(collapseSafetyFactor) >= 1.12 ? '✅' : '⚠️'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Code-Driven SVG Well Cross-Section + Interactive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Interactive SVG Well Casing Cross-Section Diagram */}
        <div className="lg:col-span-7 bg-white dark:bg-[#001A30] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-500" />
              Interactive Well Casing & Stratigraphy Schematic
            </h2>

            <span className="text-xs font-mono font-bold text-slate-500">
              Total Depth: {targetDepth}m ({Math.round(targetDepth * 3.28084)} ft)
            </span>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="relative w-full h-[460px] bg-slate-950 rounded-xl border border-slate-800 p-2 overflow-hidden flex select-none">
            
            {/* Left Lithology Depth Scale */}
            <div className="w-24 border-r border-slate-800 flex flex-col justify-between py-4 text-[10px] font-mono font-bold text-slate-400 pr-2">
              <div className="flex items-center justify-between">
                <span>0m</span>
                <span className="text-[9px] text-emerald-400">Surface</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800/60 pt-1">
                <span>850m</span>
                <span className="text-[9px] text-amber-400">Alluvium</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800/60 pt-1">
                <span>1,800m</span>
                <span className="text-[9px] text-indigo-400">Shale</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800/60 pt-1">
                <span>2,700m</span>
                <span className="text-[9px] text-orange-400">Gas Zone</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800/60 pt-1">
                <span>{targetDepth}m</span>
                <span className="text-[9px] text-cyan-400">TD Target</span>
              </div>
            </div>

            {/* SVG Center Wellbore Diagram */}
            <div className="flex-1 relative">
              <svg viewBox="0 0 320 440" className="w-full h-full">
                
                {/* Stratigraphy Soil Layer Blocks */}
                <rect x="0" y="0" width="320" height="90" fill="#1C1917" opacity="0.6" />
                <rect x="0" y="90" width="320" height="110" fill="#1E1B4B" opacity="0.6" />
                <rect x="0" y="200" width="320" height="110" fill="#451A03" opacity="0.6" />
                <rect x="0" y="310" width="320" height="130" fill="#042F2E" opacity="0.6" />

                {/* 1. SURFACE CASING (13-3/8") */}
                <g 
                  onClick={() => setSelectedCasingString('SURFACE')}
                  className="cursor-pointer group"
                >
                  {/* Outer Surface Casing */}
                  <rect x="70" y="10" width="180" height="100" fill="none" stroke="#38BDF8" strokeWidth="4" />
                  <rect x="74" y="10" width="172" height="100" fill="#0284C7" opacity="0.2" />
                  <text x="160" y="60" fill="#7DD3FC" fontSize="11" fontWeight="black" textAnchor="middle">
                    Surface Casing 13-3/8" (0 - 850m)
                  </text>
                </g>

                {/* 2. INTERMEDIATE CASING (9-5/8") */}
                <g 
                  onClick={() => setSelectedCasingString('INTERMEDIATE')}
                  className="cursor-pointer group"
                >
                  <rect x="105" y="110" width="110" height="140" fill="none" stroke="#10B981" strokeWidth="3.5" />
                  <rect x="108" y="110" width="104" height="140" fill="#059669" opacity="0.2" />
                  <text x="160" y="180" fill="#6EE7B7" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Intermediate 9-5/8" (850 - 2,400m)
                  </text>
                </g>

                {/* 3. PRODUCTION METAL CASING LINER (7" / 4-1/2") */}
                <g 
                  onClick={() => setSelectedCasingString('PRODUCTION')}
                  className="cursor-pointer group"
                >
                  <rect x="130" y="250" width="60" height="160" fill="none" stroke="#F59E0B" strokeWidth="3" />
                  <rect x="132" y="250" width="56" height="160" fill="#D97706" opacity="0.25" />
                  <text x="160" y="320" fill="#FCD34D" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Production Liner 7"
                  </text>
                  <text x="160" y="335" fill="#FDE68A" fontSize="9" fontWeight="mono" textAnchor="middle">
                    Grade: {selectedGrade}
                  </text>
                </g>

                {/* DRILL STRING (CENTER IN TUBE) */}
                <rect x="154" y="10" width="12" height="400" fill="#64748B" stroke="#94A3B8" strokeWidth="1" />

                {/* DRILL BIT AT TD */}
                <path d="M 148 410 L 172 410 L 160 425 z" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />

                {/* Hydrostatic Pressure Gradient Lines */}
                <path d="M 270 30 Q 290 200 300 420" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
                <text x="280" y="220" fill="#38BDF8" fontSize="8" fontWeight="bold">Hydrostatic Line</text>

                <path d="M 280 30 Q 305 200 315 420" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />
                <text x="285" y="250" fill="#EF4444" fontSize="8" fontWeight="bold">Frac Gradient</text>
              </svg>
            </div>

          </div>

        </div>

        {/* Right 5 Cols: Interactive Parameter Sliders & Casing Selection Matrix */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Casing Parameter Adjuster */}
          <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-500" />
              Casing Decision Parameter Controls
            </h3>

            {/* Target Depth Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-400">Total Depth (TD Target):</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-mono">{targetDepth} meters</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="5000" 
                step="50"
                value={targetDepth} 
                onChange={(e) => setTargetDepth(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Mud Weight Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-400">Mud Density (Mud Weight):</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">{selectedMudWeight} ppg</span>
              </div>
              <input 
                type="range" 
                min="9.0" 
                max="16.5" 
                step="0.1"
                value={selectedMudWeight} 
                onChange={(e) => setSelectedMudWeight(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* API Steel Grade Selector */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
                API Metal Casing Steel Grade:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['N80', 'P110', 'Q125'].map(grade => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`py-2 px-3 rounded-lg font-mono font-extrabold text-xs transition-all cursor-pointer border ${
                      selectedGrade === grade
                        ? 'bg-cyan-600 text-white border-cyan-400 shadow-md ring-2 ring-cyan-500/30'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Casing String Specs Card */}
          <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-500" />
              Recommended Casing Specification Details
            </h3>

            {casingStrings.map(cs => {
              if (cs.id !== selectedCasingString) return null;
              return (
                <div key={cs.id} className="space-y-3">
                  <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                    <div className="text-base font-black text-cyan-600 dark:text-cyan-400">{cs.name} ({cs.diameter})</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">{cs.purpose}</div>
                  </div>

                  <div className="space-y-2 text-xs font-bold">
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500">Depth Setting Interval:</span>
                      <span className="font-mono text-slate-900 dark:text-white">{cs.depthRange}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500">Nominal Weight:</span>
                      <span className="font-mono text-slate-900 dark:text-white">{cs.weight}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500">Selected API Grade:</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400">{cs.grade}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Design Safety Factor:</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400">{cs.safetyMargin}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
