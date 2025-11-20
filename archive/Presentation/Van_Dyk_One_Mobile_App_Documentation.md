# Van Dyk One Mobile App Documentation

## Overview
- Purpose: field-service companion app for Van Dyk technicians covering tickets, machines, sites, expenses, and time tracking.
- Platforms: React Native 0.80 (iOS, Android), React Native Web (desktop/web).
- Codebase location: `G:\Interns\Ajith Srikanth\App`.
- Status: UX prototype with complete UI scaffolding, mock data, and database service skeleton for SQL Server + offline SQLite.

## Technology Stack
- Core: React Native, React Navigation (stack + bottom tabs), TypeScript.
- Styling: React Native StyleSheet with shared `Colors` and `Typography` constants.
- Icons: `lucide-react-native`.
- Data layer: `react-native-sqlite-storage` for local persistence, `mssql` for cloud sync (planned).
- Tooling: Metro bundler, Webpack config for web builds, Babel + TypeScript compiler.

## Project Layout
```
App/
├── App.tsx                        # Navigation container and tab/stack setup
├── App.json / app.json            # App metadata (currently TempProject)
├── android/, ios/                 # Native platform projects
├── index.js / index.web.js        # Entry points for native and web targets
├── metro.config.js, webpack.config.js, tsconfig.json
└── src/
    ├── app/
    │   ├── (tabs)/                # Bottom-tab screens (home, tickets, machines, site, expenses)
    │   └── tickets/               # Stack screens: time punch entry + history
    ├── components/                # Shared UI components
    ├── constants/                 # Color palette, typography, mock data
    ├── services/                  # Database gateway (SQLite + SQL Server)
    ├── types/                     # Navigation and domain types
    └── utils/                     # Helper functions
```

## Application Entry (`App.tsx`)
### Purpose
Configures the entire navigation system: a bottom tab navigator wrapped inside a stack navigator so that time-punch screens can be pushed modally over the tab layout.

### Key Elements
- `SafeAreaProvider` + `NavigationContainer` provide global UI context.
- Bottom tabs (`TabNavigator`) expose Home, Tickets, Machines, Sites, Expenses.
- Stack routes:
  - `'(tabs)'`: root tab navigator.
  - `'tickets/time-punch'`: time entry form.
  - `'tickets/time-punch-history'`: historical log view.
- Shared status bar style (`dark-content` on white background).

### Navigation Flow
1. User lands on the tab view.
2. Tickets tab triggers navigation to `tickets/time-punch` or `tickets/time-punch-history` via stack pushes.
3. Each stack screen can opt-in to headers; time punch screens enable centered titles.

## Tab Screens
### Home (`src/app/(tabs)/index.tsx`)
- Dashboard card with welcome message and quick stats (hard-coded placeholders).
- Uses `Header` component for title/subtitle and `Card` for metric tiles.
- Displays mock data (Active Tickets, Hours Today, Pending Issues, Uptime).
- Layout built with `ScrollView` so future widgets can be added without overflow.

### Tickets (`src/app/(tabs)/tickets.tsx`)
- Filterable list of service tickets.
- Features:
  - Filter chips for status (All/Open/In Progress) using stateful toggle.
  - Search input placeholder (state captured via `searchQuery`).
  - `ExpandableSection` to group open tickets (default expanded).
  - Ticket cards show status badge, priority badge, assigned tech, and created date.
  - Empty state card with a CTA button.
- Depends on `mockData.tickets` for sample content.

### Machines (`src/app/(tabs)/machines.tsx`)
- Split layout: searchable list on the left (list items) and detail pane on the right.
- Allows filtering by machine name or location.
- Detail card shows status badges (operational/maintenance/offline) and key metadata (type, location, last and next maintenance).

### Sites (`src/app/(tabs)/site.tsx`)
- Dropdown to switch between sites (populated from `mockData.sites`).
- When a site is selected:
  - Summary card with address, contact, status.
  - Quick action buttons (upload reports, capture photos, fill checklists, log deliveries).
  - Site report timeline with status and technician details.
- Provides placeholder `Button` handlers for future API integration.

### Expenses (`src/app/(tabs)/expenses.tsx`)
- Expense summary banner with running totals.
- Action buttons for "Capture Receipt", "Upload Image", "Manual Entry".
- `ListItem` cards show each expense (category chip, amount, approval state).
- `ExpandableSection` reveals analytics (spend by category) using inline charts placeholders.
- "Recent Receipts" grid demonstrates how receipt photos will be listed.

