# GDrive Project - Comprehensive Documentation

## 📋 Project Overview

**Project Name**: GDrive Project  
**Type**: Web-based File Management and Operations System  
**Purpose**: Comprehensive file management system for searching, copying, and organizing PDF files and folders across multiple drives  
**Target Users**: Document managers, file organizers, system administrators, engineering teams  
**Business Value**: Automates large-scale file operations, reduces manual file management time, and provides real-time progress tracking for complex file operations

## 🏗️ System Architecture

### Core Components
1. **Web Application Server** - Flask-based web server with SocketIO for real-time communication
2. **PDF File Operations Manager** - Handles PDF file search, matching, and copying operations
3. **Serial Folder Operations Manager** - Manages folder-based operations with table data
4. **Excel Number Extractor** - Extracts and processes part numbers from Excel files
5. **Real-time Progress Tracking** - Live updates via WebSocket connections
6. **Multi-threaded Processing** - Parallel processing for improved performance

### Technology Stack
- **Backend**: Python Flask, Flask-SocketIO, Eventlet
- **Frontend**: HTML5, Tailwind CSS, JavaScript, Socket.IO
- **File Operations**: os, shutil, concurrent.futures
- **Data Processing**: pandas, re (regex)
- **Real-time Communication**: WebSocket (SocketIO)
- **Multi-threading**: ThreadPoolExecutor, threading

## 📁 File Structure Analysis

### Core Application Files
- `main_app.py` - Main Flask application with routing and SocketIO integration
- `flask_backend.py` - Alternative Flask backend implementation
- `pdf_operations.py` - PDF file operations manager class
- `serial_operations.py` - Serial folder operations manager class
- `excel_number_extractor.py` - Excel file processing and number extraction

### Template Files
- `templates/index.html` - Main dashboard interface
- `templates/pdf_matcher.html` - PDF file matching interface
- `templates/serial_copier.html` - Serial folder operations interface

### Data Files
- `extracted_numbers.txt` - Extracted part numbers
- `extracted_numbers_by_file.txt` - File-wise extraction results
- `not_found_numbers_log.txt` - Log of numbers not found
- `app.log` - Application log file

## 🔍 Detailed Code Analysis

### 1. main_app.py - Main Application Server

**Purpose**: Central Flask application managing all file operations with real-time communication

**Key Technical Features**:
- **Flask-SocketIO Integration**: Real-time bidirectional communication
- **Multi-operation Management**: Handles multiple concurrent operations
- **Thread-safe Operations**: Thread locks for safe concurrent access
- **Graceful Shutdown**: Proper cleanup of active operations
- **Port Management**: Automatic port finding and conflict resolution

**Line-by-Line Analysis**:

```python
# Lines 1-18: Import statements and eventlet setup
import os, platform, threading, uuid
from datetime import datetime
import logging
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from pdf_operations import PDFFileOperationManager
from serial_operations import SerialFolderOperationManager
import eventlet
eventlet.monkey_patch()
```
**Business Impact**: Imports essential libraries for web server functionality, real-time communication, file operations, and async processing. Eventlet monkey patching enables better async performance for SocketIO operations.

```python
# Lines 20-29: Logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('app.log')
    ]
)
logger = logging.getLogger(__name__)
```
**Business Impact**: Comprehensive logging system tracks all application activities, errors, and performance metrics. Dual output (console and file) ensures both real-time monitoring and persistent audit trails.

```python
# Lines 35-41: Global configuration and state management
SOURCE_DIRS = ['G:\\', 'Z:\\']
DEST_DIR = 'G:\\Interns\\Ajith Srikanth\\GDrive'
active_operations = {}
active_operations_lock = threading.Lock()
```
**Business Impact**: Configuration constants define source and destination directories for file operations. Global state management with thread locks ensures safe concurrent operation handling across multiple users.

```python
# Lines 43-51: Operation completion callback
def on_operation_complete(operation_id, status='completed'):
    with active_operations_lock:
        if operation_id in active_operations:
            logger.info(f"Operation {operation_id} {status}. Removing from active list.")
            del active_operations[operation_id]
```
**Business Impact**: Callback function ensures proper cleanup of completed operations, preventing memory leaks and maintaining accurate operation tracking.

```python
# Lines 53-59: SocketIO initialization
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    async_mode='eventlet',
    logger=True,
    engineio_logger=True
)
```
**Business Impact**: SocketIO configuration enables real-time communication between server and clients. CORS support allows cross-origin requests, while eventlet mode provides better async performance.

