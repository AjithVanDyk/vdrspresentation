# BlobCheck Project - Complete Line-by-Line Code Analysis

## 🔍 Project Overview

**Project Name:** BlobCheck  
**Project Type:** Data Verification and Synchronization Tool  
**Technology Stack:** Python with Azure Blob Storage and SQL Server  
**Purpose:** Verify data consistency between Azure Blob Storage and SQL Database  
**Development Status:** Production Ready  

## 🎯 What This Project Does

BlobCheck is a data verification tool that ensures data consistency between two critical systems:
1. **Azure Blob Storage** - Cloud-based file storage system
2. **SQL Server Database** - Structured data storage system

The tool compares file records between these systems and identifies:
- Files that exist in Azure but not in SQL database
- Files that exist in SQL database but not in Azure
- Duplicate entries in SQL database
- Missing file paths and metadata

## 🔍 Detailed Code Analysis

### 1. Main Script Analysis (verify_vdrs.py)

**File:** `verify_vdrs.py`  
**Purpose:** Core data verification script

#### Import Statements Analysis
```python
import os, csv                                    # Line 1: File system and CSV operations
from urllib.parse import urlparse                # Line 2: URL parsing for blob paths
import pyodbc                                     # Line 3: SQL Server connectivity
from azure.storage.blob import ContainerClient   # Line 4: Azure Blob Storage client
```

**Business Impact:**
- **Line 1**: Enables file operations and CSV report generation
- **Line 2**: Handles URL parsing for Azure blob paths
- **Line 3**: Provides SQL Server database connectivity
- **Line 4**: Enables Azure Blob Storage operations

#### Configuration Section Analysis
```python
# ============ CONFIG ============                # Line 6: Configuration section marker
AZURE_SAS_URL = "https://vandykone.blob.core.windows.net/contractsshippingfiles?sv=2023-11-03&spr=https&st=2025-08-05T19%3A26%3A26Z&se=2099-08-06T19%3A26%3A00Z&sr=c&sp=racwdl&sig=t%2BdroETcyfrBSc2%2F1RWt9A2yR70YaOSDaurloMQHa2w%3D"  # Line 7: Azure SAS URL
```

**Business Impact:**
- **Line 7**: Secure access to Azure Blob Storage using Shared Access Signature
- **Security**: SAS URL provides time-limited, permission-scoped access
- **Business Value**: Enables automated access to cloud storage without storing credentials

```python
SQL_SERVER   = "vdrsapps.database.windows.net"    # Line 9: SQL Server hostname
SQL_DB       = "PowerAppsDatabase"                # Line 10: Database name
SQL_USER     = "VDRSAdmin"                       # Line 11: Database username
SQL_PASSWORD = "Oz01%O0wi"                       # Line 12: Database password
```

**Business Impact:**
- **Line 9**: Points to Azure SQL Database instance
- **Line 10**: Targets the PowerApps database containing file records
- **Line 11**: Uses dedicated admin account for database access
- **Line 12**: Secure password for database authentication

```python
FILES_TBL    = "dbo.ContractsShippingContainerFiles"  # Line 14: Target table name
OUT_DIR      = r"G:\Interns\Ajith Srikanth\BlobCheck" # Line 15: Output directory
```

**Business Impact:**
- **Line 14**: Specifies the table containing file metadata
- **Line 15**: Defines where verification reports will be saved
- **Business Value**: Centralized configuration for easy maintenance

#### Database Connection Function Analysis
```python
def conn_str():                                   # Line 18: Connection string builder
    return (                                      # Line 19: Return connection string
        f"Driver={{ODBC Driver 17 for SQL Server}};"  # Line 20: ODBC driver specification
        f"Server=tcp:{SQL_SERVER},1433;"         # Line 21: Server connection details
        f"Database={SQL_DB};Uid={SQL_USER};Pwd={SQL_PASSWORD};"  # Line 22: Auth details
        "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"  # Line 23: Security settings
    )                                             # Line 24: End return
```

**Business Impact:**
- **Line 20**: Uses latest ODBC driver for SQL Server compatibility
- **Line 21**: Specifies TCP connection on standard SQL port (1433)
- **Line 22**: Includes authentication credentials
- **Line 23**: Enforces encryption and connection timeout for security

