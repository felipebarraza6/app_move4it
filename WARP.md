# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- React 18 app bootstrapped with Create React App (CRA) and Yarn
- UI built with Ant Design, charts with chart.js/react-chartjs-2
- Client-side routing via react-router-dom (createBrowserRouter)
- Global app state via React Context + useReducer
- API access via Axios with a small wrapper and consolidated endpoint helpers
- Tests use Jest + @testing-library/react; CRA provides test runner
- Production build served by NGINX in Docker (SPA fallback configured)

Commands
- Install dependencies
  ```bash path=null start=null
  yarn install
  ```
- Run the development server
  ```bash path=null start=null
  yarn start
  ```
- Build for production
  ```bash path=null start=null
  yarn build
  ```
- Run all tests (watch mode)
  ```bash path=null start=null
  yarn test
  ```
- Run tests once (CI mode / no watch)
  ```bash path=null start=null
  CI=true yarn test
  # or
  yarn test --watchAll=false
  ```
- Run a single test file
  ```bash path=null start=null
  yarn test -- src/tests/App.test.js
  ```
- Run tests by name/pattern
  ```bash path=null start=null
  yarn test -t "learn react"
  ```
- Linting
  - No explicit lint script is defined; CRA surfaces ESLint warnings/errors during development and build.
- Optional: Build and run the production Docker image
  ```bash path=null start=null
  docker build -t app_move4it .
  docker run -p 8080:80 app_move4it
  ```

High-level architecture
- Entry points
  - src/index.js mounts <App /> and wires CRA’s web vitals reporter (src/pwa/reportWebVitals.js)
  - src/App.js sets up AppContext and a useReducer(authReducer) store for global auth/state. On load and when state.update changes, updateApp(dispatch) refreshes the user profile if a token exists in localStorage.
- Routing
  - createBrowserRouter config in src/App.js defines the “/” root and nested routes such as /profile_user, /blog, /profile_competition, /team, /enterprise, /challenges, /achievements, /global_viewer.
  - Containers under src/containers (e.g., Home, Login, Dashboard, Blog, Team, Enterprise, etc.) act as page-level views. Components under src/components/webapp provide the building blocks (Dashboard, Blog, ProfileUser, Teams, etc.).
- State management
  - src/reducers/auth.js implements actions like LOGIN, UPDATE, LOGOUT and updates localStorage accordingly. Some actions also update nested user data (e.g., UPDATE_ACTIVITIES) used by dashboard views.
  - AppContext (exported from src/App.js) provides { state, dispatch } to components; e.g., MenuNav uses dispatch to LOGOUT and navigate.
- API layer
  - src/config/api.js wraps Axios with a BASE_URL (https://api.move4it.cl/api). It reads a token from localStorage and attaches Authorization: Token <token> for authenticated calls. Helpers include POST_LOGIN, GET, POST, PATCH, and a DOWNLOAD helper that triggers a browser file download and Ant Design notification.
  - src/config/endpoints.js consolidates feature-specific calls (auth profile/update/reset_password, blog list with filters, register-activities CRUD, competence list/retrieve) and is consumed by screens/components.
- Testing
  - Tests live under src/tests. Jest is configured by CRA; src/tests/setupTests.js adds @testing-library/jest-dom matchers. Example test: src/tests/App.test.js renders <App /> and asserts text.
- Production container
  - Dockerfile builds the CRA app in a Node stage (yarn build), then serves /build with NGINX. conf/nginx-react.conf enables SPA history fallback via try_files ... /index.html.

Notes
- Use Yarn to run scripts (yarn start/build/test). No tsconfig/eslint/prettier config files are present beyond CRA defaults.
- API base URL is defined in src/config/api.js (BASE_URL).
