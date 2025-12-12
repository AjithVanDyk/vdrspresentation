# Standalone Python and Support Files Documentation

## Overview
- Location: `G:\Interns\Ajith Srikanth\` (root-level utilities shared across projects)
- Scope: Standalone scripts and helper assets consumed by multiple internal tools
- Primary consumers: Streamlit apps, automation jobs, tooling engineers, data analysts
- Related master docs: `Presentation/Complete_Project_Portfolio_Overview.md` and project-specific manuals in the same folder

## audio_upload.py

### Purpose
Provide a minimal Flask service that receives audio recordings from browser clients and stores them for later processing.

### Technical Overview
The module exposes one POST endpoint at `/upload`. It expects a multipart form upload with the key `audio`, saves the contents as `uploads/recorded_audio.webm`, and responds with a plain "OK" string. Cross-origin requests are enabled so that Streamlit or other web front-ends can call the API from different origins.

### Key Components
- `UPLOAD_FOLDER`: Output directory created on startup.
- `app = Flask(__name__)`: Core Flask instance.
- `CORS(app)`: Allows cross-origin calls.
- `upload_audio()`: Reads the uploaded file, writes it to disk, returns HTTP 200.
- `if __name__ == "__main__"`: Runs the dev server on port 5001.

### Code Structure
1. Imports (`flask`, `flask_cors`, `os`).
2. Constant definition and directory bootstrap.
3. Flask app initialisation and middleware.
4. Route handler for uploads.
5. Standalone execution guard.

### Dependencies
- Flask
- flask-cors
- Python standard library (`os`)

### Usage
1. Install dependencies: `pip install flask flask-cors`.
2. Run `python audio_upload.py`.
3. POST to `http://localhost:5001/upload` with form field `audio` containing a WebM blob.
4. Retrieve the saved file from the `uploads` folder (note that it is overwritten on every request).

### Technical Details
- CORS is fully open; tighten it in production.
- The service overwrites the same filename each time—extend naming logic if versioning is required.
- Use a production-ready WSGI server when deploying outside development environments.

## chatbot.py

### Purpose
Deliver a full-featured Retrieval-Augmented Generation (RAG) assistant for WM Mesquite Creek that combines document ingestion, vector search, SQL Server queries, LangChain-based intelligent SQL, and optional Vanna AI hybrid capabilities inside a Streamlit UI.

### Technical Overview
The script sets up environment configuration, optional dependency flags, and several cooperating classes:
- `TokenTracker` tracks token usage and cost.
- `WMDocumentProcessor` ingests PDFs, DOCX files, and text documents with metadata extraction.
- `WMVectorStore` manages ChromaDB or file-based embeddings with search utilities.
- `WMSQLManager` connects to the PowerApps SQL Server instance and exposes search helpers.
- `WMIntelligentSQL` builds LangChain SQL chains tuned to WM Mesquite Creek data.
- `WMVannaHybrid` (initialised from the UI) links the existing vector store to Vanna-generated SQL.
- `WMCompleteRAGEngine` orchestrates indexing, querying, and response generation.

Streamlit tabs provide dashboards for system status, ingestion, RAG chat, SQL exploration, and hybrid analytics.

### Key Components
- Configuration constants (customer paths, OpenAI keys, SQL credentials, vector-store paths).
- **TokenTracker**: `count_tokens`, `track_usage` for budgeting.
- **WMDocumentProcessor**: `process_pdf_file`, `process_docx_file`, `_chunk_text`, metadata cleaning.
- **WMVectorStore**: initialises ChromaDB or a file-based fallback, exposes `add_document`, `search`, `get_stats`.
- **WMSQLManager**: `_connect`, `_refresh_schema`, `search_equipment`, summary utilities.
- **WMIntelligentSQL**: LangChain SQL pipeline with fallback to simple SQL generation.
- **WMVannaHybrid**: `initialize_vanna`, `train_vanna_basic`, `hybrid_search` for correlated results.
- **WMCompleteRAGEngine**: `_build_path_index`, `process_documents`, `search_document_index`, `run_full_query`, `generate_ai_response`.
- Streamlit entry points: `create_vanna_hybrid_tab`, `main`.

### Code Structure
1. Imports, environment loading, feature flags.
2. Dependency checks with graceful degradation.
3. Streamlit page configuration.
4. Constants for customer metadata, API keys, database targets.
5. Session-state initialisation helpers.
6. Class definitions for token tracking, document processing, vector storage, SQL management, LangChain integration, Vanna hybrid, and the RAG engine.
7. Streamlit UI composition (status metrics, ingestion controls, chat, SQL explorer, hybrid tab).
8. `main()` executed by Streamlit.

