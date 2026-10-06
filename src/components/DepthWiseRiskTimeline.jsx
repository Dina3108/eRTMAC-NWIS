import React, { useState, useMemo } from 'react';
import { Layers, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export default function DepthWiseRiskTimeline({ activeWell }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Generate deterministic scatter data points matching the depth-wise risk image (2520m to 2640m)
  const scatterPoints = useMemo(() => {
    const points = [];
    // Fixed seed generator for consistent visual scatter
    let seed = 42;
    const pseudoRandom = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const startDepth = 2520;
    const endDepth = 2640;
    
    for (let depth = startDepth; depth <= endDepth; depth += 1.5) {
      // Exponential risk factor increase with depth
      const depthRatio = (depth - startDepth) / (endDepth - startDepth);
      const baseProb = 0.12 + Math.pow(depthRatio, 1.6) * 0.36;

      // Generate 5-7 scatter dots per depth level
      const dotsCount = 6;
      for (let i = 0; i < dotsCount; i++) {
        const spread = (pseudoRandom() - 0.48) * 0.14;
        const prob = Math.min(0.56, Math.max(0.08, baseProb + spread));
        const isHighRisk = prob >= 0.36;

        points.push({
          id: `${depth}-${i}`,
          depth: parseFloat(depth.toFixed(1)),
          probability: parseFloat(prob.toFixed(3)),
          isHighRisk,
          formation: depth < 2580 ? 'Barail Main Pay' : 'Kopili Shale (Swelling Risk)'
        });
      }
    }
    return points;
  }, []);

  // Mean Trend Line coordinates
  const trendLinePoints = useMemo(() => {
    const startDepth = 2520;
    const endDepth = 2640;
    const trend = [];
    for (let depth = startDepth; depth <= endDepth; depth += 2) {
      const depthRatio = (depth - startDepth) / (endDepth - startDepth);
      const baseProb = 0.12 + Math.pow(depthRatio, 1.6) * 0.36;
      trend.push({ depth, prob: baseProb });
    }
    return trend;
  }, []);

  // SVG Dimension & Scale Mappings
  const svgWidth = 520;
  const svgHeight = 420;
  const margin = { top: 30, right: 30, bottom: 50, left: 65 };
  
  const innerWidth = svgWidth - margin.left - margin.right;
  const innerHeight = svgHeight - margin.top - margin.bottom;

  // Domain Ranges
  const minDepth = 2520;
  const maxDepth = 2640;
  const minProb = 0.0;
  const maxProb = 0.6;

  // Scale Mappers
  const mapX = (prob) => margin.left + ((prob - minProb) / (maxProb - minProb)) * innerWidth;
  const mapY = (depth) => margin.top + ((depth - minDepth) / (maxDepth - minDepth)) * innerHeight;

  // SVG Path String for Trend Line
  const trendPathD = trendLinePoints.reduce((acc, pt, idx) => {
    const x = mapX(pt.prob);
    const y = mapY(pt.depth);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // High Risk Zone Box Coordinates (0.36 to 0.47)
  const highRiskZoneX1 = mapX(0.36);
  const highRiskZoneWidth = mapX(0.47) - mapX(0.36);

  return (
    <div className="bg-white dark:bg-[#001A30] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm font-sans">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#C41E3A] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#C41E3A]" />
            Depth-Wise Risk Timeline
          </h3>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Vertical Wellbore Depth vs. Probability / Risk Factor Scatter Analysis
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-md border border-amber-300">
            High Risk Threshold: &gt; 0.36
          </span>
        </div>
      </div>

      {/* Main Plot Box */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        
        {/* SVG Vertical Plot (Mirroring User Reference Image) */}
        <div className="relative bg-white dark:bg-slate-900/90 p-3 rounded-xl border border-slate-300 dark:border-slate-800 shadow-inner">
          <svg width={svgWidth} height={svgHeight} className="overflow-visible select-none">
            
            {/* Background Shaded High Risk Zone Strip */}
            <rect
              x={highRiskZoneX1}
              y={margin.top}
              width={highRiskZoneWidth}
              height={innerHeight}
              fill="#E2E8F0"
              opacity="0.6"
              className="dark:fill-slate-800 dark:opacity-70"
            />

            {/* High Risk Zone Text Label Inside Shaded Box */}
            <text
              x={highRiskZoneX1 + 10}
              y={margin.top + innerHeight - 20}
              fill="#475569"
              fontSize="11"
              fontWeight="700"
              fontFamily="sans-serif"
            >
              High risk
            </text>
            <text
              x={highRiskZoneX1 + 15}
              y={margin.top + innerHeight - 7}
              fill="#475569"
              fontSize="11"
              fontWeight="700"
              fontFamily="sans-serif"
            >
              zone
            </text>

            {/* Horizontal Gridlines (Depth ticks) */}
            {[2520, 2540, 2560, 2580, 2600, 2620, 2640].map((d) => (
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
                {/* Y-Axis Tick Labels (Depth in meters) */}
                <text
                  x={margin.left - 10}
                  y={mapY(d) + 4}
                  textAnchor="end"
                  fontSize="10"
                  fontWeight="700"
                  fill="#475569"
                  className="dark:fill-slate-400 font-mono"
                >
                  {d}
                </text>
              </g>
            ))}

            {/* Vertical Gridlines (Probability ticks) */}
            {[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6].map((p) => (
              <g key={p}>
                <line
                  x1={mapX(p)}
                  y1={margin.top}
                  x2={mapX(p)}
                  y2={margin.top + innerHeight}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  className="dark:stroke-slate-800"
                />
                {/* X-Axis Tick Labels (Probability / Risk Factor) */}
                <text
                  x={mapX(p)}
                  y={margin.top + innerHeight + 18}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="#475569"
                  className="dark:fill-slate-400 font-mono"
                >
                  {p.toFixed(1)}
                </text>
              </g>
            ))}

            {/* Main Plot Frame Borders */}
            <rect
              x={margin.left}
              y={margin.top}
              width={innerWidth}
              height={innerHeight}
              fill="none"
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Y-Axis Label: Depth (m) */}
            <text
              transform={`rotate(-90)`}
              x={-(margin.top + innerHeight / 2)}
              y={margin.left - 45}
              textAnchor="middle"
              fontSize="12"
              fontWeight="800"
              fill="#0F172A"
              className="dark:fill-white"
            >
              Depth (m)
            </text>

            {/* X-Axis Label: Probability / Risk Factor */}
            <text
              x={margin.left + innerWidth / 2}
              y={svgHeight - 12}
              textAnchor="middle"
              fontSize="12"
              fontWeight="800"
              fill="#0F172A"
              className="dark:fill-white"
            >
              Probability / Risk Factor
            </text>

            {/* Scatter Dots Cloud (Blue for Safe, Red for High Risk Zone) */}
            {scatterPoints.map((pt) => {
              const cx = mapX(pt.probability);
              const cy = mapY(pt.depth);
              const isHovered = hoveredPoint?.id === pt.id;
              
              return (
                <circle
                  key={pt.id}
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 5 : 2.5}
                  fill={pt.isHighRisk ? '#DC2626' : '#2563EB'}
                  opacity={isHovered ? 1 : 0.85}
                  className="transition-all cursor-pointer hover:scale-150"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              );
            })}

            {/* Solid Trend Line (Mean Risk Curve) */}
            <path
              d={trendPathD}
              fill="none"
              stroke="#0F172A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dark:stroke-white opacity-90"
            />
          </svg>

          {/* Interactive Hover Card Overlay */}
          {hoveredPoint && (
            <div className="absolute top-4 right-4 bg-slate-900/95 text-white p-3 rounded-xl border border-slate-700 shadow-xl text-xs space-y-1 z-20 backdrop-blur-md">
              <div className="font-extrabold text-cyan-300 font-mono">Depth: {hoveredPoint.depth} m</div>
              <div>Risk Factor: <strong className={hoveredPoint.isHighRisk ? 'text-red-400 font-mono' : 'text-emerald-400 font-mono'}>{hoveredPoint.probability}</strong></div>
              <div className="text-[10px] text-slate-300 font-semibold">{hoveredPoint.formation}</div>
              <div className="text-[10px]">
                {hoveredPoint.isHighRisk ? (
                  <span className="text-red-400 font-extrabold">⚠️ Inside High Risk Zone</span>
                ) : (
                  <span className="text-emerald-400 font-extrabold">✓ Safe Operational Envelope</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Details & Risk Legend Box */}
        <div className="flex-1 space-y-3 max-w-sm">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-semibold">
            <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider block border-b border-slate-200 dark:border-slate-800 pb-1">
              Depth Plot Key Indicators:
            </span>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#2563EB]"></span>
              <span className="text-slate-800 dark:text-slate-200">Blue Dots: Safe / Normal Sensor Probability</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#DC2626]"></span>
              <span className="text-slate-800 dark:text-slate-200">Red Dots: High Risk Probability Points</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-6 h-1 bg-[#0F172A] dark:bg-white rounded"></span>
              <span className="text-slate-800 dark:text-slate-200">Solid Black Line: Mean Risk Trend Curve</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-4 h-3 bg-slate-300 dark:bg-slate-800 border border-slate-400 rounded"></span>
              <span className="text-slate-800 dark:text-slate-200">Shaded Region: High Risk Zone (&gt; 0.36)</span>
            </div>
          </div>

          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-300 dark:border-amber-700/60 text-xs text-amber-900 dark:text-amber-200 space-y-1 font-semibold">
            <div className="flex items-center gap-1.5 font-extrabold text-amber-800 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Assam Shelf Depth Advisory:</span>
            </div>
            <p className="leading-relaxed">
              At depth <strong className="font-mono">2,580 m – 2,640 m</strong>, swelling Kopili Shale increases risk factor probability beyond <strong className="font-mono">0.36</strong> into the High Risk Zone. Maintain mud weight at 10.8 ppg.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
