// Oil India Limited (OIL) Historical Well Database - Upper Assam Basin
// Real-world geological context: Duliajan, Digboi, Moran, Naharkatia fields

export const ACTIVE_WELL = {
  id: "OIL-204",
  name: "OIL-204 (Duliajan North Development)",
  field: "Duliajan Field",
  rig: "Rig-OIL-09 (2000 HP Electra)",
  spudDate: "2026-08-12",
  targetDepth: 3450,
  currentDepth: 2518,
  latitude: 27.3582,
  longitude: 95.3211,
  targetFormation: "Barail Main Pay",
  currentFormation: "Barail (Middle Shale & Sand)",
  casingStatus: "9-5/8 in set @ 2100 m",
  mudType: "KCL Polymer Water-Based Mud",
  mudWeight: 10.8,
  bitType: "12-1/4 in PDC Drill Bit (PDC-619)",
  wellHealthScore: 84, // 0-100
  operator: "Oil India Limited (eRTMAC Monitored)"
};

export const OFFSET_WELLS = [
  {
    id: "OIL-102",
    name: "OIL-102",
    field: "Duliajan East",
    distanceKm: 1.8,
    latitude: 27.3620,
    longitude: 95.3340,
    totalDepth: 3280,
    spudYear: 2021,
    similarityScore: 94,
    status: "Producing (Oil)",
    formations: ["Girujan", "Tipam", "Barail", "Kopili"],
    incidents: [
      {
        depth: 2518,
        formation: "Barail",
        type: "Mud Loss",
        severity: "High",
        lossRate: "18 bbl/hr",
        solution: "Pumped 40 bbl Fibrous LCM blend (Nutplug + Mica) in KCL polymer mud",
        outcome: "Losses completely arrested after 3.5 hrs. Saved ~6 hrs NPT.",
        lessonsLearned: "Keep pre-mixed fibrous LCM ready in slug pit before entering Barail sandstone at 2500m."
      },
      {
        depth: 2890,
        formation: "Kopili",
        type: "Shale Swelling",
        severity: "Medium",
        solution: "Increased KCL concentration to 7% and added Glycol shale inhibitor",
        outcome: "Hole stabilized, reaming completed successfully."
      }
    ],
    mudProgram: {
      avgMudWeight: 10.7,
      maxMudWeight: 11.2,
      viscosity: "48-52 sec",
      lcmType: "Fibrous Nutplug + CaCO3"
    },
    ropAvg: 14.2 // m/hr
  },
  {
    id: "OIL-78",
    name: "OIL-78",
    field: "Duliajan Central",
    distanceKm: 3.2,
    latitude: 27.3490,
    longitude: 95.3080,
    totalDepth: 3150,
    spudYear: 2019,
    similarityScore: 89,
    status: "Producing (Gas & Condensate)",
    formations: ["Girujan", "Tipam", "Barail"],
    incidents: [
      {
        depth: 2530,
        formation: "Barail",
        type: "Severe Mud Loss",
        severity: "Critical",
        lossRate: "35 bbl/hr",
        solution: "High concentration LCM plug (Fibrous + CaCO3 coarse) followed by cement plug",
        outcome: "NPT of 14 hours. Cement plug successfully sealed fractured sandstone zone.",
        lessonsLearned: "Avoid sudden ROP surges in upper Barail fracture zone to prevent hydraulic fracturing."
      }
    ],
    mudProgram: {
      avgMudWeight: 10.9,
      maxMudWeight: 11.5,
      viscosity: "55-60 sec",
      lcmType: "Cement Plug & Heavy LCM"
    },
    ropAvg: 12.8
  },
  {
    id: "OIL-91",
    name: "OIL-91",
    field: "Naharkatia North",
    distanceKm: 4.5,
    latitude: 27.3710,
    longitude: 95.2950,
    totalDepth: 3410,
    spudYear: 2020,
    similarityScore: 91,
    status: "Workover Active",
    formations: ["Girujan", "Tipam", "Barail", "Kopili", "Disang"],
    incidents: [
      {
        depth: 2610,
        formation: "Barail",
        type: "Gas Kick",
        severity: "Critical",
        gain: "12 bbl kick gain in trip tank",
        solution: "Closed BOP, weighted mud up from 10.6 ppg to 11.4 ppg using Barite via Driller's Method",
        outcome: "Well shut-in and circulated out safely. Total NPT: 18 hrs.",
        lessonsLearned: "Barail gas sand exhibits micro-pore pressure surges. Keep gas detector calibrated 24/7."
      }
    ],
    mudProgram: {
      avgMudWeight: 11.1,
      maxMudWeight: 11.8,
      viscosity: "52-56 sec",
      lcmType: "Granular LCM"
    },
    ropAvg: 11.5
  },
  {
    id: "OIL-145",
    name: "OIL-145",
    field: "Duliajan Deep",
    distanceKm: 2.4,
    latitude: 27.3650,
    longitude: 95.3120,
    totalDepth: 3600,
    spudYear: 2023,
    similarityScore: 96,
    status: "Producing (Oil)",
    formations: ["Girujan", "Tipam", "Barail", "Kopili"],
    incidents: [
      {
        depth: 2515,
        formation: "Barail",
        type: "Torque Spike / Differential Sticking Risk",
        severity: "Medium",
        solution: "Pumped 25 bbl spot of lubricant oil & reduced weight on bit by 15%",
        outcome: "Prevented stuck pipe incident completely. Zero NPT.",
        lessonsLearned: "Proactive addition of 2% lubricant in mud at 2500m depth prevents differential sticking."
      }
    ],
    mudProgram: {
      avgMudWeight: 10.8,
      maxMudWeight: 11.1,
      viscosity: "50-54 sec",
      lcmType: "Blend LCM"
    },
    ropAvg: 16.5
  },
  {
    id: "NHK-45",
    name: "NHK-45 (Naharkatia Offset)",
    field: "Naharkatia Field",
    distanceKm: 7.8,
    latitude: 27.2910,
    longitude: 95.2530,
    totalDepth: 3100,
    spudYear: 2018,
    similarityScore: 82,
    status: "Suspended",
    formations: ["Girujan", "Tipam", "Barail"],
    incidents: [
      {
        depth: 2490,
        formation: "Barail",
        type: "Stuck Pipe",
        severity: "Critical",
        solution: "Pumped acid pill & jarred drillstring for 12 hours",
        outcome: "Pipe freed, string backed off at 2400m, sidetracked well. 48 hrs NPT.",
        lessonsLearned: "Do not leave drillstring stationary for >10 mins in Barail depleted sandstone."
      }
    ],
    mudProgram: {
      avgMudWeight: 10.5,
      maxMudWeight: 11.0,
      viscosity: "45-50 sec",
      lcmType: "Flake LCM"
    },
    ropAvg: 10.2
  },
  {
    id: "MOR-12",
    name: "MOR-12 (Moran High)",
    field: "Moran Field",
    distanceKm: 14.2,
    latitude: 27.1850,
    longitude: 94.9210,
    totalDepth: 3800,
    spudYear: 2022,
    similarityScore: 78,
    status: "Producing (Oil)",
    formations: ["Girujan", "Tipam", "Barail", "Disang"],
    incidents: [
      {
        depth: 3200,
        formation: "Disang",
        type: "High Temperature Pressure Anomaly",
        severity: "High",
        solution: "Circulated mud cooler, upgraded synthetic oil-based mud",
        outcome: "Reached TD safely."
      }
    ],
    mudProgram: {
      avgMudWeight: 11.4,
      maxMudWeight: 12.2,
      viscosity: "60-65 sec",
      lcmType: "Synthetic OBM"
    },
    ropAvg: 9.8
  }
];