### Dependencies
- Streamlit
- OpenAI Python SDK
- python-dotenv
- chromadb
- langchain-core, langchain-openai, langchain-community
- SQLAlchemy, pyodbc
- pandas, numpy, psutil, scikit-learn (optional fallback)
- PyPDF2, python-docx (document processing)
- tiktoken, vanna (hybrid features)
- Standard library modules

### Usage
1. Populate environment variables (or `.env`) with OpenAI and database credentials. Current file contains hard-coded values that should be externalised.
2. Install requirements used by the RAG project.
3. Start with `streamlit run chatbot.py`.
4. Use the sidebar to ingest documents, test database connectivity, and manage Vanna training.
5. Explore the RAG chat, intelligent SQL, and hybrid tabs from the main UI.

### Technical Details
- Path indexing caches directory metadata for faster search.
- Blacklist and checkpoint files make document ingestion resumable.
- `WMCompleteRAGEngine` merges vector hits, SQL results, and intelligently generated SQL output before invoking OpenAI for final answers.
- Hard-coded API keys and SQL credentials pose security risk; relocate them to secure config stores.
- Ensure the Streamlit process has write permissions for log and cache files.

## chatbotv1.py

### Purpose
Earlier generation of the WM Mesquite Creek RAG application, preserved for comparison, rollback, or analysis of design deltas.

### Technical Overview
This version relies on a custom `VannaAIManager` to handle natural language queries. It manages vector storage, SQL connectivity, document processing, and Streamlit presentation similar to the newer release, but lacks the LangChain-based SQL chain and hybrid tab.

### Key Components
- Shared configuration constants for customer metadata and equipment terminology.
- **VannaAIManager**: Initialises Vanna, trains on schema examples, executes generated SQL, provides fallback queries.
- **WMVectorStore**: ChromaDB or pickle-backed embeddings (`add_document`, `search`, `get_stats`).
- **WMSQLManager**: Connects to SQL Server, offers `search_equipment` and `get_equipment_summary`.
- **WMDocumentProcessor**: PDF/text ingestion and metadata extraction.
- **WMCompleteRAGEngine**: Coordinates document processing, `comprehensive_search`, and response generation.
- Streamlit tabs: RAG chat, Vanna SQL lab, database browser.

### Code Structure
1. Imports, logging setup (`logs/wm_enhanced_rag_system.log`).
2. Optional dependency guards.
3. Streamlit configuration and constants.
4. Session state initialisation.
5. Class definitions.
6. Streamlit UI within `main()`.

### Dependencies
- Streamlit, OpenAI, chromadb, SQLAlchemy, pyodbc, pandas, numpy, psutil, PyPDF2.
- vanna library for text-to-SQL.
- Logging writes to `logs/`; ensure directory exists.

### Usage
- Launch with `streamlit run chatbotv1.py`.
- Train Vanna and ingest documents via sidebar controls.
- Intended as a fallback; avoid port conflicts with the main chatbot.

### Technical Details
- Provides hard-coded SQL fallbacks for common queries (e.g., BALER listings).
- Uses pickle/JSON storage when ChromaDB is unavailable.
- Tracks Vanna training status via `st.session_state.vanna_trained`.
- Logs to both file and console for debugging.

## serial_operations.py

### Purpose
Back-end engine for copying and organising serial-numbered folders within the Van Dyk Tools platform. It aligns machine documentation, Excel references, and child-part folders while streaming progress to the UI.

### Technical Overview
`SerialFolderOperationManager` supervises long-running copy operations. It validates paths, normalises network shares, finds matching folders, builds customer folder hierarchies, resolves associated PDFs via Excel metadata, copies GDrive child-part resources, and emits Socket.IO progress updates. Thread pools and pause/resume controls support safe execution.

### Key Components
- `SecurityError`: Custom exception for invalid paths.
- Constructor: Normalises UNC paths, configures logging (prefers `enhanced_logger`), applies WerFault prevention, loads skip lists and Excel metadata, initialises progress tracking.
- `_prevent_werfault_crash()`: Clears conflicting environment variables to avoid DLL initialisation failures.
- `_test_external_dependencies()`: Safely probes optional modules.
- `_initialize_operation_state()`: Sets counters, pause flags, temporary workspace.
- `_log_error_clean()`: Centralised logging helper.
- `validate_paths()`: Ensures source/destination folders exist and are safe.
- `normalize_folder_name()`, `find_matching_folder()`: Provide fuzzy matching for serial folders.
- `create_customer_structure()`: Builds `Customer\Project\Serial` directories.
- `copy_folder_contents()`: Copies files with sanitisation and collision handling.
- `sanitize_filename()`: Removes illegal characters and truncates long names.
- `find_machine_info_folder()`, `find_pdf_path_in_excel()`, `find_pdf_by_pdf_name()`: Resolve documentation sources.
- `_compare_item_numbers()` and `extract_item_numbers_from_pdf_name()`: Parse item numbers embedded in filenames.
- `copy_gdrive_child_parts_to_machine_info()` / `copy_gdrive_child_parts_to_excel_path()`: Mirror child-part folders from the `GDrive- Child Parts` repository.
- `process_single_item()`: Orchestrates the workflow for each row from the UI.
- `send_progress_update()`: Emits Socket.IO events with throttling.
- Lifecycle control: `run_operation()`, `pause_operation()`, `resume_operation()`, `stop_operation()`, `get_status()`.

