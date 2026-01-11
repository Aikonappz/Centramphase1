# Development Document

## 1. Project Overview
This project is a large-scale enterprise React web application bootstrapped with Create React App. It uses TypeScript, React Router for routing, Redux Toolkit for state management, and includes authentication context for user sessions. The app is modularized into many feature modules covering dashboards, user management, recruitment, projects, finance, CRM, content management, and more.

## 2. Setup and Running Instructions
- Install dependencies: `npm install`
- Run the app in development mode: `npm run start`
- Run tests: `npm test`
- Build for production: `npm run build`
- Eject configuration (one-way operation): `npm run eject`

The app runs on [http://localhost:3000](http://localhost:3000) by default.

## 3. Architecture and Folder Structure Overview
- `src/`: Main source folder
  - `feature-module/`: Contains feature-specific modules and pages
  - `core/`: Core utilities, common components, Redux store, reducers, and API calls
  - `context/`: React context providers (e.g., AuthContext)
  - `utils/`: Utility functions
  - `style/`: CSS, SCSS, and icon styles
  - `types/`: TypeScript type declarations
- `public/`: Static assets and HTML template

## 4. Routing and Feature Modules Overview
- Routing is handled by React Router in `src/feature-module/router/router.tsx`.
- Routes are divided into:
  - `publicRoutes`: Accessible without authentication, wrapped by `Feature` component.
  - `authRoutes`: Require authentication, wrapped by `AuthFeature` component.
- Routes are defined in `src/feature-module/router/router.link.tsx` and cover a wide range of modules such as dashboards, user management, recruitment, projects, finance, CRM, content, UI components, and settings.

## 5. State Management
- Uses Redux Toolkit for state management.
- Store configuration is in `src/core/data/redux/store.tsx`.
- State persistence is implemented using `redux-persist` with localStorage, persisting the `user` slice.
- Typed hooks for dispatch and state selectors are provided.

## 6. Authentication Context and Mechanism
- Authentication is managed via React Context in `src/context/AuthContext.tsx`.
- Checks for a token in localStorage to determine authentication status.
- Provides `isAuthenticated` and `isLoading` states and a `checkAuth` function.
- Optionally supports server-side token verification (commented out).
- Integrates with Redux to dispatch logout actions on invalid tokens.

## 7. Styling and UI Libraries Used
- Bootstrap 5 for layout and components.
- Multiple icon libraries including Boxicons, Feather Icons, FontAwesome, Ionicons, Tabler Icons, Typicons, Weather Icons, and more.
- Custom SCSS and CSS styles in `src/style/`.
- Various UI components and advanced UI features are modularized under `src/feature-module/uiInterface/`.

## 8. Additional Notes and Best Practices
- The project uses TypeScript for type safety.
- Redux Toolkit simplifies Redux usage with slices and middleware.
- Routing is cleanly separated between public and authenticated routes.
- Authentication context provides a centralized way to manage user sessions.
- The project structure supports scalability with feature-based modules.
- Follow existing coding conventions and folder organization when adding new features.

---

This document provides a high-level overview to help developers understand, set up, and contribute to the project effectively.
