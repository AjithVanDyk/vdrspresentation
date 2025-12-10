# Van Dyk Tools - Complete Flowcharts Documentation

This document contains detailed flowcharts for all 20 tools in the Van Dyk Tools application.

---

## 1. PDF Matcher

```mermaid
flowchart TD
    A[User Accesses PDF Matcher] --> B[Enter Item Numbers]
    B --> C[Click Check Existing]
    C --> D{Check if items exist<br/>in destination}
    D --> E[Display Existing vs New Items]
    E --> F[User Clicks Start Operation]
    F --> G[Create PDFFileOperationManager]
    G --> H[Validate Source Directories]
    H --> I[Validate Destination Directory]
    I --> J[Initialize Thread Pool]
    J --> K[For Each Item Number]
    K --> L[Search Source Directories]
    L --> M{PDF Found?}
    M -->|Yes| N[Extract Numbers from Filename]
    M -->|No| O[Mark as Not Found]
    N --> P{Match Found?}
    P -->|Yes| Q[Copy PDF to Destination]
    P -->|No| O
    Q --> R[Update Progress via WebSocket]
    R --> S{More Items?}
    S -->|Yes| K
    S -->|No| T[Generate Summary Report]
    O --> S
    T --> U[Operation Complete]
    U --> V[Display Results]
```

---

## 2. Serial Copier

```mermaid
flowchart TD
    A[User Accesses Serial Copier] --> B[Load Excel File or Enter Table Data]
    B --> C[Select Customer Folder Path]
    C --> D[Enter Skip List Optional]
    D --> E[Click Start Operation]
    E --> F[Create SerialFolderOperationManager]
    F --> G[Validate Customer Folder Path]
    G --> H[Process Table Data in Batches]
    H --> I[For Each Item in Batch]
    I --> J[Extract Serial Number]
    J --> K{In Skip List?}
    K -->|Yes| L[Skip Item]
    K -->|No| M[Find GDrive Folder by Serial]
    M --> N{Folder Found?}
    N -->|No| O[Mark as Missing Serial]
    N -->|Yes| P[Find Customer Folder]
    P --> Q{Customer Folder Exists?}
    Q -->|No| R[Create Customer Folder]
    Q -->|Yes| S[Find Project Folder]
    R --> S
    S --> T{Project Folder Exists?}
    T -->|No| U[Create Project Folder]
    T -->|Yes| V[Copy GDrive Folder to Project]
    U --> V
    V --> W[Update Progress via WebSocket]
    W --> X{More Items?}
    X -->|Yes| I
    X -->|No| Y[Generate Summary Report]
    L --> X
    O --> X
    Y --> Z[Operation Complete]
```

---

## 3. AI Extractor

```mermaid
flowchart TD
    A[User Accesses AI Extractor] --> B[Select Folder Path]
    B --> C[Enter Keywords Optional]
    C --> D[Click Search Folder]
    D --> E[Recursively Scan Folder]
    E --> F[Filter PDFs by Keywords]
    F --> G[Display Matching PDFs]
    G --> H[User Selects PDFs]
    H --> I[Click Extract]
    I --> J[For Each Selected PDF]
    J --> K[Read PDF with PyPDF2]
    K --> L[Extract Text from First Page]
    L --> M[Generate Prompt 1<br/>Machine Info]
    M --> N[Call OpenAI GPT-3.5<br/>for Machine Data]
    N --> O[Generate Prompt 2<br/>Belt Info]
    O --> P[Call OpenAI Fine-tuned Model<br/>for Belt Data]
    P --> Q[Parse JSON Responses]
    Q --> R[Combine DataFrames]
    R --> S{More PDFs?}
    S -->|Yes| J
    S -->|No| T[Create Pivot Table]
    T --> U[Export to Excel]
    U --> V[Display Results]
```

---

## 4. Machine Info Extractor

```mermaid
flowchart TD
    A[User Accesses Machine Info] --> B[Step 1: Select Installation Folder]
    B --> C[Load Subfolders]
    C --> D[Step 2: Select Machine Info Folder]
    D --> E[Step 3: Select Subfolders<br/>Drawings, Electrical, Manuals, etc.]
    E --> F[Step 4: Click Process Files]
    F --> G[Scan Selected Subfolders]
    G --> H[For Each Subfolder]
    H --> I[Find Excel Files]
    I --> J[Read Excel Data]
    J --> K[Extract Machine Information]
    K --> L[Collect All Data]
    L --> M{More Subfolders?}
    M -->|Yes| H
    M -->|No| N[Step 5: Merge Excel Files]
    N --> O[User Selects Files to Merge]
    O --> P[Combine All DataFrames]
    P --> Q[Create Consolidated Excel]
    Q --> R[Save Merged File]
    R --> S[Display Success Message]
```

