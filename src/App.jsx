import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import DatasetUploadPortal from './components/DatasetUploadPortal';
import ERTMACDashboard from './components/eRTMACDashboard';
import GISWellIntelligence from './components/GISWellIntelligence';
import FormationDNAViewer from './components/FormationDNAViewer';
import DocumentIntelligence from './components/DocumentIntelligence';
import PredictiveRiskAndDecision from './components/PredictiveRiskAndDecision';
import OperationalIntelligence from './components/OperationalIntelligence';
import DDRAndVoiceCapture from './components/DDRAndVoiceCapture';

// Dedicated Visualizer Modules
import SafetyReadinessScore from './components/SafetyReadinessScore';
import CostImpactPredictor from './components/CostImpactPredictor';
import ToolLifePrediction from './components/ToolLifePrediction';
import WeatherSurfaceRisk from './components/WeatherSurfaceRisk';
import ExpertKnowledgeCapture from './components/ExpertKnowledgeCapture';
import SiteEmergencyEvacuationMap from './components/SiteEmergencyEvacuationMap';
import CasingDecisionSupport from './components/CasingDecisionSupport';
import SimilarWellSuccessStories from './components/SimilarWellSuccessStories';
import CarbonAwareDrillingAdvisor from './components/CarbonAwareDrillingAdvisor';
import EnvironmentalRiskPrediction from './components/EnvironmentalRiskPrediction';
import EarthLayer3DView from './components/EarthLayer3DView';
import HistoricalReplayTimeline from './components/HistoricalReplayTimeline';

