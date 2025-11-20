# RAG System Documentation

## Overview
- Location: `G:\Interns\Ajith Srikanth\RAG`
- Purpose: Retrieval-Augmented Generation stack for Van Dyk manuals, combining document ingestion, SQL equipment data, and Streamlit chat interfaces tailored to baler projects.
- Scope: ingestion utilities, vector-store management, multiple Streamlit apps (production, optimized, comprehensive), OpenAI + Vanna integrations, and supporting logs/data.

## Key Directories
| Path | Description |
| --- | --- |
| `RAG/` | Main codebase (Python modules, Streamlit apps, scripts). |
| `RAG/logs/` | Processing / ingestion logs. |
| `RAG/ingestion/` | Tools for PDF ingestion, chunking, metadata cleanup. |
| `RAG/querying/` | Scripts/notebooks demonstrating search & evaluation. |
| `RAG/vector_db/` | Vector DB assets (Chroma, FAISS copies). |
| `RAG/UI Chatbot/` | Legacy Streamlit UI builds. |
| `test_*` folders | QA datasets for baler procedures, metadata fix tests, etc.

## Core Scripts (RAG/RAG/)
| File | Role |
| --- | --- |
| `streamlit_baler_ai_assistant.py`, `production_baler_ai_assistant.py`, `optimized_baler_ai_assistant.py` | Streamlit chat apps targeted at WM Mesquite Creek/Baler doc sets, with varying cost/perf trade-offs. |
| `comprehensive_baler_ingestion.py`, `baler_procedures_ingestion.py` | End-to-end ingestion pipelines (PDF walk, chunk, embed, metadata). |
| `comprehensive_query_system.py`, `test_comprehensive_system.py` | CLI/Streamlit evaluation of hybrid retrieval. |
| `WMCompleteRAGEngine` (inside `production_baler_ai_assistant.py`) | Coordinates vector store, SQL manager, intelligent SQL, and response generation.
| `WMVectorStore`, `WMSQLManager`, `WMIntelligentSQL`, `WMVannaHybrid` | Modular classes for embeddings, SQL Server access, LangChain/Vanna integration. |
| `streamlit_chroma_rag_app.py`, `streamlit_manuals_query_app.py`, `streamlit_local_rag_app.py` | Additional Streamlit front-ends for specific workflows (manuals lookup, local vector DB, etc.). |
| `streams/logs`, `ENHANCED_AI_ASSISTANT_SUMMARY.md` | Operational notes and logs for AI assistants.

## Data Flow
1. **Ingestion**
   - Scripts under `ingestion/` or `RAG/RAG/*ingestion.py` walk `CUSTOMER_FOLDER` (e.g., `G:\SERVICE\Customer info\WM Mesquite Creek`).
   - Documents chunked via `langchain` helpers (`RecursiveCharacterTextSplitter` etc.).
   - Metadata captured (project numbers, equipment serials, priority scoring).
   - Embeddings generated using OpenAI `text-embedding-ada-002` (or fallback) and stored in Chroma persistent directories (`wm_mesquite_vector_store`, etc.).

2. **SQL Layer**
   - `WMSQLManager` connects to `vdrsapps.database.windows.net` (PowerAppsDatabase) via SQLAlchemy/pyodbc.
   - Provides summarised lookups (`search_equipment`, `get_equipment_summary`), typed query generation, and fallback to SQLite caches if needed.

3. **Intelligent SQL / Vanna**
   - `WMIntelligentSQL` uses LangChain `create_sql_query_chain` (ChatOpenAI) to translate natural language requests into SQL; includes fallback heuristics.
   - `WMVannaHybrid` optionally initializes a Vanna instance tied to Chroma and the same SQL database for improved question-to-SQL generation and hybrid correlation (documents + SQL rows).

4. **Chat Response**
   - Streamlit UI collects user prompts.
   - Engine gathers context: top-N vector hits, SQL results, Vanna output, ingestion metadata.
   - Response assembled via OpenAI GPT (gpt-3.5 or gpt-4 depending on config) with explicit prompt emphasising equipment-specific guidance.
   - Sources and related items displayed in collapsible sections.

## Configuration Highlights
- `.env` / environment variables: `OPENAI_API_KEY`, SQL credentials, vector store paths.
- Streamlit `st.session_state` keys track conversation history, cost metrics, selected documents.
- File blacklists (`wm_blacklist.txt`) and checkpoints (`wm_checkpoint.json`) support resumable ingestion.

## Running
```bash
cd RAG/RAG
streamlit run production_baler_ai_assistant.py
# or
streamlit run optimized_baler_ai_assistant.py
```
Ensure `CUSTOMER_FOLDER` exists and embeddings/Chroma directories are accessible (create via ingestion scripts if first run).

## Logs & Monitoring
- Ingestion logs written to `RAG/RAG/logs/` (including failed files, completed files, metadata).
- Streamlit apps log to console plus optional session metrics (token costs via `TokenTracker`).
- SQL/embedding errors reported in UI and `st.error`, with retry logic around long operations.

## Known Considerations
- **Security**: SQL credentials and API keys currently hard-coded in some scripts; move to secure storage before deployment.
- **Costs**: GPT/Vanna usage tracked in `TokenTracker`, but no automatic budget enforcement.
- **Performance**: Large Chroma stores may require compaction; consider switching to persistent client with `chromadb.PersistentClient` (already used in vector store).
- **Testing**: `test_*` projects provide ingestion and metadata regression tests; keep them updated when modifying metadata schemas.

## Next Steps / Ideas
- Add authentication to Streamlit interfaces.
- Implement Azure Blob integration for document storage (currently local network drives).
- Improve metadata extraction (regex review, new heuristics for project IDs, spec labels).
- Build scheduled ingestion jobs (e.g., nightly) with notifications when new documents processed.

Updated: November 2025  
Maintainer: Van Dyk AI Solutions

