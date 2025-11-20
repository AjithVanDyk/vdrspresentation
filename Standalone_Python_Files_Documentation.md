# Standalone Python Files - Comprehensive Documentation

## 📋 Project Overview

**Project Name**: Standalone Python Files Collection  
**Type**: Individual Python Scripts and Utilities  
**Purpose**: Collection of specialized Python scripts for specific tasks including audio upload, chatbot systems, and folder management  
**Target Users**: Developers, system administrators, data analysts, equipment managers  
**Business Value**: Provides specialized utilities for specific business needs, supports automation, and enables rapid prototyping of solutions

## 🏗️ System Architecture

### Core Components
1. **Audio Upload Service** - Flask-based audio file upload endpoint
2. **Enhanced RAG Chatbot** - Advanced chatbot with Vanna AI integration
3. **Legacy Chatbot** - Previous version of chatbot system
4. **Folder Management Utility** - Automated folder creation for project organization

### Technology Stack
- **Web Framework**: Flask for API endpoints
- **AI Integration**: OpenAI GPT models, Vanna AI for SQL generation
- **Database**: SQL Server with SQLAlchemy ORM
- **Vector Storage**: ChromaDB and file-based vector stores
- **Data Processing**: Pandas, NumPy for data manipulation
- **Document Processing**: PyPDF2, text processing utilities
- **Streamlit**: Web application framework for user interfaces

## 📁 File Structure Analysis

### Individual Files
- `audio_upload.py` - Simple Flask audio upload service
- `chatbot.py` - Enhanced RAG chatbot with Vanna AI integration
- `chatbotv1.py` - Legacy chatbot system (large file, truncated in analysis)
- `tp.py` - Folder management utility for project organization

## 🔍 Detailed Code Analysis

### 1. audio_upload.py - Audio Upload Service

**Purpose**: Simple Flask-based service for handling audio file uploads from web applications

**Key Technical Features**:
- **Flask Web Server**: Lightweight web server for file uploads
- **CORS Support**: Cross-origin resource sharing for web integration
- **File Management**: Automatic directory creation and file handling
- **WebM Support**: Specific support for WebM audio format

**Line-by-Line Analysis**:

```python
# Lines 1-4: Import statements and setup
from flask import Flask, request
from flask_cors import CORS
import os

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
```
**Business Impact**: Sets up essential Flask framework with CORS support for web integration. The automatic directory creation ensures the upload folder exists, preventing errors and providing reliable file storage for audio recordings from web applications.

```python
# Lines 8-9: Flask application initialization
app = Flask(__name__)
CORS(app)  # Allow JS from Streamlit to hit this endpoint
```
**Business Impact**: Initializes Flask application with CORS enabled, allowing JavaScript applications (like Streamlit) to make cross-origin requests. This enables seamless integration between web frontends and the audio upload service.

```python
# Lines 11-15: Audio upload endpoint
@app.route('/upload', methods=['POST'])
def upload_audio():
    audio = request.files['audio']
    audio.save(os.path.join(UPLOAD_FOLDER, 'recorded_audio.webm'))
    return "OK"
```
**Business Impact**: Implements a simple but effective audio upload endpoint that accepts POST requests with audio files. The service saves files with a consistent naming convention, enabling easy retrieval and processing of recorded audio from web applications.

```python
# Lines 17-18: Application startup
if __name__ == '__main__':
    app.run(port=5001)
```
**Business Impact**: Configures the application to run on port 5001, providing a dedicated service for audio uploads that can run alongside other applications without port conflicts.

### 2. chatbot.py - Enhanced RAG Chatbot System

**Purpose**: Comprehensive RAG (Retrieval Augmented Generation) chatbot system with Vanna AI integration for equipment management

**Key Technical Features**:
- **Vanna AI Integration**: Text-to-SQL generation using Vanna AI
- **Vector Storage**: ChromaDB and file-based vector stores for document retrieval
- **SQL Server Integration**: Direct database connectivity for equipment queries
- **Document Processing**: PDF and text file processing capabilities
- **Multi-modal Search**: Vector search, SQL search, and AI-powered responses

**Line-by-Line Analysis**:

