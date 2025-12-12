# NameplatesAndTagsDataExtractor - Comprehensive Documentation

## 📋 Project Overview

**Project Name**: NameplatesAndTagsDataExtractor  
**Type**: Desktop Application for Equipment Data Extraction and Management  
**Purpose**: Automated extraction of equipment specifications from nameplate and tag images using AI vision, with comprehensive data validation and management capabilities  
**Target Users**: Equipment technicians, data managers, quality assurance teams, after-sales service teams  
**Business Value**: Automates manual data entry from equipment images, reduces human error, and provides structured data management for equipment specifications

## 🏗️ System Architecture

### Core Components
1. **Desktop GUI Application** - TtkBootstrap-based modern interface with tabbed layout
2. **AI Vision Processing** - OpenAI GPT-4 Vision API for image analysis and data extraction
3. **Database Integration** - SQL Server integration for equipment data management
4. **Image Management System** - Comprehensive image mapping and organization
5. **Data Validation Interface** - Interactive data review and correction system
6. **File Processing Engine** - Automated folder traversal and image categorization

### Technology Stack
- **GUI Framework**: TtkBootstrap (modern Tkinter with Bootstrap themes)
- **AI Integration**: OpenAI GPT-4 Vision API
- **Database**: SQL Server with pyodbc
- **Image Processing**: PIL (Pillow), ImageTk
- **Data Processing**: pandas, rapidfuzz
- **File Operations**: os, glob, shutil
- **Build System**: PyInstaller for executable creation

## 📁 File Structure Analysis

### Core Application Files
- `main.py` - Main desktop application with GUI and core functionality
- `data_processing.py` - File processing engine and image categorization
- `gpt_vision.py` - OpenAI Vision API integration for data extraction
- `db_utils.py` - Database operations and SQL Server integration
- `image_mapping.py` - Image mapping and organization system
- `config.py` - Configuration and database connection settings

### Build and Distribution
- `main.spec` - PyInstaller configuration file
- `dist/main.exe` - Standalone Windows executable
- `build/` - PyInstaller build artifacts
- `requirements.txt` - Python dependencies

### Documentation and Support
- `README.txt` - User guide and troubleshooting
- `documentation/` - Technical documentation and guides
- `TestPreview/` - Database connection testing utilities

### Web Application (Alternative Interface)
- `webapp/backend/app.py` - Flask backend for web interface
- `webapp/frontend/` - React.js frontend application

## 🔍 Detailed Code Analysis

### 1. main.py - Main Desktop Application

**Purpose**: Central desktop application providing comprehensive equipment data extraction and validation interface

**Key Technical Features**:
- **Modern GUI**: TtkBootstrap with dark theme and professional styling
- **Tabbed Interface**: Separate tabs for data processing and validation
- **Real-time Progress**: Progress bars and live logging
- **Image Preview**: Advanced image viewing with zoom, rotation, and pan controls
- **Data Validation**: Interactive data editing and verification system

**Line-by-Line Analysis**:

```python
# Lines 1-21: Import statements and configuration
import ttkbootstrap as tb
from ttkbootstrap.constants import *
from PIL import Image, ImageTk
import threading
import queue
import time
import data_processing
import db_utils
import gpt_vision
import image_mapping
import os
import glob
import tkinter as tk
from tkinter import scrolledtext
from tkinter import ttk
import pandas as pd
from tkinter import filedialog
import math

ROOT_PATH = r'G:\Interns\0SortFolders'
```
**Business Impact**: Imports essential libraries for modern GUI development, image processing, database operations, and AI integration. The ROOT_PATH configuration allows easy customization of the source folder for different environments.

```python
# Lines 38-61: Application class initialization
class DataExtractApp(tb.Window):
    def __init__(self):
        super().__init__(themename="darkly")
        self.title('Van Dyk After Sales Data Extractor')
        self.geometry('1200x800')
        
        self.notebook = tb.Notebook(self, bootstyle="dark")
        self.notebook.pack(fill=BOTH, expand=True, padx=10, pady=10)
        
        self.data_processing_tab = tb.Frame(self.notebook, padding=20)
        self.data_validation_tab = tb.Frame(self.notebook, padding=20)
        self.notebook.add(self.data_processing_tab, text='Data Processing')
        self.notebook.add(self.data_validation_tab, text='Data Validation')
```
**Business Impact**: Creates a professional desktop application with modern dark theme and tabbed interface. The large window size (1200x800) accommodates complex data validation workflows and image preview capabilities.