---

## 5. Excel Comparator

```mermaid
flowchart TD
    A[User Accesses Excel Comparator] --> B[Upload File 1]
    B --> C[Upload File 2]
    C --> D[Click Compare]
    D --> E[Load Excel Sheets from Both Files]
    E --> F[Get Sheet Names]
    F --> G{Sheet 'EquipmentDB'<br/>Exists in Both?}
    G -->|No| H[Log Missing Sheet Error]
    G -->|Yes| I[Read Sheet DataFrames]
    I --> J[Reindex to Match Dimensions]
    J --> K[For Each Cell Position]
    K --> L[Compare Cell Values]
    L --> M{Values Match?}
    M -->|No| N[Record Difference<br/>Row, Column, Before, After]
    M -->|Yes| O[Continue]
    N --> P{More Cells?}
    O --> P
    P -->|Yes| K
    P -->|No| Q[Create Differences DataFrame]
    Q --> R[Export to CSV]
    R --> S[Display Comparison Results]
    H --> S
```

---

## 6. File Organizer

```mermaid
flowchart TD
    A[User Accesses File Organizer] --> B[Enter Directory Path]
    B --> C[Click Scan Directory]
    C --> D[Recursively Walk Directory]
    D --> E[Collect File Information]
    E --> F[Display File List]
    F --> G[User Defines Organization Rules]
    G --> H[Select Files to Organize]
    H --> I[Choose Dry Run or Execute]
    I --> J{Mode?}
    J -->|Dry Run| K[Simulate Operations]
    J -->|Execute| L[Apply Rules to Files]
    K --> M[For Each File]
    L --> M
    M --> N[Check Rule Conditions]
    N --> O{Rule Matches?}
    O -->|Yes| P[Determine Target Directory]
    O -->|No| Q[Skip File]
    P --> R{Mode?}
    R -->|Dry Run| S[Log Simulated Move]
    R -->|Execute| T[Move/Copy File]
    T --> U[Update Progress]
    S --> V{More Files?}
    U --> V
    Q --> V
    V -->|Yes| M
    V -->|No| W[Generate Summary Report]
    W --> X[Display Results]
```

---

## 7. Serial Matcher

```mermaid
flowchart TD
    A[User Accesses Serial Matcher] --> B[Upload Excel File]
    B --> C[Click Process]
    C --> D[Load Workbook with openpyxl]
    D --> E[Read Column A Serial Numbers]
    E --> F[Read Column B Serial Numbers]
    F --> G[Strip & Uppercase All Values]
    G --> H[Find Matches<br/>Column A in Column B]
    H --> I[Find Unmatched<br/>Column A not in Column B]
    I --> J{Output to Column C?}
    J -->|Yes| K[Write Matched Serials to Column C]
    J -->|No| L[Skip Column C]
    K --> M{Output to Column D?}
    L --> M
    M -->|Yes| N[Write Unmatched Serials to Column D]
    M -->|No| O[Skip Column D]
    N --> P[Save Workbook]
    O --> P
    P --> Q[Return Results<br/>Matched Count, Unmatched Count]
    Q --> R[Display Results]
```

---

## 8. Duplicate Finder

```mermaid
flowchart TD
    A[User Accesses Duplicate Finder] --> B[Upload Excel File]
    B --> C[Click Process]
    C --> D[Load Workbook with openpyxl]
    D --> E[Read Column A<br/>Skip Header Row]
    E --> F[Strip Whitespace]
    F --> G[Drop Blank Values]
    G --> H[Count Value Occurrences]
    H --> I[Identify Unique Values<br/>Count = 1]
    I --> J[Identify Duplicate Values<br/>Count >= 2]
    J --> K[Write Header to Column B<br/>'No Duplicates']
    K --> L[Write Header to Column C<br/>'Duplicate Data']
    L --> M[Apply Text Format to Columns A, B, C]
    M --> N[Write Unique Values to Column B]
    N --> O[Write Duplicate Values to Column C]
    O --> P[Save Workbook]
    P --> Q[Return Results<br/>Unique Count, Duplicate Count]
    Q --> R[Display Results]
```

---

## 9. Part Number Formatter

