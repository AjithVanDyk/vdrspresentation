# Comprehensive System Flowcharts - Van Dyk Tools Internship

This document contains detailed flowcharts for all major systems developed during the internship.

---

## 1. Van Dyk Tools Webapp - Overall System Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER ACCESSES WEBAPP                      │
│                  http://localhost:5000                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    HOME DASHBOARD                           │
│         Displays all 30+ available tools                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
        ┌──────────────────┴──────────────────┐
        │                                      │
        ↓                                      ↓
┌───────────────┐                    ┌───────────────┐
│  DOCUMENT     │                    │  DATA         │
│  PROCESSING   │                    │  PROCESSING   │
│  TOOLS        │                    │  TOOLS        │
└───────┬───────┘                    └───────┬───────┘
        │                                      │
        ├─ PDF Matcher                        ├─ Excel Comparator
        ├─ Serial Copier                      ├─ Serial Matcher
        ├─ AI Extractor                       ├─ Duplicate Finder
        ├─ Machine Info                       ├─ Part Formatter
        └─ Drawing Extractor                  └─ Filter Tools
                           │
                           ↓
        ┌──────────────────┴──────────────────┐
        │                                      │
        ↓                                      ↓
┌───────────────┐                    ┌───────────────┐
│  AI/ML        │                    │  FILE         │
│  TOOLS        │                    │  MANAGEMENT   │
│               │                    │  TOOLS        │
└───────┬───────┘                    └───────┬───────┘
        │                                      │
        ├─ DataDropper                        ├─ File Organizer
        ├─ Pipeline 1 (YOLO)                  ├─ VDRS Sync
        └─ Pipeline 2 (GPT)                   └─ Folder Tools
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              PROCESSING VIA WEBSOCKET                      │
│         Real-time progress updates to user                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    RESULTS DISPLAYED                         │
│         Excel files, reports, summaries                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. PDF Matcher - Detailed Flow

```
┌─────────────────────────────────────────────────────────────┐
│              USER ACCESSES PDF MATCHER TOOL                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         USER ENTERS ITEM NUMBERS (Excel or Manual)           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              USER CLICKS "CHECK EXISTING"                    │
│         System checks if items exist in destination          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         DISPLAY: Existing Items vs New Items                 │
│         User can review before starting operation             │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              USER CLICKS "START OPERATION"                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         CREATE PDFFileOperationManager                        │
│         Initialize thread pool for parallel processing        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         FOR EACH ITEM NUMBER:                                │
│         1. Search source directories                          │
│         2. Extract numbers from PDF filenames                 │
│         3. Match with item number                             │
│         4. Copy matched PDF to destination                    │
│         5. Update progress via WebSocket                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              GENERATE SUMMARY REPORT                          │
│         - Total items processed                               │
│         - Items found                                         │
│         - Items not found                                     │
│         - Files copied                                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    DISPLAY RESULTS                            │
│         User can download report Excel file                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. AI Extractor - Detailed Flow

```
┌─────────────────────────────────────────────────────────────┐
│              USER ACCESSES AI EXTRACTOR                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         USER SELECTS FOLDER OR INDIVIDUAL PDFS                │
│         Optional: Enter keywords to filter PDFs               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              SYSTEM SCANS FOLDER                               │
│         Recursively finds all PDF files                       │
│         Filters by keywords if provided                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         DISPLAY MATCHING PDFS                                │
│         User selects which PDFs to process                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              USER CLICKS "EXTRACT"                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         FOR EACH SELECTED PDF:                                │
│         1. Read PDF with PyPDF2                               │
│         2. Extract text from first page                       │
│         3. Generate Prompt 1: Machine Info                   │
│         4. Call OpenAI GPT-3.5 for Machine Data                │
│         5. Generate Prompt 2: Belt Info                        │
│         6. Call OpenAI Fine-tuned Model for Belt Data          │
│         7. Parse JSON responses                               │
│         8. Update progress via WebSocket                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         COMBINE ALL DATA INTO DATAFRAMES                      │
│         Create pivot tables for analysis                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              EXPORT TO EXCEL                                  │
│         Multiple sheets with different views                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    DISPLAY RESULTS                            │
│         User can download Excel file                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. RAG System - Complete Flow

