# Data Extractor Suite Documentation

## Overview
- Location: `G:\Interns\Ajith Srikanth\Data Extractor`
- Purpose: automate extraction, validation, and organization of technical data (BOM tables, OCR results, Excel diffs) from customer documentation.
- Components: standalone Python scripts, GUI utilities, and mini web apps for vision, OCR, AI-assisted parsing, and visualization.

## Directory Structure (high level)
| Path | Description |
| --- | --- |
| `pdf_bom_extractor_async.py` | Async BOM extraction using Ollama models (Mistral generator + Llama validator). |
| `pdf_bom_extractor_llm_validator.py`, `pdf_bom_extractor_ollama.py` | Variants for BOM extraction with different pipelines (synchronous, single-model). |
| `pdf_table_extractor_paddleocr.py` | Detect tables with LayoutParser + PaddleOCR (vision + OCR).
| `pdf_table_extractor_opencv.py` | OpenCV + Tesseract pipeline for table segmentation. |
| `pdf_extractor_gui.py` | Tkinter GUI wrapping all extraction methods with logging. |
| `file_organizer_gui.py` | GUI to rename/move files based on mappings. |
| `excel_sheet_comparator.py`, `Excel_Compare.py` | Excel diff utilities (cell-level comparison, reporting). |
| `kraken_ocr_batch_ocr.py` | Batch OCR via Kraken CLI with logging and metrics. |
| `folder_mapping_dict.py`, `folder_renamer_by_mapping.py`, `folder_renamer_simple.py` | File-system utilities to standardize folder names. |
| `table_extractor/` | Desktop webview app (PyWebView) for scanning PDFs, managing extraction jobs, previewing outputs. |
| `DataVisual/` | Streamlit/vis.js tooling to visualise project/equipment networks (HTML exports, Excel sources). |
| `logs/` | Shared logging output for long-running jobs. |

## Core Workflows
### 1. BOM Extraction (LLM-assisted)
- **Steps**
  1. `extract_pdf_text()` filters BOM-relevant lines using `pdfplumber`.
  2. `generate_bom_table()` (async) prompts Mistral via Ollama to return Markdown tables following a strict schema.
  3. `validate_table_with_model()` (Llama 3.2) reviews the generated table, flags hallucinations, and suggests fixes (JSON feedback parsed via regex).
  4. Validated rows saved to `Final_BOM_Table_With_Metadata.csv`; intermediate saves every N documents prevent data loss.
- **Configuration**: update `BASE_DIR`, `OUTPUT_FILE`, chunk size, and model names at top of script.
- **Logging**: `logging.basicConfig` writes to `logs/bom_extractor.log` and stdout.

### 2. Computer Vision Table Extraction
- `pdf_table_extractor_paddleocr.py` converts each page to 150 DPI images, detects "Table" blocks using Detectron2 (PubLayNet weights), then runs PaddleOCR with angle classification.
- `parse_ocr_rows()` maps OCR output to canonical headers (Pos., Qty., etc.), including basic translation support.
- `pdf_table_extractor_opencv.py` offers a fallback using contour detection + Tesseract when deep models are unavailable.

### 3. Assisted GUI (`pdf_extractor_gui.py`)
- Provides a unified window with:
  - Method selection (PaddleOCR, OpenCV, embedded LLaMA, OpenRouter).
  - Folder picker + optional local LLM model selection.
  - Progress log, error reporting, and output summary.
- Uses worker threads (`threading.Thread`) to keep the Tkinter UI responsive while running heavy extraction code.

### 4. Table Extractor Webview (`table_extractor/`)
- Launch via `python table_extractor/backend/app.py` → PyWebView window serving `frontend/index.html`.
- API class exposes:
  - `scan(root_path)` to crawl UNC/local directories, filtering PDFs that match naming conventions (e.g., `_User Manual_` with `[EN]`).
  - Job manager (`job_manager.JobManager`) to run extraction in background workers (pause/resume/cancel, statistics).
  - `preview(pdf_path)` pipeline to generate quick previews using `pdf_processor.preview_pdf_table`.
- Uploads stored under `uploads/` with job metadata; ready-made templates in `templates/` for job status monitoring.

### 5. Data Comparison & Reporting
- `excel_sheet_comparator.py`: loads both spreadsheets, aligns sizes, and records every differing cell with row/column indices (outputs list or CSV as needed).
- `Excel_Compare.py`: CLI utility to compare BOM exports, highlight additions/deletions, and write summary files.
- `DataVisual/app.py`: streamlit app that reads master Excel/CSV files and generates interactive vis.js graphs (customer → project → machine → model).

## Supporting Tools
- `env_check_ollama.py`: confirms local Ollama models are available before running LLM scripts.
- `pdf_merger.py`: combine multiple PDFs (e.g., to build consolidated packets before extraction).
- `ocr_results_organizer.py`: reorganise OCR outputs into folder structures expected by downstream analytics.
- `ocr_processing_summary.log` / `vectorstore_creation_log.txt`: historical process logs for audit trails.

## Configuration & Prerequisites
1. Install Python dependencies (recommend virtual environment):
   ```bash
   pip install -r requirements.txt
   ```
   Key packages: `pdfplumber`, `pytesseract`, `paddleocr`, `layoutparser`, `ollama`, `pywebview`, `streamlit`, `openpyxl`.
2. Optional external tools: Tesseract OCR, Kraken CLI, Ollama daemon, Microsoft Visual C++ runtime (for Detectron2).
3. Set paths/models at top of each script before running; many scripts assume UNC paths on the Van Dyk network.

## Execution Examples
```bash
# Async BOM extraction with dual-model validation
python pdf_bom_extractor_async.py

# Launch GUI suite
python pdf_extractor_gui.py

# Run WebView table extractor
cd "table_extractor"
python backend/app.py

# Compare Excel BOM revisions\npython excel_sheet_comparator.py --file1 V1.xlsx --file2 V2.xlsx --out diff.csv
```

## Logging & Output
- Most scripts emit to `logs/*.log` plus console; inspect for errors/time metrics.
- Extracted tables saved in CSV/Excel alongside metadata (PDF name, source path, validation notes).
- GUI/webview apps show inline progress; batch scripts print summaries at completion.

## Security & Data Handling
- All processing is local; no cloud calls unless using OpenRouter for LLMs (configure API keys via environment variables if enabled).
- Large directories can be UNC paths; ensure scripts have read/write permissions.
- Generated CSVs may contain customer-sensitive information—store within secured project folders.

## Known Limitations & Next Steps
- Deep learning models (Detectron2) require GPU or patience on CPU; consider packaging lighter models for field use.
- BOM prompts assume English column headers; extend prompt/regex for other languages as needed.
- GUI lacks packaged installer; consider PyInstaller build for non-technical operators.
- Add automated tests for diff scripts and BOM validators to guard against regressions.

Updated: November 2025  
Maintainer: Van Dyk Data Automation Team