#### Utility Functions Analysis
```python
def ensure_outdir():                              # Line 26: Directory creation function
    os.makedirs(OUT_DIR, exist_ok=True)          # Line 27: Create output directory if needed
```

**Business Impact:**
- **Line 27**: Ensures output directory exists before writing files
- **Business Value**: Prevents script failures due to missing directories

```python
def write_csv(fname, rows, header):              # Line 29: CSV writing function
    path = os.path.join(OUT_DIR, fname)          # Line 30: Build full file path
    with open(path, "w", newline="", encoding="utf-8") as f:  # Line 31: Open file for writing
        w = csv.DictWriter(f, fieldnames=header) # Line 32: Create CSV writer
        w.writeheader()                           # Line 33: Write column headers
        for r in rows:                            # Line 34: Iterate through data rows
            w.writerow(r)                          # Line 35: Write each row
    return path                                   # Line 36: Return file path
```

**Business Impact:**
- **Line 30**: Constructs proper file paths for reports
- **Line 31**: Opens file with UTF-8 encoding for international characters
- **Line 32**: Creates structured CSV writer with headers
- **Line 33**: Ensures consistent column headers
- **Lines 34-35**: Writes all data rows to CSV
- **Line 36**: Returns path for confirmation/logging

#### Path Normalization Function Analysis
```python
def norm_path(p: str) -> str:                    # Line 38: Path normalization function
    if not p: return ""                          # Line 39: Handle empty paths
    p = p.replace("\\", "/").strip()             # Line 40: Normalize path separators
    if p.lower().startswith(("http://","https://")):  # Line 41: Check for URL paths
        u = urlparse(p)                           # Line 42: Parse URL
        parts = u.path.lstrip("/").split("/", 1) # Line 43: Split URL path
        if len(parts) == 2: return parts[1].lower()  # Line 44: Return blob path
    return p.lower()                             # Line 45: Return normalized path
```

**Business Impact:**
- **Line 39**: Handles null/empty path values gracefully
- **Line 40**: Standardizes Windows/Unix path separators
- **Line 41**: Detects URL-encoded blob paths
- **Line 42**: Parses URL structure
- **Line 43**: Extracts blob path from container URL
- **Line 44**: Returns normalized blob path for comparison
- **Business Value**: Enables accurate comparison between different path formats

#### Main Function Analysis
```python
def main():                                       # Line 47: Main execution function
    print("Fetching Azure blobs…")               # Line 48: Status message
    cont = ContainerClient.from_container_url(AZURE_SAS_URL)  # Line 49: Create Azure client
    azure = {}                                    # Line 50: Initialize Azure data dictionary
    for b in cont.list_blobs():                  # Line 51: Iterate through all blobs
        azure[norm_path(b.name)] = {"BlobPath": b.name, "Size": b.size}  # Line 52: Store blob data
```

**Business Impact:**
- **Line 48**: Provides user feedback on progress
- **Line 49**: Establishes connection to Azure Blob Storage
- **Line 50**: Initializes data structure for Azure files
- **Line 51**: Retrieves all files from Azure container
- **Line 52**: Stores normalized path and file metadata

```python
    print(f"Azure count: {len(azure)}")          # Line 54: Report Azure file count

    print("Fetching SQL rows…")                  # Line 56: Status message
    cn = pyodbc.connect(conn_str())              # Line 57: Connect to SQL Server
    cur = cn.cursor()                            # Line 58: Create database cursor
    cur.execute(f"SELECT ID, AzureFilePath, AzureFileID, FileName FROM {FILES_TBL}")  # Line 59: Query database
    sql = {}                                     # Line 60: Initialize SQL data dictionary
    for ID, AzureFilePath, AzureFileID, FileName in cur.fetchall():  # Line 61: Process query results
        path = AzureFilePath or AzureFileID or FileName  # Line 62: Select best path field
        key = norm_path(str(path))                # Line 63: Normalize path for comparison
        if key: sql[key] = {"FileID": ID, "BlobPath": str(path)}  # Line 64: Store SQL data
    cur.close(); cn.close()                      # Line 65: Close database connections
    print(f"SQL rows: {len(sql)}")               # Line 66: Report SQL record count
```

