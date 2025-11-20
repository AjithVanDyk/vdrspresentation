# DykScribe Project Documentation

## Overview
- Location: `G:\Interns\Ajith Srikanth\DykScribe Final - V2`
- Purpose: Streamlit application that captures technician QA submissions (audio or manual), transcribes using OpenAI Whisper, associates metadata (equipment, manufacturer, specs), and stores results in SQL Server.
- Target users: Van Dyk service technicians and PM/engineering staff collecting field knowledge.

## Application Flow
1. User authenticates with corporate network (Streamlit app runs internally).
2. `DykScribe` form loads user list/roles from SQL views (`vw_ActivePM_FSE_Users`, `vw_EquipmentTypes`, `vw_Models`, etc.).
3. Technicians fill metadata (equipment type, manufacturer, model, spec dropdowns) and optional notes.
4. Audio options:
   - Record directly in browser using custom component `st_audiorec` (React build bundled under `st_audiorec/frontend`).
   - Upload pre-recorded audio (`validate_audio_file` enforces 200 MB limit & minimum length).
5. Optional manual PDF upload (≤25 MB) for reference manuals.
6. OpenAI Whisper transcription (using `whisper-1`) processes audio in-memory (`BytesIO`, no temp files).
7. Additional QA text field expects `Q:`/`A:` blocks; validator ensures correct format.
8. Submission saved to `QAForms` table with audio blob, transcript, manual PDF, scoring fields.

## Code Structure
| File | Purpose |
| --- | --- |
| `app.py` | Streamlit UI, validation, transcription, SQL persistence, caching. |
| `utils/db.py` | SQLAlchemy engine factory (ODBC Driver 17, values from env or defaults). |
| `utils/ai.py` | OpenAI client wrapper; reads API key from `st.secrets` or environment. |
| `db_engine.py` | Legacy direct `pyodbc` helper (retained for CLI/testing). |
| `openai_client.py` | Alternative OpenAI client instantiation (legacy). |
| `st_audiorec/` | Custom audio recording component (React build + Python bridge). |
| `README*.md` | Legacy setup notes. |

## Key Features in `app.py`
- **Validation helpers**: `validate_pdf_file`, `validate_audio_file`, `is_valid_qa_text`, `sanitize_input`.
- **Transcription**: `transcribe_audio_enhanced` streams bytes to Whisper with retry logic.
- **Session state**: `init_session_state()` tracks processing/submission status and prevents duplicates via SHA hash.
- **Caching**:
  - `@st.cache_resource` for database/AI clients.
  - `@st.cache_data` for lookup queries (TTL 5–60 minutes).
- **Dynamic form controls**: equipment type → manufacturer → model → spec labels (via SQL views).
- **Manual overrides**: when lookup tables lack entries, fallbacks prompt manual text entry.
- **Submission**: `insert_submission` inserts rows with parameterized SQLAlchemy `text` query; stores audio PDF as binary.
- **Duplicate prevention**: combination hash of user, equipment, timestamp, transcript to avoid double submissions.

## Environment & Secrets
- Streamlit `secrets.toml` (preferred) or environment variables:
  - `OPENAI_API_KEY`
  - `DB_SERVER`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- Optional: set `WHISPER_MODEL`, adjust file size limits in validators.

## Running Locally
```bash
pip install -r requirements.txt
streamlit run app.py --server.address=0.0.0.0 --server.port=8501
```
> Ensure ODBC Driver 17 (or later) is installed and accessible on the host machine.

## Database Notes
- Targets Azure SQL database (`PowerAppsDatabase`).
- Dependencies on views:
  - `vw_ActivePM_FSE_Users` (user/role list)
  - `vw_EquipmentTypes`, `vw_EquipmentTypeSpecLabels`
  - `vw_Models`, `vw_ModelSpecifications`
- Inserts into `QAForms` table (columns: username, role, timestamps, metadata fields, audio blob, manual PDF, QA/score columns).

## Custom Audio Component (`st_audiorec`)
- React/JavaScript front-end compiled under `st_audiorec/frontend/build`.
- Returns raw byte stream via Streamlit component API; Python wrapper converts to WAV bytes (`BytesIO`).
- Works in modern browsers (requires microphone permissions).

## Logging & Error Handling
- Uses Python `logging` (configured to INFO) for transcription attempts, database errors, and data fetch issues.
- Streamlit displays user-friendly errors when lookups fail or connections drop; the app stops gracefully if DB or OpenAI cannot be initialized.

## Security Considerations
- Audio/PDF files stored in SQL as binary—ensure database retention policies match data governance requirements.
- Remove default credentials in `utils/db.py` before production deployment.
- Whisper requests sent to OpenAI API; confirm compliance with data-sharing policies.
- Input sanitization strips HTML/JS-sensitive characters, but additional review recommended for long-form text.

## Future Enhancements
- Add authentication layer (Streamlit auth or SSO) to restrict access.
- Implement auto-scoring or review workflows using OpenAI responses.
- Expose summaries/export features for supervisors (e.g., daily reports from `QAForms`).
- Package app with Docker for consistent deployment across environments.

Updated: November 2025  
Maintainer: Van Dyk Service Engineering