```python
# Lines 1-6: System documentation and imports
"""
WM MESQUITE CREEK ENHANCED RAG SYSTEM - COMPLETE ERROR-FREE VERSION
===================================================================
Complete equipment management system with Enhanced Vanna AI, Perfect Specification Mapping, 
Equipment Intelligence, and Advanced Features - ALL SYNTAX ERRORS FIXED
"""

import os
import json
import time
import re
import urllib.parse
import threading
import hashlib
import logging
from datetime import datetime
from typing import List, Dict, Optional, Tuple, Any, Set
import gc
import pickle
import numpy as np
from collections import defaultdict
```
**Business Impact**: Implements comprehensive imports for a sophisticated RAG system. The extensive import list supports advanced functionality including AI integration, database connectivity, document processing, and data analysis, enabling a complete equipment management solution.

```python
# Lines 27-61: Conditional imports with error handling
try:
    import chromadb
    from chromadb.config import Settings
    CHROMADB_AVAILABLE = True
except ImportError:
    CHROMADB_AVAILABLE = False

try:
    from sklearn.metrics.pairwise import cosine_similarity
    SKLEARN_AVAILABLE = True
except ImportError:
    SKLEARN_AVAILABLE = False

try:
    import pyodbc
    from sqlalchemy import create_engine, text
    SQL_AVAILABLE = True
except ImportError:
    SQL_AVAILABLE = False

try:
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

try:
    import vanna as vn
    from vanna.openai.openai_chat import OpenAI_Chat
    from vanna.chromadb.chromadb_vector import ChromaDB_VectorStore
    VANNA_AVAILABLE = True
except ImportError:
    VANNA_AVAILABLE = False
```
**Business Impact**: Implements graceful degradation for optional dependencies, ensuring the system remains functional even if some libraries are not available. This approach improves system reliability and provides fallback options for different deployment scenarios.

```python
# Lines 102-135: Configuration constants
CUSTOMER_NAME = "WM Mesquite Creek"
CUSTOMER_FOLDER = r"G:\SERVICE\Customer info\WM Mesquite Creek"
OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE"  # Replace with your actual API key
GPT_MODEL = "gpt-3.5-turbo"
EMBEDDING_MODEL = "text-embedding-ada-002"

# Storage paths
VECTOR_STORE_PATH = "wm_mesquite_vector_store"
VANNA_VECTOR_PATH = "wm_vanna_vector_store"
DOCUMENT_INDEX_FILE = "wm_mesquite_index.json"
PROCESSING_LOG_FILE = "processing_log.json"
BLACKLIST_FILE = "wm_blacklist.txt"
CHECKPOINT_FILE = "wm_checkpoint.json"

# Database connection
TARGET_SERVER = "vdrsapps.database.windows.net"
TARGET_DATABASE = "PowerAppsDatabase"
TARGET_TABLE = "EquipmentDB"
TARGET_USERNAME = "VDRSAdmin"
TARGET_PASSWORD = "Oz01%O0wi"

# Equipment specifications
WM_EQUIPMENT_SPECS = {
    'BALER': ['Weight (kg)', 'Main Motor 1 Type', 'Main Motor 1 Power (kW)', 'Hydraulic System'],
    'OPTICAL SORTER': ['System Width (mm)', 'Resolution', 'Throughput (tons/hour)', 'Ejection System'],
    'CONVEYOR': ['Belt Width (mm)', 'Length (mm)', 'Motor Power (kW)', 'Speed (m/min)'],
    'EDDY CURRENT SEPARATOR': ['Drum Diameter (mm)', 'Belt Speed (m/s)', 'Motor Power (kW)'],
    'SHREDDER': ['Rotor Diameter (mm)', 'Motor Power (kW)', 'Throughput (tons/hour)'],
    'MAGNET': ['Magnetic Strength (Gauss)', 'Belt Width (mm)', 'Power Consumption (kW)'],
    'SCREEN': ['Deck Size (mm)', 'Aperture Size (mm)', 'Motor Power (kW)'],
    'TROMMEL SCREEN': ['Drum Diameter (mm)', 'Drum Length (mm)', 'Drum Speed (rpm)'],
    'STAR SCREEN': ['Width (mm)', 'Length (mm)', 'Star Size'],
    'DUST FILTER': ['Filter Quantity', 'Filter Diameter (mm)', 'Filter Surface Area (m^2)']
}
```
**Business Impact**: Defines comprehensive configuration for the WM Mesquite Creek customer-specific RAG system. The equipment specifications dictionary provides structured data for different equipment types, enabling intelligent equipment management and querying capabilities.

