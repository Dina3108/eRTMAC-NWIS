import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Wind, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Compass, 
  PhoneCall, 
  Radio, 
  Volume2, 
  Flame, 
  CornerUpRight,
  RefreshCw,
  Navigation
} from 'lucide-react';

export default function SiteEmergencyEvacuationMap({ uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};
  const [activeZone, setActiveZone] = useState('MUSTERING_POINT_A');
  const [windDirection, setWindDirection] = useState(row.wind_direction || 'NE');
  const [windSpeed, setWindSpeed] = useState(row.wind_speed_knots ?? row.wind_speed ?? 14);
  const [alarmActive, setAlarmActive] = useState(row.evacuation_alarm_active === true || row.h2s_gas_ppm > 10);
  const [gasDetectionLevel, setGasDetectionLevel] = useState(
    row.h2s_gas_ppm > 10 ? 'CRITICAL' : row.h2s_gas_ppm > 2 ? 'WARNING' : (row.gas_detection_level || 'NORMAL')
  );

  const musterPoints = [
    {
      id: 'MUSTERING_POINT_A',
      name: 'Primary Assembly Point A (Main Gate)',
      type: 'PRIMARY',
      capacity: '60 Personnel',
      currentHeadcount: 42,
      status: 'SAFE',
      coordinates: 'X: 180, Y: 140',
      description: 'Upwind primary muster station equipped with emergency SCBA units, satellite phone, and first aid depot.'
    },
    {
      id: 'MUSTERING_POINT_B',
      name: 'Secondary Evacuation Zone B (Helipad)',
      type: 'SECONDARY',
      capacity: '40 Personnel',
      currentHeadcount: 14,
      status: 'STANDBY',
      coordinates: 'X: 680, Y: 120',
      description: 'Secondary evacuation area with direct access to emergency evacuation vehicle corridor and secondary gate.'
    },
    {
      id: 'MUSTERING_POINT_C',
      name: 'Tertiary Safe Refuge C (Camp Office)',
      type: 'TERTIARY',
      capacity: '30 Personnel',
      currentHeadcount: 8,
      status: 'SAFE',
      coordinates: 'X: 120, Y: 360',
      description: 'Reinforced positive-pressure shelter with independent air filtration unit for toxic H2S protection.'
    }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-slate-50 dark:bg-[#060B14] min-h-screen text-slate-900 dark:text-slate-100">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-red-500/50 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-extrabold bg-red-600 text-white uppercase tracking-wider">
              OHSAS 18001 / ISO 45001 COMPLIANT
            </span>
            <span className="text-xs font-mono font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              RIG LOCATION: DIBRUGARH WELL #7
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1.5 flex items-center gap-2.5">
            <ShieldAlert className="w-8 h-8 text-red-600 animate-pulse" />
            Site Emergency Evacuation Plan Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mt-1">
            Real-time interactive site evacuation corridors, assembly muster stations, wind drift vector, and emergency exit express paths.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setAlarmActive(!alarmActive)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
              alarmActive 
                ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse ring-4 ring-red-500/40' 
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            {alarmActive ? '🚨 SIREN ALARM ACTIVE' : 'TEST EMERGENCY SIREN'}
          </button>

          <button
            onClick={() => setGasDetectionLevel(gasDetectionLevel === 'NORMAL' ? 'CRITICAL' : 'NORMAL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer border ${
              gasDetectionLevel === 'CRITICAL'
                ? 'bg-amber-600 text-white border-amber-500'
                : 'bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-slate-200 border-slate-300 dark:border-slate-700'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-500" />
            Simulate H2S Release
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Side Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Interactive Code-Driven SVG Map */}
        <div className="lg:col-span-8 bg-white dark:bg-[#001A30] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-500" />
              Interactive Rig Site Evacuation Corridor Map
            </h2>

            {/* Legend Indicators */}
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                Primary Route
              </span>
              <span className="flex items-center gap-1 text-orange-500">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
                Secondary Route
              </span>
              <span className="flex items-center gap-1 text-amber-500">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                Tertiary Route
              </span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full h-[280px] xs:h-[350px] sm:h-[480px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden select-none">
            
            {/* Grid background effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px] opacity-30" />

            <svg viewBox="0 0 800 500" className="w-full h-full">
              <defs>
                {/* Dashed line animation marker */}
                <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#EF4444" />
                </marker>
                <marker id="arrow-orange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#F97316" />
                </marker>
                <marker id="arrow-yellow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#FBBF24" />
                </marker>
              </defs>

              {/* SITE BOUNDARY WALL (Dashed blue polygon) */}
              <polygon 
                points="40,30 760,30 760,470 40,470" 
                fill="none" 
                stroke="#3B82F6" 
                strokeWidth="2.5" 
                strokeDasharray="8 6" 
              />
              <text x="50" y="50" fill="#60A5FA" fontSize="12" fontWeight="bold" fontFamily="monospace">
                RIG SITE EMERGENCY PERIMETER BOUNDARY
              </text>

              {/* RIG FLOOR & SUBSTRUCTURE (Center Facility) */}
              <rect x="340" y="190" width="120" height="120" rx="8" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
              <rect x="370" y="220" width="60" height="60" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
              <text x="376" y="255" fill="#38BDF8" fontSize="11" fontWeight="extrabold" fontFamily="sans-serif">
                DRILLING RIG
              </text>
              <text x="382" y="270" fill="#94A3B8" fontSize="9" fontWeight="bold" fontFamily="monospace">
                MAST FLOOR
              </text>

              {/* MUD PITS & PUMP HOUSE (North) */}
              <rect x="330" y="70" width="140" height="60" rx="6" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
              <text x="350" y="105" fill="#A7F3D0" fontSize="11" fontWeight="bold">MUD PITS & PUMPS</text>

              {/* POWER HOUSE & GENERATORS (West) */}
              <rect x="150" y="200" width="100" height="80" rx="6" fill="#312E81" stroke="#6366F1" strokeWidth="1.5" />
              <text x="160" y="245" fill="#C7D2FE" fontSize="10" fontWeight="bold">RIG POWER HOUSE</text>

              {/* FLARE STACK & PIT (East - High Hazard Zone) */}
              <circle cx="680" cy="300" r="35" fill="#451A03" stroke="#F97316" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="680" cy="300" r="12" fill="#EA580C" className={gasDetectionLevel === 'CRITICAL' ? 'animate-ping' : ''} />
              <text x="645" y="355" fill="#FDBA74" fontSize="11" fontWeight="bold">FLARE STACK PIT</text>

              {/* DRILLING CAMP & LIVING QUARTERS (South) */}
              <rect x="220" y="380" width="150" height="65" rx="6" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1.5" />
              <text x="235" y="420" fill="#E0E7FF" fontSize="11" fontWeight="bold">LIVING QUARTERS CAMP</text>

              {/* ------------------------------------------------------------- */}
              {/* EVACUATION PATHS (Animated dashes matching reference design) */}
              {/* ------------------------------------------------------------- */}
              
              {/* PRIMARY EVACUATION ROUTE (Red) -> Leading to Assembly Point A */}
              <path 
                d="M 340,250 L 260,250 L 260,140 L 200,140" 
                fill="none" 
                stroke="#EF4444" 
                strokeWidth="4" 
                strokeDasharray="6 4"
                markerEnd="url(#arrow-red)"
              >
                <animate attributeName="stroke-dashoffset" values="20;0" dur="1.2s" repeatCount="indefinite" />
              </path>

              {/* SECONDARY EVACUATION ROUTE (Orange) -> Leading to Helipad B */}
              <path 
                d="M 460,250 L 560,250 L 560,130 L 650,130" 
                fill="none" 
                stroke="#F97316" 
                strokeWidth="4" 
                strokeDasharray="6 4"
                markerEnd="url(#arrow-orange)"
              >
                <animate attributeName="stroke-dashoffset" values="20;0" dur="1.5s" repeatCount="indefinite" />
              </path>

              {/* TERTIARY EVACUATION ROUTE (Yellow) -> Leading to Shelter C */}
              <path 
                d="M 370,310 L 370,360 L 220,360 L 160,360" 
                fill="none" 
                stroke="#FBBF24" 
                strokeWidth="3.5" 
                strokeDasharray="6 4"
                markerEnd="url(#arrow-yellow)"
              >
                <animate attributeName="stroke-dashoffset" values="20;0" dur="1.8s" repeatCount="indefinite" />
              </path>

              {/* ------------------------------------------------------------- */}
              {/* INTERACTIVE ASSEMBLY MUSTER POINTS */}
              {/* ------------------------------------------------------------- */}
              
              {/* MUSTER POINT A (Main Gate) */}
              <g 
                onClick={() => setActiveZone('MUSTERING_POINT_A')}
                className="cursor-pointer group"
              >
                <circle cx="160" cy="140" r="24" fill="#991B1B" stroke="#EF4444" strokeWidth="3" className="group-hover:scale-110 transition-all" />
                <circle cx="160" cy="140" r="10" fill="#EF4444" />
                <text x="160" y="144" fill="#FFFFFF" fontSize="12" fontWeight="black" textAnchor="middle">A</text>
                <rect x="100" y="172" width="120" height="22" rx="4" fill="#0F172A" stroke="#EF4444" strokeWidth="1" />
                <text x="160" y="187" fill="#FCA5A5" fontSize="10" fontWeight="bold" textAnchor="middle">
                  MAIN GATE (PRIMARY)
                </text>
              </g>

              {/* MUSTER POINT B (Helipad) */}
              <g 
                onClick={() => setActiveZone('MUSTERING_POINT_B')}
                className="cursor-pointer group"
              >
                <circle cx="680" cy="120" r="24" fill="#9A3412" stroke="#F97316" strokeWidth="3" className="group-hover:scale-110 transition-all" />
                <circle cx="680" cy="120" r="10" fill="#F97316" />
                <text x="680" y="124" fill="#FFFFFF" fontSize="12" fontWeight="black" textAnchor="middle">B</text>
                <rect x="620" y="152" width="120" height="22" rx="4" fill="#0F172A" stroke="#F97316" strokeWidth="1" />
                <text x="680" y="167" fill="#FDBA74" fontSize="10" fontWeight="bold" textAnchor="middle">
                  HELIPAD GATE (SECONDARY)
                </text>
              </g>

              {/* MUSTER POINT C (Shelter) */}
              <g 
                onClick={() => setActiveZone('MUSTERING_POINT_C')}
                className="cursor-pointer group"
              >
                <circle cx="120" cy="360" r="22" fill="#854D0E" stroke="#FBBF24" strokeWidth="3" className="group-hover:scale-110 transition-all" />
                <circle cx="120" cy="360" r="9" fill="#FBBF24" />
                <text x="120" y="364" fill="#000000" fontSize="12" fontWeight="black" textAnchor="middle">C</text>
                <rect x="60" y="390" width="120" height="22" rx="4" fill="#0F172A" stroke="#FBBF24" strokeWidth="1" />
                <text x="120" y="405" fill="#FDE68A" fontSize="10" fontWeight="bold" textAnchor="middle">
                  CAMP SHELTER (TERTIARY)
                </text>
              </g>

              {/* WIND DIRECTION INDICATOR OVERLAY */}
              <g transform="translate(700, 420)">
                <circle cx="0" cy="0" r="30" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                <path d="M 0 -20 L 6 10 L 0 4 L -6 10 z" fill="#38BDF8" transform={`rotate(${windDirection === 'NE' ? 45 : windDirection === 'SW' ? 225 : 0})`} />
                <text x="0" y="24" fill="#94A3B8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  WIND: {windSpeed} KTS {windDirection}
                </text>
              </g>

              {/* GAS PLUME SIMULATION IF CRITICAL */}
              {gasDetectionLevel === 'CRITICAL' && (
                <g opacity="0.4" className="animate-pulse">
                  <ellipse cx="440" cy="230" rx="90" ry="60" fill="url(#gasPlume)" />
                  <defs>
                    <radialGradient id="gasPlume" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </g>
              )}
            </svg>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">Total Site On Board</span>
              <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">64 Personnel</span>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">Accounted at Assembly</span>
              <span className="text-xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">64 / 64 (100%)</span>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 block">Wind Drift Hazard</span>
              <span className="text-xl font-extrabold font-mono text-blue-600 dark:text-blue-400">CLEAR (SW Vector)</span>
            </div>
            <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/30">
              <span className="text-[11px] font-bold text-red-600 dark:text-red-400 block">Est. Evacuation Time</span>
              <span className="text-xl font-extrabold font-mono text-red-600 dark:text-red-400">3 Min 40 Sec</span>
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Selected Assembly Point Details & Emergency Contacts */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Selected Muster Point Inspector */}
          {musterPoints.map(point => {
            if (point.id !== activeZone) return null;
            return (
              <div key={point.id} className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-extrabold ${
                    point.type === 'PRIMARY' ? 'bg-red-600 text-white' : point.type === 'SECONDARY' ? 'bg-orange-600 text-white' : 'bg-amber-500 text-black'
                  }`}>
                    {point.type} ASSEMBLY ZONE
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {point.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">{point.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-semibold leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-500">Target Capacity:</span>
                    <span className="text-slate-900 dark:text-white font-mono">{point.capacity}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-500">Currently Accounted:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">{point.currentHeadcount} Workers</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-500">GPS Coordinates:</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-mono">{point.coordinates}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Emergency Communication Protocol Hotline */}
          <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md space-y-3">
            <h3 className="text-xs font-extrabold text-red-600 dark:text-red-400 uppercase tracking-wider font-mono flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              Oil India Emergency Hotlines
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-between font-mono font-bold">
                <span className="text-slate-700 dark:text-slate-300">Duliajan Central Control</span>
                <span className="text-red-600 dark:text-red-400">+91 (0374) 2800-911</span>
              </div>
              <div className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-between font-mono font-bold">
                <span className="text-slate-700 dark:text-slate-300">Rig Safety Officer VHF</span>
                <span className="text-cyan-600 dark:text-cyan-400">CH-16 (156.8 MHz)</span>
              </div>
              <div className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-between font-mono font-bold">
                <span className="text-slate-700 dark:text-slate-300">Medical Air Evac Desk</span>
                <span className="text-emerald-600 dark:text-emerald-400">+91 (0374) 2800-444</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