```python
# Lines 85-98: Client connection handling
@socketio.on('connect')
def on_connect():
    logger.info('[SocketIO] Client connected')
    with active_operations_lock:
        active_ops_summary = [
            {
                'id': op_id,
                'type': getattr(op, 'type', 'unknown'),
                'progress': op.progress
            } for op_id, op in active_operations.items()
        ]
    if active_ops_summary:
        socketio.emit('reconnect_operations', {'operations': active_ops_summary})
```
**Business Impact**: Handles client connections and reconnection scenarios. When clients reconnect, they receive information about any ongoing operations, ensuring continuity of user experience.

### 2. pdf_operations.py - PDF File Operations Manager

**Purpose**: Manages PDF file search, matching, and copying operations with real-time progress tracking

**Key Technical Features**:
- **Parallel File Search**: Multi-threaded directory traversal
- **Duplicate Detection**: Smart file comparison to avoid unnecessary copies
- **Progress Tracking**: Real-time progress updates via SocketIO
- **Error Handling**: Comprehensive error handling and recovery
- **Thread Safety**: Thread locks for safe concurrent operations

**Line-by-Line Analysis**:

```python
# Lines 8-33: Class initialization and validation
class PDFFileOperationManager:
    def __init__(self, operation_id, numbers, socketio, source_dirs, dest_dir, threads=20, completion_callback=None):
        self.operation_id = operation_id
        self.numbers = list(set(numbers))  # Remove duplicates
        self.socketio = socketio
        self.source_dirs = source_dirs
        self.dest_dir = dest_dir
        self.threads = threads
        self.is_running = False
        self.is_cancelled = False
        self.progress = {'current': 0, 'total': 0, 'stage': 'Initializing'}
        self.completion_callback = completion_callback
        self.operation_lock = threading.Lock()
        self.results = {'found': 0, 'copied': 0, 'skipped': 0, 'not_found': []}
        self.logs = []
```
**Business Impact**: Initializes the PDF operations manager with comprehensive state tracking. Duplicate removal ensures efficient processing, while thread locks prevent race conditions in concurrent operations.

```python
# Lines 40-59: Progress emission with thread safety
def emit_progress(self):
    with self.operation_lock:
        try:
            progress_data = {
                'operation_id': self.operation_id,
                'operation_type': 'pdf',
                'progress': self.progress.copy(),
                'results': self.results.copy(),
                'logs': self.logs[-10:]
            }
            if self.socketio:
                self.socketio.emit('progress_update', progress_data)
        except Exception as e:
            print(f"Error emitting progress: {str(e)}")
```
**Business Impact**: Thread-safe progress emission ensures real-time updates to clients without data corruption. Copy operations prevent reference issues, while error handling ensures robust communication.

```python
# Lines 95-103: File comparison for duplicate detection
def files_are_same(self, src, dst):
    try:
        if not os.path.exists(dst):
            return False
        return (os.path.getsize(src) == os.path.getsize(dst) and 
               int(os.path.getmtime(src)) == int(os.path.getmtime(dst)))
    except Exception:
        return False
```
**Business Impact**: Efficient duplicate detection using file size and modification time prevents unnecessary file copies, saving storage space and processing time.

```python
# Lines 161-247: Parallel file search implementation
def find_matching_files_and_folders_parallel(self, source_dirs, numbers):
    matches = {num: {'files': [], 'folders': []} for num in numbers}
    lock = threading.Lock()
    
    def search_dir(source_dir):
        folder_counter = 0
        pdf_counter = 0
        match_counter = 0
        
        for root, dirs, files in os.walk(source_dir):
            if self.is_cancelled:
                break
            folder_counter += 1
            if folder_counter % 1000 == 0:
                with lock:
                    self.log_message(f"Scanned {folder_counter} folders...")
                    self.progress['stage'] = f'Scanning {source_dir} - {folder_counter} folders'
                    self.emit_progress()
```
**Business Impact**: Parallel directory traversal significantly improves search performance across multiple drives. Progress updates every 1000 folders provide real-time feedback without overwhelming the system.

### 3. excel_number_extractor.py - Excel Processing System

**Purpose**: Extracts and processes part numbers from Excel files with parallel processing

