# Nameplates and Tags Data Extractor Documentation

## Overview
- Location: `G:\Interns\Ajith Srikanth\NameplatesAndTagsDataExtractor`
- Goal: automate extraction, review, and approval of equipment specifications from nameplate/tag images, blending AI vision with a structured validation workflow.
- Deliverables: desktop TtkBootstrap app (`main.py`) plus optional web interface (`webapp/`) backed by SQL Server and image repositories.

## Desktop Application (`main.py`)
### Features
- Two-tab UI:
  - **Data Processing**: walks `ROOT_PATH` (default `G:\Interns\0SortFolders`), categorises images, calls AI extraction, logs progress.
  - **Data Validation**: lists extracted entries, shows editable fields, displays related images with zoom/rotate controls, and offers verify/update/delete actions.
- Image viewer supports multiple tabs (nameplate + tags), 600×600 panes, rotation, zoom to cursor, and full-size pop-up.
- Exports validation table to Excel, moves verified rows from staging (`TemporaryNewSpecTable`) into production (`EquipmentDB`), and cleans up associated images.

### Key Modules
| Module | Responsibility |
| --- | --- |
| `data_processing.py` | Recursively scans date/customer/project/machine folders, identifies images, invokes AI extractor, stores results via `db_utils`. |
| `gpt_vision.py` | Wraps OpenAI GPT-4o Vision (or mock) with dedicated prompts for nameplates (model, year, weight) and tags (motor type/serial/power). |
| `db_utils.py` | Handles SQL Server operations: insert temp records, fetch/update validation rows, move verified records to `EquipmentDB`, delete entries. |
| `image_mapping.py` | Maps serial numbers to image paths and removes images once verified or deleted. |
| `config.py` | Centralises SQL connection details (`pyodbc` string). |
| `gpt_extract_func` (fallback in `main.py`) | Mock extractor for offline testing; real runs call `gpt_vision.gpt_extract`. |

### Running
```bash
pip install -r requirements.txt
python main.py
```
Set environment variables (`OPENAI_API_KEY`, DB credentials) or edit `config.py` before launching.

## Web Application (`webapp/`)
- Backend (`webapp/backend/app.py`): Flask + PyWebView alternative exposing similar APIs (scan root folders, preview tables, manage jobs via `JobManager`). Suitable when a browser-based interface is preferred.
- Frontend (`webapp/frontend/`): React app (with `node_modules`) delivering the UI; build served through the backend or deployed standalone.

## Data Flow
1. **Processing**: `process_root_folder()` builds a summary per date/customer/project, categorises images, calls AI extraction, and writes staging records.
2. **Validation**: operators review entries, adjust metadata, inspect images, and choose to update/delete/verify.
3. **Verification**: `db_utils.move_temp_to_equipmentdb()` copies approved values into `EquipmentDB`, then cleans staging tables and images.

## Configuration
- Update `ROOT_PATH` in `main.py` to point at the folder hierarchy containing raw images.
- SQL Server defaults (in `config.py`) use Azure DB credentials; override via environment variables before packaging.
- AI models: `gpt_vision.py` calls `gpt-4o`; adjust model name or temperature as needed. Ensure OpenAI account permits vision usage.

## Logs & Output
- GUI logs appear in the processing tab and in console; adapt `data_processing.log_threadsafe` callbacks for file logging if needed.
- Temp data stored in `TemporaryNewSpecTable`; verified data migrates to `EquipmentDB`.
- Images expected to be under `ROOT_PATH/completed/...` for validation preview.

## Known Limitations & Ideas
- AI extraction depends on consistent naming patterns (`plate`, `tag`). Consider integrating OCR to auto-detect relevant images.
- No authentication—desktop app assumes trusted environment; web app should add auth before deployment.
- Large folders may take time to scan; consider multiprocessing or job resume support.
- Add automated tests for database helpers and prompts; currently manual QA.

Updated: November 2025  
Maintainer: Van Dyk Equipment Data Team