## Ticket Stack Screens
### Time Punch (`src/app/tickets/time-punch.tsx`)
- Form to capture customer, task type, travel/labor times, and notes.
- Provides "Clock 9–5" shortcut to auto-fill default shift hours.
- Calculates travel and labor durations in real time.
- Actions: "Add Another Ticket" (outline button) and "Submit" (primary button).
- Uses shared components: `Dropdown`, `FormInput`, `Card`, `Button`.

### Time Punch History (`src/app/tickets/time-punch-history.tsx`)
- Filter drawer toggled via Filter button (chips by date and task type).
- Each card shows date, customer, task type, travel and labor segments, total duration, and notes.
- Duration calculations reuse helper functions inside the component.

## Shared Components (`src/components`)
- `Button.tsx`: Primary/secondary/outline variants with disabled state and optional icons.
- `Card.tsx`: Base container with shadow and rounded corners.
- `DateTimePicker.tsx`: Wrapper around `DateTimePickerAndroid`/`DateTimePickerIOS` with platform checks.
- `Dropdown.tsx`: Custom picker built on `Modal` and RN `FlatList`, used for customer/task selection.
- `ExpandableSection.tsx`: Collapsible container with animated chevron and optional item count.
- `FormInput.tsx`: Labeled text input with error state support.
- `Header.tsx`: Page header with optional subtitle and Van Dyk branding flag.
- `ListItem.tsx`: Generic row used in expenses and machine list views.

## Constants (`src/constants`)
- `colors.ts`: Brand palette (primary orange `#FF6B35`, teal accent, semantic colors, text colors).
- `typography.ts`: Consistent text sizes/weights exported as `Typography.styles`.
- `mockData.ts`: Seed data for customers, task types, sites, machines, tickets, expenses, time punches, and site reports.

## Services (`src/services/database.ts`)
- `DatabaseService` manages dual persistence:
  - Local: `react-native-sqlite-storage` with rich schema (customers, sites, tickets, machines, expenses, time punches, employees).
  - Cloud: `mssql` connection configuration via environment variables (server defaults provided).
- Includes helper methods `getCustomers`, `addCustomer`, `getSites`, `addSite`, `getTickets`, etc., with fallback to SQLite if SQL Server is unavailable.
- Skeleton methods for syncing data once API endpoints are ready.

## Types and Utilities
- `types/index.ts`: Defines `RootStackParamList`, `TabParamList`, and entity interfaces so React Navigation and components stay strongly typed.
- `utils/helpers.ts`: General helper functions (date formatting, status color helpers, etc.).

## Supporting Files
- `package.json`: React Native + web dependencies, scripts (`android`, `ios`, `start`, `lint`, `webpack` build chain).
- `babel.config.js`, `tsconfig.json`: Transpiler and TypeScript configuration.
- `metro.config.js`, `webpack.config.js`: Platform-specific bundler overrides.
- `check-env.ps1`: PowerShell script to validate environment variables before running the app.
- `public/`: Static assets for the web build (favicon, manifest).
- `node_modules/`: Installed dependencies (do not commit).
- `TempProject/`: Template scaffolding (?); ensure not used in production builds.

## Build & Run
1. Install dependencies: `npm install` or `yarn install`.
2. Start Metro bundler: `npm start` (or use `expo start` if migrating).
3. Launch platforms:
   - Android: `npm run android` (requires Android Studio/SDK and connected device or emulator).
   - iOS: `npm run ios` (requires Xcode and macOS).
   - Web: `npm run web` (Webpack dev server).
4. Lint: `npm run lint` to enforce coding standards.

## Data & State Flow (Planned)
- UI reads from `DatabaseService` abstraction.
- On app launch: attempt SQL Server connection; if it fails, fall back to local SQLite data.
- Sync routines (to be implemented) will push/pull data between SQLite and cloud.
- Mock data currently drives UI; replace with service calls once backend endpoints exist.

## Security & Configuration Notes
- SQL credentials are expected through environment variables; never hard-code secrets in committed files.
- Secure storage for JWT tokens and offline credentials still needs implementation.
- When wiring real APIs, validate all network requests and handle auth tokens in a dedicated service.

## Testing & Quality
- Add unit tests for components (Jest + React Native Testing Library) focusing on stateful screens like tickets and time punch.
- Integration tests should cover navigation flows and service fallbacks.
- Manual QA: verify consistent behaviour across iOS, Android, and Web, especially layout breakpoints and icon support.

## Roadmap & Known Gaps
- Replace mock data with live API calls via the service layer.
- Implement photo capture (camera and gallery) for expenses.
- Add authentication and role-based access control.
- Introduce offline-first sync, conflict resolution, and background refresh.
- Improve accessibility (screen reader labels, focus management).
- Harden error handling and form validation before production rollout.

Updated: November 2025  
Maintainer: Van Dyk Tools Mobile Team