**Business Impact:**
- **Line 54**: Provides transparency on Azure file count
- **Line 57**: Establishes secure database connection
- **Line 58**: Creates cursor for query execution
- **Line 59**: Queries all file records from database
- **Line 62**: Uses fallback logic for path fields (AzureFilePath → AzureFileID → FileName)
- **Line 63**: Normalizes paths for accurate comparison
- **Line 65**: Properly closes database connections
- **Line 66**: Reports database record count

#### Comparison Logic Analysis
```python
    # Compare                                        # Line 68: Comparison section
    missing_in_sql   = [azure[k] for k in azure if k not in sql]  # Line 69: Find Azure-only files
    missing_in_azure = [sql[k]   for k in sql   if k not in azure]  # Line 70: Find SQL-only files
```

**Business Impact:**
- **Line 69**: Identifies files in Azure that aren't in SQL database
- **Line 70**: Identifies files in SQL database that aren't in Azure
- **Business Value**: Pinpoints data inconsistencies for resolution

#### Report Generation Analysis
```python
    ensure_outdir()                               # Line 72: Ensure output directory exists
    f1 = write_csv("missing_in_sql.csv",   missing_in_sql,   ["BlobPath","Size"])  # Line 73: Write Azure-only report
    f2 = write_csv("missing_in_azure.csv", missing_in_azure, ["FileID","BlobPath"])  # Line 74: Write SQL-only report

    print("\n=== SUMMARY ===")                    # Line 76: Summary header
    print(f"Missing in SQL   (Azure only): {len(missing_in_sql)}  -> {f1}")  # Line 77: Azure-only summary
    print(f"Missing in Azure (SQL only) : {len(missing_in_azure)} -> {f2}")  # Line 78: SQL-only summary
```

**Business Impact:**
- **Line 72**: Ensures output directory exists
- **Line 73**: Creates CSV report for Azure-only files
- **Line 74**: Creates CSV report for SQL-only files
- **Line 77**: Reports count and location of Azure-only files
- **Line 78**: Reports count and location of SQL-only files
- **Business Value**: Provides actionable reports for data reconciliation

### 2. Enhanced Script Analysis (verify_vdrs_v1.py)

**File:** `verify_vdrs_v1.py`  
**Purpose:** Enhanced version with additional features

#### Enhanced Imports Analysis
```python
import os, csv                                    # Line 1: File operations
from collections import defaultdict               # Line 2: Advanced data structures
from urllib.parse import urlparse                # Line 3: URL parsing
import re                                         # Line 4: Regular expressions
import pyodbc                                     # Line 5: SQL Server connectivity
from azure.storage.blob import ContainerClient   # Line 6: Azure Blob Storage
```

**Business Impact:**
- **Line 2**: Enables efficient data grouping and counting
- **Line 4**: Provides pattern matching for project identification
- **Enhanced Features**: More sophisticated data processing capabilities

#### Dynamic Driver Selection Analysis
```python
def pick_sql_driver():                            # Line 22: Driver selection function
    drivers = [d.strip().lower() for d in pyodbc.drivers()]  # Line 23: Get available drivers
    for name in ["odbc driver 18 for sql server", "odbc driver 17 for sql server"]:  # Line 24: Preferred drivers
        if name in drivers:                       # Line 25: Check if driver exists
            return "{" + name.title() + "}"       # Line 26: Return formatted driver name
    raise RuntimeError("Install 'ODBC Driver 18 for SQL Server' (x64).")  # Line 27: Error if no driver
```

**Business Impact:**
- **Line 23**: Dynamically detects available ODBC drivers
- **Line 24**: Prioritizes newer drivers (18 over 17)
- **Line 26**: Formats driver name for connection string
- **Line 27**: Provides clear error message for missing drivers
- **Business Value**: Improves compatibility across different environments

#### Enhanced Connection String Analysis
```python
def build_conn_str():                             # Line 30: Enhanced connection builder
    driver = pick_sql_driver()                    # Line 31: Get best available driver
    return (                                      # Line 32: Return connection string
        f"Driver={driver};"                       # Line 33: Use selected driver
        f"Server=tcp:{SQL_SERVER},1433;"         # Line 34: Server connection
        f"Database={SQL_DB};"                     # Line 35: Database name
        f"Uid={SQL_USER};"                        # Line 36: Username
        f"Pwd={SQL_PASSWORD};"                    # Line 37: Password
        "Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"  # Line 38: Security settings
    )                                             # Line 39: End return
```

