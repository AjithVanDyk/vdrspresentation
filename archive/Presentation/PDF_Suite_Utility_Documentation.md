# PDF Utility Suite Documentation

## Overview
- Location: `G:\Interns\Ajith Srikanth\PDF Suite Utility - 06112025`
- Purpose: all-in-one Tkinter GUI covering PDF health checks, OCR cleanup, and file organisation tasks for scanned documents.
- Packaging: PyInstaller spec (`PDFUtilitySuite.spec`) builds standalone EXE (`dist/PDFUtilitySuite.exe`).

## Features by Tab
### 1. PDF File Checker
- Recursively scans a selected folder for PDFs.
- For each file: extracts text with `pdfminer` to flag non-selectable PDFs, counts `_OCR` patterns in filenames, and (optionally) table detection (currently disabled).
- Outputs live log in the UI and saves CSV (`pdf_scan_log_<timestamp>.csv`) sorted by review priority.
- Supports stop/start via thread `checker_stop_event`.

### 2. File Organizer
- Lists files in the source directory containing `OCR` or `Kraken OCR` in their names.
- Filters include: filename substring, size threshold, modified-after date.
- Actions: **Move**, **Delete**, **Replace** (copy over destination), with status bar feedback.
- Uses `shutil` for move/replace, `os.remove` for delete.

### 3. OCR Runner
- Wraps `ocrmypdf` CLI for bulk OCR jobs.
- User selects input folder and optional destination folder for OCR’d outputs.
- Configurable binary paths (`OCR_COMMAND`, `TESSERACT_PATH`, `POPPLER_PATH`) embedded in script; update to match local install.
- Logs progress per file, skipping outputs that already exist.

## Running
```bash
pip install -r requirements.txt
python PDFUtilitySuite.py
# or execute dist/PDFUtilitySuite.exe
```

## Configuration Tips
- Adjust window geometry or tab contents directly in `__init__` if needed.
- Re-enable table detection in `process_pdf` by integrating a tabula/PDFTables call.
- For production, externalise OCR binary paths (environment variables or config file) instead of hard-coding.

## Known Limitations
- OCR Runner assumes Windows installations of ocrmypdf/tesseract/poppler; script may fail silently if paths change.
- Checker currently treats any `_OCR` pattern as needing review—tune to your naming standards.
- No job history beyond CSV exports; add logging to file if long-term tracking is required.

Updated: November 2025  
Maintainer: Van Dyk Document Automation

