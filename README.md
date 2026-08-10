# SpringBoot-Shopping-App Frontend

React frontend for a Spring Boot e-commerce application — product browsing, cart, checkout, orders, and OAuth2 login (Google/GitHub).

## Tech Stack

- **React 18** + **Vite** (`@vitejs/plugin-react-swc`) — app framework and build tooling
- **React Router DOM** — client-side routing
- **Axios** — HTTP client for the Spring Boot backend
- **Tailwind CSS** + `tailwindcss-animate` — styling
- **Radix UI** (`react-dialog`, `react-dropdown-menu`, `react-label`, `react-select`, `react-separator`, `react-slot`, `react-switch`) — accessible unstyled UI primitives
- **shadcn/ui**-style components (`class-variance-authority`, `clsx`, `tailwind-merge`) — component variant utilities in [src/lib/utils.js](src/lib/utils.js)
- **Framer Motion** — animations
- **Lucide React** / **React Icons** — icon sets
- **React Toastify** — toast notifications
- **@chatscope/chat-ui-kit-react** — chat UI components
- **Sass** — additional styling support

## Project Structure

- [src/components](src/components) — pages and features (Home, Product, Cart, Order, Login, AuthCallback, Navbar, AddProduct, UpdateProduct, CheckoutPopup)
- [src/components/ui](src/components/ui) — shared Radix/shadcn-based UI primitives
- [src/Context/Context.jsx](src/Context/Context.jsx) — app-wide state (auth/cart context)
- [src/axios.js](src/axios.js) — configured Axios instance (base URL from `VITE_BASE_URL`)
- [src/lib/utils.js](src/lib/utils.js) — class-name merge helper (`cn`)

## Environment Variables

Create a `.env` file in the project root:

```
VITE_BASE_URL="http://localhost:8080"
```

This should point to the running Spring Boot backend.

## Getting Started

```bash
npm install
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
npm run lint      # run ESLint
```

## Auth

Login supports OAuth2 via Google and GitHub, redirecting to the backend's `/oauth2/authorization/{provider}` endpoint; [src/components/AuthCallback.jsx](src/components/AuthCallback.jsx) handles the callback and JWT storage.