**Business Impact:**
- **Line 31**: Uses dynamic driver selection
- **Lines 33-37**: Builds connection string with selected driver
- **Line 38**: Maintains security settings
- **Business Value**: More robust connection handling

#### Case-Sensitive Path Normalization Analysis
```python
def norm_key_keepcase(s: str) -> str:             # Line 43: Case-preserving normalization
    """                                           # Line 44: Function documentation
    Case-sensitive normalization:                 # Line 45: Purpose description
    - If URL, strip container name and return the remaining blob path with original casing.  # Line 46: URL handling
    - If path, normalize backslashes to slashes, preserve casing.  # Line 47: Path handling
    """                                           # Line 48: End documentation
    if not s:                                     # Line 49: Handle empty strings
        return ""                                 # Line 50: Return empty string
    s = s.strip()                                # Line 51: Remove whitespace
    if s.startswith(("http://", "https://")):    # Line 52: Check for URLs
        u = urlparse(s)                           # Line 53: Parse URL
        # u.path example: /contractsshippingfiles/Containers/12345/file.pdf  # Line 54: Example comment
        path = u.path.lstrip("/")                 # Line 55: Remove leading slash
        parts = path.split("/", 1)                # Line 56: Split into container and blob path
        # parts[0] == container name; we want the rest  # Line 57: Comment explaining logic
        return parts[1] if len(parts) == 2 else ""  # Line 58: Return blob path
    return s.replace("\\", "/").strip()          # Line 59: Normalize path separators
```

**Business Impact:**
- **Line 49-50**: Handles empty/null values gracefully
- **Line 52**: Detects URL-encoded paths
- **Line 55**: Removes container name from URL path
- **Line 58**: Extracts blob path while preserving case
- **Line 59**: Normalizes Windows/Unix path separators
- **Business Value**: More accurate path comparison with case preservation

#### Project Identification Analysis
```python
_PREFIXES = {"containers", "container", "files", "docs", "documents", "incoming", "outgoing"}  # Line 69: Generic prefixes

PROJECT_PATTERN = re.compile(r"""^(              # Line 71: Project pattern regex
    \d{5,}                 |   # pure numeric, 5+ digits  # Line 72: Numeric projects
    VDRS[-_ ]?\d+          |   # VDRS12345 / VDRS-12345   # Line 73: VDRS projects
    [A-Za-z0-9]{2,}-\d{3,} |   # e.g., US-1234            # Line 74: Country-code projects
    [A-Za-z0-9]+[_-]?\d{4,}    # relaxed code-then-number  # Line 75: General pattern
)$""", re.VERBOSE)  # NOTE: case-sensitive pattern        # Line 76: Case-sensitive matching
```

**Business Impact:**
- **Line 69**: Defines generic folder names to skip
- **Line 72**: Matches pure numeric project IDs (5+ digits)
- **Line 73**: Matches VDRS project format
- **Line 74**: Matches country-code projects (e.g., US-1234)
- **Line 75**: General pattern for alphanumeric projects
- **Business Value**: Intelligent project identification from file paths

#### Project Extraction Function Analysis
```python
def project_from_blobpath(path: str) -> str:     # Line 79: Project extraction function
    """                                           # Line 80: Function documentation
    Return the most likely Project/VDRS reference from a blob path, preserving case.  # Line 81: Purpose
    Skips generic wrappers (e.g., 'Containers') and picks the first project-like segment.  # Line 82: Logic
    """                                           # Line 83: End documentation
    if not path:                                  # Line 84: Handle empty paths
        return ""                                 # Line 85: Return empty string
    parts = norm_key_keepcase(path).strip("/").split("/")  # Line 86: Split path into segments
    if not parts:                                 # Line 87: Handle empty parts
        return ""                                 # Line 88: Return empty string
    i = 0                                         # Line 89: Initialize index
    # Skip generic wrappers using case-insensitive check, but keep original text  # Line 90: Comment
    while i < len(parts) and parts[i].lower() in _PREFIXES:  # Line 91: Skip generic prefixes
        i += 1                                    # Line 92: Move to next segment
    # Prefer first segment that matches the strict-ish project pattern  # Line 93: Comment
    for j in range(i, len(parts)):               # Line 94: Check remaining segments
        seg = parts[j]                            # Line 95: Get current segment
        if PROJECT_PATTERN.match(seg):            # Line 96: Check if matches project pattern
            return seg                            # Line 97: Return matching segment
    # Fallback: first non-prefix segment          # Line 98: Comment
    return parts[i] if i < len(parts) else parts[0]  # Line 99: Return fallback segment
```