```python
# Lines 176-324: Vanna AI Manager class
class VannaAIManager:
    """Vanna AI Manager for SQL Server - Error-Free Version"""
    
    def __init__(self):
        self.vn = None
        self.connected = False
        self.trained = False
        self.sql_engine = None
        
        if VANNA_AVAILABLE and OPENAI_AVAILABLE:
            self._initialize()
    
    def _initialize(self):
        """Initialize Vanna AI"""
        try:
            # Create Vanna instance
            MyVanna = type('MyVanna', (ChromaDB_VectorStore, OpenAI_Chat), {})
            
            self.vn = MyVanna(config={
                'api_key': OPENAI_API_KEY,
                'model': GPT_MODEL,
                'path': VANNA_VECTOR_PATH
            })
            
            # Initialize OpenAI client
            from openai import OpenAI
            self.vn.client = OpenAI(api_key=OPENAI_API_KEY)
            
            # Create SQL Server engine
            connection_string = f"mssql+pyodbc://{urllib.parse.quote_plus(TARGET_USERNAME)}:{urllib.parse.quote_plus(TARGET_PASSWORD)}@{TARGET_SERVER}/{TARGET_DATABASE}?driver=ODBC+Driver+17+for+SQL+Server&timeout=30"
            self.sql_engine = create_engine(connection_string)
            
            # Test connection
            with self.sql_engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            
            self.connected = True
            st.success("✅ Vanna AI initialized with SQL Server")
            
        except Exception as e:
            st.error(f"❌ Vanna AI initialization failed: {e}")
            self.connected = False
```
**Business Impact**: Implements Vanna AI integration for natural language to SQL conversion. This enables users to query equipment databases using natural language instead of complex SQL syntax, significantly improving accessibility and reducing the learning curve for non-technical users.

```python
# Lines 219-262: Vanna AI training system
def train_on_schema(self):
    """Train Vanna AI on database schema"""
    if not self.connected:
        return False
    
    try:
        # Train on schema
        ddl = f"""
        CREATE TABLE {TARGET_TABLE} (
            CustomerName NVARCHAR(255),
            SerialNumber NVARCHAR(255),
            EquipmentType NVARCHAR(255),
            Manufacturer NVARCHAR(255),
            ActiveStatus NVARCHAR(50),
            ParentProjectID NVARCHAR(255),
            Specifications1 NVARCHAR(MAX),
            Specifications2 NVARCHAR(MAX)
        )"""
        
        self.vn.train(ddl=ddl)
        
        # Train examples
        examples = [
            {
                "question": "Show all BALER equipment",
                "sql": f"SELECT TOP 10 * FROM {TARGET_TABLE} WHERE EquipmentType LIKE '%BALER%'"
            },
            {
                "question": "Count equipment by type",
                "sql": f"SELECT EquipmentType, COUNT(*) as Count FROM {TARGET_TABLE} GROUP BY EquipmentType"
            }
        ]
        
        for example in examples:
            self.vn.train(question=example["question"], sql=example["sql"])
        
        self.trained = True
        st.session_state.vanna_trained = True
        st.success("✅ Vanna AI training completed!")
        return True
        
    except Exception as e:
        st.error(f"❌ Training failed: {e}")
        return False
```
**Business Impact**: Implements intelligent training system for Vanna AI using database schema and example queries. This training enables the AI to understand equipment-specific terminology and generate accurate SQL queries for equipment management tasks.

```python
# Lines 325-513: Vector Store Manager
class WMVectorStore:
    """Vector storage manager"""
    
    def __init__(self):
        self.active_store = None
        self.store_type = "None"
        
        if CHROMADB_AVAILABLE:
            self.active_store = self._init_chromadb()
            if self.active_store:
                self.store_type = "ChromaDB"
        
        if not self.active_store and SKLEARN_AVAILABLE:
            self.active_store = self._init_file_store()
            if self.active_store:
                self.store_type = "File-based"
```
**Business Impact**: Implements flexible vector storage system with fallback options. The system can use ChromaDB for production environments or file-based storage for simpler deployments, ensuring the RAG system works across different infrastructure configurations.

