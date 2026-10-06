// Formation DNA Profile Engine - Oil India Limited Institutional Memory
// Learned patterns across 150+ historical wells in Upper Assam Basin

export const FORMATION_DNA = {
  Barail: {
    name: "Barail Formation",
    age: "Oligocene",
    lithology: "Alternating Sandstone, Siltstone, and Carbonaceous Shale",
    depthRange: "2200 m - 2900 m",
    typicalROP: "12 - 18 m/hr",
    riskProfile: {
      mudLoss: { level: "High", score: 82, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
      kickRisk: { level: "Medium", score: 58, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
      stuckPipe: { level: "Moderate", score: 65, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
      shaleSwelling: { level: "Low-Medium", score: 35, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" }
    },
    optimalParameters: {
      mudWeight: "10.6 - 11.0 ppg",
      viscosity: "48 - 54 sec",
      kclConcentration: "5.0 - 6.5 %",
      flowRate: "650 - 750 gpm",
      rotaryTorque: "12,000 - 15,000 ft-lbs",
      wob: "15 - 22 klbs"
    },
    provenLCMRecipes: [
      { name: "Fibrous Blend (Nutplug 15 lb/bbl + Mica 10 lb/bbl)", successRate: "94%" },
      { name: "Medium CaCO3 Bridging Agent (20 lb/bbl)", successRate: "88%" },
      { name: "High-Viscosity LCM Pill", successRate: "79%" }
    ],
    historicalMitigationRules: [
      "Keep pre-mixed fibrous LCM ready in slug pit prior to drilling past 2500m.",
      "Limit sudden surge pressure during tripping in to avoid hydraulic fracturing of weak coal streaks.",
      "Add 2% glycol/lubricant to prevent differential sticking against depleted sandstone streaks.",
      "Monitor gas readings continuously for micro-pore pressure kicks near Barail Fourth Sand."
    ],
    offsetIncidentsRecorded: 42,
    totalMetersDrilled: 128400,
    nptPreventedHours: 320
  },
  Tipam: {
    name: "Tipam Formation",
    age: "Miocene",
    lithology: "Coarse Ferruginous Sandstone with minor Claystone",
    depthRange: "1200 m - 2200 m",
    typicalROP: "18 - 28 m/hr",
    riskProfile: {
      mudLoss: { level: "Critical", score: 91, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
      kickRisk: { level: "Low", score: 24, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
      stuckPipe: { level: "Low", score: 30, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
      shaleSwelling: { level: "Low", score: 18, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" }
    },
    optimalParameters: {
      mudWeight: "9.8 - 10.4 ppg",
      viscosity: "42 - 48 sec",
      kclConcentration: "3.0 - 4.0 %",
      flowRate: "750 - 850 gpm",
      rotaryTorque: "8,000 - 11,000 ft-lbs",
      wob: "20 - 28 klbs"
    },
    provenLCMRecipes: [
      { name: "Coarse Granular LCM + Walnut Shells", successRate: "91%" },
      { name: "Blend LCM (Flake + Granular)", successRate: "85%" }
    ],
    historicalMitigationRules: [
      "Tipam sandstones are highly porous and permeable; maintain low mud weight to avoid heavy seepage losses.",
      "Use sized calcium carbonate for filter cake building."
    ],
    offsetIncidentsRecorded: 68,
    totalMetersDrilled: 185000,
    nptPreventedHours: 410
  },
  Kopili: {
    name: "Kopili Formation",
    age: "Eocene",
    lithology: "Dark Splintery Marine Shale with thin Limestone interbeds",
    depthRange: "2900 m - 3300 m",
    typicalROP: "8 - 14 m/hr",
    riskProfile: {
      mudLoss: { level: "Low", score: 28, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
      kickRisk: { level: "High", score: 78, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
      stuckPipe: { level: "High", score: 85, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
      shaleSwelling: { level: "Critical", score: 95, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" }
    },
    optimalParameters: {
      mudWeight: "11.2 - 11.8 ppg",
      viscosity: "54 - 62 sec",
      kclConcentration: "7.0 - 9.0 %",
      flowRate: "550 - 650 gpm",
      rotaryTorque: "14,000 - 18,000 ft-lbs",
      wob: "12 - 18 klbs"
    },
    provenLCMRecipes: [
      { name: "Potassium Chloride Polymer Inhibitive Mud + Polyamine", successRate: "96%" },
      { name: "Synthetic Oil-Based Mud (SOBM)", successRate: "99%" }
    ],
    historicalMitigationRules: [
      "Maintain high KCL inhibitor concentration (>7%) to prevent reactive shale hydration and hole sloughing.",
      "Perform frequent wiper trips to clear tight hole spots caused by swelling marine shales."
    ],
    offsetIncidentsRecorded: 54,
    totalMetersDrilled: 94000,
    nptPreventedHours: 580
  },
  Girujan: {
    name: "Girujan Clay Formation",
    age: "Pliocene-Miocene",
    lithology: "Mottled Claystone and Soft Siltstone",
    depthRange: "300 m - 1200 m",
    typicalROP: "25 - 40 m/hr",
    riskProfile: {
      mudLoss: { level: "Low", score: 15, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
      kickRisk: { level: "Very Low", score: 10, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
      stuckPipe: { level: "Low", score: 25, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
      shaleSwelling: { level: "Medium", score: 50, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" }
    },
    optimalParameters: {
      mudWeight: "9.2 - 9.8 ppg",
      viscosity: "38 - 44 sec",
      kclConcentration: "2.0 - 3.0 %",
      flowRate: "800 - 950 gpm",
      rotaryTorque: "5,000 - 8,000 ft-lbs",
      wob: "25 - 35 klbs"
    },
    provenLCMRecipes: [
      { name: "Bentonite Spud Mud + Polyacrylamide", successRate: "98%" }
    ],
    historicalMitigationRules: [
      "Fast surface drilling zone; maintain high flow rates to ensure bit hydraulics and hole cleaning."
    ],
    offsetIncidentsRecorded: 12,
    totalMetersDrilled: 210000,
    nptPreventedHours: 90
  }
};