```python
# Lines 62-76: Data processing tab initialization
def init_data_processing_tab(self):
    frame = self.data_processing_tab
    frame.columnconfigure(1, weight=1)
    frame.rowconfigure(2, weight=1)
    
    # Progress bar
    self.progress = tb.Progressbar(frame, orient=HORIZONTAL, length=300, mode='determinate', bootstyle="info-striped")
    self.progress.grid(row=0, column=0, padx=(0,10), pady=(0,10), sticky='w')
    # Start button
    self.start_btn = tb.Button(frame, text='Start Processing Data', bootstyle="success-outline", command=self.start_processing)
    self.start_btn.grid(row=0, column=1, padx=(0,10), pady=(0,10), sticky='w')
    # Log area
    self.log_text = scrolledtext.ScrolledText(frame, height=20, width=100, font=('Consolas', 11))
    self.log_text.grid(row=2, column=0, columnspan=2, padx=0, pady=(10,0), sticky='nsew')
```
**Business Impact**: Creates an intuitive data processing interface with progress tracking, start controls, and comprehensive logging. The striped progress bar provides visual feedback during long-running operations.

```python
# Lines 78-163: Data validation tab with advanced image controls
def init_data_validation_tab(self):
    frame = self.data_validation_tab
    frame.columnconfigure(0, weight=0, minsize=220)
    frame.columnconfigure(1, weight=1, minsize=320)
    frame.columnconfigure(2, weight=2, minsize=500)
    frame.rowconfigure(0, weight=1)
    frame.rowconfigure(1, weight=0)
    
    # Left sidebar (Entry List)
    sidebar = tb.Frame(frame, bootstyle="secondary", padding=(5,10,5,10))
    sidebar.grid(row=0, column=0, rowspan=2, sticky='nsew', padx=(0,5), pady=0)
    
    self.entry_list = tk.Listbox(sidebar, width=24, height=30, exportselection=False)
    self.entry_list.grid(row=0, column=0, sticky='nsew')
    self.entry_list.bind('<<ListboxSelect>>', self.on_entry_select)
```
**Business Impact**: Creates a sophisticated three-panel validation interface with entry list, data fields, and image preview. The layout provides efficient workflow for reviewing and correcting extracted data.

### 2. data_processing.py - File Processing Engine

**Purpose**: Handles automated folder traversal, image categorization, and data extraction coordination

**Key Technical Features**:
- **Recursive Folder Processing**: Automated traversal of complex folder structures
- **Image Categorization**: Intelligent classification of nameplate and tag images
- **AI Integration**: Coordination with GPT Vision API for data extraction
- **Database Operations**: Integration with SQL Server for data storage
- **Progress Tracking**: Real-time progress updates and logging

**Line-by-Line Analysis**:

```python
# Lines 34-46: Main processing function initialization
def process_root_folder(root_path, log_callback, progress_callback=None, gpt_extract_func=None):
    summary = {
        'dates': {},
        'total_customers': 0,
        'total_projects': 0,
        'processed': []
    }
    if not os.path.exists(root_path):
        log_callback(f'Root path not found: {root_path}')
        return summary
    date_folders = [f for f in os.listdir(root_path) if os.path.isdir(os.path.join(root_path, f)) and f.lower() != 'completed']
    summary['total_dates'] = len(date_folders)
    log_callback(f'Found {len(date_folders)} date folders.')
```
**Business Impact**: Initializes comprehensive processing with detailed summary tracking. The function handles missing directories gracefully and provides detailed logging for troubleshooting and progress monitoring.

