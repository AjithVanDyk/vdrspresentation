# Project Flowcharts and Working Principles

## 🎤 DykScribe Project Flowchart

```mermaid
graph TD
    A[User Access] --> B[User Authentication]
    B --> C[Equipment Type Selection]
    C --> D[Manufacturer Selection]
    D --> E[Model Selection]
    E --> F[Specifications Selection]
    
    F --> G{Input Method}
    G -->|Audio| H[Audio Recording/Upload]
    G -->|Text| I[Manual Q&A Entry]
    
    H --> J[Audio Validation]
    J --> K[Whisper Transcription]
    K --> L[GPT Q&A Formatting]
    
    I --> M[Text Validation]
    M --> N[GPT Formatting]
    
    L --> O[Q&A Processing]
    N --> O
    
    O --> P[Data Validation]
    P --> Q[PDF Manual Upload]
    Q --> R[Database Storage]
    R --> S[Success Confirmation]
    
    T[Error Handling] --> U[User Feedback]
    U --> V[Retry Option]
    V --> G
```

## 🤖 RAG System Flowchart

```mermaid
graph TD
    A[User Query] --> B[Query Analysis]
    B --> C[Vector Search]
    B --> D[Database Search]
    B --> E[Intelligent SQL Generation]
    
    C --> F[Document Retrieval]
    D --> G[Equipment Data]
    E --> H[SQL Query Execution]
    
    F --> I[Context Assembly]
    G --> I
    H --> I
    
    I --> J[AI Response Generation]
    J --> K[Source Citation]
    K --> L[Response Delivery]
    
    M[Document Upload] --> N[Document Processing]
    N --> O[Vector Embedding]
    O --> P[ChromaDB Storage]
    P --> Q[Index Update]
    
    R[Database Update] --> S[Schema Analysis]
    S --> T[Intelligent Mapping]
    T --> U[Query Optimization]
```

## 📄 Data Extractor Suite Flowchart

```mermaid
graph TD
    A[PDF Document Input] --> B[Method Selection]
    B --> C{Extraction Method}
    
    C -->|LayoutParser + PaddleOCR| D[Table Detection]
    C -->|OpenCV + Tesseract| E[Image Processing]
    C -->|LLM Local| F[AI Processing]
    C -->|OpenRouter| G[Cloud AI Processing]
    
    D --> H[OCR Processing]
    E --> H
    F --> I[Local AI Analysis]
    G --> J[Cloud AI Analysis]
    
    H --> K[Data Extraction]
    I --> K
    J --> K
    
    K --> L[Data Validation]
    L --> M[Format Conversion]
    M --> N[Output Generation]
    
    N --> O[CSV Export]
    N --> P[Excel Export]
    N --> Q[Text Export]
    N --> R[Log Files]
```

## 🔍 BlobCheck Project Flowchart

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

## 📱 Van Dyk One Mobile App Flowchart

```mermaid
graph TD
    A[App Launch] --> B[User Authentication]
    B --> C[Main Dashboard]
    
    C --> D[Equipment Management]
    C --> E[Service Tickets]
    C --> F[Expense Tracking]
    C --> G[Site Management]
    
    D --> H[Equipment List]
    H --> I[Equipment Details]
    I --> J[Maintenance Schedule]
    J --> K[Service History]
    
    E --> L[Ticket List]
    L --> M[Create Ticket]
    M --> N[Assign Ticket]
    N --> O[Update Status]
    
    F --> P[Expense Entry]
    P --> Q[Receipt Capture]
    Q --> R[Expense Approval]
    
    G --> S[Site List]
    S --> T[Site Details]
    T --> U[Site Equipment]
    U --> V[Site Reports]
```

## 🔧 OCR Tools Collection Flowchart

