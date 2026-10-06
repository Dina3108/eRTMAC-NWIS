import React, { useState, useEffect, useMemo } from 'react';
import { 
  History, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck,
  Zap,
  Activity,
  Layers
} from 'lucide-react';

export default function HistoricalReplayTimeline({ activeWell = {}, uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};
  const [currentDay, setCurrentDay] = useState(row.elapsed_days || 14.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x, 2x, 5x, 10x

  // Timeline data points matching Depth (ft) vs Time (Days) reference plot (0 to 12,000 ft, 0 to 24 days)
  const plannedCurve = [
    { day: 0, depth: 0 },
    { day: 2, depth: 1600 },
    { day: 3.5, depth: 1600 }, // Casing hold
    { day: 5, depth: 3200 },
    { day: 8, depth: 5800 },   // Mud change
    { day: 11, depth: 8245 },  // Planned wiper trip
    { day: 13, depth: 8245 },
    { day: 16, depth: 10600 }, // Drilling
    { day: 19, depth: 11200 },
    { day: 24, depth: 11616 }  // TD
  ];

  const historicalWellCurve = [
    { day: 0, depth: 0 },
    { day: 1.5, depth: 1600 },
    { day: 3.8, depth: 1600 },
    { day: 4.5, depth: 2600 },
    { day: 5.5, depth: 2600 }, // NPT Delay
    { day: 9, depth: 6200 },
    { day: 11.5, depth: 8000 },
    { day: 13.5, depth: 9800 },
    { day: 14.5, depth: 10200 }, // Sticking event
    { day: 18.5, depth: 10200 }, // 4 Days Stuck Pipe NPT
    { day: 20, depth: 11150 },
    { day: 22.5, depth: 11150 }
  ];

  const thisWellCurve = [
    { day: 0, depth: 0 },
    { day: 2.2, depth: 1523 },  // 13-3/8" shoe
    { day: 3.8, depth: 1523 },  // Cementing
    { day: 5.5, depth: 3400 },
    { day: 7.2, depth: 5500 },
    { day: 9.5, depth: 7650 },  // Wiper trip
    { day: 10.8, depth: 7650 },
    { day: 13.2, depth: 10240 }, // Shoe
    { day: 14.5, depth: 10450 }, // ACTIVE BIT DAY
    { day: 16.5, depth: 10900 },
    { day: 19.5, depth: 11520 }  // Planned 8-1/2" TD
  ];

  // Story event narrative logs day-by-day
  const storyEvents = [
    {
      dayRange: [0, 3],
      title: "Surface Section & 13-3/8\" Casing Setting",
      status: "COMPLETED",
      type: "NORMAL",
      desc: "Drilled 17-1/2\" hole from 0 to 1,523 ft MD. Set and cemented 13-3/8\" surface casing with zero fluid loss in Girujan Clay.",
      depth: "1,523 ft MD"
    },
    {
      dayRange: [3.1, 8],
      title: "12-1/4\" Intermediate Hole Section",
      status: "COMPLETED",
      type: "NORMAL",
      desc: "Penetrated Tipam Sandstone. Mud weight increased to 10.8 ppg KCL polymer. Maintained steady 18.5 klbs WOB.",
      depth: "5,800 ft MD"
    },
    {
      dayRange: [8.1, 12],
      title: "Controlled Wiper Trip at 7,650 ft MD",
      status: "COMPLETED",
      type: "ADVISORY",
      desc: "Executed planned wiper trip at 7,650 ft MD due to minor torque drag. Reamed tight spot safely in 8 hours.",
      depth: "7,650 ft MD"
    },
    {
      dayRange: [12.1, 15],
      title: "Barail Reservoir Entry & Active Bit Position",
      status: "IN_PROGRESS",
      type: "WARNING",
      desc: "Bit currently at 10,450 ft MD. Historical offset well experienced 4-day stuck pipe event at 10,200 ft MD. eRTMAC advisory: Spot lubricant pill.",
      depth: "10,450 ft MD"
    },
    {
      dayRange: [15.1, 24],
      title: "Target 8-1/2\" Section TD Reach",
      status: "PLANNED",
      type: "PLANNED",
      desc: "Drilling ahead toward 11,520 ft MD target depth in Barail Main Pay with predicted 0 NPT.",
      depth: "11,520 ft MD"
    }
  ];

  // Auto-play timer effect
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentDay((prev) => {
          if (prev >= 24) {
            setIsPlaying(false);
            return 24;
          }
          return parseFloat((prev + 0.2 * playbackSpeed).toFixed(1));
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  // Interpolate current depth on blue "This Well" curve for active day
  const currentBitDepth = useMemo(() => {
    for (let i = 0; i < thisWellCurve.length - 1; i++) {
      const p1 = thisWellCurve[i];
      const p2 = thisWellCurve[i + 1];
      if (currentDay >= p1.day && currentDay <= p2.day) {
        const ratio = (currentDay - p1.day) / (p2.day - p1.day);
        return Math.round(p1.depth + ratio * (p2.depth - p1.depth));
      }
    }
    return currentDay >= 24 ? 11520 : 0;
  }, [currentDay]);

  // Current active story event based on day
  const activeStory = useMemo(() => {
    return storyEvents.find(e => currentDay >= e.dayRange[0] && currentDay <= e.dayRange[1]) || storyEvents[3];
  }, [currentDay]);

  // SVG Chart Dimensions & Scales
  const svgWidth = 580;
  const svgHeight = 440;
  const margin = { top: 35, right: 35, bottom: 45, left: 65 };
  const innerWidth = svgWidth - margin.left - margin.right;
  const innerHeight = svgHeight - margin.top - margin.bottom;

  const mapX = (day) => margin.left + (day / 24) * innerWidth;
  const mapY = (depth) => margin.top + (depth / 12000) * innerHeight; // 0 at top, 12,000 at bottom

  // Generate SVG path string from points array
  const generatePathD = (pts) => {
    return pts.reduce((acc, pt, idx) => {
      const x = mapX(pt.day);
      const y = mapY(pt.depth);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  };

  const plannedPathD = generatePathD(plannedCurve);
  const historicalPathD = generatePathD(historicalWellCurve);
  const thisWellPathD = generatePathD(thisWellCurve);

  return (
    <div className="bg-white dark:bg-[#001A30] p-5 rounded-2xl border-2 border-amber-500/40 shadow-xl space-y-4 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Title & Section Header (Matching Attached Reference Image) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-amber-500/60 pb-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-400 underline decoration-amber-500 decoration-2 underline-offset-8 flex items-center gap-2.5">
            <History className="w-7 h-7 text-amber-600" />
            Historical Replay (Replay the story timeline of past events)
          </h2>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
            Interactive Depth vs. Time Story Timeline Playback comparing Active Well against Historical Offset NPT Events
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-extrabold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-950 px-3 py-1.5 rounded-lg border border-amber-400">
            Historical Story Replay Engine
          </span>
        </div>
      </div>

      {/* Interactive Playback Control Bar */}
      <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-md">
        
        {/* Play/Pause & Reset Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow ${
              isPlaying 
                ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Replay' : 'Play Timeline Story'}</span>
          </button>

          <button
            onClick={() => { setIsPlaying(false); setCurrentDay(0); }}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 cursor-pointer"
            title="Reset Replay to Day 0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Timeline Scrubber Slider */}
        <div className="flex-1 max-w-md flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-extrabold text-cyan-300 whitespace-nowrap">
            Day {currentDay.toFixed(1)} / 24.0 d
          </span>
          <input 
            type="range" 
            min="0" 
            max="24" 
            step="0.1" 
            value={currentDay}
            onChange={(e) => setCurrentDay(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Speed Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold font-mono">
          <span className="text-slate-400 px-1 text-[10px]">Speed:</span>
          {[1, 2, 5, 10].map((s) => (
            <button
              key={s}
              onClick={() => setPlaybackSpeed(s)}
              className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                playbackSpeed === s ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

      </div>

      {/* Main Grid: Depth vs Time Chart (Left 7 Cols) + Story Event Narrative Cards (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Depth (ft) vs Time (d) Plot (Mirroring User Reference Diagram) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-300 dark:border-slate-800 relative shadow-inner select-none">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">
            <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Depth (ft) vs. Time (Days) Historical Curve Comparison
            </span>
            <span className="text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950 px-2 py-0.5 rounded border border-cyan-400">
              Active Bit: {currentBitDepth} ft MD
            </span>
          </div>

          <div className="relative flex justify-center">
            <svg width={svgWidth} height={svgHeight} className="overflow-visible">
              
              {/* Background Gridlines - Depth Ticks (0 to 12,000 ft) */}
              {[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000].map((d) => (
                <g key={d}>
                  <line
                    x1={margin.left}
                    y1={mapY(d)}
                    x2={margin.left + innerWidth}
                    y2={mapY(d)}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    className="dark:stroke-slate-800"
                  />
                  <text
                    x={margin.left - 8}
                    y={mapY(d) + 3}
                    textAnchor="end"
                    fontSize="9"
                    fontWeight="700"
                    fill="#64748B"
                    className="font-mono"
                  >
                    {d.toLocaleString()}
                  </text>
                </g>
              ))}

              {/* Background Gridlines - Time Ticks (0 to 24 Days) */}
              {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24].map((t) => (
                <g key={t}>
                  <line
                    x1={mapX(t)}
                    y1={margin.top}
                    x2={mapX(t)}
                    y2={margin.top + innerHeight}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    className="dark:stroke-slate-800"
                  />
                  <text
                    x={mapX(t)}
                    y={margin.top + innerHeight + 16}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill="#64748B"
                    className="font-mono"
                  >
                    {t}
                  </text>
                </g>
              ))}

              {/* Chart Frame Box */}
              <rect
                x={margin.left}
                y={margin.top}
                width={innerWidth}
                height={innerHeight}
                fill="none"
                stroke="#334155"
                strokeWidth="1.5"
              />

              {/* Axis Titles */}
              <text
                transform="rotate(-90)"
                x={-(margin.top + innerHeight / 2)}
                y={margin.left - 42}
                textAnchor="middle"
                fontSize="11"
                fontWeight="800"
                fill="#0F172A"
                className="dark:fill-white"
              >
                Depth, ft
              </text>

              <text
                x={margin.left + innerWidth / 2}
                y={svgHeight - 6}
                textAnchor="middle"
                fontSize="11"
                fontWeight="800"
                fill="#0F172A"
                className="dark:fill-white"
              >
                Time, d
              </text>

              {/* 1. Planned Baseline Curve (Black Solid Line) */}
              <path
                d={plannedPathD}
                fill="none"
                stroke="#0F172A"
                strokeWidth="2.5"
                className="dark:stroke-slate-300"
              />

              {/* 2. Historical Offset Well Curve (Red Dashed Line) */}
              <path
                d={historicalPathD}
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="5 3"
              />

              {/* 3. Active "This Well" Curve (Blue Solid Line) */}
              <path
                d={thisWellPathD}
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
              />

              {/* Event Milestone Text Labels on Chart (Matching Reference Image) */}
              <text x={mapX(2.5)} y={mapY(1523) - 6} fontSize="8" fontWeight="bold" fill="#2563EB">
                13-3/8" shoe set at 1,523 ft MD
              </text>

              <text x={mapX(8.2)} y={mapY(5800) - 6} fontSize="8" fontWeight="bold" fill="#0F172A" className="dark:fill-slate-200">
                Mud change at 5,800 ft MD
              </text>

              <text x={mapX(9.6)} y={mapY(7650) + 12} fontSize="8" fontWeight="bold" fill="#2563EB">
                Wiper trip at 7,650 ft MD
              </text>

              <text x={mapX(14.8)} y={mapY(10200) + 12} fontSize="8" fontWeight="bold" fill="#EF4444">
                Stuck pipe at 10,200 ft MD (4d NPT)
              </text>

              <text x={mapX(16)} y={mapY(11616) + 12} fontSize="8" fontWeight="bold" fill="#0F172A" className="dark:fill-slate-200">
                8-1/2" section TD planned at 11,616 ft MD
              </text>

              {/* Dynamic Animated Bit Dot Marker at Current Day Position */}
              <circle
                cx={mapX(currentDay)}
                cy={mapY(currentBitDepth)}
                r="6"
                fill="#00F5D4"
                stroke="#0284C7"
                strokeWidth="2"
                className="animate-ping opacity-75"
              />
              <circle
                cx={mapX(currentDay)}
                cy={mapY(currentBitDepth)}
                r="5"
                fill="#2563EB"
                stroke="#FFFFFF"
                strokeWidth="2"
              />

            </svg>
          </div>

          {/* Chart Curve Legend Key */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs font-bold border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-5 h-1 bg-[#2563EB] rounded"></span>
              <span className="text-slate-900 dark:text-slate-100">Blue Solid: This Well (Active Progress)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-1 bg-red-500 rounded border border-red-400 border-dashed"></span>
              <span className="text-slate-900 dark:text-slate-100">Red Dashed: Previously Drilled Offset Well</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-1 bg-slate-900 dark:bg-white rounded"></span>
              <span className="text-slate-900 dark:text-slate-100">Black Solid: Planned Spec Baseline</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Live Timeline Story Narrative Cards */}
        <div className="lg:col-span-5 space-y-3 font-sans">
          
          <div className="p-3.5 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-2 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-400" />
                Live Active Story Narrative (Day {currentDay.toFixed(1)})
              </span>
              <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-700">
                {activeStory.status}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-white">{activeStory.title}</h3>
              <div className="text-xs font-mono font-bold text-cyan-400">Depth: {currentBitDepth} ft MD ({activeStory.depth})</div>
              <p className="text-xs text-slate-300 font-semibold leading-relaxed pt-1">
                {activeStory.desc}
              </p>
            </div>
          </div>

          {/* Sequential Timeline Event Log List */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white block">
              Sequential Milestone Story Log:
            </span>

            {storyEvents.map((evt, idx) => {
              const isCurrent = currentDay >= evt.dayRange[0] && currentDay <= evt.dayRange[1];
              const isPast = currentDay > evt.dayRange[1];

              return (
                <div 
                  key={idx}
                  onClick={() => setCurrentDay(evt.dayRange[0])}
                  className={`p-3 rounded-xl border text-xs transition-all cursor-pointer space-y-1 ${
                    isCurrent
                      ? 'bg-amber-500/15 border-amber-500 text-slate-900 dark:text-white shadow-md ring-1 ring-amber-500/40'
                      : isPast
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-slate-800 dark:text-slate-300'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs flex items-center gap-1.5">
                      {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      {isCurrent && <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />}
                      <span>Days {evt.dayRange[0]} - {evt.dayRange[1]} d</span>
                    </span>
                    <span className="font-mono text-[10px] font-bold text-cyan-600 dark:text-cyan-400">{evt.depth}</span>
                  </div>
                  <div className="font-extrabold text-slate-900 dark:text-slate-100">{evt.title}</div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