```
┌─────────────────────────────────────────────────────────────┐
│              USER ASKS QUESTION                              │
│         "How do I maintain the baler?"                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 1: QUESTION TO VECTOR                           │
│         Embedding model converts question to vector          │
│         (384-1536 dimensions depending on model)              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 2: VECTOR DATABASE SEARCH                        │
│         Searches Chroma/FAISS database                        │
│         Finds similar document chunks using cosine similarity  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 3: RETRIEVE TOP DOCUMENTS                        │
│         Returns top 5-10 most relevant chunks                 │
│         Score threshold: > 0.7 similarity                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 4: PREPARE CONTEXT                              │
│         Combine retrieved chunks with question                │
│         Add metadata (source, page number, etc.)              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 5: LLM GENERATION                                │
│         Send to GPT-4 with prompt:                            │
│         "Answer based ONLY on provided context..."            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 6: GENERATE ANSWER                               │
│         LLM generates answer using retrieved context         │
│         Includes source citations                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 7: RETURN TO USER                                │
│         Answer + source citations + confidence score          │
│         Response time: 2-6 seconds                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. RAG System - Document Ingestion Flow

```
┌─────────────────────────────────────────────────────────────┐
│              DOCUMENT INGESTION PROCESS                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         INPUT: PDF, DOCX, TXT FILES                          │
│         From folder or individual upload                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 1: FILE PROCESSING                               │
│         - Read document (PyPDF2, PyMuPDF)                     │
│         - Extract text                                        │
│         - OCR if scanned (Tesseract)                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 2: TEXT CHUNKING                                 │
│         - Split into chunks (500-1000 chars)                  │
│         - Overlap: 100-200 chars                              │
│         - Preserve context                                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 3: CREATE EMBEDDINGS                             │
│         - Convert chunks to vectors                           │
│         - Model: HuggingFace/Sentence-Transformers           │
│         - Dimensions: 384-1536                                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 4: STORE IN VECTOR DATABASE                     │
│         - Chroma: Local storage                               │
│         - FAISS: Alternative local storage                    │
│         - Pinecone: Cloud storage (optional)                  │
│         - Metadata: source, page, date, type                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 5: INDEXING COMPLETE                            │
│         Document ready for querying                           │
│         Logged in completed_files.txt                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. CDMS - Document Upload Flow

```
┌─────────────────────────────────────────────────────────────┐
│              SUPPLIER LOGS INTO CDMS                          │
│         OTP-based authentication (no passwords)               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         SUPPLIER SELECTS PROJECT                              │
│         Dropdown: Supplier Project No                         │
│         Auto-fills: VDRS Ref, SPN, Account                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         SUPPLIER SELECTS FILES                               │
│         - Approval drawings                                   │
│         - E-Schematics                                        │
│         - Hardware                                           │
│         - Installation drawings                               │
│         - User manuals                                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         VALIDATION                                            │
│         - File type check (PDF, DOCX, etc.)                   │
│         - Size validation (50MB per file)                     │
│         - Filename sanitization                              │
│         - MIME type verification                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         DUPLICATE CHECK                                       │
│         Check if file already exists in Azure                 │
│         If exists: Prompt for versioning                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         UPLOAD TO AZURE FILES                                │
│         Path: supplierfilesync/VDRSRef/SPN/Account/Category/ │
│         Upload progress tracked                               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         DATABASE LOGGING                                      │
│         - Record in Uploads table                            │
│         - Record in Files table                               │
│         - Store metadata (size, type, date)                    │
│         - Capture client timestamp                             │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         SUCCESS CONFIRMATION                                  │
│         Display upload summary                                │
│         - Total files uploaded                                │
│         - Total size                                           │
│         - Categories with files                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. CDMS - Document Search & Retrieval Flow

```
┌─────────────────────────────────────────────────────────────┐
│              USER SEARCHES FOR DOCUMENT                       │
│         Search by: Container ID, date, type, keywords         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         SEARCH TYPES:                                         │
│         1. Full-text search (document content)                │
│         2. Metadata filters (container ID, date, type)       │
│         3. Advanced search (multiple criteria)                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         QUERY DATABASE                                        │
│         - Search Files table                                  │
│         - Filter by criteria                                  │
│         - Apply permissions (role-based)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         RETRIEVE RESULTS                                     │
│         - Paginated results (20 per page)                     │
│         - Sorted by relevance/date                             │
│         - Includes metadata                                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         USER SELECTS DOCUMENT                                 │
│         Click to view/download                                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         RETRIEVE FROM AZURE                                   │
│         - Get file from Azure Blob Storage                    │
│         - Generate temporary download link                     │
│         - Stream to user                                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         AUDIT LOG                                            │
│         Log document access in AuditLog table                  │
│         Track: user, document, timestamp, action              │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. VDRS Enterprise - Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│              USER VISITS VDRS ENTERPRISE PORTAL               │
│         https://vdrs-enterprise.azurewebsites.net            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         USER ENTERS EMAIL ADDRESS                             │
│         Click "Request OTP"                                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         BACKEND PROCESSES OTP REQUEST                          │
│         - Check rate limit (5 OTPs/hour per email)            │
│         - Generate 6-digit OTP code                            │
│         - Hash OTP with bcrypt                                 │
│         - Store in UserOtps table                             │
│         - Set expiration (10 minutes)                           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         SEND OTP VIA EMAIL                                    │
│         - SMTP via Office 365                                 │
│         - Email template with OTP code                         │
│         - Includes expiration time                             │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         USER RECEIVES EMAIL                                   │
│         Enters OTP code in portal                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         BACKEND VERIFIES OTP                                  │
│         - Hash entered OTP                                    │
│         - Compare with stored hash                             │
│         - Check expiration                                    │
│         - Check attempts (max 5)                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         OTP VALID → GENERATE JWT TOKEN                        │
│         - Get user from ContractsUsers table                  │
│         - Generate JWT with user info                          │
│         - Set expiration (24 hours)                           │
│         - Return token to frontend                             │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         FRONTEND STORES TOKEN                                 │
│         - Save in localStorage                                │
│         - Include in all API requests                          │
│         - Redirect to dashboard                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. ML Cost Estimation - Training Flow

