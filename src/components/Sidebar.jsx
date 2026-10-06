import React from 'react';
import { 
  Activity, 
  Map, 
  Dna, 
  FileSearch, 
  ShieldAlert, 
  Mic, 
  Cpu, 
  Navigation,
  Layers,
  BookOpen,
  Flame,
  Droplets,
  Box,
  History,
  ShieldCheck,
  DollarSign,
  Wrench,
  Wind,
  Database,
  GitBranch,
  Gauge,
  TrendingUp
} from 'lucide-react';

import { X } from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  riskScores, 
  activeWell = {}, 
  isDarkMode,
  isMobileOpen,
  setIsMobileOpen
}) {
  const categories = [
    {
      title: 'REAL-TIME COCKPIT & OPERATIONS',
      items: [
        { id: 'ertmac', label: 'eRTMAC Cockpit (Full)', icon: Activity },
        { id: 'telemetry_stream', label: '10-Param Telemetry Stream', icon: Activity },
        { id: 'cascading_risk', label: 'Cascading Risk Prediction', icon: GitBranch },
        { id: 'equipment_gauges', label: 'Equipment Gauges & Simulator', icon: Gauge },
        { id: 'depth_risk_matrix', label: 'Depth-Wise Risk Matrix', icon: TrendingUp },
        { id: 'readiness', label: 'Safety Readiness', icon: ShieldCheck },
        { id: 'cost_impact', label: 'Cost Predictor', icon: DollarSign },
        { id: 'tool_life', label: 'Tool Life Prediction', icon: Wrench }
      ]
    },
    {
      title: 'RISK & ENVIRONMENT',
      items: [
        { id: 'evacuation', label: 'Evacuation Plan Map', icon: Navigation },
        { id: 'casing', label: 'Casing Support', icon: Layers },
        { id: 'similar', label: 'Success Stories', icon: BookOpen },
        { id: 'carbon', label: 'Carbon Advisor', icon: Flame },
        { id: 'env_risk', label: 'Environmental Risk', icon: Droplets },
        { id: 'weather', label: 'Weather Radar', icon: Wind }
      ]
    },
    {
      title: 'ANALYTICS & GEOSPATIAL',
      items: [
        { id: 'earth3d', label: 'Earth 3D Layer View', icon: Box },
        { id: 'history', label: 'Historical Replay', icon: History },
        { id: 'knowledge', label: 'Expert Knowledge', icon: Database },
        { id: 'gis', label: 'GIS Offset Map', icon: Map },
        { id: 'formation', label: 'Formation DNA', icon: Dna },
        { id: 'docs', label: 'Doc Intelligence', icon: FileSearch },
        { id: 'predictive', label: 'Risk & Decision', icon: ShieldAlert },
        { id: 'operational', label: 'Operational AI', icon: Cpu },
        { id: 'ddr', label: 'Voice & DDR', icon: Mic }
      ]
    }
  ];

  const handleSelectTab = (id) => {
    setActiveTab(id);
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#001427] border-r border-slate-200 dark:border-slate-800/80 shadow-lg select-none transition-colors duration-200">
      {/* Sidebar Header Logo */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#C41E3A] via-red-600 to-amber-500 flex items-center justify-center text-white font-black text-sm shadow-md">
            OIL
          </div>
          <div>
            <div className="text-sm font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              <span>Oil India Limited</span>
            </div>
            <div className="text-[10px] font-mono font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              eRTMAC-NWIS PLATFORM
            </div>
          </div>
        </div>

        {/* Mobile Close X button */}
        {setIsMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Vertical Categorized Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-semibold scrollbar-thin">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-1">
            <div className="text-[10px] font-mono font-extrabold text-slate-400 dark:text-slate-500 px-2 py-1 uppercase tracking-wider">
              {cat.title}
            </div>

            {cat.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 sm:py-2 rounded-xl transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-extrabold shadow-md shadow-indigo-500/20'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-cyan-500'}`} />
                    <span className="truncate text-xs sm:text-xs">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile, fixed w-64 on lg) */}
      <aside className="hidden lg:block w-64 flex-shrink-0 h-screen sticky top-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (visible on mobile when isMobileOpen is true) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />
          {/* Slide-out Panel */}
          <div className="relative w-72 max-w-[85vw] h-full z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
