# Ajith Srikanth – Project Portfolio Overview

## Snapshot
| Project | Location | Primary Tech | Status | Notes |
| --- | --- | --- | --- | --- |
| Van Dyk One Mobile App | `App/` | React Native (TypeScript) | Prototype UI complete | Tabbed field-service dashboard with mock data and local SQL/SQLite service; see `Van_Dyk_One_Mobile_App_Documentation.md`. |
| BlobCheck | `BlobCheck/` | Python + Azure + SQL | Production script set | Compares Azure Blob vs SQL records, outputs CSV diffs (`missing_in_*`); security review needed for embedded creds. |
| Data Extractor Suite | `Data Extractor/` | Python CV/OCR + GUI | Production-ready modules | Async LLM BOM extractor, PaddleOCR pipeline, Tkinter/pywebview UIs, DataVisual graphs. |
| DykScribe | `DykScribe Final - V2/` | Streamlit + OpenAI + SQL | Deployed internally | Audio capture, Whisper transcription, manual PDF + metadata submission to SQL (`QAForms`). |
| File Deleter | `File Deleter - 06112025/` | Tkinter | Packaged EXE | Operator-assisted PDF cleanup (Foxit), moves files to trash mirrors. |
| GDrive Toolkit | `GDrive/` | Flask + SocketIO | Production web tool | Real-time PDF matcher/copier, serial folder operations, Excel number extraction. |
| Nameplates & Tags Extractor | `NameplatesAndTagsDataExtractor/` | TtkBootstrap + OpenAI Vision + SQL | Desktop tool + optional webview | Batch image ingestion, AI extraction, validation, database staging/verification. |
| PDF Utility Suite | `PDF Suite Utility - 06112025/` | Tkinter | Packaged EXE | PDF scanner, OCR orchestrator, file organiser. |
| Van Dyk Tools Hub | `Van Dyk Tools/` | Flask + SocketIO + OpenAI | Production web hub | Unified interface for AI extraction, file ops, duplicate finder, part formatting (feature-flag driven). |
| Van Dyk Website | `Van Dyk Website Final - V2/` | React/Vite/Tailwind | Live on Vercel | Marketing site with hero/video sections, CMS-ready data files. |
| VDRS360 Equipment Manager | `VDRS360 - Final V1/` | Streamlit + SQL | Production internal dashboard | Equipment editor, advanced search, pyvis network graphs. |
| RAG System | `RAG/` | Streamlit + OpenAI + ChromaDB + SQL | Production | Hybrid retrieval, ingestion pipelines, multiple Streamlit assistants (optimized/production/comprehensive). |
| Standalone Python Scripts | root level | Flask/Streamlit/CLI | Mixed | Quick utilities documented in `Standalone_Python_Files_Documentation.md` (audio upload API, chatbots, serial operations, etc.). |

For detailed feature breakdowns consult individual documentation files under `Presentation/` (updated November 2025).

## Capabilities Demonstrated
- **AI & Retrieval**: RAG system, DykScribe, Data Extractor (LLMs, embeddings, OCR, OpenAI Vision).
- **Full-stack Web**: Flask+SocketIO hubs, Streamlit dashboards, React/Vite marketing site.
- **Desktop & Automation**: Tkinter/TtkBootstrap suites, CLI utilities for file management and OCR.
- **Cloud & Data**: Azure Blob integrations, SQL Server operations, Chroma vector DBs.
- **Mobile**: React Native prototype establishing design system and offline sync plan.

## Suggested Next Actions
1. **Security Hardening**: Externalise credentials (BlobCheck, Streamlit apps) and add auth to web tools.
2. **Automated Testing**: Add regression suites for ingestion/SQL modules and UI smoke tests.
3. **Deployment Pipeline**: Containerise Flask/Streamlit services and wire CI/CD.
4. **Documentation Hub**: Host Markdown docs via MkDocs or Notion for easier sharing.
5. **Portfolio Site**: Surface selected projects with screenshots, live demos, and repo links.

Updated: November 2025