```mermaid
flowchart TD
    A[User Accesses Part Number Formatter] --> B[Upload Excel File]
    B --> C[Click Process]
    C --> D[Read Excel File<br/>No Header]
    D --> E[For Each Value in Column A]
    E --> F{Value Empty?}
    F -->|Yes| G[Skip - Return Empty String]
    F -->|No| H[Strip Whitespace]
    H --> I{Contains 2+ Commas<br/>or 2+ Periods?}
    I -->|Yes| J[Extract All Digits]
    I -->|No| K[Try Convert to Integer]
    J --> L[Pad to 9 Digits]
    K --> M{Conversion Success?}
    M -->|No| G
    M -->|Yes| N[Extract All Digits]
    N --> L
    L --> O[Format as ###.###.###]
    O --> P[Write to Column B]
    P --> Q{More Values?}
    Q -->|Yes| E
    Q -->|No| R[Save Excel File]
    R --> S[Return Results<br/>Formatted Count]
    S --> T[Display Results]
    G --> Q
```

---

## 10. Filter Serial Numbers

```mermaid
flowchart TD
    A[User Accesses Filter Serials] --> B[Upload Excel File]
    B --> C[Click Process]
    C --> D[Load Workbook with openpyxl]
    D --> E[Read Excel with pandas]
    E --> F[Get Column A<br/>Skip Header Row]
    F --> G[Drop NA Values]
    G --> H[Drop Duplicates]
    H --> I[Reset Index]
    I --> J[Write Header to Column B<br/>'Filtered']
    J --> K[For Each Filtered Value]
    K --> L[Write to Column B<br/>Starting Row 2]
    L --> M{More Values?}
    M -->|Yes| K
    M -->|No| N[Save Workbook]
    N --> O[Return Results<br/>Filtered Count]
    O --> P[Display Results]
```

---

## 11. Spare List Formatter

```mermaid
flowchart TD
    A[User Accesses Spare List Formatter] --> B[Upload Excel File]
    B --> C[Click Process]
    C --> D[Load Workbook with openpyxl]
    D --> E[For Each Sheet in Workbook]
    E --> F[Initialize Last Serial = None]
    F --> G[For Each Row Starting Row 2]
    G --> H[Get Serial from Column B]
    H --> I{Serial Changed<br/>from Last Serial?}
    I -->|Yes| J[Apply Orange Fill<br/>to Columns A-L]
    J --> K[Apply White Bold Font]
    K --> L[Update Last Serial]
    I -->|No| M[Continue]
    L --> N{More Rows?}
    M --> N
    N -->|Yes| G
    N -->|No| O{More Sheets?}
    O -->|Yes| E
    O -->|No| P[Save Workbook]
    P --> Q[Return Results<br/>Sheets Formatted]
    Q --> R[Display Results]
```

---

## 12. Part Dash Remover

```mermaid
flowchart TD
    A[User Accesses Part Dash Remover] --> B[Upload Excel File]
    B --> C[Click Process]
    C --> D[Load Workbook with openpyxl]
    D --> E[Read Excel with pandas]
    E --> F[Get Column A Values]
    F --> G[For Each Value]
    G --> H{Contains Dash?}
    H -->|Yes| I[Replace Dash with Space]
    H -->|No| J[Keep Original Value]
    I --> K[Write to Column B]
    J --> K
    K --> L{More Values?}
    L -->|Yes| G
    L -->|No| M[Write Header 'Converted'<br/>to Column B Row 1]
    M --> N[Save Workbook]
    N --> O[Count Conversions]
    O --> P[Return Results<br/>Converted Count]
    P --> Q[Display Results]
```

---

## 13. VDRS Sync

```mermaid
flowchart TD
    A[User Accesses VDRS Sync] --> B{Feature Enabled?}
    B -->|No| C[Display Disabled Message]
    B -->|Yes| D[Click Start Sync]
    D --> E[Import VDRS Sync Module]
    E --> F[Capture stdout/stderr]
    F --> G[Run VDRS Sync Main Function]
    G --> H[Connect to Azure Blob Storage]
    H --> I[Get Last Sync Time]
    I --> J[Scan Local Files]
    J --> K[Compare with Azure Files]
    K --> L{New/Updated Files?}
    L -->|Yes| M[Upload to Azure]
    L -->|No| N[Skip]
    M --> O[Update Sync Record]
    N --> O
    O --> P[Log Sync Time]
    P --> Q[Return Logs]
    Q --> R[Display Sync Results]
    C --> R
```

---

## 14. DataDropper

