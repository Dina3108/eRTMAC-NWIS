import React, { useState } from 'react';
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  FileText, 
  Search, 
  CheckCircle2, 
  Award, 
  UserCheck, 
  Tag, 
  Database,
  Radio
} from 'lucide-react';

export default function ExpertKnowledgeCapture({ uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};

  const [isRecording, setIsRecording] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(row.incident_category || 'STUCK_PIPE');
  const [transcriptText, setTranscriptText] = useState(
    row.transcript_summary || "Observation at 2,850m depth: Standpipe pressure spiked by 350 psi while reaming through Barail Sandstone. We observed tight pull of 45 klbf on hookload. Recommended pumping 25 bbl heavy pill (12.2 ppg) and rotating drill string at 60 RPM to free pipe before differential sticking locks drill collars."
  );

  const pastKnowledgeRecords = [
    {
      id: 1,
      engineer: 'Er. S. K. Dutta (Chief Drilling Supt)',
      experience: '28 Years Experience',
      incidentType: 'STUCK_PIPE',
      date: '24 Sep 2026',
      well: 'Well NHK-512',
      summary: 'Applied 12.2 ppg high-viscosity pill with 60 RPM rotation to free differential sticking in Barail Sandstone.'
    },
    {
      id: 2,
      engineer: 'Er. P. K. Baruah (Senior Toolpusher)',
      experience: '22 Years Experience',
      incidentType: 'GAS_KICK',
      date: '18 Aug 2026',
      well: 'Well DIB-804',
      summary: 'Closed annular BOP and circulated kick out via Wait & Weight method at 35 strokes/min.'
    },
    {
      id: 3,
      engineer: 'Er. R. Sharma (Mud Engineer)',
      experience: '19 Years Experience',
      incidentType: 'MUD_LOSS',
      date: '05 Jul 2026',
      well: 'Well JLN-309',
      summary: 'Pumped 40 bbl LCM blend (CaCO3 + mica) to seal micro-fractures in limestone formation.'
    }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-slate-50 dark:bg-[#060B14] min-h-screen text-slate-900 dark:text-slate-100">
      {/* Top Banner Header */}
      <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-indigo-500/50 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-extrabold bg-indigo-600 text-white uppercase tracking-wider">
              SENIOR ENGINEER AI KNOWLEDGE VAULT
            </span>
            <span className="text-xs font-mono font-extrabold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              OIL INDIA TECHNICAL LESSONS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2.5">
            <Mic className="w-8 h-8 text-indigo-500" />
            Expert Knowledge Capture (Senior Engineers' Voice Notes)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1">
            Capture real-time voice observations during critical drilling incidents to build AI-retrievable organizational knowledge.
          </p>
        </div>

        {/* Recording Status */}
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Voice Recorder</div>
            <div className={`text-lg font-black font-mono ${isRecording ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
              {isRecording ? '● RECORDING LIVE...' : 'READY TO RECORD'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Voice Recorder Console + Past Knowledge Database */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Cols: Voice Recording Console & Live Speech-to-Text */}
        <div className="lg:col-span-6 bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-500" />
              Live Audio Capture & AI Transcription Desk
            </h2>
            <span className="text-xs font-mono font-bold text-slate-400">
              AI Whisper NLP Model
            </span>
          </div>

          {/* Senior Engineer Profile Card */}
          <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-7 h-7 text-indigo-500" />
              <div>
                <div className="text-xs font-black text-slate-900 dark:text-white">Er. S. K. Dutta</div>
                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">Chief Drilling Superintendent • 28 Yrs Experience</div>
              </div>
            </div>
          </div>

          {/* Record Button & Animated Audio Waveform */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-center">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`w-20 h-20 mx-auto rounded-full font-extrabold flex items-center justify-center transition-all cursor-pointer shadow-xl ${
                isRecording 
                  ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-500/30' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white ring-4 ring-emerald-500/30'
              }`}
            >
              {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
            </button>

            <span className="text-xs font-mono font-bold text-slate-400 block">
              {isRecording ? 'Click to Stop Recording & Save Note' : 'Click Red Microphone to Record Incident Voice Note'}
            </span>

            {/* Audio Waveform Bars */}
            <div className="flex items-center justify-center gap-1 h-8 pt-1">
              {[40, 70, 30, 90, 60, 100, 50, 80, 40, 70, 90, 30, 60].map((h, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 rounded-full transition-all ${isRecording ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'}`}
                  style={{ height: isRecording ? `${h}%` : '20%' }}
                />
              ))}
            </div>
          </div>

          {/* Live Transcript Display */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
              AI Speech-to-Text Incident Transcription:
            </label>
            <textarea
              rows={4}
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Right 6 Cols: Incident Voice Database Lookup */}
        <div className="lg:col-span-6 bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" />
              Retrieved Senior Engineer Knowledge Vault
            </h2>
            <span className="text-xs font-mono font-bold text-emerald-500">
              3 Records Found
            </span>
          </div>

          <div className="space-y-3">
            {pastKnowledgeRecords.map(rec => (
              <div key={rec.id} className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white">{rec.engineer}</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[10px] font-bold">
                    {rec.incidentType}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-slate-500 flex justify-between">
                  <span>{rec.well} • {rec.date}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">{rec.experience}</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold leading-relaxed pt-1 border-t border-slate-200 dark:border-slate-800">
                  "{rec.summary}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