import { ACTIVE_WELL } from './data/oilWellDatabase';
import { TelemetryEngine, calculateRiskScores } from './utils/telemetrySimulator';
import { AlertTriangle, X, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('ertmac');
  const [isDarkMode, setIsDarkMode] = useState(false); // DEFAULT: White Corporate Light Theme
  const [fontSize, setFontSize] = useState('normal'); // small, normal, large
  const [language, setLanguage] = useState('EN'); // EN, HI
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Initial state set to null so user lands on Document Upload Portal first
  const [uploadedDataset, setUploadedDataset] = useState(null);

  const [telemetry, setTelemetry] = useState({
    depth: 2518.4,
    rop: 14.8,
    torque: 13200,
    standpipePressure: 2450,
    mudWeightIn: 10.8,
    mudWeightOut: 10.78,
    flowRateIn: 680,
    flowRateOut: 678,
    pitVolume: 420.5,
    gasReading: 0.8,
    wob: 18.5,
    mode: 'NORMAL',
    timestamp: new Date().toLocaleTimeString()
  });

  const [history, setHistory] = useState([]);
  const [telemetryEngine, setTelemetryEngine] = useState(null);
  const [dismissAlert, setDismissAlert] = useState(false);

  const riskScores = calculateRiskScores(telemetry);

  useEffect(() => {
    const engine = new TelemetryEngine((newTelemetry) => {
      setTelemetry(newTelemetry);
      setHistory(prev => {
        const next = [...prev, newTelemetry];
        return next.slice(-25);
      });
    });

    engine.start();
    setTelemetryEngine(engine);

    return () => {
      engine.stop();
    };
  }, []);

  // Sync html dark class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const fontSizeClass = fontSize === 'small' ? 'text-xs' : fontSize === 'large' ? 'text-base' : 'text-sm';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#080E1A] text-slate-100' : 'bg-[#F4F7FC] text-slate-900'} flex font-sans transition-colors duration-200 ${fontSizeClass}`}>
      
      {/* 1. Left Vertical Enterprise Sidebar (Figma Layout Design) */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        riskScores={riskScores}
        activeWell={ACTIVE_WELL}
        isDarkMode={isDarkMode}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* 2. Main Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Top Header Bar */}
        <HeaderBar 
          activeWell={ACTIVE_WELL}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          language={language}
          setLanguage={setLanguage}
          uploadedDataset={uploadedDataset}
          onReupload={() => setUploadedDataset(null)}
          onToggleMobileMenu={() => setIsMobileOpen(!isMobileOpen)}
        />

        {/* Content Canvas */}
        {!uploadedDataset || !uploadedDataset.isLoaded ? (
          /* Document Upload Portal Landing Page */
          <main className="flex-1">
            <DatasetUploadPortal 
              onDatasetLoaded={(dataset) => setUploadedDataset(dataset)}
              isDarkMode={isDarkMode}
            />
          </main>
        ) : (
          /* Operational Dashboards & Cockpit */
          <div className="flex-1 flex flex-col">
            
            {/* Active Dataset Notification Banner */}
            <div className="bg-emerald-700 text-white px-4 py-2 flex items-center justify-between text-xs font-extrabold shadow-sm border-b border-emerald-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>
                  ACTIVE TELEMETRY DATASET: <strong>{uploadedDataset.fileName}</strong> ({uploadedDataset.rowCount}, {uploadedDataset.parametersCount} Parameters Active) — Real-Time Cockpit Unlocked
                </span>
              </div>
              <button 
                onClick={() => setUploadedDataset(null)}
                className="text-white hover:underline font-extrabold text-[11px] cursor-pointer bg-emerald-800 px-2.5 py-0.5 rounded border border-emerald-500"
              >
                Upload Different Document &rarr;
              </button>
            </div>

            {/* Critical Hazard Banner */}
            {riskScores.overallScore > 65 && !dismissAlert && (
              <div className="bg-[#C41E3A] text-white px-4 py-2 flex items-center justify-between shadow-xl text-xs border-b border-amber-400/50 animate-pulse">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-300 animate-bounce" />
                  <div>
                    <strong className="font-extrabold uppercase tracking-wide mr-2">
                      CRITICAL ERTMAC HAZARD ALERT: {riskScores.primaryRisk}
                    </strong>
                    <span>Confidence: {riskScores.confidence}% • Immediate Action Required</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setActiveTab('predictive')}
                    className="px-3 py-1 bg-black/40 hover:bg-black/60 rounded text-white font-bold border border-white/20 transition-all cursor-pointer"
                  >
                    Inspect Action Protocol &rarr;
                  </button>
                  <button 
                    onClick={() => setDismissAlert(true)}
                    className="text-white/80 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Main Content View Switcher */}
            <main className="flex-1 p-4 sm:p-6 space-y-6">
              {['ertmac', 'telemetry_stream', 'cascading_risk', 'equipment_gauges', 'depth_risk_matrix'].includes(activeTab) && (
                <ERTMACDashboard 
                  telemetry={telemetry}
                  telemetryEngine={telemetryEngine}
                  riskScores={riskScores}
                  activeWell={ACTIVE_WELL}
                  history={history}
                  uploadedDataset={uploadedDataset}
                  focusSection={activeTab}
                />
              )}

              {activeTab === 'readiness' && (
                <SafetyReadinessScore uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'cost_impact' && (
                <CostImpactPredictor uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'tool_life' && (
                <ToolLifePrediction uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'evacuation' && (
                <SiteEmergencyEvacuationMap uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'casing' && (
                <CasingDecisionSupport uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'similar' && (
                <SimilarWellSuccessStories uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'carbon' && (
                <CarbonAwareDrillingAdvisor uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'env_risk' && (
                <EnvironmentalRiskPrediction uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'weather' && (
                <WeatherSurfaceRisk uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'knowledge' && (
                <ExpertKnowledgeCapture uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'earth3d' && (
                <EarthLayer3DView uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'history' && (
                <HistoricalReplayTimeline activeWell={ACTIVE_WELL} uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'gis' && (
                <GISWellIntelligence 
                  activeWell={ACTIVE_WELL}
                  uploadedDataset={uploadedDataset}
                />
              )}

              {activeTab === 'formation' && (
                <FormationDNAViewer uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'docs' && (
                <DocumentIntelligence uploadedDataset={uploadedDataset} />
              )}

              {activeTab === 'predictive' && (
                <PredictiveRiskAndDecision 
                  telemetry={telemetry}
                  riskScores={riskScores}
                  activeWell={ACTIVE_WELL}
                  uploadedDataset={uploadedDataset}
                />
              )}

              {activeTab === 'operational' && (
                <OperationalIntelligence 
                  telemetry={telemetry}
                  activeWell={ACTIVE_WELL}
                  uploadedDataset={uploadedDataset}
                />
              )}

              {activeTab === 'ddr' && (
                <DDRAndVoiceCapture 
                  activeWell={ACTIVE_WELL}
                  telemetry={telemetry}
                  uploadedDataset={uploadedDataset}
                />
              )}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 bg-[#001A30] text-slate-300 py-3 px-6 text-center text-xs flex flex-wrap items-center justify-between gap-3 mt-auto">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500 text-black font-extrabold text-[11px]">
                  eRTMAC-NWIS
                </span>
                <span>
                  © 2026 Oil India Limited. All Rights Reserved.
                </span>
              </div>
              <div className="font-mono text-[11px] text-amber-300">
                Assam Shelf Operations Center • Dibrugarh Block
              </div>
            </footer>

          </div>
        )}

      </div>
    </div>
  );
}