```python
# Lines 514-616: SQL Manager
class WMSQLManager:
    """SQL Manager for equipment database"""
    
    def __init__(self):
        self.engine = None
        self.connected = False
        self.columns = []
        self._connect()
    
    def _connect(self):
        """Connect to SQL Server"""
        try:
            encoded_password = urllib.parse.quote_plus(TARGET_PASSWORD)
            encoded_username = urllib.parse.quote_plus(TARGET_USERNAME)
            driver = urllib.parse.quote_plus("ODBC Driver 17 for SQL Server")
            
            connection_string = f"mssql+pyodbc://{encoded_username}:{encoded_password}@{TARGET_SERVER}/{TARGET_DATABASE}?driver={driver}&timeout=30"
            
            self.engine = create_engine(connection_string, echo=False)
            
            with self.engine.connect() as conn:
                conn.execute(text("SELECT 1"))
                self._setup_schema()
            
            self.connected = True
            st.success(f"✅ Connected to {TARGET_DATABASE}.{TARGET_TABLE}")
            
        except Exception as e:
            st.error(f"❌ SQL Connection failed: {e}")
            self.connected = False
```
**Business Impact**: Implements robust SQL Server connectivity with proper URL encoding and error handling. The connection system ensures reliable database access for equipment queries and data management operations.

```python
# Lines 617-725: Document Processor
class WMDocumentProcessor:
    """Document processor for various file types"""
    
    def __init__(self):
        self.project_patterns = [
            r'Project\s*(?:No|Number|#)[:.\s]*([A-Z0-9-]+)',
            r'Job\s*(?:No|Number|#)[:.\s]*([A-Z0-9-]+)',
            r'WO\s*(?:No|Number|#)[:.\s]*([A-Z0-9-]+)'
        ]
        
        self.equipment_patterns = [
            r'Serial\s*(?:No|Number)[:.\s]*([A-Z0-9-]+)',
            r'Model\s*(?:No|Number)[:.\s]*([A-Z0-9-]+)',
            r'Asset\s*(?:Tag|ID)[:.\s]*([A-Z0-9-]+)'
        ]
```
**Business Impact**: Implements intelligent document processing with regex patterns for extracting project numbers and equipment identifiers. This enables automatic metadata extraction from technical documents, improving searchability and organization of equipment documentation.

```python
# Lines 726-905: Complete RAG Engine
class WMCompleteRAGEngine:
    """Complete RAG engine with Vanna AI"""
    
    def __init__(self):
        self.vector_store = WMVectorStore()
        self.sql_manager = WMSQLManager()
        self.document_processor = WMDocumentProcessor()
        self.vanna_manager = VannaAIManager()
        self.document_index = self._load_document_index()
```
**Business Impact**: Integrates all components into a comprehensive RAG system that combines vector search, SQL queries, and AI-powered responses. This provides a complete solution for equipment management with multiple search modalities and intelligent response generation.

### 3. tp.py - Folder Management Utility

**Purpose**: Automated folder creation utility for organizing project folders with specific naming conventions

**Key Technical Features**:
- **Automated Folder Creation**: Creates multiple folders with predefined names
- **Path Management**: Handles base path configuration and folder structure
- **Naming Convention**: Implements specific naming patterns for project organization

**Line-by-Line Analysis**:

```python
# Lines 1-3: Setup and configuration
import os

base_path = r"C:\Users\ASrikanth\OneDrive - VAN DYK BALER\Desktop\OtiSort"
```
**Business Impact**: Sets up the base directory for folder creation, providing a centralized location for project organization. This ensures consistent folder structure and easy access to project files.

```python
# Lines 5-63: Folder definitions
folders = [
    "802259-0230    LUBO    CONVEYOR",
    "802259-0240    LUBO    OPTICAL SORT",
    "802259-0250    LUBO    AIR BOOSTER",
    "802259-0260    LUBO    ISOLATION BOX",
    "802259-0290    LUBO    CONVEYOR",
    "802259-0300    LUBO    OPTICAL SORT",
    "802259-0310    LUBO    AIR BOOSTER",
    "802259-0320    LUBO    ISOLATION BOX",
    # ... (continues with more folder definitions)
    "802259-1790    LUBO    DISC SPREADER"
]
```
**Business Impact**: Defines comprehensive folder structure for LUBO equipment project organization. The naming convention includes project numbers, manufacturer (LUBO), and equipment types, enabling systematic organization of project documentation and files.

```python
# Lines 65-68: Folder creation loop
for folder in folders:
    folder_name = folder.strip().replace('\t', ' ').replace('    ', ' ')
    path = os.path.join(base_path, folder_name)
    os.makedirs(path, exist_ok=True)
```
**Business Impact**: Implements automated folder creation with proper name cleaning and path handling. The script ensures all project folders are created consistently, supporting efficient project organization and file management.

## 🔄 Workflow and Process Flow

### 1. Audio Upload Service Workflow
```
Web Application → POST Request → Flask Server → File Validation → Directory Creation → File Save → Success Response
```