```
┌─────────────────────────────────────────────────────────────┐
│              UPLOAD HISTORICAL DATA                          │
│         Excel file: service_order.xlsx                        │
│         Contains: 250+ historical service orders              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 1: DATA VALIDATION                               │
│         - Auto-map columns to expected format                 │
│         - Check for missing values                            │
│         - Validate data types                                 │
│         - Check value ranges                                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 2: DATA CLEANING                                 │
│         - Remove outliers (Isolation Forest)                  │
│         - Winsorize extreme values                           │
│         - Handle missing values                               │
│         - Normalize costs to 2025 dollars (CPI)              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 3: FEATURE ENGINEERING                           │
│         - Distance categories (short, medium, long)            │
│         - Time-based features (month, day of week)             │
│         - Customer-specific features                          │
│         - Service type encoding                               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 4: SPLIT DATA                                    │
│         - Training set: 80%                                   │
│         - Test set: 20%                                       │
│         - Random state: 42 (reproducibility)                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 5: TRAIN MULTIPLE MODELS                         │
│         Models evaluated:                                      │
│         - CatBoost (best: R²=0.92)                            │
│         - XGBoost (R²=0.88)                                   │
│         - LightGBM (R²=0.90)                                  │
│         - Random Forest (R²=0.86)                            │
│         - [8+ more models]                                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 6: HYPERPARAMETER TUNING                        │
│         - Optuna optimization (50 trials)                     │
│         - 5-fold cross-validation                            │
│         - 3 repeats                                            │
│         - Constraints for small dataset                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 7: MODEL EVALUATION                              │
│         Metrics:                                              │
│         - RMSE (Root Mean Squared Error)                       │
│         - MAE (Mean Absolute Error)                            │
│         - R² (Coefficient of Determination)                   │
│         - MAPE (Mean Absolute Percentage Error)                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 8: SELECT BEST MODEL                             │
│         CatBoost selected (best performance)                  │
│         - RMSE: $892                                          │
│         - MAE: $712                                           │
│         - R²: 0.92                                            │
│         - MAPE: 9.2%                                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 9: SAVE MODEL                                    │
│         - Save to saved_models/                               │
│         - Log to MLflow                                        │
│         - Store feature importance                            │
│         - Document model metadata                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. ML Cost Estimation - Prediction Flow

```
┌─────────────────────────────────────────────────────────────┐
│              USER REQUESTS COST ESTIMATE                       │
│         Input: Service details (distance, hours, etc.)        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         API ENDPOINT: POST /api/generate-quote               │
│         Request body:                                          │
│         {                                                     │
│           "distance": 150,                                     │
│           "labor_hours": 8,                                    │
│           "service_type": "maintenance",                     │
│           "customer": "Customer A"                            │
│         }                                                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 1: VALIDATE INPUT                                │
│         - Check required fields                               │
│         - Validate data types                                 │
│         - Check value ranges                                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 2: FEATURE ENGINEERING                           │
│         - Create distance categories                           │
│         - Add time-based features                             │
│         - Encode categorical variables                        │
│         - Normalize features                                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 3: LOAD TRAINED MODEL                            │
│         - Load CatBoost model from saved_models/              │
│         - Verify model version                                │
│         - Check model metadata                                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 4: GENERATE PREDICTION                           │
│         - Model.predict(features)                              │
│         - Prediction time: < 1 second                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 5: CALCULATE CONFIDENCE INTERVAL                 │
│         - 95% confidence interval                             │
│         - Lower bound: prediction - 1.96 * std                │
│         - Upper bound: prediction + 1.96 * std                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         STEP 6: RETURN RESPONSE                              │
│         {                                                     │
│           "estimated_cost": 5234.56,                         │
│           "confidence_interval": {                            │
│             "lower": 4711.10,                                 │
│             "upper": 5758.02                                  │
│           },                                                  │
│           "model_version": "catboost_v1.0",                   │
│           "prediction_time_ms": 45                            │
│         }                                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. VDRS Enterprise - File Sync Flow

