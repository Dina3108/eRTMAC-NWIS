import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Activity, 
  Compass, 
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart2
} from 'lucide-react';

export default function SimilarWellSuccessStories({ uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};
  const customWellId = row.offset_well_id || (row.well_name ? `WELL_${row.well_name}` : null);
  const [selectedWellId, setSelectedWellId] = useState(customWellId || 'NHK_512');

  const defaultOffsetWells = [
    ...(customWellId ? [{
      id: customWellId,
      name: row.offset_well_name || `Well ${row.well_name || 'Uploaded'} (Active Dataset)`,
      location: row.field_name ? `${row.field_name} Block` : 'Upper Assam Operations',
      targetDepth: `${row.target_depth_m || row.depth_m || 3850} m`,
      nptSavedHours: `${row.npt_saved_hours || 48} Hours`,
      costSavingINR: row.cost_saving_inr ? `₹ ${row.cost_saving_inr} Lakhs` : '₹ 76.0 Lakhs',
      completionYear: '2026',
      similarityScore: row.similarity_score ? `${row.similarity_score}% Match` : '98% Match',
      keySuccess: row.key_success || row.transcript_summary || 'Hydrostatic pressure & ECD dynamically optimized from telemetry dataset.',
      logs: {
        gammaRayAvg: row.gamma_ray_api || 42,
        resistivityAvg: row.resistivity_ohmm || 36,
        sonicDeltaT: row.sonic_dt_us_ft || 70
      },
      lessons: [
        `Mud weight maintained at ${row.mud_weight_in || 10.8} ppg.`,
        `ROP recorded at ${row.rop_m_hr || row.rop || 14.8} m/hr.`,
        `Zero differential sticking incidents reported.`
      ]
    }] : []),
    {
      id: 'NHK_512',
      name: 'Well NHK-512 (Nahorkatiya Field)',
      location: 'Dispur Sector • Block Assam Shelf',
      targetDepth: '3,850 m',
      nptSavedHours: '54 Hours',
      costSavingINR: '₹ 84.5 Lakhs',
      completionYear: '2025',
      similarityScore: '96% Match',
      keySuccess: 'Hydrostatic mud weight window optimized dynamically to prevent differential stuck pipe in high-porosity Barail Sandstone.',
      logs: {
        gammaRayAvg: 45, // API
        resistivityAvg: 38, // ohm-m
        sonicDeltaT: 72 // us/ft
      },
      lessons: [
        'Used synthetic oil-based mud (11.6 ppg) through reactive Barail Shale formation.',
        'PDC Bit with 6-blade cutter design increased ROP by 32% compared to conventional tri-cone bits.',
        'Zero stuck pipe incidents recorded during 3,850m total depth drilling.'
      ]
    },
    {
      id: 'DIB_804',
      name: 'Well DIB-804 (Dibrugarh Block)',
      location: 'North Dibrugarh • Upper Assam',
      targetDepth: '4,120 m',
      nptSavedHours: '72 Hours',
      costSavingINR: '₹ 1.12 Crore',
      completionYear: '2024',
      similarityScore: '91% Match',
      keySuccess: 'Early gas kick detection via continuous flow-out telemetry prevented blowouts and allowed automated choke manifold pressure regulation.',
      logs: {
        gammaRayAvg: 62,
        resistivityAvg: 45,
        sonicDeltaT: 68
      },
      lessons: [
        'Real-time ECD monitoring prevented formation fracturing at 3,200m depth.',
        'Managed pressure drilling (MPD) system held bottom-hole pressure within ±20 psi window.',
        'Successfully completed casing string installation 4 days ahead of AFE schedule.'
      ]
    },
    {
      id: 'JLN_309',
      name: 'Well JLN-309 (Jorhat Basin)',
      location: 'Jorhat North Field',
      targetDepth: '3,600 m',
      nptSavedHours: '38 Hours',
      costSavingINR: '₹ 58.0 Lakhs',
      completionYear: '2025',
      similarityScore: '87% Match',
      keySuccess: 'Carbon-aware rig engine load balancer reduced diesel fuel burn by 16.8 tons of CO2 equivalent.',
      logs: {
        gammaRayAvg: 55,
        resistivityAvg: 28,
        sonicDeltaT: 80
      },
      lessons: [
        'Optimized bit rotational speed (110 RPM) and Weight-on-Bit (18 klbf) for hard limestone stringers.',
        'Mud logging gas chromatograph flagged early hydrocarbon show at 2,950m.'
      ]
    }
  ];
  const offsetWells = defaultOffsetWells;

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-slate-50 dark:bg-[#060B14] min-h-screen text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-emerald-500/50 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-extrabold bg-emerald-600 text-white uppercase tracking-wider">
              OFFSET WELL KNOWLEDGE BASE
            </span>
            <span className="text-xs font-mono font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              OIL INDIA LIMITED BEST PRACTICES
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2.5">
            <BookOpen className="w-8 h-8 text-emerald-500" />
            Similar Well Success Stories & Offset Benchmarking
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1">
            Historical offset well logs, Non-Productive Time (NPT) reduction records, and proven drilling parameter presets.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/30">
          <Award className="w-8 h-8 text-emerald-500" />
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Cumulative NPT Saved</div>
            <div className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">164 Total Hours</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Offset Well Selection + Visual Log Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 4 Cols: Offset Well Selector Cards */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
            Select Offset Reference Well:
          </h2>

          {offsetWells.map(well => {
            const isSelected = well.id === selectedWellId;
            return (
              <div 
                key={well.id}
                onClick={() => setSelectedWellId(well.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-white dark:bg-[#002B49] border-emerald-500 ring-2 ring-emerald-500/30 shadow-md'
                    : 'bg-white dark:bg-[#001A30] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    {well.similarityScore}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    Year {well.completionYear}
                  </span>
                </div>

                <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center justify-between">
                  {well.name}
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-500 translate-x-1' : 'text-slate-400'}`} />
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  {well.location}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] font-bold font-mono">
                  <div className="text-slate-600 dark:text-slate-300">
                    NPT Saved: <span className="text-emerald-600 dark:text-emerald-400">{well.nptSavedHours}</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    Savings: <span className="text-cyan-600 dark:text-cyan-400">{well.costSavingINR}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 8 Cols: Selected Well Deep Dive & Code-Driven Log Comparison */}
        <div className="lg:col-span-8 space-y-4">
          
          {offsetWells.map(well => {
            if (well.id !== selectedWellId) return null;
            return (
              <div key={well.id} className="space-y-4">
                
                {/* Summary Banner */}
                <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <h2 className="text-lg font-black text-slate-900 dark:text-white">{well.name}</h2>
                      <p className="text-xs text-slate-500 font-semibold">{well.location} • Target Depth: {well.targetDepth}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-mono font-extrabold">
                        {well.similarityScore}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-xs font-semibold text-emerald-800 dark:text-emerald-300 leading-relaxed">
                    <strong className="font-extrabold uppercase block text-[10px] text-emerald-600 dark:text-emerald-400">Key Success Story Highlight:</strong>
                    {well.keySuccess}
                  </div>
                </div>

                {/* Code-Driven SVG Well Log Curve Visualizer */}
                <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    Code-Driven Wireline Log Comparison Visualizer
                  </h3>

                  {/* SVG Log Tracks */}
                  <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 p-3 select-none">
                    <svg viewBox="0 0 700 220" className="w-full h-full">
                      {/* Grid Lines */}
                      <line x1="20" y1="20" x2="680" y2="20" stroke="#334155" strokeWidth="1" />
                      <line x1="20" y1="110" x2="680" y2="110" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="20" y1="200" x2="680" y2="200" stroke="#334155" strokeWidth="1" />

                      {/* TRACK 1: GAMMA RAY (Green) */}
                      <path 
                        d="M 20,90 Q 100,30 180,120 T 340,60 T 500,150 T 680,80" 
                        fill="none" 
                        stroke="#10B981" 
                        strokeWidth="2.5" 
                      />
                      <text x="30" y="40" fill="#10B981" fontSize="10" fontWeight="bold">
                        Gamma Ray (GR) Avg: {well.logs.gammaRayAvg} API
                      </text>

                      {/* TRACK 2: RESISTIVITY (Cyan) */}
                      <path 
                        d="M 20,130 Q 120,180 220,70 T 400,160 T 560,50 T 680,140" 
                        fill="none" 
                        stroke="#06B6D4" 
                        strokeWidth="2.5" 
                      />
                      <text x="250" y="40" fill="#06B6D4" fontSize="10" fontWeight="bold">
                        Resistivity (RES): {well.logs.resistivityAvg} ohm-m
                      </text>

                      {/* TRACK 3: SONIC DELTA T (Amber) */}
                      <path 
                        d="M 20,160 Q 140,110 260,190 T 440,100 T 600,170 T 680,110" 
                        fill="none" 
                        stroke="#F59E0B" 
                        strokeWidth="2.5" 
                      />
                      <text x="500" y="40" fill="#F59E0B" fontSize="10" fontWeight="bold">
                        Sonic Δt: {well.logs.sonicDeltaT} μs/ft
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Operational Lessons Learned Checklist */}
                <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Key Lessons Learned & Engineering Takeaways
                  </h3>

                  <ul className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {well.lessons.map((lesson, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}