```mermaid
graph TD
    A[Document Input] --> B[Format Detection]
    B --> C{Document Type}
    
    C -->|PDF| D[PDF Processing]
    C -->|Image| E[Image Processing]
    C -->|Text| F[Text Processing]
    
    D --> G[Page Extraction]
    E --> H[Image Preprocessing]
    F --> I[Text Validation]
    
    G --> J[OCR Processing]
    H --> J
    I --> K[Text Extraction]
    
    J --> L[Text Validation]
    K --> L
    
    L --> M[Data Structuring]
    M --> N[Output Generation]
    
    N --> O[CSV Export]
    N --> P[Excel Export]
    N --> Q[Text Export]
    N --> R[Log Files]
```

## 🗣️ Chatbot System Flowchart

```mermaid
graph TD
    A[User Message] --> B[Message Processing]
    B --> C[Intent Recognition]
    C --> D[Context Analysis]
    
    D --> E[Query Processing]
    E --> F[Database Query]
    E --> G[Document Search]
    E --> H[AI Processing]
    
    F --> I[Data Retrieval]
    G --> J[Document Retrieval]
    H --> K[AI Response Generation]
    
    I --> L[Response Assembly]
    J --> L
    K --> L
    
    L --> M[Response Validation]
    M --> N[Response Delivery]
    
    O[Error Handling] --> P[Fallback Response]
    P --> Q[User Feedback]
    Q --> R[Learning Update]
```

## 🏗️ Overall System Architecture

```mermaid
graph TD
    A[User Interface Layer] --> B[Mobile App - React Native]
    A --> C[Web Applications - Streamlit]
    A --> D[Desktop Tools - Python GUI]
    
    B --> E[Van Dyk One Mobile App]
    C --> F[DykScribe Q&A System]
    C --> G[RAG Chatbot System]
    D --> H[Data Extractor Suite]
    D --> I[BlobCheck Tool]
    
    E --> J[Equipment Management]
    F --> K[Audio Processing]
    G --> L[Document Search]
    H --> M[PDF Processing]
    I --> N[Data Verification]
    
    J --> O[SQL Server Database]
    K --> P[OpenAI Whisper]
    L --> Q[ChromaDB Vector Store]
    M --> R[Multiple OCR Engines]
    N --> S[Azure Blob Storage]
    
    O --> T[Equipment Data]
    P --> U[Transcription Service]
    Q --> V[Document Embeddings]
    R --> W[Text Extraction]
    S --> X[File Storage]
```

## 🔄 Data Flow Between Projects

```mermaid
graph TD
    A[Document Sources] --> B[Data Extractor Suite]
    B --> C[Processed Documents]
    C --> D[RAG System]
    D --> E[Vector Database]
    
    F[Equipment Data] --> G[SQL Server Database]
    G --> H[Van Dyk One Mobile App]
    G --> I[DykScribe System]
    G --> J[RAG System]
    
    K[Audio Input] --> L[DykScribe System]
    L --> M[Transcribed Text]
    M --> N[Q&A Pairs]
    N --> O[Database Storage]
    
    P[File Storage] --> Q[Azure Blob Storage]
    Q --> R[BlobCheck Tool]
    R --> S[Data Verification]
    S --> T[CSV Reports]
    
    U[User Queries] --> V[RAG System]
    V --> W[AI Responses]
    W --> X[User Interface]
```

## 📊 Project Dependencies and Relationships

```mermaid
graph TD
    A[Core Infrastructure] --> B[SQL Server Database]
    A --> C[Azure Blob Storage]
    A --> D[OpenAI API Services]
    
    B --> E[Van Dyk One Mobile App]
    B --> F[DykScribe System]
    B --> G[RAG System]
    
    C --> H[BlobCheck Tool]
    C --> I[Data Extractor Suite]
    
    D --> F
    D --> G
    D --> J[Chatbot Systems]
    
    K[Document Processing] --> L[Data Extractor Suite]
    L --> M[Processed Documents]
    M --> G
    
    N[User Interface] --> O[Mobile App]
    N --> P[Web Applications]
    N --> Q[Desktop Tools]
    
    O --> E
    P --> F
    P --> G
    Q --> H
    Q --> I
```

---

*These flowcharts provide visual representations of how each project works, showing the data flow, decision points, and system interactions. They help understand the working principles and technical implementation of each project in a clear, visual format.*
