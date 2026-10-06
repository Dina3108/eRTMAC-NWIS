// Semantic Vector Search & NLP Extractor Simulation (Modules 1, 2, 5)
import { OFFSET_WELLS } from '../data/oilWellDatabase';

export const HISTORICAL_KNOWLEDGE_DOCS = [
  {
    docId: "WCR-OIL-102-BARAIL",
    wellId: "OIL-102",
    title: "Well Completion Report - OIL-102 Barail Section",
    year: 2021,
    formation: "Barail",
    depthRange: "2450m - 2650m",
    snippet: "Encountered severe partial mud loss at 2518m in Middle Barail Sandstone. Initial loss rate measured 18 bbl/hr. Rig team pumped 40 bbl Fibrous LCM blend (Nutplug 15 lb/bbl + Mica 10 lb/bbl) in KCL polymer water-based mud. Losses completely arrested after 3.5 hrs. Recommendation for future offset wells: keep pre-mixed fibrous LCM ready in slug pit before entering Barail sandstone at 2500m.",
    tags: ["Mud Loss", "Barail", "Fibrous LCM", "Nutplug", "Mica", "KCL Polymer"],
    extractedJSON: {
      well: "OIL-102",
      depth: 2518,
      formation: "Barail",
      event: "Mud Loss",
      lossRate: "18 bbl/hr",
      mitigation: "Fibrous LCM Blend (Nutplug + Mica)",
      outcome: "Losses Arrested in 3.5 hrs",
      nptPrevented: "6 hrs"
    }
  },
  {
    docId: "DDR-OIL-91-KICK",
    wellId: "OIL-91",
    title: "Daily Drilling Report #34 - OIL-91 Barail Gas Kick",
    year: 2020,
    formation: "Barail",
    depthRange: "2600m - 2630m",
    snippet: "Drilling at 2610m with 10.6 ppg mud. Observed 12 bbl gain in trip tank and standpipe pressure drop of 180 psi. Gas detector spiked to 14.5%. Closed annular BOP immediately. Shut-in SIDPP = 350 psi, SICP = 420 psi. Weighted mud from 10.6 ppg to 11.4 ppg using Barite via Driller's Method. Circulated out influx safely. Total NPT: 18 hrs.",
    tags: ["Kick", "Gas Influx", "Barail", "BOP Shut-in", "Driller's Method", "Barite"],
    extractedJSON: {
      well: "OIL-91",
      depth: 2610,
      formation: "Barail",
      event: "Gas Kick",
      kickGain: "12 bbl",
      mitigation: "Closed BOP, weighted mud to 11.4 ppg Barite",
      outcome: "Well controlled safely",
      nptTime: "18 hrs"
    }
  },
  {
    docId: "WCR-NHK-45-STUCK",
    wellId: "NHK-45",
    title: "Well Completion Report - NHK-45 Differential Sticking",
    year: 2018,
    formation: "Barail",
    depthRange: "2480m - 2520m",
    snippet: "While connection at 2490m, drillstring remained stationary for 18 minutes due to top drive sensor warning. Pipe became differentially stuck against depleted Barail porous sandstone. Pumped 30 bbl organic acid & lubricant pill. Jarred drillstring for 12 hours without success. Backed off at 2400m and sidetracked. Lesson: Never allow drillstring to remain static >10 mins in Barail.",
    tags: ["Stuck Pipe", "Differential Sticking", "Barail", "Jarring", "Sidetrack"],
    extractedJSON: {
      well: "NHK-45",
      depth: 2490,
      formation: "Barail",
      event: "Stuck Pipe",
      mitigation: "Acid Pill + Jarring",
      outcome: "Sidetracked well",
      nptTime: "48 hrs"
    }
  },
  {
    docId: "WCR-OIL-145-LUBRICANT",
    wellId: "OIL-145",
    title: "Well Operational Summary - OIL-145 Proactive Sticking Prevention",
    year: 2023,
    formation: "Barail",
    depthRange: "2500m - 2540m",
    snippet: "At 2515m in Barail formation, rotary torque increased by 35% (from 12,000 to 16,200 ft-lbs). System alerted sticking risk. Rig team proactively pumped 25 bbl spot of lubricant oil and reduced WOB by 15%. Torque returned to normal envelope within 45 minutes. Zero NPT recorded.",
    tags: ["Torque Spike", "Lubricant Spot", "Barail", "Proactive Alert", "Zero NPT"],
    extractedJSON: {
      well: "OIL-145",
      depth: 2515,
      formation: "Barail",
      event: "Torque Spike / Sticking Warning",
      mitigation: "Lubricant Spot Pill + WOB reduction",
      outcome: "Prevented stuck pipe completely",
      nptSaved: "24 hrs"
    }
  }
];

// Vector search simulation querying embeddings
export function semanticVectorSearch(query) {
  if (!query || query.trim() === '') return HISTORICAL_KNOWLEDGE_DOCS;

  const q = query.toLowerCase();
  return HISTORICAL_KNOWLEDGE_DOCS.filter(doc => {
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.snippet.toLowerCase().includes(q) ||
      doc.formation.toLowerCase().includes(q) ||
      doc.tags.some(t => t.toLowerCase().includes(q))
    );
  });
}

// Similar Well Recommender Engine
export function getRecommendedOffsetWells(activeWellDepth, activeFormation) {
  return OFFSET_WELLS.map(well => {
    let score = well.similarityScore;
    if (well.formations.includes(activeFormation)) {
      score += 2;
    }
    return {
      ...well,
      computedSimilarity: Math.min(99, score)
    };
  }).sort((a, b) => b.computedSimilarity - a.computedSimilarity);
}