```python
# Lines 68-84: Image categorization and processing
for machine in machines:
    mach_path = os.path.join(cust_path, machine)
    # Recursively find all images in machine folder and subfolders
    image_files = []
    for ext in ('*.jpg', '*.jpeg', '*.png', '*.bmp', '*.tiff'):
        image_files.extend(glob.glob(os.path.join(mach_path, '**', ext), recursive=True))
    # Compute relative paths from root for all images
    rel_image_files = [os.path.relpath(img, root_path) for img in image_files]
    # Categorize images
    nameplates = [img for img in rel_image_files if 'plate' in os.path.basename(img).lower()]
    tags = [img for img in rel_image_files if 'tag' in os.path.basename(img).lower()]
```
**Business Impact**: Implements intelligent image categorization using filename patterns. The recursive search ensures all images are found regardless of folder structure, while relative path computation maintains proper file organization.

```python
# Lines 109-129: AI-powered data extraction
if nameplates and gpt_extract_func:
    try:
        np_result = gpt_extract_func('nameplate', os.path.join(root_path, nameplates[0]))
        log_callback(f'      Nameplate extraction: {np_result}')
        extracted.update({'nameplate': np_result, 'nameplate_image': nameplates[0]})
    except Exception as e:
        log_callback(f'      Error extracting nameplate: {e}')

# Extract data from tags
tag_results = []
for tag_img in tags:
    if gpt_extract_func:
        try:
            tag_result = gpt_extract_func('tag', os.path.join(root_path, tag_img))
            tag_base = os.path.basename(tag_img)
            log_callback(f'      Tag extraction ({tag_base}): {tag_result}')
            tag_results.append({'image_name': tag_img, 'image_base': tag_base, **tag_result})
        except Exception as e:
            log_callback(f'      Error extracting tag {os.path.basename(tag_img)}: {e}')
```
**Business Impact**: Coordinates AI-powered data extraction from both nameplates and tags. Error handling ensures processing continues even if individual extractions fail, while detailed logging provides visibility into extraction results.

### 3. gpt_vision.py - AI Vision Integration

**Purpose**: Integrates OpenAI GPT-4 Vision API for intelligent data extraction from equipment images

**Key Technical Features**:
- **Specialized Prompts**: Tailored prompts for nameplate and tag extraction
- **Image Encoding**: Base64 encoding for API transmission
- **JSON Parsing**: Robust JSON response parsing and validation
- **Error Handling**: Comprehensive error handling and fallback mechanisms
- **Temperature Control**: Zero temperature for consistent, deterministic results

**Line-by-Line Analysis**:

```python
# Lines 8-24: Nameplate extraction prompt
NAMEPLATE_PROMPT = '''
You are an OCR and equipment data extraction model. The image you are given is a machine nameplate.

From this nameplate, extract only the following fields (if they are present):
- Type or Model (label may be: "Type", "Model", or similar)
- Year of Manufacture (label may be: "Year", "Built", "MFG", "Year of construction", etc.)
- Weight (look for number + KG or similar)

Return a JSON like this:
{
  "type_or_model": "<type or model string>",
  "year_manufactured": "<year in xxxx format>",
  "weight_kg": "<weight in number>"
}

Only return the fields. If something is not found, set it to null. Do not make up values. Be strict and accurate.
'''
```
**Business Impact**: Provides precise instructions to the AI model for consistent data extraction. The prompt emphasizes accuracy and prevents hallucination by explicitly instructing the model not to make up values.

```python
# Lines 26-41: Tag extraction prompt
TAG_PROMPT = '''
You are an OCR extraction engine reading motor specification tags. Your job is to extract only these three fields from the image:

- Motor Type --> The full model or series code
- Motor Serial Number --> The unique long numerical identifier with/without "."
- Motor Power --> The primary rated power in kilowatts (ex:kW 7.5 s1) (return the number)

Return your output strictly in the following JSON format:
{
  "motor_type": "...",
  "motor_serial": "...",
  "motor_power": "..."
}

If a field is not clearly present in the image, return it as null. Be exact and avoid guessing or making up values.
'''
```
**Business Impact**: Specialized prompt for motor tag extraction with specific field requirements. The prompt ensures consistent JSON output format and emphasizes accuracy over completeness.

