import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from 'react-leaflet';
import L from 'leaflet';
import { 
  Map, 
  Sliders, 
  AlertOctagon, 
  CheckCircle, 
  Compass, 
  ShieldAlert,
  Layers,
  FileCheck
} from 'lucide-react';
import { OFFSET_WELLS } from '../data/oilWellDatabase';

const createCustomIcon = (color, isPulse = false) => {
  try {
    if (typeof window === 'undefined' || !L || !L.divIcon) return null;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        ${isPulse ? `<circle cx="12" cy="12" r="10" fill="${color}" opacity="0.3">
          <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
        </circle>` : ''}
        <path fill="${color}" stroke="#ffffff" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `;
    return L.divIcon({
      html: svg,
      className: 'custom-leaflet-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  } catch (e) {
    return null;
  }
};

const createNumberedIcon = (number, color = '#1E293B') => {
  try {
    if (typeof window === 'undefined' || !L || !L.divIcon) return null;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 22" width="36" height="22">
        <rect x="1" y="1" width="34" height="20" rx="4" fill="${color}" stroke="#ffffff" stroke-width="1.5"/>
        <text x="18" y="14" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="sans-serif">${number}</text>
      </svg>
    `;
    return L.divIcon({
      html: svg,
      className: 'numbered-leaflet-marker',
      iconSize: [36, 22],
      iconAnchor: [18, 11]
    });
  } catch (e) {
    return null;
  }
};

