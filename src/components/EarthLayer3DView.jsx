import React, { useState } from 'react';
import { Box, Compass } from 'lucide-react';

export default function EarthLayer3DView({ selectedFormation = 'Barail', uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};
  const formationName = row.formation_name || selectedFormation;
  const [activeLayer, setActiveLayer] = useState('ALL');

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border-2 border-purple-500/40 shadow-xl space-y-4 font-sans text-white">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-500/40 pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-purple-300 underline decoration-purple-500 underline-offset-8 flex items-center gap-2.5">
            <Box className="w-7 h-7 text-purple-400" />
            DNA Formation (Earth layer's 3D View)
          </h2>
          <p className="text-xs font-semibold text-slate-300 mt-1">
            3D Isometric Cutaway Model of Subterranean Strata, Reservoir Channels & Well Trajectories
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-extrabold text-purple-200 bg-purple-950 px-3 py-1.5 rounded-lg border border-purple-600">
            Assam Barail 3D Stratigraphy
          </span>
        </div>
      </div>

      {/* Main 3D Isometric Viewport + Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): 3D Isometric Cutaway Block Visualizer */}
        <div className="lg:col-span-8 bg-[#060B14] p-4 rounded-xl border border-slate-800 space-y-3 relative overflow-hidden select-none">
          
          <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-2">
            <span className="text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-cyan-400" />
              Subterranean Reservoir Isometric Cutaway (3D Geomechanical Block)
            </span>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
              3 WELL TRAJECTORIES ACTIVE
            </span>
          </div>

          {/* SVG 3D Isometric Block Visualizer */}
          <div className="w-full h-56 sm:h-80 relative flex items-center justify-center">
            <svg viewBox="0 0 550 320" className="w-full h-full">
              
              {/* Definition of Gradients & Patterns for Earth Layers */}
              <defs>
                {/* Striped Earth Overburden Texture */}
                <pattern id="overburdenPattern" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
                  <line x1="0" y1="0" x2="0" y2="20" stroke="#78350F" strokeWidth="6" />
                  <line x1="10" y1="0" x2="10" y2="20" stroke="#92400E" strokeWidth="6" />
                </pattern>

                {/* Gas Cap Gradient */}
                <linearGradient id="gasCapGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0.9" />
                </linearGradient>

                {/* Oil Channel Gradient (Green to Purple Channel) */}
                <linearGradient id="oilChannelGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#C41E3A" />
                </linearGradient>

                {/* Water Zone Gradient */}
                <linearGradient id="waterZoneGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E3A8A" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
              </defs>

              {/* TOP STRATA OVERBURDEN WALL (Isometric Angle) */}
              <polygon points="120,40 380,40 480,100 220,100" fill="url(#overburdenPattern)" stroke="#451A03" strokeWidth="1.5" />
              <polygon points="220,100 480,100 480,140 220,140" fill="#78350F" stroke="#451A03" strokeWidth="1" opacity="0.8" />
              
              <text x="160" y="80" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">Overbank</text>

              {/* GAS CAP ZONE (Cyan Top Layer) */}
              <polygon points="220,110 440,110 420,135 200,135" fill="url(#gasCapGrad)" stroke="#0284C7" strokeWidth="1" />
              <text x="310" y="125" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Gas</text>

              {/* OIL CHANNEL ZONE (Green/Purple Pay Zone) */}
              <path d="M 170 140 Q 270 120 400 150 L 370 195 Q 240 160 140 185 Z" fill="url(#oilChannelGrad)" stroke="#059669" strokeWidth="1.5" opacity="0.95" />
              <text x="240" y="155" fill="#FFFFFF" fontSize="12" fontWeight="extrabold" fontFamily="sans-serif">Oil Channel</text>

              {/* OWC - OIL WATER CONTACT DEMARCATION LINE */}
              <path d="M 150 175 Q 260 155 385 180" fill="none" stroke="#00F5D4" strokeWidth="2.5" strokeDasharray="5 3" />
              <text x="290" y="172" fill="#00F5D4" fontSize="10" fontWeight="bold" fontFamily="mono">OWC (Oil-Water Contact)</text>

              {/* WATER ZONE & WOC (Deep Blue Bottom Layer) */}
              <polygon points="140,185 370,195 440,240 180,240" fill="url(#waterZoneGrad)" stroke="#1E40AF" strokeWidth="1" />
              <text x="380" y="225" fill="#60A5FA" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Water</text>

              {/* 3D VERTICAL WELL TRAJECTORIES (PIPES EXTENDING DOWNWARD) */}
              {/* Well 1 */}
              <line x1="260" y1="10" x2="260" y2="155" stroke="#F8FAFC" strokeWidth="2.5" />
              <circle cx="260" cy="155" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
              
              {/* Well 2 */}
              <line x1="290" y1="15" x2="290" y2="160" stroke="#F8FAFC" strokeWidth="2.5" />
              <circle cx="290" cy="160" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
              
              {/* Well 3 (Active Rig RDS-04) */}
              <line x1="390" y1="20" x2="390" y2="190" stroke="#00F5D4" strokeWidth="3" />
              <circle cx="390" cy="190" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
              <text x="395" y="25" fill="#00F5D4" fontSize="10" fontWeight="bold" fontFamily="mono">RDS-04</text>
            </svg>
          </div>

          {/* Bottom Row Slices & Facies Legend */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            
            {/* Porosity Multi-Tiered Slice Preview */}
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <span className="font-extrabold text-cyan-400 block uppercase tracking-wider text-[11px]">
                Horizontal Porosity Slices (b):
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400">Porosity:</span>
                <div className="flex-1 h-3 rounded bg-gradient-to-r from-blue-600 via-green-500 via-yellow-400 to-red-600" />
                <span className="text-[10px] font-mono text-slate-300">1.0 - 0.0</span>
              </div>
              <p className="text-[10px] text-slate-400">
                Upper, Middle, & Lower Reservoir Layer Slices (Barail Main Pay)
              </p>
            </div>

            {/* Lithofacies Map Legend (c) */}
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <span className="font-extrabold text-amber-400 block uppercase tracking-wider text-[11px]">
                Lithofacies Map Legend (c):
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-500"></span>
                  <span className="text-slate-300">Shale (Grey)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-500"></span>
                  <span className="text-slate-300">Silt (Green)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-red-600"></span>
                  <span className="text-slate-300">Silty Sand (Red)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-yellow-400"></span>
                  <span className="text-slate-300">Sand (Yellow)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column (4 cols): Layer Stratigraphic Breakdown */}
        <div className="lg:col-span-4 bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 font-semibold text-xs">
          <span className="font-extrabold text-white uppercase tracking-wider block border-b border-slate-800 pb-1.5">
            Geological Layer Specifications:
          </span>

          <div className="p-2.5 bg-sky-950/60 rounded-lg border border-sky-600/40 space-y-1">
            <span className="text-sky-300 font-extrabold block">1. Gas Cap Layer (Top Zone)</span>
            <p className="text-slate-300 text-[11px]">
              High gas saturation zone (S_g = 72%), pore pressure gradient 0.433 psi/ft.
            </p>
          </div>

          <div className="p-2.5 bg-emerald-950/60 rounded-lg border border-emerald-600/40 space-y-1">
            <span className="text-emerald-300 font-extrabold block">2. Oil Channel Pay Zone (Barail Main)</span>
            <p className="text-slate-300 text-[11px]">
              Active hydrocarbon pay zone. Porosity φ = 22.4%, permeability K = 185 mD.
            </p>
          </div>

          <div className="p-2.5 bg-blue-950/60 rounded-lg border border-blue-600/40 space-y-1">
            <span className="text-blue-300 font-extrabold block">3. OWC & Water Aquifer Layer</span>
            <p className="text-slate-300 text-[11px]">
              Oil-Water Contact interface at depth 2,580 m. Water salinity 18,500 ppm.
            </p>
          </div>

          <div className="p-3 bg-purple-950/40 rounded-lg border border-purple-600/40 text-purple-200 text-[11px] space-y-1">
            <span className="font-extrabold block text-purple-300">Geomechanical Integrity:</span>
            <p>
              Main Pay channel bounded by swelling Kopili Shale underneath. Maintain mud weight at 10.8 ppg to prevent hole collapse.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