**Key Technical Features**:
- **Parallel Processing**: ProcessPoolExecutor for concurrent Excel file processing
- **Number Formatting**: Standardizes part numbers to XXX.XXX.XXX format
- **Column Detection**: Intelligent column detection and mapping
- **Error Handling**: Comprehensive error handling and logging
- **Retry Mechanism**: Retry failed extractions with different column mappings

**Line-by-Line Analysis**:

```python
# Lines 10-29: Number extraction and formatting
def extract_and_format_number(cell_value):
    if pd.isna(cell_value):
        return None
    match = re.match(r'[\s\-\.]*(\d[\d\s\-\.]*)', str(cell_value))
    if not match:
        return None
    digits = re.findall(r'\d', match.group(1))
    if not digits:
        return None
    if len(digits) < 9:
        digits = ['0'] * (9 - len(digits)) + digits
    else:
        digits = digits[:9]
    return f"{''.join(digits[0:3])}.{''.join(digits[3:6])}.{''.join(digits[6:9])}"
```
**Business Impact**: Robust number extraction handles various input formats and standardizes them to a consistent XXX.XXX.XXX format. Leading zero padding ensures consistent part number formatting across different sources.

```python
# Lines 31-60: Excel file processing
def process_excel_file(file_path):
    extracted = {}
    logs = []
    try:
        xl = pd.ExcelFile(file_path)
        for sheet_name in xl.sheet_names:
            try:
                df = xl.parse(sheet_name, header=0)
                if 'K' in df.columns:
                    col = df['K']
                elif len(df.columns) > 10:
                    col = df.iloc[:, 10]
                else:
                    logs.append(f"Missing column K: {file_path} [{sheet_name}]")
                    continue
```
**Business Impact**: Intelligent column detection first tries to find column 'K', then falls back to the 11th column (index 10). This flexibility handles different Excel file formats while maintaining consistent data extraction.

```python
# Lines 62-73: Parallel processing implementation
def process_excels_parallel(source_dir):
    excel_files = [os.path.join(r, f)
                   for r, _, files in os.walk(source_dir)
                   for f in files if f.lower().endswith(('.xlsx', '.xls'))]
    
    results = []
    logs = []
    with ProcessPoolExecutor() as executor:
        for extracted, log in executor.map(process_excel_file, excel_files):
            results.append(extracted)
            logs.extend(log)
    return excel_files, results, logs
```
**Business Impact**: Parallel processing using ProcessPoolExecutor significantly improves performance when processing large numbers of Excel files. The approach scales well with available CPU cores.

### 4. serial_operations.py - Serial Folder Operations Manager

**Purpose**: Manages folder-based operations with table data and advanced control features

**Key Technical Features**:
- **Pause/Resume**: Advanced operation control with pause and resume capabilities
- **Skip List Management**: Intelligent skipping of specified items
- **Progress Tracking**: Detailed progress tracking with multiple metrics
- **Error Recovery**: Comprehensive error handling and recovery mechanisms
- **Cache Management**: Caching system for performance optimization

**Line-by-Line Analysis**:

```python
# Lines 8-54: Class initialization with advanced state management
class SerialFolderOperationManager:
    def __init__(self, operation_id, table_data, socketio, skip_list=None, customer_folder_path=None, completion_callback=None):
        self.operation_id = operation_id
        self.table_data = table_data or []
        self.socketio = socketio
        self.skip_list = skip_list or []
        self.customer_folder_path = customer_folder_path or "G:\\Customers"
        self.completion_callback = completion_callback
        
        # Operation state
        self.is_running = False
        self.is_cancelled = False
        self.is_paused = False
        
        # Progress tracking
        self.progress = {
            'current': 0, 
            'total': len(self.table_data), 
            'stage': 'Initializing'
        }
        
        # Results tracking
        self.results = {
            'successful': 0,
            'failed': 0,
            'skipped': 0,
            'skippedFromList': 0,
            'missingSource': 0,
            'missingSerial': 0,
            'failures': []
        }
```
**Business Impact**: Comprehensive state management enables advanced operation control including pause/resume functionality. Detailed results tracking provides insights into operation success rates and failure patterns.

```python
# Lines 62-72: Pause and resume functionality
def pause_operation(self):
    with self.operation_lock:
        self.is_paused = True
        self.log_message('Operation paused', 'info')

def resume_operation(self):
    with self.operation_lock:
        self.is_paused = False
        self.log_message('Operation resumed', 'info')
```
**Business Impact**: Pause and resume functionality allows users to temporarily halt operations for system maintenance or resource management, then resume without losing progress.

