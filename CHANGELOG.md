# Changelog

## UI/UX Revamp: Smart Transparency and Glassmorphism

- Added Redux store and theme slice with localStorage persistence
  - `frontend/src/store/index.js`
  - `frontend/src/store/themeSlice.js`
- Integrated dark mode toggle with icons
  - `frontend/src/components/ThemeToggle.jsx`
  - Wired into `frontend/src/components/Navbar.jsx`
- Hardened routing and dark-mode handling
  - `frontend/src/App.jsx` now manages dark class and uses `ProtectedRoute`; added `/gpa` alias
  - Removed nested Router; `BrowserRouter` remains in `frontend/src/main.jsx`
- Installed UI dependencies (no backend changes)
  - `lucide-react`, `framer-motion`, `react-hook-form`, `zod`, `@hookform/resolvers`, `@reduxjs/toolkit`, `react-redux`
- Converted auth forms to React Hook Form + Zod
  - `frontend/src/pages/Login.jsx`
  - `frontend/src/pages/signup.jsx`
- Implemented glassmorphism and responsive components
  - `frontend/src/components/GlassCard.jsx` (reusable)
  - `frontend/src/components/MobileTabBar.jsx` (mobile bottom nav)
  - Updated global styles and gradient: `frontend/src/index.css`
- Restyled key pages using GlassCard (no logic changes)
  - Dashboard layout to match mock: GPA hero, stats, insights, next steps
    - `frontend/src/pages/Dashboard.jsx`
  - GPA status, Add Marks, and Payment containers
    - `frontend/src/pages/GPAStatus.jsx`
    - `frontend/src/pages/AddMarks.jsx`
    - `frontend/src/pages/Payment.jsx`
- Kept all API endpoints, services, and data flows unchanged

## Notes
- Functionality unchanged; improvements are presentational and routing guards only.
- If dev server shows a blank screen, ensure only one `BrowserRouter` exists (fixed in `App.jsx`).
