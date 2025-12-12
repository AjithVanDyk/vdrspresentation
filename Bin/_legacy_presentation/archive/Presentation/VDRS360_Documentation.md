# VDRS360 Equipment Manager Documentation

## Overview
- Location: `G:\Interns\Ajith Srikanth\VDRS360 - Final V1`
- Purpose: Streamlit application consolidating equipment data management, search, and network visualisation for Van Dyk assets.
- Modules included: `equipment_manager.py`, `search_equipment.py`, `network_visualization.py`, `shared_config.py`, `db_utils.py` (within the folder).

## Application Structure
| Module | Responsibility |
| --- | --- |
| `app.py` | Streamlit entry point; defines sidebar navigation (Equipment Manager / Search / Network Visualization), user login prompt, database connection tests, layout adjustments. |
| `shared_config.py` | Central configuration (SQL connections, caching, session initialisation, environment detection). |
| `equipment_manager.py` | Spreadsheet-like interface to view/edit equipment records (editable dataframes, audit logs, export options). |
| `search_equipment.py` | Advanced search with filters (equipment type, manufacturer, status) returning detailed tables and quick metrics. |
| `network_visualization.py` | Builds vis.js/pyvis network graphs connecting customers → projects → equipment; includes download/export. |
| `equipment_manager.py` dependencies | `db_utils`, `data_access` modules to read/write SQL Server tables and manage audit trails. |

## Features
- **Sidebar Navigation**: login field (username captured for audit), database connection tester, session reset.
- **Equipment Manager**:
  - Loads equipment table via SQL Server (PowerApps/TestDB) with caching.
  - Editable grid (Streamlit AgGrid or st.data_editor) with validation, change tracking, and commit buttons.
  - Metrics bar summarising counts by status/phase.
  - Export to Excel/CSV.
- **Search Equipment**:
  - Text + multi-select filters; dynamic query builder hitting SQL views.
  - Result table with column toggles, download buttons, and detail expanders.
  - Quick metrics (counts by manufacturer, phase, active status).
- **Network Visualization**:
  - Builds interactive network with pyvis, displayed via Streamlit component.
  - Supports toggles for nodes/edges, filtering by project or equipment type, export of HTML.
- **Logging**: `setup_logging()` writes to `logs/app.log`; module-specific logging for errors.
- **Session State**: `initialize_session_state()` ensures consistent defaults and caching between tabs.

## Configuration
- Database connection strings stored in `shared_config.Config` (PowerApps, TestDB). Update credentials before deployment.
- `equipment_manager.py` expects certain table/view names (helper `find_equipment_table_name()` to auto-detect). Adjust if schema changes.
- For pyvis network export ensure `network_visualization.py` has write access to output directory (typically `exports/`).

## Running Locally
```bash
pip install -r requirements.txt
cd "VDRS360 - Final V1"
streamlit run app.py
```
Provide SQL credentials via environment variables or config file referenced by `shared_config`.

## Known Considerations
- Streamlit app assumes Windows emoji fonts for icons; adjust if deploying on Linux.
- Network visualisation may require enabling pyvis component (Streamlit allows HTML embedding).
- Large datasets: consider server-side pagination or limiting default result set to avoid heavy loads.
- Authentication: currently simple name entry—add SSO/auth middleware for production.

## Future Enhancements
- Persist user changes via stored procedures with audit trail (currently direct UPDATEs).
- Integrate with Van Dyk Tools config management for consistent feature toggles.
- Provide scheduled exports and email notifications using the search module queries.

Updated: November 2025  
Maintainer: Van Dyk Data Solutions