```
┌─────────────────────────────────────────────────────────────┐
│              SUPPLIER UPLOADS FILES                            │
│         Files stored in Azure Files                            │
│         Path: supplierfilesync/VDRSRef/SPN/Account/Category/  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         DATABASE UPDATED                                       │
│         - Uploads table: Upload record created                │
│         - Files table: File records created                  │
│         - Status: SyncedToFTP = false                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         ADMIN REVIEWS UPLOADS                                 │
│         Admin portal shows pending uploads                    │
│         Admin can filter, search, review                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         ADMIN TRIGGERS SYNC                                   │
│         POST /api/admin/sync/trigger/{uploadId}               │
│         Admin-only endpoint (JWT required)                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         BACKEND ADDS TO SYNC QUEUE                            │
│         - Azure Service Bus Queue (planned)                    │
│         - Or database flag (current)                          │
│         - Mark as pending sync                                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         WINDOWS SERVICE POLLS QUEUE                           │
│         Service runs on Vdbcwks0036                           │
│         Polls every 2 minutes                                 │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         SERVICE DOWNLOADS FROM AZURE                           │
│         - Connect to Azure Files                              │
│         - Download files to temp folder                       │
│         - Maintain folder structure                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         SERVICE COPIES TO FTP                                  │
│         - Copy to Z:\FTProot                                   │
│         - Maintain folder structure                           │
│         - Preserve file metadata                               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         UPDATE DATABASE                                        │
│         - Set SyncedToFTP = true                               │
│         - Set SyncDate = GETDATE()                            │
│         - Set SyncedByUserID = admin ID                        │
│         - Log in SyncLog table                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 12. System Integration - Complete Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    VAN DYK TOOLS WEBAPP                         │
│              (Flask, 30+ Tools, AI Processing)                  │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        │ API Calls
                        ↓
┌─────────────────────────────────────────────────────────────────┐
│                    VDRS ENTERPRISE                              │
│              (Integration Layer, Node.js/Express)                │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Authentication│  │ File Upload │  │ Data Sync    │         │
│  │ (OTP, JWT)    │  │ (Azure)     │  │ (Queue)      │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└───────┬──────────────────┬──────────────────┬──────────────────┘
        │                  │                  │
        │                  │                  │
        ↓                  ↓                  ↓
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  RAG SYSTEM  │  │     CDMS     │  │  ML COST     │
│              │  │              │  │  ESTIMATOR   │
│  - Chroma DB │  │  - Azure     │  │              │
│  - GPT-4     │  │    Files     │  │  - CatBoost  │
│  - Embeddings│  │  - SQL Server│  │  - MLflow    │
└──────────────┘  └──────────────┘  └──────────────┘
        │                  │                  │
        │                  │                  │
        └──────────────────┴──────────────────┘
                        │
                        ↓
        ┌───────────────────────────────┐
        │      AZURE CLOUD SERVICES      │
        │                                │
        │  ┌──────────┐  ┌──────────┐  │
        │  │  Blob    │  │   SQL    │  │
        │  │ Storage  │  │ Database │  │
        │  └──────────┘  └──────────┘  │
        │                                │
        │  ┌──────────┐  ┌──────────┐  │
        │  │  Files   │  │  App     │  │
        │  │  Share   │  │ Service  │  │
        │  └──────────┘  └──────────┘  │
        └───────────────────────────────┘
                        │
                        ↓
        ┌───────────────────────────────┐
        │    ON-PREMISES INFRASTRUCTURE  │
        │                                │
        │  ┌──────────┐  ┌──────────┐  │
        │  │ Windows  │  │   FTP    │  │
        │  │ Service  │  │  Server  │  │
        │  │(Sync)    │  │(Z:\FTProot)│
        │  └──────────┘  └──────────┘  │
        └───────────────────────────────┘
```

---

## Summary

These flowcharts document the complete workflows for:

1. **Van Dyk Tools Webapp** - Overall system and individual tool flows
2. **RAG System** - Query processing and document ingestion
3. **CDMS** - Document upload, search, and retrieval
4. **VDRS Enterprise** - Authentication and file synchronization
5. **ML Cost Estimation** - Model training and prediction
6. **System Integration** - Complete architecture showing all connections

All flowcharts use simple, clear language suitable for stakeholder presentations.

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Author:** Ajith Srikanth

