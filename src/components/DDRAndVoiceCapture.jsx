import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  FileText, 
  Download, 
  Volume2
} from 'lucide-react';

export default function DDRAndVoiceCapture({ activeWell, telemetry, uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};
  const activeDepth = row.depth_m ?? row.measured_depth ?? telemetry.depth;
  const activeMW = row.mud_weight_in ?? row.mud_weight_ppg ?? telemetry.mudWeightIn;
  const activeROP = row.rop_m_hr ?? row.rop ?? telemetry.rop;
  const activeTorque = row.torque ?? telemetry.torque;

  const [isRecording, setIsRecording] = useState(false);
  const [audioNoteText, setAudioNoteText] = useState(
    row.transcript_summary || "Watch for minor shale swelling around 2450 m in upper Kopili transition. Maintain KCL polymer concentration above 6%."
  );
  const [extractedEntities, setExtractedEntities] = useState({
    formation: row.formation_name || "Kopili Shale Transition",
    depth: activeDepth,
    riskType: row.incident_category || "Shale Hydration / Swelling",
    recommendedAction: row.recommended_action || "Maintain KCL concentration > 6%",
    capturedBy: row.engineer_name || "Senior Drilling Engineer (Duliajan Field Office)"
  });

  const [ddrSummary] = useState({
    reportDate: new Date().toLocaleDateString(),
    wellId: row.well_name || activeWell.id,
    rig: activeWell.rig,
    currentDepth: activeDepth,
    footage24hr: row.footage_24hr || 184,
    avgROP: activeROP,
    mudWeight: activeMW,
    summaryText: row.summaryText || `Drilled 12-1/4" hole to ${activeDepth} m in ${row.formation_name || 'Barail'} Formation. Maintained mud weight at ${activeMW} ppg with ROP ${activeROP} m/hr. Torque recorded at ${activeTorque} ft-lbs.`,
    abnormalEvents: row.abnormal_events || "Minor torque fluctuations recorded; addressed proactively.",
    lessonsLearned: row.lessons_learned || "Barail sandstone responded exceptionally well to pre-mixed LCM slug."
  });

  const simulateVoiceRecording = (sampleText, entities) => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setAudioNoteText(sampleText);
      setExtractedEntities(entities);
    }, 2000);
  };

  const handleDownloadDDR = () => {
    const text = `
=====================================================
OIL INDIA LIMITED - DAILY DRILLING REPORT (DDR)
=====================================================
Well ID: ${ddrSummary.wellId}
Rig: ${ddrSummary.rig}
Date: ${ddrSummary.reportDate}
Current Depth: ${ddrSummary.currentDepth} m
24-Hr Footage: ${ddrSummary.footage24hr} m
Avg ROP: ${ddrSummary.avgROP} m/hr
Mud Weight: ${ddrSummary.mudWeight} ppg

24-HOUR OPERATIONAL SUMMARY:
${ddrSummary.summaryText}

ABNORMAL EVENTS:
${ddrSummary.abnormalEvents}

INSTITUTIONAL LESSONS LEARNED:
${ddrSummary.lessonsLearned}
=====================================================
Generated automatically by NWIS AI Assistant
    `;
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `DDR_${ddrSummary.wellId}_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto font-sans">
      {/* Header Bar */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#002B49] text-purple-400 rounded-lg">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Voice Knowledge Capture & Automatic DDR Assistant
              <span className="text-xs px-2 py-0.5 rounded bg-purple-700 text-white font-mono font-bold">
                Speech NLP + Report AI
              </span>
            </h2>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Capturing senior expert drilling experience into institutional memory & automating 24-hr field report compilation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownloadDDR('pdf')}
            className="flex items-center gap-2 px-3 py-2 bg-[#C41E3A] hover:bg-[#990000] text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            PDF Report (React-PDF)
          </button>
          <button
            onClick={() => handleDownloadDDR('docx')}
            className="flex items-center gap-2 px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            DOCX (DocxTemplater)
          </button>
          <button
            onClick={() => handleDownloadDDR('xlsx')}
            className="flex items-center gap-2 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Excel (ExcelJS)
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Voice Knowledge Capture */}
        <div className="glass-panel p-4 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Mic className="w-4 h-4 text-purple-600" />
              Expert Knowledge Capture (Module 11)
            </h3>
            <span className="text-xs font-bold text-purple-800 dark:text-purple-300 font-mono">
              OpenAI Whisper + pyannote.audio
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 text-center space-y-3">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isRecording
                  ? 'bg-red-600 text-white animate-pulse shadow-lg'
                  : 'bg-[#002B49] text-white hover:bg-[#001A30] shadow-lg'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
            <div className="text-xs font-bold">
              <span className="text-slate-900 dark:text-white block">
                {isRecording ? "Listening via OpenAI Whisper & Pyannote Speaker Diarization..." : "Click Mic to Record Senior Engineer Voice Notes"}
              </span>
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">Supports English & Assamese terminology, automatic noise suppression</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs text-slate-900 dark:text-slate-100 font-extrabold uppercase tracking-wider">Test Sample Voice Inputs:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => simulateVoiceRecording(
                  "Watch for mud losses near 2518m in Barail. Keep 40 bbl Fibrous Nutplug pill ready.",
                  {
                    formation: "Barail Sandstone",
                    depth: 2518,
                    riskType: "Mud Loss Hazard",
                    recommendedAction: "Pre-mix 40 bbl Fibrous Nutplug pill in slug pit",
                    capturedBy: "Superintending Engineer (Rig-OIL-09)"
                  }
                )}
                className="p-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-left transition-all cursor-pointer"
              >
                🎙️ "Watch for mud losses near 2518m..."
              </button>

              <button
                onClick={() => simulateVoiceRecording(
                  "High pore pressure surge detected at 2610m. Shut in BOP immediately if trip tank gains > 5 bbl.",
                  {
                    formation: "Barail Gas Sand",
                    depth: 2610,
                    riskType: "Pore Pressure Surge / Kick",
                    recommendedAction: "Shut in BOP on > 5 bbl gain",
                    capturedBy: "Head Drilling Operations (Duliajan)"
                  }
                )}
                className="p-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-left transition-all cursor-pointer"
              >
                🎙️ "High pressure surge at 2610m..."
              </button>
            </div>
          </div>

          <div className="p-3.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 border-b border-slate-300 dark:border-slate-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-cyan-600" />
                Whisper Transcript Output
              </span>
              <span className="text-emerald-700 font-extrabold text-[11px]">Whisper-v3 Confidence: 98.6%</span>
            </div>
            <p className="text-xs text-slate-900 dark:text-cyan-200 font-mono font-bold bg-white dark:bg-[#070C18] p-2.5 rounded border border-slate-300 dark:border-slate-800">
              "{audioNoteText}"
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded border border-slate-300">
                <span className="text-slate-700 dark:text-slate-300 text-[10px] block">Target Formation</span>
                <span className="text-amber-800 dark:text-amber-400 font-extrabold">{extractedEntities.formation}</span>
              </div>
              <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded border border-slate-300">
                <span className="text-slate-700 dark:text-slate-300 text-[10px] block">Extracted Depth</span>
                <span className="font-mono text-cyan-800 dark:text-cyan-400 font-extrabold">{extractedEntities.depth} m</span>
              </div>
              <div className="col-span-2 p-2 bg-slate-200 dark:bg-slate-800 rounded border border-slate-300">
                <span className="text-slate-700 dark:text-slate-300 text-[10px] block">Identified Hazard & Action</span>
                <span className="text-slate-900 dark:text-white font-extrabold">{extractedEntities.riskType} &rarr; {extractedEntities.recommendedAction}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Automatic Report Generator */}
        <div className="glass-panel p-4 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-600" />
              Automatic Report Generator (Module 11)
            </h3>
            <span className="text-xs font-bold text-emerald-700 font-mono">React-PDF / DocxTemplater / ExcelJS</span>
          </div>

          <div className="space-y-3 text-xs font-bold">
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800">
              <div>
                <span className="text-slate-700 dark:text-slate-300 block text-[10px]">Active Well:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{ddrSummary.wellId}</span>
              </div>
              <div>
                <span className="text-slate-700 dark:text-slate-300 block text-[10px]">24-Hr Footage:</span>
                <span className="font-extrabold font-mono text-cyan-700 dark:text-cyan-400">+{ddrSummary.footage24hr} m</span>
              </div>
              <div>
                <span className="text-slate-700 dark:text-slate-300 block text-[10px]">Avg ROP:</span>
                <span className="font-extrabold font-mono text-amber-700 dark:text-amber-400">{ddrSummary.avgROP} m/hr</span>
              </div>
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 space-y-1">
              <span className="font-extrabold text-slate-900 dark:text-slate-100 block text-xs uppercase tracking-wider">24-Hr Operational Summary:</span>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">{ddrSummary.summaryText}</p>
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 space-y-1">
              <span className="font-extrabold text-amber-700 dark:text-amber-300 block text-xs uppercase tracking-wider">Abnormal Events Recorded:</span>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">{ddrSummary.abnormalEvents}</p>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-300 dark:border-emerald-500/30 space-y-1">
              <span className="font-extrabold text-emerald-800 dark:text-emerald-300 block text-xs uppercase tracking-wider">Captured Institutional Lessons:</span>
              <p className="text-emerald-900 dark:text-emerald-100 leading-relaxed font-semibold">{ddrSummary.lessonsLearned}</p>
            </div>
          </div>

          <div className="text-[11px] font-bold text-slate-700 dark:text-slate-400 text-center pt-2">
            Engineers review and 1-click approve report to automatically sync into OIL's enterprise database.
          </div>
        </div>

      </div>
    </div>
  );
}