```mermaid
flowchart TD
    A[User Accesses DataDropper] --> B[Select Folder Path]
    B --> C[Configure Advanced Settings]
    C --> D[Click Start Processing]
    D --> E[Validate Folder Path]
    E --> F[Initialize Processing State]
    F --> G[Scan Root Folder]
    G --> H[For Each Equipment Folder]
    H --> I[Extract Images]
    I --> J[Run YOLO Object Detection]
    J --> K[Map Detected Tags to Columns]
    K --> L[Run GPT Vision Extraction]
    L --> M[Process Equipment Data]
    M --> N[Store in Temp Database]
    N --> O{More Folders?}
    O -->|Yes| H
    O -->|No| P[Display Results Table]
    P --> Q[User Can View/Edit Entries]
    Q --> R{User Action?}
    R -->|Update| S[Update Entry in Database]
    R -->|Delete| T[Delete Entry]
    R -->|Verify| U[Move to Equipment DB]
    R -->|Export| V[Export to Excel]
    S --> P
    T --> P
    U --> P
    V --> W[Download Excel File]
```

---

## 15. Parser

```mermaid
flowchart TD
    A[User Accesses Parser] --> B{Feature Enabled?}
    B -->|No| C[Display Disabled Message]
    B -->|Yes| D[Select Folder Path]
    D --> E[Click Start Parser]
    E --> F{Parser Module Available?}
    F -->|No| G[Display Error Message]
    F -->|Yes| H[Initialize Parser State]
    H --> I[Start Background Thread]
    I --> J[Run Parser Headless]
    J --> K[Scan Folder for PDFs]
    K --> L[For Each PDF]
    L --> M[Extract Text]
    M --> N[Parse Document Structure]
    N --> O[Extract Data Fields]
    O --> P[Log Progress]
    P --> Q{More PDFs?}
    Q -->|Yes| L
    Q -->|No| R[Generate Output]
    R --> S[Update Parser State]
    S --> T[Display Logs & Results]
    G --> T
    C --> T
```

---

## 16. Pipeline 1 (YOLO Processing)

```mermaid
flowchart TD
    A[User Accesses Pipeline 1] --> B{Feature Enabled?}
    B -->|No| C[Display Disabled Message]
    B -->|Yes| D[Enter Source Folder]
    D --> E[Set Confidence Threshold]
    E --> F[Select Workers Max/Min]
    F --> G[Select GPT Model]
    G --> H[Click Start Pipeline]
    H --> I{Pipeline Already Running?}
    I -->|Yes| J[Display Error]
    I -->|No| K[Validate Inputs]
    K --> L[Calculate Worker Count]
    L --> M[Initialize Pipeline State]
    M --> N[Start Background Thread]
    N --> O[Run Pipeline Headless]
    O --> P[Load YOLO Model]
    P --> Q[Scan Source Folder]
    Q --> R[For Each Image]
    R --> S[Run YOLO Detection]
    S --> T[Filter by Confidence]
    T --> U[Extract Bounding Boxes]
    U --> V[Save to Temp Folder]
    V --> W[Update Progress]
    W --> X{More Images?}
    X -->|Yes| R
    X -->|No| Y[Generate Output]
    Y --> Z[Update Pipeline State]
    Z --> AA[Display Logs & Results]
    J --> AA
    C --> AA
```

---

## 17. Pipeline 2 (GPT Processing)

```mermaid
flowchart TD
    A[User Accesses Pipeline 2] --> B{Feature Enabled?}
    B -->|No| C[Display Disabled Message]
    B -->|Yes| D[Enter Temp Folder from Pipeline 1]
    D --> E[Click Start Pipeline]
    E --> F{Pipeline 2 Available?}
    F -->|No| G[Display Error]
    F -->|Yes| H{Pipeline Already Running?}
    H -->|Yes| I[Display Error]
    H -->|No| J[Initialize Pipeline State]
    J --> K[Start Background Thread]
    K --> L[Run Pipeline 2 Headless]
    L --> M[Load Processed Images from Temp]
    M --> N[For Each Image Set]
    N --> O[Run GPT Vision Analysis]
    O --> P[Extract Structured Data]
    P --> Q[Map to Database Schema]
    Q --> R[Update Progress]
    R --> S{More Images?}
    S -->|Yes| N
    S -->|No| T[Generate Excel Output]
    T --> U[Save to Temp Folder]
    U --> V[Update Pipeline State]
    V --> W[Display Logs & Results]
    G --> W
    I --> W
    C --> W
```

---