## 🔄 Workflow and Process Flow

### 1. PDF File Operations Workflow
```
User Input → Number Validation → Duplicate Check → Parallel Search → File Matching → Copy Operations → Progress Updates → Completion
```

### 2. Serial Folder Operations Workflow
```
Table Data Input → Validation → Skip List Processing → Folder Search → Copy Operations → Progress Tracking → Results Reporting
```

### 3. Excel Processing Workflow
```
Excel Files → Parallel Processing → Number Extraction → Format Standardization → Results Compilation → Log Generation
```

### 4. Real-time Communication Flow
```
Client Connection → WebSocket Establishment → Operation Updates → Progress Broadcasting → Completion Notification
```

## 💼 Business Applications

### 1. Document Management
- **File Organization**: Automated organization of PDF files by part numbers
- **Duplicate Management**: Intelligent duplicate detection and handling
- **Archive Operations**: Large-scale file archiving and organization
- **Search and Retrieval**: Fast file location and retrieval

### 2. Engineering Operations
- **Part Number Processing**: Automated extraction and processing of part numbers
- **Document Distribution**: Automated distribution of engineering documents
- **Version Control**: Tracking and management of document versions
- **Compliance Management**: Ensuring proper document organization for compliance

### 3. System Administration
- **Storage Management**: Efficient use of storage resources
- **Backup Operations**: Automated backup and archival processes
- **File Migration**: Large-scale file migration between systems
- **Performance Monitoring**: Real-time monitoring of file operations

## 🚀 Performance and Scalability

### Processing Capabilities
- **Parallel Processing**: Multi-threaded operations for improved performance
- **Concurrent Operations**: Multiple operations can run simultaneously
- **Real-time Updates**: Live progress tracking without performance impact
- **Memory Management**: Efficient memory usage for large operations

### Scalability Features
- **Thread Pool Management**: Configurable thread pools for different operation types
- **Operation Queuing**: Queue management for high-volume operations
- **Resource Monitoring**: Real-time resource usage monitoring
- **Error Recovery**: Robust error handling and recovery mechanisms

## 🔧 Configuration and Customization

### Application Settings
- **Source Directories**: Configurable source drive paths
- **Destination Directory**: Customizable destination paths
- **Thread Counts**: Adjustable thread pool sizes
- **Progress Intervals**: Configurable progress update frequencies

### Operation Parameters
- **File Types**: Configurable file type filtering
- **Number Formats**: Customizable number format patterns
- **Skip Lists**: Configurable skip lists for operations
- **Timeout Settings**: Adjustable operation timeouts

## 📊 Output and Reporting

### Real-time Monitoring
- **Progress Tracking**: Live progress updates with detailed metrics
- **Operation Status**: Real-time operation status monitoring
- **Error Reporting**: Immediate error notification and logging
- **Performance Metrics**: Real-time performance statistics

### Logging and Reports
- **Operation Logs**: Detailed logs of all operations
- **Error Logs**: Comprehensive error logging and analysis
- **Performance Reports**: Detailed performance analysis reports
- **Audit Trails**: Complete audit trails for compliance

## 🔒 Security and Compliance

### Data Protection
- **File Integrity**: Verification of file integrity during operations
- **Access Control**: Secure access to file operations
- **Audit Logging**: Comprehensive audit trails for compliance
- **Error Handling**: Secure error handling without data exposure

### Operation Safety
- **Duplicate Prevention**: Intelligent duplicate detection and prevention
- **Rollback Capability**: Ability to rollback operations if needed
- **Validation**: Comprehensive input validation and verification
- **Recovery**: Robust error recovery and operation resumption

## 🎯 Future Enhancements

### Planned Features
- **Cloud Integration**: Integration with cloud storage services
- **Advanced Analytics**: Enhanced analytics and reporting capabilities
- **API Development**: RESTful API for external system integration
- **Mobile Support**: Mobile application for remote operation management

### Performance Improvements
- **Distributed Processing**: Multi-machine processing capabilities
- **Caching Systems**: Advanced caching for improved performance
- **Load Balancing**: Load balancing for high-volume operations
- **Optimization**: Performance optimization and tuning

---

**Documentation Version**: 1.0  
**Last Updated**: January 2025  
**Status**: Production Ready  
**Maintainer**: File Operations Team