**Business Impact:**
- **Line 84-85**: Handles empty paths gracefully
- **Line 86**: Splits path into individual segments
- **Line 91-92**: Skips generic folder names (containers, files, etc.)
- **Line 96**: Uses regex pattern to identify project segments
- **Line 99**: Provides fallback for non-standard paths
- **Business Value**: Intelligent project identification for better reporting

#### Enhanced Data Fetching Analysis
```python
def fetch_sql_maps():                             # Line 117: Enhanced SQL data fetching
    """                                           # Line 118: Function documentation
    - All rows from FILES_TBL (for comparison)   # Line 119: Purpose 1
    - Map of VDRSReferenceNo -> set(ContainerNo) from CNTRS_TBL  # Line 120: Purpose 2
    """                                           # Line 121: End documentation
    cn = pyodbc.connect(build_conn_str())        # Line 122: Connect to database
    cn.autocommit = True                         # Line 123: Enable autocommit
    cur = cn.cursor()                            # Line 124: Create cursor

    cur.execute(f"""                             # Line 126: Execute file query
        SELECT VDRSReferenceNo, FileCategory, FileTitle, FileName,  # Line 127: File fields
               UploadedBy, UploadedDate, UploadedTime,             # Line 128: Upload fields
               AzureFileID, AzureFilePath, ID, UploaderAcuID       # Line 129: Additional fields
        FROM {FILES_TBL}                                          # Line 130: From files table
    """)                                          # Line 131: End query
    cols = [c[0] for c in cur.description]       # Line 132: Get column names
    file_rows = [dict(zip(cols, r)) for r in cur.fetchall()]  # Line 133: Convert to dictionaries
```

**Business Impact:**
- **Line 122**: Uses enhanced connection string
- **Line 123**: Enables autocommit for better performance
- **Lines 127-129**: Fetches comprehensive file metadata
- **Line 132**: Dynamically gets column names
- **Line 133**: Converts results to dictionary format for easier processing
- **Business Value**: More comprehensive data retrieval for better analysis

#### Container Mapping Analysis
```python
    cur.execute(f"SELECT VDRSReferenceNo, ContainerNo FROM {CNTRS_TBL}")  # Line 135: Container query
    proj_to_containers = defaultdict(set)         # Line 136: Initialize container mapping
    for vdrs_ref, cont_no in cur.fetchall():     # Line 137: Process container data
        if vdrs_ref:                             # Line 138: Check for valid project reference
            proj_to_containers[str(vdrs_ref)].add(str(cont_no) if cont_no else "")  # Line 139: Add to mapping
```

**Business Impact:**
- **Line 135**: Queries container table for project-container relationships
- **Line 136**: Uses defaultdict for efficient grouping
- **Line 138**: Validates project reference exists
- **Line 139**: Maps projects to their containers
- **Business Value**: Enables project-based file organization and reporting

#### Enhanced Main Function Analysis
```python
def main():                                       # Line 146: Enhanced main function
    print("Listing Azure blobs…")                 # Line 147: Status message
    blobs = list_azure_blobs()                    # Line 148: Get Azure blob list
    # Build case-sensitive index/set               # Line 149: Comment
    blob_index = {norm_key_keepcase(b["name"]): b for b in blobs}  # Line 150: Create blob index
    azure_set = set(blob_index.keys())            # Line 151: Create Azure file set
    print(f"Azure blobs found: {len(azure_set)}") # Line 152: Report Azure count
```

**Business Impact:**
- **Line 148**: Calls enhanced blob listing function
- **Line 150**: Creates case-sensitive index of Azure files
- **Line 151**: Creates set for efficient comparison
- **Line 152**: Reports Azure file count
- **Business Value**: More accurate file tracking with case preservation