## 18. Folder Creator

```mermaid
flowchart TD
    A[User Accesses Folder Creator] --> B[Enter Project Number]
    B --> C[Upload Merged Excel File]
    C --> D[Set Source Folder Path]
    D --> E[Set Destination Folder Path]
    E --> F[Click Create Folders]
    F --> G[Read Excel File]
    G --> H[Extract Tag Numbers & Item Numbers]
    H --> I[For Each Row]
    I --> J[Extract Tag Number]
    J --> K{Tag Number Valid?}
    K -->|No| L[Skip Row]
    K -->|Yes| M[Create Folder Name<br/>from Tag Number]
    M --> N[Add Project Number Prefix]
    N --> O[Create Folder Structure]
    O --> P[Create Subfolders<br/>Drawings, Electrical, etc.]
    P --> Q{Item Number Exists?}
    Q -->|Yes| R[Search Source for Matching Files]
    R --> S[Copy Files to Drawings Folder]
    Q -->|No| T[Continue]
    S --> U{More Rows?}
    T --> U
    L --> U
    U -->|Yes| I
    U -->|No| V[Display Summary]
```

---

## 19. Drawing Extractor

```mermaid
flowchart TD
    A[User Accesses Drawing Extractor] --> B[Select Source Folder]
    B --> C[Select Destination Folder]
    C --> D[Enter File Patterns/Keywords]
    D --> E[Click Extract]
    E --> F[Scan Source Folder Recursively]
    F --> G[Filter Files by Pattern]
    G --> H[For Each Matching File]
    H --> I[Check File Extension]
    I --> J{Is PDF/DXF/DWG?}
    J -->|Yes| K[Copy to Destination]
    J -->|No| L[Skip File]
    K --> M[Update Progress]
    M --> N{More Files?}
    L --> N
    N -->|Yes| H
    N -->|No| O[Display Summary]
```

---

## 20. Folder Renamer

```mermaid
flowchart TD
    A[User Accesses Folder Renamer] --> B[Upload Excel File]
    B --> C[Enter Folder Location Path]
    C --> D[Click Rename]
    D --> E[Read Excel File]
    E --> F[Extract Column 1 Old Names]
    F --> G[Extract Column 2 New Names]
    G --> H[For Each Row]
    H --> I[Build Old Folder Path]
    I --> J{Folder Exists?}
    J -->|No| K[Log: Folder Not Found]
    J -->|Yes| L[Build New Folder Path]
    L --> M[Check if New Name Already Exists]
    M --> N{Name Conflict?}
    N -->|Yes| O[Log: Cannot Rename - Conflict]
    N -->|No| P[Rename Folder]
    P --> Q[Log: Renamed Successfully]
    Q --> R{More Rows?}
    K --> R
    O --> R
    R -->|Yes| H
    R -->|No| S[Display Results Summary]
```

---

## Summary

This document contains flowcharts for all 20 tools in Van Dyk Tools:

1. **PDF Matcher** - Matches and copies PDFs based on item numbers
2. **Serial Copier** - Copies folders based on serial number matching
3. **AI Extractor** - Extracts data from PDFs using OpenAI GPT models
4. **Machine Info Extractor** - Extracts and merges machine information from project folders
5. **Excel Comparator** - Compares two Excel files cell-by-cell
6. **File Organizer** - Organizes files based on customizable rules
7. **Serial Matcher** - Matches serial numbers between two columns
8. **Duplicate Finder** - Finds and separates duplicate values
9. **Part Number Formatter** - Formats part numbers to standard format (###.###.###)
10. **Filter Serial Numbers** - Filters out blank values and duplicates
11. **Spare List Formatter** - Formats spare parts lists with alternating colors
12. **Part Dash Remover** - Removes dashes from part numbers
13. **VDRS Sync** - Synchronizes data with Azure Blob Storage
14. **DataDropper** - Processes equipment data with AI extraction
15. **Parser** - Parses PDF documents using AI-powered extraction
16. **Pipeline 1** - YOLO-based object detection and extraction
17. **Pipeline 2** - GPT-powered data extraction and processing
18. **Folder Creator** - Creates organized machine folders from Excel data
19. **Drawing Extractor** - Extracts drawing files based on patterns
20. **Folder Renamer** - Renames folders based on Excel mapping

Each flowchart shows the complete workflow from user input to final output, including decision points, loops, and error handling paths.

---

**Generated:** 2024-12-19  
**Version:** 1.0  
**Author:** Van Dyk Tools Documentation

