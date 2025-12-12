# Van Dyk Tools Documentation

## Overview
- Location: `G:\Interns\Ajith Srikanth\Van Dyk Tools`
- Purpose: Flask + SocketIO web hub delivering operations tooling (AI extraction, file management, serial matching, duplicate detection) for Van Dyk support teams.
- Architecture: Flask app (`app.py`) with modular utilities, configuration system, shared logging, and optional SocketIO events. Packaged for PyInstaller deployment.

## Key Components
| Module | Description |
| --- | --- |
| `app.py` | Main Flask entry point. Registers routes, SocketIO events, feature toggles, logging, OpenAI client, background tasks, PDF/serial ops. |
| `config_manager.py`, `settings_manager.py`, `enhanced_logger.py` | Settings/feature flags (read from JSON/env), standardised logging (file + console), configuration loader. |
| Tools integrated | `DataDropper` pipelines, `pdf_operations.py`, `serial_operations.py`, `excel_sheet_comparator.py`, `file_organizer.py`, `serial_matcher.py`, `duplicate_finder.py`, `part_number_formatter.py`, `filter_serial_numbers.py`, `spare_list_formatter.py`, `part_dash_remover.py`, `ai_extract.py`. |
| `templates/` | Jinja templates (`index.html`, tool-specific pages) using Tailwind and Flowbite for UI. |
| `static/` | CSS/JS assets, logos, front-end bundles. |
| `Application/`, `Meta_Data/`, `DataDropper/` | Underlying extraction and metadata pipelines reused across tools. |
| `config/` | YAML/JSON configuration (environments, feature toggles). |
| `logs/` | Application + operation logs (created at runtime). |

## Feature Highlights
- **AI Extractor**: Upload PDFs/images, call OpenAI (via `openai_utils`), run extraction pipelines (`run_pipeline_headless`, `run_parser_headless`), return structured metadata.
- **DataDropper Integration**: Leverages nameplate/tag extraction modules (shared with Nameplates project) for spec capture.
- **PDF Matcher & Serial Copier**: Reuses the GDrive `PDFFileOperationManager` and `SerialFolderOperationManager` classes to search/copy matching files with live progress.
- **Excel Comparator**: Route to compare two Excel files (`compare_excel_files`) and render difference reports.
- **File Organizer**: Web front-end around `FileOrganizer` (move/delete/replace files by condition).
- **Duplicate Finder / Serial Matcher / Part Formatters**: Standalone tasks that run backend scripts to normalise part numbers, remove dashes, filter lists, etc.
- **Feature Flags**: `settings.json` allows enabling/disabling tools; `guard_tool_page`/`guard_tool_api` enforce availability and show warnings.
- **Sockets**: Optional progress streaming for long-running jobs (uses rooms keyed by operation ID).

## Running Locally
```bash
pip install -r requirements.txt
set FLASK_APP=app.py
flask run  # or `python app.py` with SocketIO's builtin server via `socketio.run`
```
Environment variables: `OPENAI_API_KEY`, SQL creds (for DataDropper modules), `SECRET_KEY`. Settings loaded from `.env` and JSON under `config/`.

## Logging & Telemetry
- `setup_enhanced_logging()` initialises root logger with file (`LOG_FILE` from config), error log, and stdout handler.
- Per-operation loggers (`get_operation_logger`) record job-specific events (e.g., AI extraction sessions, file operations).
- SocketIO logger active for debugging websocket events.

## Deployment Notes
- PyInstaller friendly (modifies `sys.path` to include parent for DataDropper). Ensure hidden imports for `PyPDF2`, `pandas`, SocketIO, etc. are declared in spec file.
- Upload folder created at startup (`uploads/`, `uploads/temp/`), max upload size 50 MB.
- Works on Windows; some subprocesses (OCR pipelines) assume local CLI tools installed.

## Known Considerations
- Feature modules rely on external executables (pipelines under `Meta_Data` and `Application`); ensure dependencies are available on server.
- Some imports optional; errors captured (`_pipeline*_import_err`) and surfaced in UI when a feature is disabled.
- OpenAI usage: uses environment key; `initialize_openai_client_safely` handles missing keys but returns error in UI.
- Large tasks run via ThreadPool or background threads; monitor for long-running operations before scaling to multiple users.

## Suggestions / Next Steps
- Add authentication/role-based access before exposing beyond internal network.
- Build consolidated dashboard summarising job statuses, recent logs, and feature health.
- Externalise configuration (YAML/JSON) per environment and load via `get_config`.
- Add API endpoints for automation (currently routes assume browser usage).

Updated: November 2025  
Maintainer: Van Dyk Tools Team

