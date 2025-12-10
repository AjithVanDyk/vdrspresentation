# File Deleter Documentation

## Overview
- Location: `G:\Interns\Ajith Srikanth\File Deleter - 06112025`
- Purpose: Windows Tkinter utility that walks a folder tree, opens each file for manual review, and moves approved files to a trash/archive directory while preserving subfolder structure.
- Packaging: PyInstaller build available (`dist/filedeleter.exe`), with build artifacts under `build/`.

## Workflow
1. Launch `filedeleter.exe` (or `python filedeleter.py`).
2. Select **Base Folder** (source files) and **Trash Folder** (destination) using standard directory pickers.
3. Click **Start**:
   - App recursively enumerates files under base folder.
   - Each file is opened with the system default application (`os.startfile`).
   - User gets a modal prompt: **Yes** → move to trash (mirrors directory tree), **No** → skip, **Cancel** → stop program.
   - After each prompt, the app kills `FoxitPDFEditor.exe` (assumes PDFs reviewed in Foxit) to avoid leftover windows.
4. Status label updates with current file; a final message indicates completion or manual termination.

## Code Highlights (`filedeleter.py`)
- `FileDeleterGUI` encapsulates the Tkinter UI.
- Uses `os.walk` to iterate through files; `shutil.move` recreates directory structure in trash folder via `os.path.relpath`.
- `ask_user` ensures dialog appears on top and returns mapped values (`yes`, `no`, `end`).
- `kill_foxit` runs `taskkill /f /im FoxitPDFEditor.exe` on each loop to close the PDF viewer; adapt the constant if using another viewer.
- `time.sleep(2)` before the prompt allows the file to load; adjust if needed for large files.

## Packaging / Deployment
- PyInstaller spec (`filedeleter.spec`) generates the standalone EXE:
  ```bash
  pyinstaller --onefile filedeleter.py
  ```
- Resulting executable placed in `dist/filedeleter.exe`; copy to user machines together with a shortcut or batch launcher.
- Requires Python 3.8+ and Tkinter (included with standard Windows Python installs).

## Safety & Limitations
- Files are **moved** (not deleted) so users can undo mistakes by checking the trash folder.
- Only one file is processed at a time; scripting assumes human review.
- Hard-coded Foxit process name—update `FOXIT_PROCESS` if using a different viewer.
- No file filtering; consider adding file-type filters for large directories.
- Skipped files remain untouched in the base directory.

## Suggested Enhancements
- Add filters (extensions, size) or inclusion/exclusion patterns.
- Provide a history log (CSV) capturing decisions and timestamps.
- Allow configurable review application (instead of hard-coded Foxit kill).
- Add hotkeys for quicker Yes/No decisions.
- Bundle with installer (MSI) for easier enterprise deployment.

Updated: November 2025  
Maintainer: Van Dyk Document Operations

