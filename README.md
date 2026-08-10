
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


## App preview 

Login page
<img width="1437" height="828" alt="Screenshot 2026-08-10 at 7 38 55 PM" src="https://github.com/user-attachments/assets/88b5fdf4-f7f9-4d71-8b18-a7196793f8be" />

DashBoard 
<img width="1450" height="834" alt="Screenshot 2026-08-10 at 7 39 27 PM" src="https://github.com/user-attachments/assets/21552b00-7ff1-4c4c-9a0b-61ef4c5bb4fb" />

Add Product
<img width="1465" height="836" alt="Screenshot 2026-08-10 at 7 39 50 PM" src="https://github.com/user-attachments/assets/16a184b8-69d5-4770-9d7c-ecd69e2de806" />

Generating product description and image from AI
<img width="1438" height="835" alt="Screenshot 2026-08-10 at 9 06 34 PM" src="https://github.com/user-attachments/assets/551f1c79-8857-4e7b-943b-260b47dec5b6" />

<img width="1352" height="831" alt="Screenshot 2026-08-10 at 9 06 49 PM" src="https://github.com/user-attachments/assets/e9a29c1e-37c2-4d6c-b44c-0388cccc75a1" />

Cart
<img width="1447" height="836" alt="Screenshot 2026-08-10 at 7 40 27 PM" src="https://github.com/user-attachments/assets/f66119ed-8a18-40ab-b89b-7deb46e7feaa" />

All Orders
<img width="1452" height="835" alt="Screenshot 2026-08-10 at 7 41 06 PM" src="https://github.com/user-attachments/assets/9c7fea34-8368-44fe-991a-b58776727489" />

Order Confirmed
<img width="1389" height="666" alt="Screenshot 2026-08-10 at 8 12 39 PM" src="https://github.com/user-attachments/assets/d9c5d159-e400-4860-8783-ce5482c305cf" />