```python
# Lines 47-78: Main extraction function
def gpt_extract(img_type, img_path):
    prompt = NAMEPLATE_PROMPT if img_type == 'nameplate' else TAG_PROMPT
    try:
        encoded_image = encode_image(img_path)
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{encoded_image}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=500,
            temperature=0.0
        )
        content = response.choices[0].message.content
        json_start = content.find('{')
        json_end = content.rfind('}') + 1
        if json_start == -1 or json_end == -1:
            return None
        result = json.loads(content[json_start:json_end])
        return result
    except Exception as e:
        print(f'OpenAI Vision extraction error: {e}')
        return None
```
**Business Impact**: Implements robust AI extraction with proper error handling and JSON parsing. The zero temperature ensures consistent results, while the JSON extraction logic handles cases where the AI response includes additional text.

### 4. db_utils.py - Database Operations

**Purpose**: Manages all database operations including data insertion, updates, and retrieval

**Key Technical Features**:
- **SQL Server Integration**: Comprehensive database connectivity
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Data Validation**: SQL-compatible data type handling
- **Transaction Management**: Proper commit and rollback handling
- **Error Handling**: Robust error handling for database operations

**Line-by-Line Analysis**:

```python
# Lines 22-41: Data insertion with validation
def insert_temp_spec(data):
    conn = config.get_db_connection()
    cursor = conn.cursor()
    # Ensure data values are SQL-compatible types
    processed_data = {}
    for key, value in data.items():
        if isinstance(value, (int, float, str)) or value is None:
            processed_data[key] = value
        else:
            # Convert any other types to string
            processed_data[key] = str(value)
    
    columns = ','.join(processed_data.keys())
    placeholders = ','.join(['?'] * len(processed_data))
    sql = f'INSERT INTO TemporaryNewSpecTable ({columns}) VALUES ({placeholders})'
    print(f"[DB INSERT] SQL: {sql}")
    print(f"[DB INSERT] Values: {tuple(processed_data.values())}")
    cursor.execute(sql, tuple(processed_data.values()))
    conn.commit()
    conn.close()
```
**Business Impact**: Implements safe data insertion with automatic type conversion and SQL injection prevention. Debug logging provides visibility into database operations for troubleshooting.

```python
# Lines 68-97: Data migration from temporary to permanent table
def move_temp_to_equipmentdb(serial_number):
    conn = config.get_db_connection()
    cursor = conn.cursor()
    # Fetch row from TemporaryNewSpecTable
    cursor.execute('SELECT * FROM TemporaryNewSpecTable WHERE SerialNumber = ?', (serial_number,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return False
    columns = [column[0] for column in cursor.description]
    # Get EquipmentDB columns
    cursor.execute('SELECT TOP 1 * FROM EquipmentDB')
    eq_columns = [column[0] for column in cursor.description]
    # Exclude these columns from update
    exclude = {'SerialNumber', 'CustomerName', 'EquipmentType'}
    update_cols = [col for col in columns if col in eq_columns and col not in exclude]
    if not update_cols:
        conn.close()
        return False
    set_clause = ', '.join([f'{col} = ?' for col in update_cols])
    update_vals = [row[columns.index(col)] for col in update_cols]
    # Add SerialNumber for WHERE clause
    update_vals.append(serial_number)
    sql = f'UPDATE EquipmentDB SET {set_clause} WHERE SerialNumber = ?'
    cursor.execute(sql, update_vals)
    # Delete from TemporaryNewSpecTable
    cursor.execute('DELETE FROM TemporaryNewSpecTable WHERE SerialNumber = ?', (serial_number,))
    conn.commit()
    conn.close()
    return True
```
**Business Impact**: Implements a two-phase commit process for data validation workflow. Data is first stored in a temporary table for review, then moved to the permanent table after verification, ensuring data integrity.

## 🔄 Workflow and Process Flow

### 1. Data Processing Workflow
```
Folder Traversal → Image Discovery → AI Extraction → Database Storage → File Organization → Progress Updates
```

### 2. Data Validation Workflow
```
Data Retrieval → Interactive Review → Image Preview → Data Correction → Verification → Permanent Storage
```

