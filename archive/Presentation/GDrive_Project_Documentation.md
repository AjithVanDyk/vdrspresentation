# GDrive Project Documentation

## Overview
- Location: `G:\Interns\Ajith Srikanth\GDrive`
- Goal: automate discovery, copying, and organization of customer PDF packets across shared drives (typically `G:\` and `Z:\`).
- Components: Flask + SocketIO web app, standalone scripts for PDF matching, Excel number extraction, and logging/reporting utilities.

## Major Modules
| File / Folder | Description |
| --- | --- |
| `GDrive/flask_backend.py` | Single-page web app (Flask + SocketIO) that searches for part numbers, copies matching PDFs/folders, and streams progress to the browser via Tailwind UI. |
| `GDrive/pdf_operations.py` | Shared PDF matching/copy engine with ThreadPoolExecutor, duplicate detection, and detailed logging. |
| `GDrive/serial_operations.py` | Serial-folder copy engine (pause/resume/cancel, SocketIO updates) for table-driven jobs. |
| `GDrive/excel_number_extractor.py` | Batch parser that extracts part numbers (XXX.XXX.XXX) from Excel sheets using multiprocessing. |
| `GDrive/copy_matching_files.py` | CLI utility to copy PDFs for a list of numbers (legacy baseline of `FileOperationManager`). |
| `GDrive/backend_2.py`, `main_app.py` | Alternative/earlier Flask entry points retained for reference. |
| `templates/` | HTML pages for PDF matcher and serial copier dashboards. |
| Data logs (`extracted_numbers*.txt`, `not_found_numbers_log.txt`, `app.log`) | Persisted results and troubleshooting info. |

## Web Application (`flask_backend.py`)
- **Endpoints**
  - `/` serves HTML UI (Tailwind) with textarea or file upload for numbers.
  - Socket events: `start_operation`, `stop_operation`, `progress_update`.
- **FileOperationManager**
  - Deduplicates numbers and skips ones already copied (checks destination folder names).
  - Parallel search via `threading.Thread` per source dir → walks directories, matches numbers in filenames/folders, collects hits.
  - Copy stage uses `ThreadPoolExecutor` (configurable `THREADS`, default 20).
  - Duplicate handling: `files_are_same` checks size + mtime, appends suffix `_1`, `_2` for conflicts.
  - Progress tracked (`current`, `total`, `stage`) and results (`found`, `copied`, `skipped`, `not_found`) pushed to front-end.
  - Logs buffered (last 10 entries) and streamed to UI; also printed for CLI visibility.
- **Stopping**: operations can be cancelled; manager respects `is_cancelled` flag.
- **Outputs**: numbers not found written to `not_found_numbers_log.txt` for follow-up.

## Serial Folder Operations (`serial_operations.py`)
- Designed for table-driven jobs (CSV/Excel rows) that map serial numbers to source/destination rules.
- Includes pause/resume, skip lists, and rich results counters (successful, failed, missing, skipped from list).
- Uses SocketIO to emit progress and logs; integrates with Flask app when mounted.

## Excel Number Extraction (`excel_number_extractor.py`)
- Recursively scans for `.xls`/`.xlsx` under a source directory.
- Parses column `K` (fallback to column index 10) to extract digits, formats as `000.000.000`.
- Runs in parallel via `ProcessPoolExecutor`; produces summary logs and per-file results.

## Usage
### Web App
```bash
cd GDrive
python flask_backend.py
# Visit http://localhost:5000
```
- Input numbers (one per line, e.g., `101.123.456`) or upload CSV/TXT.
- Click **Start Operation** to search/copy into `DEST_DIR` (default `G:\Interns\Ajith Srikanth\GDrive`).
- Use **Stop Operation** to cancel mid-run; progress board shows counts of found/copied/skipped.

### CLI Utility
```bash
python copy_matching_files.py --numbers numbers.txt --dest \\server\share\Target
```
- Looks up numbers across predefined `SOURCE_DIRS` and copies PDFs preserving folder context.

### Excel Extraction
```bash
python excel_number_extractor.py --source "G:\Reports" --out extracted_numbers.txt
```
- Produces cleaned number lists and logs (missing columns, bad sheets).

## Configuration
- `SOURCE_DIRS`, `DEST_DIR`, `THREADS` defined at top of scripts; adjust to your environment.
- Web app uses in-memory state `active_operations` to track jobs and reconnect clients.
- Logs stored alongside scripts (`app.log`, `extraction.log`, etc.).

## Notes & Improvements
- Windows-centric (relies on drive letters, `taskkill` for auxiliary processes in some scripts).
- Duplicate detection uses size + mtime; consider hashing for stronger guarantees.
- For large datasets, monitor disk usage—scripts copy entire folder trees for matches.
- Potential enhancements: authentication on Flask app, persistent job history, email/push notifications when jobs finish.

Updated: November 2025  
Maintainer: Van Dyk File Automation Team

