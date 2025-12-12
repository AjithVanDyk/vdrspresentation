# CDMS (Container Document Management System) Documentation

## Overview
- Purpose: manage container shipping documents for VDRS, including submission, search, download, and status tracking for suppliers and internal staff.
- Location: `G:\Interns\Ajith Srikanth\CDMS` (multiple snapshots and the current build under `Final/`).
- Architecture: React front-end (Azure Static Web Apps) + Node.js/Express API + SQL Server + Azure Blob Storage.
- Authentication: OTP-based login with JWT sessions; role-aware endpoints for VDRS vs suppliers.

## Repository Structure
| Path | Description |
| --- | --- |
| `Final/Backedn/` | Active Node.js backend (Express API, authentication, storage integration). |
| `Final/vdrs-react-node-main*` | Front-end React app (multiple iterations; `* - Copy` indicates design variants). |
| `CDMSV1/`, `Final/vdrs-react-node-main (n)/` | Historical snapshots (retain for reference/migration). |
| `.yml` files (`deploy-*.yml`, `azure-static-web-apps*.yml`) | Azure deployment pipelines for frontend/backend. |
| `database/` (older export) | SQL view definitions used for reporting. |

## Backend (Final/Backedn)
### Key Dependencies
- Express 4, CORS, `mssql`, `@azure/storage-blob`, `multer`, `zod`, `archiver`, `nodemailer`, `jsonwebtoken`, `bcryptjs`.

### Environment Variables
```
DB_SERVER, DB_NAME, DB_USER, DB_PASSWORD
JWT_SECRET, JWT_EXPIRES_IN
AZURE_STORAGE_CONNECTION_STRING / SAS URL / Account & Key
AZURE_STORAGE_CONTAINER_NAME (defaults to contractsshippingfiles)
EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM
FRONTEND_ORIGIN, PORT, MAX_CONCURRENT_USERS, LOG_LEVEL
```
> Missing critical variables trigger warnings at startup; Azure storage initialization is non-blocking but disables upload routes when misconfigured.

### Express Middleware & Utilities
- Global CORS and JSON parsers with 50 MB limit.
- Request ID injection + verbose logging (`logger.js` pipes to file and console).
- Concurrent user tracker with cleanup interval (enforces `MAX_CONCURRENT_USERS`).
- `uploadConfig.js`: in-memory uploads (100 MB / 10 files) with file type checks and cleanup helpers.
- `mailer.js`: SMTP transport (Office 365 defaults) with extensive logging.
- `auth.js`: legacy password login helper (unused) + OTP/JWT middleware (`enhancedAuthenticateToken`).

### Core Routes (server.js)
| Endpoint | Type | Description |
| --- | --- | --- |
| `/api/test`, `/api/health`, `/health`, `/api/test-routes` | GET | Basic diagnostics and route discovery. |
| `/api/auth/dev-login` | POST | Dev-only entry point to bypass OTP (disabled in prod). |
| `/api/auth/request-otp` | POST | Generates 6-digit OTP, dispatches via `sendOtp`. |
| `/api/auth/verify-otp` | POST | Validates OTP, issues JWT with user metadata. |
| `/api/auth/logout` | POST | Clears active user session (audit log entry). |
| `/suggestions`, `/test-suggestions` | GET | Search suggestions (SQL query + heuristics; auth-protected). |
| `/api/search/:searchTerm` | GET | Keyword search across containers and documents. |
| `/api/container/:containerNumber` | GET | Fetch container summary (documents, statuses). |
| `/api/documents/:containerNumber` | GET | Detailed document listings. |
| `/api/download-file` | GET | Streams single blob from Azure (inline vs attachment detection by MIME). |
| `/api/download-zip` | POST | Bundles selected blob URLs into on-the-fly ZIP (uses `archiver`). |
| `/api/container/create` | POST | Inserts new container metadata into SQL. |
| `/api/upload` | POST | Multi-file upload to Azure + SQL metadata write (expects `files[]`, category, titles, notes). |
| `/api/update-container-file` | PUT | Updates metadata (category, title, description). |

Most data endpoints rely on `getDbPool()` (lazy `mssql` connection) and parameterized queries; errors feed into `logger` with request metadata.

### Azure Storage Integration
- Supports authentication via connection string, account + key, or SAS URL.
- Validates container existence on startup (`containerClient.getProperties()`).
- Upload pipeline sets content disposition (inline for browser-friendly types) and content type from upload metadata.
- Download endpoints accept sanitized filenames via `sanitizeFilename()`.

### Security & Resilience
- JWT required on all data routes (`enhancedAuthenticateToken`).
- Zod schemas validate payloads (zip downloads, file metadata updates).
- OTP emails expire after 5 minutes; rate limiting handled via user tracker.
- Structured error responses with correlation IDs aid troubleshooting.

## Front-End (React)
> Located in `Final/vdrs-react-node-main/` (TS-based) and archived versions. The deployed build targets Azure Static Web Apps.

### Highlights
- React 18 + React Router + Material UI.
- Authentication flow mirrors backend OTP (request, verify, store token in `localStorage`).
- Upload module (Tab 1) supports drag-and-drop, category assignment, and metadata capture before calling `/api/upload`.
- Project explorer (Tab 2) lists VDRS references, container hierarchy, and allows quick filters/search; "prefill" actions push existing container info back to the upload form.
- File viewer uses signed URLs from backend for inline preview/download.
- Global services wrap API calls with JWT headers and centralized error handling.

### Build & Deployment
```
# backend
cd Final/Backedn
cp config.env.example .env   # populate values
npm install
npm run dev     # or `npm start` for production

# frontend (example path)
cd Final/vdrs-react-node-main
npm install
npm run build   # Azure static web deploy
```
Azure DevOps YAML files (`deploy-frontend.yml`, `deploy-backend.yml`) codify CI/CD; adjust environment variables in pipelines prior to release.

## Data Flow
1. User requests OTP → backend emails code via SMTP.
2. OTP verification issues JWT → stored client-side, attached to subsequent requests.
3. Search endpoints execute parameterized SQL queries (equipment, containers, documents) and enhance results with Azure blob metadata where applicable.
4. Uploading documents writes metadata to SQL (`ContractsShippingContainerFiles`, related tables) and pushes binaries to Azure Blob Storage.
5. Download routes fetch blob streams directly and optionally package them for bulk retrieval.

## Operations & Monitoring
- Health endpoints integrate with Azure App Service and external monitors.
- Logger writes to rotating log files (inspect `logs/` directory) capturing request IDs, IP, user agent.
- `MAX_CONCURRENT_USERS` prevents session overload; stale entries removed every 5 minutes.
- Missing Azure configuration logs warnings but keeps API online for metadata operations.

## Known Limitations & Next Steps
- Dev utilities (`/api/auth/dev-login`, verbose OTP logging) should be disabled in production.
- Secrets currently read from `.env`; migrate to Azure Key Vault or App Service configuration.
- Upload service uses in-memory buffers; consider disk storage or streaming for very large files.
- Add automated integration tests (Jest + Supertest) and front-end e2e coverage.
- Enhance rate limiting (e.g., Redis-backed) and audit logs for compliance.
- Consider caching frequently accessed lookups (Redis) to reduce SQL load under heavy use.

Updated: November 2025  
Maintainer: VDRS Platform Engineering