### 3. AI Extraction Workflow
```
Image Analysis → Prompt Selection → API Call → JSON Parsing → Data Validation → Error Handling
```

### 4. Database Operations Flow
```
Connection → Query Execution → Data Processing → Transaction Commit → Connection Cleanup
```

## 💼 Business Applications

### 1. Equipment Management
- **Specification Extraction**: Automated extraction of equipment specifications from images
- **Data Standardization**: Consistent data format across all equipment records
- **Quality Assurance**: Human validation of AI-extracted data
- **Inventory Management**: Comprehensive equipment database maintenance

### 2. After-Sales Service
- **Service Documentation**: Automated documentation of equipment specifications
- **Parts Identification**: Accurate identification of equipment models and parts
- **Service History**: Complete equipment service history tracking
- **Warranty Management**: Equipment warranty and service tracking

### 3. Data Management
- **Digital Transformation**: Converting paper-based records to digital format
- **Data Validation**: Ensuring accuracy of equipment specifications
- **Process Automation**: Reducing manual data entry and human error
- **Compliance**: Meeting regulatory requirements for equipment documentation

## 🚀 Performance and Features

### Processing Capabilities
- **Batch Processing**: Handle multiple equipment records simultaneously
- **Progress Tracking**: Real-time progress updates and logging
- **Error Recovery**: Robust error handling and recovery mechanisms
- **Image Management**: Advanced image viewing and manipulation controls

### AI Integration Features
- **High Accuracy**: GPT-4 Vision API for superior image analysis
- **Specialized Prompts**: Tailored prompts for different image types
- **Consistent Output**: Zero temperature for deterministic results
- **Error Handling**: Graceful handling of API failures

### User Interface Features
- **Modern Design**: Professional dark theme with Bootstrap styling
- **Intuitive Navigation**: Tabbed interface for different workflows
- **Advanced Image Controls**: Zoom, rotation, and pan capabilities
- **Data Validation**: Interactive editing and verification system

## 🔧 Configuration and Customization

### Application Settings
- **Source Path**: Configurable root folder for processing
- **Database Connection**: SQL Server connection parameters
- **API Configuration**: OpenAI API key and settings
- **Image Formats**: Supported image file formats

### Processing Parameters
- **Batch Size**: Configurable batch processing parameters
- **Progress Intervals**: Adjustable progress update frequencies
- **Error Handling**: Configurable error handling behavior
- **Logging Levels**: Adjustable logging verbosity

## 📊 Output and Reporting

### Data Export
- **Excel Export**: Export processed data to Excel format
- **Database Integration**: Direct integration with SQL Server
- **Image Mapping**: Comprehensive image-to-data mapping
- **Audit Trails**: Complete processing audit trails

### Progress Monitoring
- **Real-time Updates**: Live progress tracking during processing
- **Detailed Logging**: Comprehensive operation logging
- **Error Reporting**: Detailed error analysis and reporting
- **Performance Metrics**: Processing time and success rate tracking

## 🔒 Security and Compliance

### Data Protection
- **Secure API**: Encrypted communication with OpenAI API
- **Database Security**: Secure SQL Server connections
- **Image Privacy**: Local processing with optional cloud API
- **Access Control**: User authentication and authorization

### Compliance Features
- **Audit Trails**: Complete processing audit trails
- **Data Validation**: Human validation of AI-extracted data
- **Error Logging**: Comprehensive error logging for compliance
- **Version Control**: Data versioning and change tracking

## 🎯 Future Enhancements

### Planned Features
- **Web Interface**: Browser-based interface for remote access
- **Mobile Support**: Mobile application for field use
- **Advanced AI**: Integration with additional AI models
- **Cloud Integration**: Cloud-based processing capabilities

### Performance Improvements
- **Parallel Processing**: Multi-threaded processing capabilities
- **Caching**: Intelligent caching for improved performance
- **Optimization**: Performance optimization and tuning
- **Scalability**: Enhanced scalability for large datasets

---

**Documentation Version**: 1.0  
**Last Updated**: January 2025  
**Status**: Production Ready  
**Maintainer**: Equipment Data Management Team

