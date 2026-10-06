import React, { useState } from 'react';
import { 
  Activity, 
  Map, 
  Dna, 
  FileSearch, 
  ShieldAlert, 
  Mic, 
  Sun,
  Moon,
  Cpu,
  Download,
  FileText,
  Navigation,
  Layers,
  BookOpen,
  Flame,
  Droplets,
  Box,
  History,
  ChevronDown,
  ShieldCheck,
  DollarSign,
  Wrench,
  Wind,
  Database
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  riskScores, 
  isDarkMode,
  setIsDarkMode,
  language,
  uploadedDataset,
  onReupload
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Grouped Visual Sections for clear selection
  const mainOperationsTabs = [
    { id: 'ertmac', label: 'eRTMAC Cockpit', icon: Activity, badge: 'LIVE' },
    { id: 'readiness', label: 'Safety Readiness', icon: ShieldCheck, badge: 'PRE-SPUD' },
    { id: 'cost_impact', label: 'Cost Predictor', icon: DollarSign, badge: 'AFE' },
    { id: 'tool_life', label: 'Tool Life', icon: Wrench, badge: 'WEAR' },
    { id: 'evacuation', label: 'Evacuation Map', icon: Navigation, badge: 'OHSAS' },
    { id: 'casing', label: 'Casing Support', icon: Layers, badge: 'API' },
    { id: 'similar', label: 'Success Stories', icon: BookOpen, badge: 'BEST' },
    { id: 'carbon', label: 'Carbon Advisor', icon: Flame, badge: 'ECO' },
    { id: 'env_risk', label: 'Environmental Risk', icon: Droplets, badge: 'MoEFCC' },
    { id: 'weather', label: 'Weather Radar', icon: Wind, badge: 'IMD' },
    { id: 'earth3d', label: 'Earth 3D Layer', icon: Box, badge: '3D' },
    { id: 'history', label: 'Historical Replay', icon: History, badge: 'LOG' },
    { id: 'knowledge', label: 'Expert Knowledge', icon: Database, badge: 'VOICE' }
  ];

  const intelligenceTabs = [
    { id: 'gis', label: 'GIS Offset Map', icon: Map, badge: 'MAP' },
    { id: 'formation', label: 'Formation DNA', icon: Dna, badge: 'LOGS' },
    { id: 'docs', label: 'Doc Search', icon: FileSearch, badge: 'OCR' },
    { id: 'predictive', label: 'Risk & Decision', icon: ShieldAlert, badge: riskScores?.overallScore > 65 ? 'ALERT' : 'OK' },
    { id: 'operational', label: 'Operational AI', icon: Cpu, badge: 'AI' },
    { id: 'ddr', label: 'Voice & DDR', icon: Mic, badge: 'AUTO' }
  ];

  const allTabs = [...mainOperationsTabs, ...intelligenceTabs];

  const activeTabObj = allTabs.find(t => t.id === activeTab) || allTabs[0];

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Streamlined Single Navigation Header */}
      <div className="bg-slate-200 dark:bg-[#001A30] px-3 sm:px-4 py-2 flex items-center justify-between overflow-x-auto border-b border-slate-300 dark:border-slate-800 gap-3">
        
        {/* Navigation Section Selector Dropdown + Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          
          {/* Quick Dropdown Section Switcher for Mobile / Compact Screens */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md border border-emerald-500 cursor-pointer whitespace-nowrap"
            >
              <span className="bg-emerald-950 px-1.5 py-0.5 rounded text-[10px] uppercase font-mono">SECTIONS</span>
              <span className="font-extrabold">{activeTabObj.label}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {dropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-[#001A30] border border-slate-300 dark:border-slate-700 rounded-xl shadow-2xl z-50 p-2 space-y-1 max-h-[80vh] overflow-y-auto"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="text-[10px] font-mono font-extrabold text-slate-400 px-2 py-1 uppercase">
                  OPERATIONAL VISUALIZATIONS
                </div>
                {mainOperationsTabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === t.id ? 'bg-cyan-600 text-white font-black' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <t.icon className="w-4 h-4 text-cyan-400" />
                      {t.label}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/30 font-mono">{t.badge}</span>
                  </button>
                ))}

                <div className="text-[10px] font-mono font-extrabold text-slate-400 px-2 py-1 uppercase border-t border-slate-200 dark:border-slate-800 pt-2">
                  INTELLIGENCE & ASSISTANTS
                </div>
                {intelligenceTabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTab === t.id ? 'bg-cyan-600 text-white font-black' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <t.icon className="w-4 h-4 text-purple-400" />
                      {t.label}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/30 font-mono">{t.badge}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Horizontal Scrollable Section Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {allTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-extrabold text-xs transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C41E3A] to-[#990000] text-white shadow border border-red-400'
                      : 'bg-white dark:bg-slate-900/80 text-black dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-[#002B49]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-900 dark:text-cyan-400'}`} />
                  <span style={{ color: isActive ? '#FFFFFF' : '#000000' }}>
                    {tab.label}
                  </span>
                  {tab.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold ${
                      tab.badge === 'ALERT'
                        ? 'bg-amber-400 text-black animate-pulse'
                        : 'bg-slate-200 dark:bg-slate-800 text-black dark:text-slate-200 border border-slate-400 dark:border-slate-700'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {uploadedDataset && uploadedDataset.isLoaded && (
            <button
              onClick={onReupload}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-extrabold bg-[#002B49] hover:bg-[#003B66] text-white shadow-sm border border-cyan-400/60 transition-all cursor-pointer whitespace-nowrap"
              style={{ color: '#FFFFFF' }}
              title="Upload New Telemetry Document"
            >
              <Download className="w-3.5 h-3.5 rotate-180 text-white" />
              <span className="text-white font-extrabold" style={{ color: '#FFFFFF' }}>Upload Doc</span>
            </button>
          )}

          <a
            href="/ertmac_nwis_telemetry_dataset.xlsx"
            download="ertmac_nwis_telemetry_dataset.xlsx"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border border-emerald-500 transition-all cursor-pointer whitespace-nowrap"
            title="Download Excel Dataset (.xlsx)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel</span>
          </a>

          <a
            href="/ertmac_nwis_telemetry_dataset.pdf"
            download="ertmac_nwis_telemetry_report.pdf"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-red-700 hover:bg-red-800 text-white shadow-sm border border-red-600 transition-all cursor-pointer whitespace-nowrap"
            title="Download PDF Report (.pdf)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF</span>
          </a>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-extrabold transition-all shadow-sm cursor-pointer border ${
              isDarkMode
                ? 'bg-amber-400 text-black border-amber-300 hover:bg-amber-300'
                : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-200'
            }`}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-black" /> : <Moon className="w-3.5 h-3.5 text-cyan-600" />}
          </button>
        </div>

      </div>
    </header>
  );
}