### Code Structure
1. Imports and optional dependency bindings (`safe_subprocess`, `config_manager`, `enhanced_logger`).
2. Logger setup with fallbacks to standard logging handlers.
3. Definition of `SerialFolderOperationManager` encapsulating all operational methods.
4. Helper methods covering validation, matching, copying, PDF resolution, child-part integration, and job control.

### Dependencies
- Standard library: `os`, `shutil`, `threading`, `time`, `re`, `datetime`, `concurrent.futures`, `pathlib`, `logging`, `tempfile`, `gc`.
- Optional internal modules: `safe_subprocess.safe_run`, `config_manager`, `enhanced_logger` (from the Van Dyk Tools project).
- Excel metadata supplied externally (list of dicts) for PDF lookups.
- Socket.IO instance supplied by the Flask/SocketIO server in `Van Dyk Tools/Application`.

### Usage
- Imported by the Van Dyk Tools backend (`app.py`) to execute serial copy jobs.
- Instantiate with an operation ID, table rows, Socket.IO handle, optional skip list, optional customer path override, and Excel metadata.
- Call `run_operation()` from a background thread. Use `pause_operation()` and `resume_operation()` in response to UI actions.
- Ensure the process runs within the Van Dyk Tools virtual environment so internal modules resolve correctly.

### Technical Details
- Designed to operate inside a Socket.IO context; progress updates are JSON payloads consumed by the web client.
- Thread-safe flags (`self._paused`, `self._stop_requested`) guard long-running tasks.
- Batch size and worker count can be tuned via constants.
- Tracks processed locations to avoid duplicate work per PDF.
- Sanitises file names to comply with Windows path limits.
- Requires network access to `G:\SERVICE\Customer info` and `GDrive- Child Parts` shares.

## tp.py

### Purpose
Generate a predefined folder hierarchy for OTISort projects to ensure consistent organisation across the team.

### Technical Overview
Defines a `base_path` and a list of folder descriptors containing project numbers, manufacturer, and subsystem. Each descriptor is normalised (tabs and repeated spaces collapsed) and passed to `os.makedirs` to create the target directories.

### Key Components
- `base_path`: Destination root.
- `folders`: Hard-coded catalogue of folder names.
- Loop that trims strings, replaces spacing, and creates directories.

### Code Structure
1. Import `os`.
2. Configure base path and folder names.
3. Iterate and create directories with `exist_ok=True`.

### Dependencies
- Python standard library only.

### Usage
- Adjust `base_path` to the desired destination.
- Run `python tp.py`.
- Reruns are safe because directory creation is idempotent.

### Technical Details
- No exception handling; wrap with try/except if running unattended.
- Consider moving the folder list to configuration if the catalogue changes regularly.

## recorder.html

### Purpose
Browser-based audio recorder embedded in Streamlit apps to capture microphone input and return Base64-encoded audio blobs.

### Technical Overview
The page renders Start/Stop buttons and an `<audio>` element. When recording starts it requests microphone access, streams audio into `MediaRecorder`, collects chunks, and upon stop converts the blob to Base64 before notifying Streamlit via `setComponentValue` or `postMessage`.

### Key Components
- UI controls: Start button, Stop button, playback element.
- Recording state: `mediaRecorder`, `chunks`, `stream`.
- `arrayBufferToBase64()`: Converts binary audio to Base64 text.
- Event handlers: Manage recording lifecycle and toggle button states.
- Messaging bridge: Communicates with the Streamlit host frame.

### Code Structure
1. HTML scaffold with Streamlit component library reference.
2. Buttons and audio element in the body.
3. Script section defining helper functions and click handlers.

### Dependencies
- Browser APIs: `navigator.mediaDevices`, `MediaRecorder`, `URL.createObjectURL`, `Uint8Array`.
- Streamlit component runtime (`@streamlit/component-lib`).

### Usage
- Served alongside a Streamlit application and loaded via the custom component API.
- Clicking Start requests microphone permission, recording continues until Stop is pressed.
- The Base64 payload can be forwarded to `audio_upload.py` or processed directly.

### Technical Details
- Records in `audio/webm`; ensure downstream services can decode that container.
- Buttons disable/enable to prevent overlapping recordings.
- Browsers require HTTPS (or localhost) for microphone access.
- Add error handling for permission denials before production deployment.

---

Updated: November 2025  
Maintainer: Van Dyk Tools Documentation Team

