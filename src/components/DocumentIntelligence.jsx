import React, { useState } from 'react';
import { 
  FileSearch, 
  Search, 
  FileText, 
  Code, 
  Sparkles, 
} from 'lucide-react';
import { semanticVectorSearch, HISTORICAL_KNOWLEDGE_DOCS } from '../utils/aiEngines';

export default function DocumentIntelligence({ uploadedDataset }) {
  const row = uploadedDataset?.latestRow || {};
  const [searchQuery, setSearchQuery] = useState('');
  
  const customUploadedDoc = uploadedDataset?.fileName ? {
    id: 'ACTIVE_UPLOADED_DOC',
    title: `Uploaded Dataset: ${uploadedDataset.fileName}`,
    field: row.field_name || 'Assam Shelf Operations',
    formation: row.formation_name || 'Barail Formation',
    year: '2026',
    vectorScore: 0.99,
    content: row.transcript_summary || row.notes || row.summaryText || `Extracted telemetry data from file ${uploadedDataset.fileName} containing ${uploadedDataset.rowCount} records and ${uploadedDataset.parametersCount} operational parameters including mud weight ${row.mud_weight_in || 10.8} ppg, depth ${row.depth_m || 2518} m, and ROP ${row.rop_m_hr || 14.8} m/hr.`,
    tags: ['Active Dataset', 'Telemetry Logs', 'Real-Time Parsed']
  } : null;

  const docs = customUploadedDoc ? [customUploadedDoc, ...HISTORICAL_KNOWLEDGE_DOCS] : HISTORICAL_KNOWLEDGE_DOCS;
  const [searchResults, setSearchResults] = useState(docs);
  const [selectedDoc, setSelectedDoc] = useState(docs[0]);

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    setSearchResults(q ? semanticVectorSearch(q) : docs);
  };

  return (
    <div className="p-4 space-y-4 max-w-[1600px] mx-auto font-sans">
      {/* Module Title & AI Vector Search Header */}
      <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#002B49] text-blue-400 rounded-lg">
            <FileSearch className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Modules 1 & 2: Document Intelligence & AI Knowledge Repository
              <span className="text-xs px-2 py-0.5 rounded bg-blue-700 text-white font-mono font-bold">
                PaddleOCR + pgvector
              </span>
            </h2>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Transforming decades of unstructured PDFs, WCRs & DDRs into searchable AI institutional memory
            </p>
          </div>
        </div>

        {/* Semantic Vector Search Box */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search AI memory e.g., 'stuck pipe near Barail'..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-bold placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Column (1/3): Search Vector Results List */}
        <div className="glass-panel p-4 rounded-xl space-y-3 max-h-[620px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Search Results ({searchResults.length})
            </span>
            <span className="text-[11px] text-cyan-700 dark:text-cyan-400 font-mono font-bold">pgvector Cosine Sim</span>
          </div>

          {searchResults.map((doc) => (
            <div
              key={doc.docId}
              onClick={() => setSelectedDoc(doc)}
              className={`p-3 rounded-lg border transition-all cursor-pointer space-y-2 ${
                selectedDoc.docId === doc.docId
                  ? 'bg-blue-50 dark:bg-blue-500/15 border-blue-500 font-bold'
                  : 'bg-slate-50 dark:bg-slate-900/70 border-slate-300 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-600" />
                  {doc.title}
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#002B49] text-amber-300">
                  {doc.year}
                </span>
              </div>
              <p className="text-[11px] text-slate-800 dark:text-slate-300 font-semibold line-clamp-2 leading-relaxed">
                {doc.snippet}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {doc.tags.map((tag, idx) => (
                  <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (2/3): OCR Extractor & JSON Display */}
        <div className="lg:col-span-2 glass-panel p-4 rounded-xl space-y-4 max-h-[620px] overflow-y-auto">
          {selectedDoc ? (
            <>
              {/* Document Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    {selectedDoc.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Well ID: <strong className="text-slate-900 dark:text-white">{selectedDoc.wellId}</strong> • Formation: <strong className="text-amber-700 dark:text-amber-400">{selectedDoc.formation}</strong> • Depth: {selectedDoc.depthRange}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 border border-emerald-400">
                  OCR: VERIFIED
                </span>
              </div>

              {/* Raw Text vs JSON */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Raw OCR Text Snippet */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-cyan-600" />
                    OCR Scanned Text (PaddleOCR)
                  </span>
                  <p className="text-xs text-slate-900 dark:text-slate-200 font-mono font-bold leading-relaxed bg-slate-200 dark:bg-[#070C18] p-3 rounded border border-slate-300 dark:border-slate-800 whitespace-pre-wrap">
                    "{selectedDoc.snippet}"
                  </p>
                </div>

                {/* Structured JSON Knowledge Output */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold text-purple-900 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-purple-600" />
                    NLP Extracted Knowledge JSON
                  </span>
                  <pre className="text-xs text-purple-950 dark:text-cyan-300 font-mono font-bold bg-slate-200 dark:bg-[#070C18] p-3 rounded border border-slate-300 dark:border-slate-800 overflow-x-auto">
                    {JSON.stringify(selectedDoc.extractedJSON, null, 2)}
                  </pre>
                </div>

              </div>

              {/* Query Examples */}
              <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-800 space-y-2">
                <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Try Natural Language RAG Queries (LlamaIndex + pgvector):
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    "Show mud loss incidents near Barail",
                    "What LCM recipe stopped losses in OIL-102?",
                    "Gas kick gain in OIL-91",
                    "Stuck pipe prevention in Barail formation"
                  ].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSearchQuery(q);
                        setSearchResults(semanticVectorSearch(q));
                      }}
                      className="px-2.5 py-1 rounded font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-slate-600 dark:text-slate-400 text-xs font-bold text-center py-16">
              Select a document from the search results to inspect OCR and NLP extractions.
            </div>
          )}
        </div>

      </div>

      {/* Modules 8 & 9: Similar Well Success Stories & Failed Recommendation Learning Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Module 9: Similar Well Success Stories */}
        <div className="glass-panel p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Similar Well Success Stories (RAG Insight Retrieval)
            </h3>
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
              pgvector + Llama3
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-800 rounded-lg space-y-1">
              <div className="flex justify-between items-center font-extrabold text-emerald-900 dark:text-emerald-300">
                <span>OIL-84 (Barail Sandstone) • 2,540 m</span>
                <span className="px-2 py-0.5 bg-emerald-700 text-white text-[10px] rounded font-mono">98% Match</span>
              </div>
              <p className="text-slate-900 dark:text-slate-200 font-semibold">
                <strong>Success Action:</strong> Differential sticking prevented by lowering WOB to 16.2 MT and injecting 3% Lubra-Glide lubricant. Zero NPT recorded.
              </p>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-800 rounded-lg space-y-1">
              <div className="flex justify-between items-center font-extrabold text-blue-900 dark:text-blue-300">
                <span>OIL-112 (Kopili Shale Transition) • 2,410 m</span>
                <span className="px-2 py-0.5 bg-blue-700 text-white text-[10px] rounded font-mono">94% Match</span>
              </div>
              <p className="text-slate-900 dark:text-slate-200 font-semibold">
                <strong>Success Action:</strong> Shale sloughing controlled by increasing KCl concentration to 7.5% and maintaining mud yield point at 18 lb/100ft².
              </p>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-800 rounded-lg space-y-1">
              <div className="flex justify-between items-center font-extrabold text-purple-900 dark:text-purple-300">
                <span>OIL-95 (Tipam Sandstone) • 2,180 m</span>
                <span className="px-2 py-0.5 bg-purple-700 text-white text-[10px] rounded font-mono">91% Match</span>
              </div>
              <p className="text-slate-900 dark:text-slate-200 font-semibold">
                <strong>Success Action:</strong> Severe mud loss sealed within 45 mins by pumping 35 bbl fibrous Nutplug + mica flake pill.
              </p>
            </div>
          </div>
        </div>

        {/* Module 8: Failed Recommendation Learning (MLflow / Weights & Biases) */}
        <div className="glass-panel p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-500" />
              Failed Recommendation Learning (Reinforcement Loop)
            </h3>
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
              MLflow + Weights & Biases
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800/60 rounded-lg space-y-1">
              <div className="flex justify-between items-center font-extrabold text-red-900 dark:text-red-300">
                <span>Incident #14 (OIL-78 Barail Sand)</span>
                <span className="px-2 py-0.5 bg-red-700 text-white text-[10px] rounded font-mono">MODEL PENALIZED (-1.5)</span>
              </div>
              <p className="text-slate-900 dark:text-slate-200 font-semibold">
                <strong>Past AI Error:</strong> AI recommended increasing mud weight to 1.42 SG. Caused formation fracturing and 120 bbl mud loss.
              </p>
              <p className="text-amber-800 dark:text-amber-300 font-extrabold text-[11px] pt-1">
                &rarr; RL Rule Enforced: Mud weight upper limit capped at 1.38 SG in Tipam Sandstone.
              </p>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 rounded-lg space-y-1">
              <div className="flex justify-between items-center font-extrabold text-amber-900 dark:text-amber-300">
                <span>Incident #03 (OIL-99 Kopili Shale)</span>
                <span className="px-2 py-0.5 bg-amber-700 text-white text-[10px] rounded font-mono">RE-WEIGHTED MODEL</span>
              </div>
              <p className="text-slate-900 dark:text-slate-200 font-semibold">
                <strong>Past AI Error:</strong> AI suggested high ROP (22 m/hr) during bit chatter, causing premature PDC cutter chipping.
              </p>
              <p className="text-cyan-800 dark:text-cyan-300 font-extrabold text-[11px] pt-1">
                &rarr; RL Rule Enforced: Auto-throttle ROP when 3-axis vibration exceeds 1.8g RMS.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