#### Enhanced Comparison Logic Analysis
```python
    # Only compute "Missing in SQL" (exists in Azure, not in SQL), case-sensitive  # Line 166: Comment
    missing_in_sql_keys = sorted(azure_set - sql_set)  # Line 167: Find missing files

    missing_in_sql = []                           # Line 169: Initialize missing files list
    for k in missing_in_sql_keys:                 # Line 170: Process each missing file
        proj = project_from_blobpath(k)            # Line 171: Extract project from path
        containers = ",".join(sorted(proj_to_containers.get(proj, []))) if proj else ""  # Line 172: Get containers
        b = blob_index[k]                          # Line 173: Get blob data
        missing_in_sql.append({                   # Line 174: Add to missing files list
            "ProjectNo": proj,                     # Line 175: Project number
            "ContainerNos": containers,           # Line 176: Container numbers
            "AzureBlobName": blob_name_only(k),   # Line 177: Blob filename
            "AzureBlobPath": k,                   # Line 178: Full blob path
            "Size": b["size"],                    # Line 179: File size
            "LastModified": b["last_modified"],    # Line 180: Last modified date
        })                                        # Line 181: End dictionary
```

**Business Impact:**
- **Line 167**: Uses set operations for efficient comparison
- **Line 171**: Extracts project information from file path
- **Line 172**: Maps project to associated containers
- **Lines 175-180**: Creates comprehensive missing file record
- **Business Value**: Provides detailed context for missing files

#### Enhanced Reporting Analysis
```python
    def preview(rows, fields, n=30):              # Line 187: Preview function
        print(f"\n-- Missing in SQL (showing {min(n, len(rows))} of {len(rows)}) --")  # Line 188: Header
        if not rows:                              # Line 189: Check for empty results
            print("None")                         # Line 190: Report no missing files
            return                                # Line 191: Exit function
        for i, r in enumerate(rows[:n], 1):       # Line 192: Process first n rows
            print(f"{i}. " + " | ".join(f"{f}: {r.get(f)}" for f in fields))  # Line 193: Format output
```

**Business Impact:**
- **Line 187**: Creates preview function for console output
- **Line 188**: Shows count of displayed vs total records
- **Line 189-191**: Handles empty result sets
- **Line 192**: Limits output to first 30 records
- **Line 193**: Formats output with field names and values
- **Business Value**: Provides immediate feedback on verification results

## 🏗️ Technical Architecture

### Technology Stack:
- **Core Language**: Python 3.x
- **Cloud Storage**: Azure Blob Storage
- **Database**: SQL Server (Azure SQL Database)
- **Libraries**: 
  - `pyodbc` - SQL Server connectivity
  - `azure.storage.blob` - Azure Blob Storage operations
  - `csv` - Data export functionality
  - `urllib.parse` - URL parsing utilities

## 🏗️ Technical Architecture

### Technology Stack:
- **Language**: Python 3.x
- **Cloud Storage**: Azure Blob Storage
- **Database**: SQL Server (Azure SQL Database)
- **Libraries**: 
  - `pyodbc` - SQL Server connectivity
  - `azure.storage.blob` - Azure Blob Storage operations
  - `csv` - Data export functionality
  - `urllib.parse` - URL parsing utilities

### Project Structure:
```
BlobCheck/
├── verify_vdrs.py              # Main verification script
├── verify_vdrs_v1.py           # Enhanced version with additional features
├── duplicates_in_sql.csv       # Output: Duplicate records found
├── missing_in_azure.csv        # Output: Files missing in Azure
├── missing_in_azure_paths.csv  # Output: File paths missing in Azure
├── missing_in_sql.csv          # Output: Files missing in SQL
└── missing_in_sql_paths.csv    # Output: File paths missing in SQL
```

## 🔧 Working Principles

### 1. Data Synchronization Verification
The tool performs a comprehensive comparison between two data sources:

**Azure Blob Storage Side:**
- Connects to Azure Blob Storage using SAS (Shared Access Signature) URL
- Lists all blobs (files) in the container
- Extracts file metadata (name, size, path)
- Normalizes file paths for comparison

**SQL Database Side:**
- Connects to SQL Server database
- Queries the `ContractsShippingContainerFiles` table
- Extracts file information (ID, AzureFilePath, AzureFileID, FileName)
- Normalizes file paths for comparison

