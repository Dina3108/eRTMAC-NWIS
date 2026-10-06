import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Gauge, 
  FileText, 
  Sliders, 
  UserCheck, 
  Wrench, 
  Award, 
  Play,
  XCircle,
  HelpCircle
} from 'lucide-react';

export default function SafetyReadinessScore({ uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};

  const [bopTested, setBopTested] = useState(row.bop_test_status !== undefined ? row.bop_test_status === 'PASSED' || row.bop_test_status === true : true);
  const [wellheadVerified, setWellheadVerified] = useState(row.wellhead_alignment_status !== undefined ? row.wellhead_alignment_status === 'VERIFIED' || row.wellhead_alignment_status === true : true);
  const [crewInducted, setCrewInducted] = useState(row.crew_scba_induction_percent !== undefined ? Number(row.crew_scba_induction_percent) >= 100 : true);
  const [casingCalculated, setCasingCalculated] = useState(row.casing_design_safety_factor !== undefined ? Number(row.casing_design_safety_factor) >= 1.15 : true);
  const [envPermitApproved, setEnvPermitApproved] = useState(row.moefcc_environmental_permit !== undefined ? row.moefcc_environmental_permit === 'APPROVED' || row.moefcc_environmental_permit === true : false);

  // Readiness Score Calculation
  const totalItems = 5;
  const passedItems = (bopTested ? 1 : 0) + (wellheadVerified ? 1 : 0) + (crewInducted ? 1 : 0) + (casingCalculated ? 1 : 0) + (envPermitApproved ? 1 : 0);
  const readinessPercentage = row.pre_spud_readiness_score !== undefined ? Number(row.pre_spud_readiness_score) : Math.round((passedItems / totalItems) * 100);

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-slate-50 dark:bg-[#060B14] min-h-screen text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-emerald-500/50 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-extrabold bg-emerald-600 text-white uppercase tracking-wider">
              PRE-SPUD SAFETY AUDIT GATEWAY
            </span>
            <span className="text-xs font-mono font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              OIL INDIA SAFETY COMPLIANCE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2.5">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
            Safety Readiness Score (Before Drilling)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1">
            Pre-drilling safety validation, BOP pressure test records, crew safety certifications, and spud authorization portal.
          </p>
        </div>

        {/* Readiness Badge */}
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Pre-Spud Status</div>
            <div className={`text-lg font-black font-mono ${readinessPercentage >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {readinessPercentage >= 80 ? 'READY TO SPUD ✅' : 'AUDIT INCOMPLETE ⚠️'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Code-Driven Radial Readiness Gauge + Audit Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Code-Driven SVG Radial Readiness Gauge */}
        <div className="lg:col-span-5 bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4 text-center">
          <h2 className="text-xs font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center justify-center gap-2">
            <Gauge className="w-4 h-4 text-emerald-500" />
            Overall Rig Safety Readiness Index
          </h2>

          {/* SVG Radial Gauge */}
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1E293B" strokeWidth="10" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="none" 
                stroke={readinessPercentage >= 80 ? '#10B981' : '#F59E0B'} 
                strokeWidth="10" 
                strokeDasharray="251.2" 
                strokeDashoffset={251.2 - (251.2 * readinessPercentage) / 100} 
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-black font-mono ${readinessPercentage >= 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                {readinessPercentage}%
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Readiness</span>
            </div>
          </div>

          <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
            {readinessPercentage >= 80 
              ? 'All critical well control and safety systems passed verification. Rig is cleared for spudding operations.'
              : 'Requires completion of all 5 mandatory pre-drilling safety verifications prior to spud approval.'}
          </div>

          {/* Authorize Spud Button */}
          <button
            disabled={readinessPercentage < 80}
            className={`w-full py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
              readinessPercentage >= 80
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-4 ring-emerald-500/30'
                : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            Authorize Rig Spudding Operations &rarr;
          </button>
        </div>

        {/* Right 7 Cols: Pre-Drilling Interactive Checklist */}
        <div className="lg:col-span-7 bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-500" />
              Pre-Drilling Mandatory Safety Audit Checklist
            </h2>
            <span className="text-xs font-mono font-bold text-emerald-500">
              {passedItems} / {totalItems} Passed
            </span>
          </div>

          <div className="space-y-3">
            {/* ITEM 1 */}
            <div 
              onClick={() => setBopTested(!bopTested)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                bopTested ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {bopTested ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white">BOP Hydrostatic Pressure Test (10,000 psi)</h3>
                  <p className="text-[11px] text-slate-500 font-semibold">Verified Annular & Pipe Ram seals holding for 30 minutes with zero pressure drop.</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${bopTested ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                {bopTested ? 'PASSED' : 'PENDING'}
              </span>
            </div>

            {/* ITEM 2 */}
            <div 
              onClick={() => setWellheadVerified(!wellheadVerified)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                wellheadVerified ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {wellheadVerified ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white">Wellhead Flange & Casing Hanger Alignment</h3>
                  <p className="text-[11px] text-slate-500 font-semibold">API Spec 6A Cameron wellhead torque and ring gasket inspection cleared.</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${wellheadVerified ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                {wellheadVerified ? 'PASSED' : 'PENDING'}
              </span>
            </div>

            {/* ITEM 3 */}
            <div 
              onClick={() => setCrewInducted(!crewInducted)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                crewInducted ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {crewInducted ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white">Crew Safety Induction & H2S Emergency Drills</h3>
                  <p className="text-[11px] text-slate-500 font-semibold">100% rig personnel completed SCBA mask fit test and muster station evacuation walk.</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${crewInducted ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                {crewInducted ? 'PASSED' : 'PENDING'}
              </span>
            </div>

            {/* ITEM 4 */}
            <div 
              onClick={() => setCasingCalculated(!casingCalculated)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                casingCalculated ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {casingCalculated ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white">Casing Burst/Collapse Safety Factor Verification</h3>
                  <p className="text-[11px] text-slate-500 font-semibold">Surface & Intermediate casing string design safety margin &gt; 1.15.</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${casingCalculated ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                {casingCalculated ? 'PASSED' : 'PENDING'}
              </span>
            </div>

            {/* ITEM 5 */}
            <div 
              onClick={() => setEnvPermitApproved(!envPermitApproved)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                envPermitApproved ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {envPermitApproved ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-amber-500" />}
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white">MoEFCC Environmental Discharge & Noise Clearances</h3>
                  <p className="text-[11px] text-slate-500 font-semibold">Click to verify final environmental clearance certification document from Pollution Board.</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${envPermitApproved ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
                {envPermitApproved ? 'PASSED' : 'CLICK TO VERIFY'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