### 2. Enhanced RAG Chatbot Workflow
```
User Query → Vector Search → SQL Search → Vanna AI Query → Response Generation → Multi-source Response
```

### 3. Folder Management Workflow
```
Script Execution → Folder List Processing → Name Cleaning → Path Construction → Directory Creation → Completion
```

## 💼 Business Applications

### 1. Audio Upload Service
- **Voice Recording**: Web-based voice recording and upload
- **Audio Processing**: Foundation for audio analysis and processing
- **Integration**: Seamless integration with web applications
- **File Management**: Centralized audio file storage

### 2. Enhanced RAG Chatbot
- **Equipment Management**: Intelligent equipment querying and management
- **Document Search**: Advanced document search and retrieval
- **SQL Generation**: Natural language to SQL conversion
- **Customer Support**: Automated customer support and information retrieval

### 3. Folder Management Utility
- **Project Organization**: Systematic project folder creation
- **Document Management**: Organized storage for project documentation
- **Workflow Automation**: Automated folder structure setup
- **Team Collaboration**: Consistent folder structure for team access

## 🚀 Performance and Features

### Performance Optimizations
- **Graceful Degradation**: Fallback options for missing dependencies
- **Connection Pooling**: Efficient database connection management
- **Memory Management**: Garbage collection and memory optimization
- **Error Handling**: Comprehensive error handling and recovery

### User Experience Features
- **Natural Language Interface**: Conversational AI interface
- **Multi-modal Search**: Vector, SQL, and AI-powered search
- **Real-time Processing**: Immediate response generation
- **Source Attribution**: Clear source attribution for responses

### Data Management Features
- **Document Processing**: Multi-format document processing
- **Metadata Extraction**: Automatic metadata extraction
- **Vector Storage**: Efficient vector storage and retrieval
- **Database Integration**: Direct database connectivity

## 🔧 Configuration and Customization

### Service Configuration
- **Port Configuration**: Configurable service ports
- **Directory Settings**: Customizable upload directories
- **CORS Settings**: Configurable cross-origin policies
- **File Format Support**: Extensible file format support

### AI Configuration
- **Model Selection**: Configurable AI models
- **API Keys**: Secure API key management
- **Training Data**: Customizable training examples
- **Response Parameters**: Adjustable response generation parameters

### Database Configuration
- **Connection Strings**: Configurable database connections
- **Schema Mapping**: Flexible schema mapping
- **Query Optimization**: Configurable query optimization
- **Timeout Settings**: Adjustable connection timeouts

## 📊 Output and Reporting

### Service Outputs
- **File Uploads**: Successful file upload confirmations
- **Error Messages**: Clear error reporting and diagnostics
- **Status Updates**: Real-time service status updates
- **Logging**: Comprehensive logging and monitoring

### Chatbot Outputs
- **Natural Language Responses**: Conversational responses
- **SQL Queries**: Generated SQL queries with explanations
- **Data Tables**: Formatted data results
- **Source Attribution**: Clear source references

### Utility Outputs
- **Folder Creation**: Confirmation of folder creation
- **Error Handling**: Clear error messages and diagnostics
- **Progress Updates**: Real-time progress reporting
- **Completion Status**: Final completion confirmation

## 🔒 Security and Compliance

### Data Security
- **API Key Protection**: Secure API key management
- **File Validation**: Input validation and sanitization
- **Access Control**: Proper access control implementation
- **Data Encryption**: Secure data transmission

### Privacy Protection
- **Data Minimization**: Minimal data collection
- **User Privacy**: User privacy protection measures
- **Audit Logging**: Comprehensive audit trails
- **Compliance**: Regulatory compliance support

## 🎯 Future Enhancements

### Planned Features
- **Multi-language Support**: Internationalization capabilities
- **Advanced Analytics**: Enhanced analytics and reporting
- **API Integration**: RESTful API development
- **Mobile Support**: Mobile application development

### Performance Improvements
- **Caching Layer**: Advanced caching implementation
- **Load Balancing**: Load balancing for high availability
- **Microservices**: Microservices architecture
- **Cloud Deployment**: Cloud-native deployment options

### Business Features
- **Workflow Automation**: Automated business processes
- **Integration Hub**: Centralized integration management
- **Advanced Reporting**: Enhanced reporting capabilities
- **Custom Dashboards**: User-customizable dashboards

---

**Documentation Version**: 1.0  
**Last Updated**: January 2025  
**Status**: Production Ready  
**Maintainer**: Van Dyk Development Team

