// SIH 2026 - eRTMAC-NWIS Technical Approach & Architecture Specification
// Team Lucifer - 12-Layer System Pipeline Architecture

export const TECHNICAL_APPROACH_LAYERS = [
  {
    step: 1,
    title: "1. eRTMAC Live Drilling Data",
    description: "Real-time drilling parameters (WOB, RPM, ROP, Pressure, Flow, Mud logs)",
    technologies: ["Apache Kafka", "FastAPI", "InfluxDB"],
    color: "from-blue-600 to-[#002B49]",
    badgeBg: "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border-blue-400",
    status: "ACTIVE (50 Hz Feed)"
  },
  {
    step: 2,
    title: "2. Historical Reports & Documents",
    description: "WCR | DDR | AFE | Well completion reports | Geologist field notes",
    technologies: ["Google Document AI", "PaddleOCR", "Camelot", "Python"],
    color: "from-emerald-600 to-teal-800",
    badgeBg: "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-400",
    status: "PROCESSED (150+ Wells)"
  },
  {
    step: 3,
    title: "3. Correlation Across Wells",
    description: "Compare drilling telemetry and lithology stratigraphy across offset wells",
    technologies: ["Python", "Plotly", "Dash"],
    color: "from-pink-600 to-rose-800",
    badgeBg: "bg-pink-100 dark:bg-pink-950 text-pink-800 dark:text-pink-300 border-pink-400",
    status: "COMPUTED"
  },
  {
    step: 4,
    title: "4. OCR + Data Cleaning & Structuring",
    description: "Extract, clean and standardize unstructured field drilling reports into JSON",
    technologies: ["Google Document AI", "PaddleOCR", "OpenRefine", "Python"],
    color: "from-purple-600 to-indigo-800",
    badgeBg: "bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border-purple-400",
    status: "VERIFIED"
  },
  {
    step: 5,
    title: "5. Central Knowledge Storage",
    description: "Store structured data, geospatial geometries, documents, well info & vector embeddings",
    technologies: ["PostgreSQL", "PostGIS", "pgvector", "MinIO"],
    color: "from-cyan-600 to-blue-800",
    badgeBg: "bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border-cyan-400",
    status: "ONLINE"
  },
  {
    step: 6,
    title: "6. NLP / LLM Processing",
    description: "Retrieval-Augmented Generation (RAG) for similar well search, insights & recommendations",
    technologies: ["LangChain", "LlamaIndex", "OpenAI Embeddings", "Llama 3"],
    color: "from-amber-600 to-orange-800",
    badgeBg: "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-400",
    status: "READY"
  },
  {
    step: 7,
    title: "7. Prediction & Intelligence Engine",
    description: "Multi-hazard risk prediction, parameters simulation & decision support",
    technologies: ["XGBoost", "LightGBM", "PyTorch Geometric", "NumPy"],
    color: "from-red-600 to-rose-800",
    badgeBg: "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border-red-400",
    status: "RUNNING"
  },
  {
    step: 8,
    title: "8. Continuous Learning Loop",
    description: "Learn continuously from engineer feedback and failed recommendation logs",
    technologies: ["MLflow", "Weights & Biases"],
    color: "from-emerald-600 to-green-800",
    badgeBg: "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-400",
    status: "MONITORED"
  },
  {
    step: 9,
    title: "9. Key Functional Modules",
    description: "Depth-wise timeline | Cascading risk | Risk heatmap | What-if simulator | 3D formation | Success stories | Interactive map | Historical replay",
    technologies: ["Mapbox GL JS", "PostGIS", "CesiumJS", "PyVista (VTK)", "Plotly", "FastAPI"],
    color: "from-blue-600 to-cyan-800",
    badgeBg: "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border-blue-400",
    status: "ACTIVE"
  },
  {
    step: 10,
    title: "10. Operational Intelligence Modules",
    description: "Safety readiness | Tool life prediction | Carbon-aware advisor | Cost impact predictor | Weather risk | Casing decision support",
    technologies: ["FastAPI", "XGBoost", "LSTM", "Grafana", "Apache Superset", "Power BI", "OpenWeatherMap"],
    color: "from-[#002B49] to-[#800020]",
    badgeBg: "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-400",
    status: "ACTIVE"
  },
  {
    step: 11,
    title: "11. Knowledge & Automation",
    description: "Expert voice knowledge capture & automated report generator",
    technologies: ["OpenAI Whisper", "pyannote.audio", "React-PDF", "Docxtemplater", "ExcelJS"],
    color: "from-purple-600 to-pink-800",
    badgeBg: "bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border-purple-400",
    status: "ACTIVE"
  },
  {
    step: 12,
    title: "12. AI Predictive Risk Alerts & Engineer Decision Dashboard",
    description: "Unified enterprise operational dashboard for visualization, real-time alerts, offset recommendations and decision support",
    technologies: ["React", "Tailwind CSS", "FastAPI", "Plotly", "Grafana", "Mapbox"],
    color: "from-[#C41E3A] to-[#002B49]",
    badgeBg: "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border-red-400",
    status: "LIVE PRODUCTION"
  }
];