export default function GISWellIntelligence({ activeWell = {}, uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};
  const [radiusKm, setRadiusKm] = useState(5.0);
  const [selectedWell, setSelectedWell] = useState(OFFSET_WELLS[0]);
  const [filterIncidents, setFilterIncidents] = useState('ALL');
  const [showEvacuationPlan, setShowEvacuationPlan] = useState(false);
  const [showRiskHeatmap, setShowRiskHeatmap] = useState(true);

  // Lazy icon initialization to prevent SSR or module load errors
  const activeIcon = useMemo(() => createCustomIcon('#00F5D4', true), []);
  const highSimilarityIcon = useMemo(() => createCustomIcon('#10B981'), []);
  const medSimilarityIcon = useMemo(() => createCustomIcon('#FFB703'), []);
  const lowSimilarityIcon = useMemo(() => createCustomIcon('#8B5CF6'), []);

  const lat = row.rig_latitude ?? row.latitude ?? activeWell?.latitude ?? 26.96;
  const lng = row.rig_longitude ?? row.longitude ?? activeWell?.longitude ?? 94.63;

  // 1. Irregular Field Boundary Outer Polygon (Matching Reference Image 1)
  const outerFieldBoundary = [
    [lat + 0.075, lng - 0.065],
    [lat + 0.075, lng + 0.035],
    [lat + 0.020, lng + 0.035],
    [lat + 0.020, lng + 0.100],
    [lat - 0.035, lng + 0.100],
    [lat - 0.035, lng + 0.020],
    [lat - 0.075, lng + 0.020],
    [lat - 0.075, lng - 0.045],
    [lat - 0.035, lng - 0.050],
    [lat + 0.020, lng - 0.075]
  ];

  // 2. High Hazard Red Overlay Belt (Matching Red Risk Distribution in Reference Image 1)
  const redHazardZone = [
    [lat + 0.070, lng - 0.060],
    [lat + 0.070, lng + 0.030],
    [lat + 0.015, lng + 0.030],
    [lat + 0.015, lng + 0.095],
    [lat - 0.030, lng + 0.095],
    [lat - 0.030, lng + 0.015],
    [lat - 0.070, lng + 0.015],
    [lat - 0.070, lng - 0.040],
    [lat - 0.030, lng - 0.045],
    [lat + 0.015, lng - 0.070]
  ];

  // 3. Top Central Green Safe Basin Pocket (Containing top well cluster)
  const topGreenPocket = [
    [lat + 0.065, lng - 0.035],
    [lat + 0.068, lng + 0.015],
    [lat + 0.045, lng + 0.020],
    [lat + 0.035, lng - 0.010],
    [lat + 0.045, lng - 0.040]
  ];

  // 4. Middle Orange Moderate Hazard Pocket
  const middleOrangePocket = [
    [lat + 0.035, lng - 0.055],
    [lat + 0.035, lng + 0.075],
    [lat - 0.010, lng + 0.075],
    [lat - 0.010, lng - 0.055]
  ];

  // 5. Left Central Green Safe Pocket
  const leftGreenPocket = [
    [lat + 0.020, lng - 0.060],
    [lat + 0.020, lng - 0.025],
    [lat - 0.015, lng - 0.025],
    [lat - 0.015, lng - 0.060]
  ];

  // 6. Bottom Left Green Safe Pocket
  const bottomGreenPocket = [
    [lat - 0.040, lng - 0.040],
    [lat - 0.040, lng + 0.010],
    [lat - 0.065, lng + 0.010],
    [lat - 0.065, lng - 0.040]
  ];

  // Overlaid Numbered Well Points across the heatmap matching Reference Image 1
  const heatmapWellPoints = [
    { id: 'W-01', number: 1, lat: lat + 0.055, lng: lng - 0.025, color: '#22C55E' },
    { id: 'W-02', number: 2, lat: lat + 0.050, lng: lng + 0.005, color: '#22C55E' },
    { id: 'W-03', number: 3, lat: lat + 0.040, lng: lng - 0.015, color: '#22C55E' },
    { id: 'W-04', number: 4, lat: lat + 0.025, lng: lng - 0.045, color: '#F97316' },
    { id: 'W-05', number: 5, lat: lat + 0.015, lng: lng + 0.045, color: '#EF4444' },
    { id: 'W-06', number: 6, lat: lat + 0.005, lng: lng + 0.025, color: '#F97316' },
    { id: 'W-07', number: 7, lat: lat - 0.005, lng: lng - 0.015, color: '#22C55E' },
    { id: 'W-08', number: 8, lat: lat - 0.020, lng: lng + 0.065, color: '#EF4444' },
    { id: 'W-09', number: 9, lat: lat - 0.030, lng: lng + 0.040, color: '#F97316' },
    { id: 'W-10', number: 10, lat: lat - 0.050, lng: lng - 0.020, color: '#22C55E' },
    { id: 'W-11', number: 11, lat: lat - 0.060, lng: lng - 0.005, color: '#22C55E' }
  ];

  const filteredWells = OFFSET_WELLS.filter(well => {
    if (well.distanceKm > radiusKm) return false;
    if (filterIncidents === 'STUCK_PIPE' && !well.incidents.some(i => i.includes('Stuck'))) return false;
    if (filterIncidents === 'MUD_LOSS' && !well.incidents.some(i => i.includes('Loss') || i.includes('Seepage'))) return false;
    if (filterIncidents === 'KICK' && !well.incidents.some(i => i.includes('Kick') || i.includes('Gas'))) return false;
    return true;
  });

  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto font-sans">
      {/* Control Toolbar */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#002B49] text-cyan-400 rounded-lg">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              GIS Offset Well Risk Intelligence & Heatmap
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-600 text-white font-mono font-bold">
                Offset Wells DB
              </span>
            </h2>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Assam Shelf Regional Risk Contours & Geomechanical Offset Analysis
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-800 text-xs font-bold">
            <Sliders className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-slate-800 dark:text-slate-200">Search Radius:</span>
            <span className="font-mono text-cyan-700 dark:text-cyan-400 font-extrabold">{radiusKm} km</span>
            <input 
              type="range" min="1" max="15" step="0.5" value={radiusKm}
              onChange={(e) => setRadiusKm(parseFloat(e.target.value))}
              className="w-24 accent-cyan-600 cursor-pointer"
            />
          </div>

          <button
            onClick={() => setShowEvacuationPlan(!showEvacuationPlan)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              showEvacuationPlan ? 'bg-red-700 text-white border-red-500' : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
            }`}
          >
            🚨 Site Emergency Evacuation Plan
          </button>

          <button
            onClick={() => setShowRiskHeatmap(!showRiskHeatmap)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              showRiskHeatmap ? 'bg-[#C41E3A] text-white border-red-500 shadow' : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
            }`}
          >
            🗺️ Risk Heatmap (High/Medium/Low)
          </button>
        </div>
      </div>

      {/* Grid: GIS Map & Offset Well Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Map View */}
        <div className="lg:col-span-2 glass-panel p-2 rounded-xl h-[420px] sm:h-[550px] lg:h-[650px] relative overflow-hidden">
          <MapContainer 
            center={[lat, lng]} 
            zoom={11} 
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & eRTMAC GIS'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Smart Radius Circle */}
            <Circle 
              center={[lat, lng]}
              radius={radiusKm * 1000}
              pathOptions={{ 
                color: showRiskHeatmap ? '#EF4444' : '#00F5D4', 
                fillColor: showRiskHeatmap ? '#EF4444' : '#00F5D4', 
                fillOpacity: 0.08, 
                dashArray: '6, 6' 
              }}
            />

            {/* Spatial Risk Heatmap Contours */}
            {showRiskHeatmap && (
              <>
                {/* 1. Outer Field Boundary */}
                <Polygon
                  positions={outerFieldBoundary}
                  pathOptions={{
                    color: '#00F5D4',
                    fillColor: '#002B49',
                    fillOpacity: 0.15,
                    weight: 2,
                    dashArray: '4, 4'
                  }}
                />

                {/* 2. Red High Risk Belt */}
                <Polygon
                  positions={redHazardZone}
                  pathOptions={{
                    color: '#DC2626',
                    fillColor: '#EF4444',
                    fillOpacity: 0.65,
                    stroke: true,
                    weight: 2
                  }}
                />

                {/* 3. Top Central Green Safe Pocket */}
                <Polygon
                  positions={topGreenPocket}
                  pathOptions={{
                    color: '#16A34A',
                    fillColor: '#22C55E',
                    fillOpacity: 0.7,
                    stroke: true,
                    weight: 2
                  }}
                />

                {/* 4. Middle Orange Moderate Pocket */}
                <Polygon
                  positions={middleOrangePocket}
                  pathOptions={{
                    color: '#EA580C',
                    fillColor: '#F97316',
                    fillOpacity: 0.6,
                    stroke: true,
                    weight: 2
                  }}
                />

                {/* 5. Left Central Green Safe Pocket */}
                <Polygon
                  positions={leftGreenPocket}
                  pathOptions={{
                    color: '#16A34A',
                    fillColor: '#22C55E',
                    fillOpacity: 0.7,
                    stroke: true,
                    weight: 2
                  }}
                />

                {/* 6. Bottom Left Green Safe Pocket */}
                <Polygon
                  positions={bottomGreenPocket}
                  pathOptions={{
                    color: '#16A34A',
                    fillColor: '#22C55E',
                    fillOpacity: 0.7,
                    stroke: true,
                    weight: 2
                  }}
                />

                {/* Overlaid Numbered Well Markers */}
                {heatmapWellPoints.map((pt) => {
                  const numIcon = createNumberedIcon(pt.number, pt.color);
                  return (
                    <Marker
                      key={pt.id}
                      position={[pt.lat, pt.lng]}
                      {...(numIcon ? { icon: numIcon } : {})}
                    >
                      <Popup>
                        <div className="font-sans text-xs">
                          <div className="font-extrabold text-slate-900">Well #{pt.number}</div>
                          <div className="text-slate-600">Location Tag: {pt.id}</div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </>
            )}

            {/* Active Rig Marker */}
            <Marker position={[lat, lng]} {...(activeIcon ? { icon: activeIcon } : {})}>
              <Popup>
                <div className="space-y-1 font-sans">
                  <div className="font-extrabold text-[#C41E3A] text-sm">{activeWell?.id || 'RDS-04'} (ACTIVE RIG)</div>
                  <div className="text-xs text-slate-800">{activeWell?.name || 'Assam Shelf Well RDS-04'}</div>
                  <div className="text-xs text-amber-700 font-bold">Current Depth: {activeWell?.currentDepth || 2518.4} m</div>
                </div>
              </Popup>
            </Marker>

            {/* Offset Wells Markers */}
            {filteredWells.map((well) => {
              let icon = lowSimilarityIcon;
              if (well.similarityScore >= 92) icon = highSimilarityIcon;
              else if (well.similarityScore >= 85) icon = medSimilarityIcon;

              return (
                <Marker 
                  key={well.id} 
                  position={[well.latitude, well.longitude]} 
                  {...(icon ? { icon } : {})}
                  eventHandlers={{ click: () => setSelectedWell(well) }}
                >
                  <Popup>
                    <div className="space-y-1 font-sans">
                      <div className="font-extrabold text-emerald-800 text-sm">{well.id}</div>
                      <div className="text-xs text-slate-800">Distance: {well.distanceKm} km</div>
                      <div className="text-xs text-cyan-800 font-bold">Similarity: {well.similarityScore}%</div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Floating Map Legend Box */}
          <div className="absolute top-4 right-4 bg-slate-900/90 text-white p-3 rounded-xl border border-slate-700 text-xs font-bold space-y-1.5 z-[1000] shadow-xl backdrop-blur-md max-w-[200px]">
            <span className="text-slate-200 block text-[10px] uppercase tracking-wider border-b border-slate-700 pb-1">Map Legend & Risk Zones:</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00F5D4] border border-white"></span>
              <span className="text-[11px] text-cyan-300">RDS-04 (Active Rig)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded border border-white"></span>
              <span className="text-[11px] text-emerald-300">Green: Safe Basin Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-500 rounded border border-white"></span>
              <span className="text-[11px] text-orange-300">Orange: Mod. Risk Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-600 rounded border border-white"></span>
              <span className="text-[11px] text-red-300">Red: High Hazard Belt</span>
            </div>
          </div>
        </div>

        {/* Right Inspector Panel */}
        <div className="glass-panel p-4 rounded-xl space-y-4 font-sans">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Selected Offset Well Inspector
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-300">
              {selectedWell?.similarityScore || 94}% Similarity
            </span>
          </div>

          <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-semibold">
            <div className="flex justify-between items-baseline">
              <span className="text-base font-extrabold text-slate-900 dark:text-white">{selectedWell?.id}</span>
              <span className="text-slate-600 dark:text-slate-400 font-mono">{selectedWell?.distanceKm} km offset</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block text-[9px]">TD Depth:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{selectedWell?.totalDepth} m</span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 block text-[9px]">Formation:</span>
                <span className="font-extrabold text-amber-600">{selectedWell?.formation}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
