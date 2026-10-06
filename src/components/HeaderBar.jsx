import React from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Download, 
  FileText, 
  User, 
  CheckCircle2, 
  ChevronDown,
  Globe,
  Menu
} from 'lucide-react';

export default function HeaderBar({ 
  activeWell = {}, 
  isDarkMode, 
  setIsDarkMode, 
  language, 
  setLanguage, 
  uploadedDataset, 
  onReupload,
  onToggleMobileMenu
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#001A30]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4 shadow-sm select-none">
      
      {/* Mobile Hamburger Menu Button */}
      <button
        onClick={onToggleMobileMenu}
        className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer shrink-0"
        title="Open Navigation Menu"
      >
        <Menu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
      </button>

      {/* Center Search Input (Figma Layout Style) */}
      <div className="flex-1 max-w-xl relative hidden md:block">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Search telemetry parameters, well logs, incident reports..." 
          className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-sans"
        />
      </div>

      {/* Right Top Action Controls */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
        
        {/* Upload Document Trigger */}
        {uploadedDataset && uploadedDataset.isLoaded && (
          <button
            onClick={onReupload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-[#002B49] hover:bg-[#003B66] text-white shadow-sm border border-cyan-400/50 transition-all cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 rotate-180 text-cyan-300" />
            <span>Upload New Doc</span>
          </button>
        )}

        {/* Excel Export */}
        <a
          href="/ertmac_nwis_telemetry_dataset.xlsx"
          download="ertmac_nwis_telemetry_dataset.xlsx"
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border border-emerald-500 transition-all cursor-pointer whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Excel (.xlsx)</span>
        </a>

        {/* PDF Export */}
        <a
          href="/ertmac_nwis_telemetry_dataset.pdf"
          download="ertmac_nwis_telemetry_report.pdf"
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-red-700 hover:bg-red-800 text-white shadow-sm border border-red-600 transition-all cursor-pointer whitespace-nowrap"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden md:inline">PDF Report</span>
        </a>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-1.5 rounded-xl text-xs font-extrabold transition-all shadow-sm cursor-pointer border ${
            isDarkMode
              ? 'bg-amber-400 text-black border-amber-300 hover:bg-amber-300'
              : 'bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200'
          }`}
          title="Toggle Light / Dark Mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-black" /> : <Moon className="w-4 h-4 text-cyan-600" />}
        </button>

      </div>
    </header>
  );
}