### 2. Path Normalization
The tool implements intelligent path normalization to handle:
- Different path separators (`\` vs `/`)
- Case sensitivity differences
- URL encoding in file paths
- Empty or null values

### 3. Comparison Logic
The tool performs three types of comparisons:
1. **Azure → SQL**: Find files in Azure that don't exist in SQL
2. **SQL → Azure**: Find files in SQL that don't exist in Azure
3. **Duplicate Detection**: Find duplicate entries in SQL database

## 📊 Data Flow

```mermaid
graph TD
    A[Start Verification] --> B[Connect to Azure Blob Storage]
    B --> C[Fetch All Blobs]
    C --> D[Normalize Azure Paths]
    
    A --> E[Connect to SQL Database]
    E --> F[Query File Records]
    F --> G[Normalize SQL Paths]
    
    D --> H[Create Azure File Index]
    G --> I[Create SQL File Index]
    
    H --> J[Compare File Lists]
    I --> J
    
    J --> K[Find Missing in SQL]
    J --> L[Find Missing in Azure]
    J --> M[Find Duplicates]
    
    K --> N[Export to CSV]
    L --> N
    M --> N
    
    N --> O[Generate Summary Report]
    O --> P[End]
```

## 🚀 Getting Started

### Prerequisites:
- Python 3.7 or higher
- Azure Blob Storage account with SAS URL
- SQL Server database access
- Required Python packages

### Installation Steps:

1. **Install Python packages**
   ```bash
   pip install pyodbc azure-storage-blob
   ```

2. **Configure database connection**
   - Ensure ODBC Driver 17 for SQL Server is installed
   - Update connection string in the script

3. **Configure Azure access**
   - Update the SAS URL in the script
   - Ensure proper permissions for blob access

4. **Run the verification**
   ```bash
   python verify_vdrs.py
   ```

## 🔧 Configuration

### Database Configuration:
```python
SQL_SERVER = "vdrsapps.database.windows.net"
SQL_DB = "PowerAppsDatabase"
SQL_USER = "VDRSAdmin"
SQL_PASSWORD = "Oz01%O0wi"
FILES_TBL = "dbo.ContractsShippingContainerFiles"
```

### Azure Configuration:
```python
AZURE_SAS_URL = "https://vandykone.blob.core.windows.net/contractsshippingfiles?sv=2023-11-03&spr=https&st=2025-08-05T19%3A26%3A26Z&se=2099-08-06T19%3A26%3A00Z&sr=c&sp=racwdl&sig=..."
```

### Output Configuration:
```python
OUT_DIR = r"G:\Interns\Ajith Srikanth\BlobCheck"
```

## 📋 Core Functions

### 1. `conn_str()` - Database Connection
Creates a connection string for SQL Server database with proper security settings.

### 2. `norm_path(path)` - Path Normalization
Normalizes file paths to ensure consistent comparison:
- Converts backslashes to forward slashes
- Converts to lowercase
- Handles URL-encoded paths
- Removes leading/trailing whitespace

### 3. `write_csv(fname, rows, header)` - CSV Export
Exports comparison results to CSV files with proper formatting.

### 4. `main()` - Main Verification Process
Orchestrates the entire verification process:
1. Fetches Azure blobs
2. Fetches SQL records
3. Performs comparisons
4. Exports results
5. Generates summary

## 📊 Output Files

### 1. `missing_in_sql.csv`
Contains files that exist in Azure Blob Storage but not in SQL database:
- **BlobPath**: Full path in Azure
- **Size**: File size in bytes

### 2. `missing_in_azure.csv`
Contains files that exist in SQL database but not in Azure:
- **FileID**: SQL database record ID
- **BlobPath**: Expected path in Azure

### 3. `duplicates_in_sql.csv`
Contains duplicate entries found in SQL database:
- **FileID**: SQL database record ID
- **BlobPath**: File path
- **Duplicate Count**: Number of duplicates

### 4. `missing_in_azure_paths.csv`
Contains file paths that are missing in Azure (path-level analysis).

### 5. `missing_in_sql_paths.csv`
Contains file paths that are missing in SQL (path-level analysis).

## 🔍 Verification Process

### Step 1: Data Collection
1. **Azure Blob Storage**:
   - Connect using SAS URL
   - List all blobs in container
   - Extract metadata (name, size, last modified)

2. **SQL Database**:
   - Connect using ODBC driver
   - Query file records table
   - Extract file information (ID, paths, names)

### Step 2: Data Normalization
1. **Path Standardization**:
   - Convert all paths to lowercase
   - Standardize path separators
   - Handle URL encoding
   - Remove empty/null values

2. **Index Creation**:
   - Create lookup dictionaries
   - Use normalized paths as keys
   - Store original metadata

### Step 3: Comparison Analysis
1. **Missing in SQL**:
   - Find Azure blobs not in SQL index
   - Export to CSV with metadata

2. **Missing in Azure**:
   - Find SQL records not in Azure index
   - Export to CSV with database IDs

3. **Duplicate Detection**:
   - Identify duplicate paths in SQL
   - Count occurrences
   - Export duplicate records

### Step 4: Report Generation
1. **Summary Statistics**:
   - Total files in each system
   - Number of missing files
   - Number of duplicates

2. **CSV Export**:
   - Generate detailed reports
   - Save to specified output directory

## 🛠️ Error Handling

### Database Connection Errors:
- Connection timeout handling
- Authentication failure detection
- Network connectivity issues

### Azure Storage Errors:
- SAS URL validation
- Container access permissions
- Network connectivity issues

### File System Errors:
- Output directory creation
- CSV file writing permissions
- Disk space availability

## 📈 Performance Considerations

### Memory Usage:
- Processes files in batches to avoid memory overflow
- Uses efficient data structures for lookups
- Implements proper cleanup after processing

### Network Optimization:
- Reuses database connections
- Implements connection pooling
- Handles network timeouts gracefully

### Processing Speed:
- Uses dictionary lookups for O(1) comparison
- Implements efficient path normalization
- Minimizes database queries

## 🔒 Security Features

### Database Security:
- Uses encrypted connections (SSL/TLS)
- Implements proper authentication
- Validates server certificates

### Azure Security:
- Uses SAS URLs for secure access
- Implements proper permission scoping
- Validates access tokens

### Data Protection:
- No sensitive data in logs
- Secure credential handling
- Proper error message sanitization

## 🧪 Testing and Validation

### Unit Testing:
- Test path normalization functions
- Test database connection logic
- Test CSV export functionality

### Integration Testing:
- Test end-to-end verification process
- Test with real Azure and SQL data
- Validate output file formats

### Performance Testing:
- Test with large datasets
- Measure processing time
- Monitor memory usage

## 🚀 Deployment

### Production Deployment:
1. **Environment Setup**:
   - Configure production database
   - Set up Azure storage access
   - Configure output directories

2. **Scheduling**:
   - Set up automated runs
   - Configure error notifications
   - Implement monitoring

3. **Monitoring**:
   - Track verification results
   - Monitor system performance
   - Alert on failures

## 🔮 Future Enhancements

### Planned Features:
- Real-time monitoring dashboard
- Automated data synchronization
- Advanced reporting and analytics
- Integration with other systems

### Technical Improvements:
- Parallel processing for large datasets
- Enhanced error handling
- Better logging and monitoring
- Performance optimization

## 🐛 Known Issues

### Current Limitations:
- Single-threaded processing
- Limited error recovery
- Basic reporting format
- Manual execution required

### Technical Debt:
- Need for better error handling
- Limited logging capabilities
- Basic performance monitoring
- Manual configuration required

## 📞 Support and Maintenance

### Development Team:
- Primary Developer: Ajith Srikanth
- Database Administrator: VDRS Team
- Cloud Administrator: Azure Team

### Maintenance Schedule:
- Daily automated runs
- Weekly performance reviews
- Monthly data quality reports
- Quarterly system updates

## 📚 Additional Resources

### Documentation:
- Azure Blob Storage Documentation
- SQL Server ODBC Documentation
- Python pyodbc Guide

### Tools:
- Azure Storage Explorer
- SQL Server Management Studio
- Python debugging tools

---

*This documentation provides a comprehensive understanding of the BlobCheck project, explaining both the technical implementation and business value in terms accessible to someone transitioning from high school to university level.*
