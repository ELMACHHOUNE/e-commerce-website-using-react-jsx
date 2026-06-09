# MSC Store — Ecommerce Starter

A modern ecommerce frontend built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **shadcn/ui** components. Features a live product catalog powered by the Fake Store API, role-based admin dashboard, authentication, and a full cart system.

---

## Features

- **Product catalog** — Live products fetched from Fake Store API with search and pagination
- **User auth** — Local login/register with profile management
- **Role-based admin** — Admin dashboard with products, users, and categories CRUD
- **Charts & analytics** — Dashboard overview with Bar, Pie, Line, and Area charts (recharts)
- **Export** — Excel (.xlsx) and PDF export for all management tables
- **Shopping cart** — Slide-out drawer with quantity controls
- **Responsive design** — Mobile-first layout with dark/light mode support
- **shadcn/ui** — Consistent design system using Base UI primitives

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=https://fakestoreapi.com
VITE_ADMIN_EMAIL=admin@admin.com
VITE_ADMIN_PASSWORD=admin123
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL for the product/user API |
| `VITE_ADMIN_EMAIL` | Admin login email (used for seeding) |
| `VITE_ADMIN_PASSWORD` | Admin login password |

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## Admin Access

Once the app is running:

1. Go to `/auth` and sign in with the admin credentials from `.env`
2. Click your avatar → **Dashboard Admin**
3. The admin panel opens to a Dashboard tab with summary cards and charts

---

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn UI primitives (button, card, table, modal, etc.)
│   ├── Layout.jsx       # App shell with navbar, footer, cart drawer
│   ├── Navbar.jsx       # Sticky navigation with user menu
│   ├── Footer.jsx       # Multi-column footer
│   ├── CartDrawer.jsx   # Slide-out shopping cart
│   └── ProductCard.jsx  # Product grid card
├── contexts/
│   ├── AuthContext.jsx  # Authentication state + admin seeding
│   └── CartContext.jsx  # Cart state with localStorage
├── pages/
│   ├── Home.jsx         # Landing page with hero, features, CTA
│   ├── Products.jsx     # Product catalog with search + pagination
│   ├── Categories.jsx   # Category listing
│   ├── Auth.jsx         # Login / register
│   ├── Checkout.jsx     # Checkout page
│   ├── Dashboard.jsx    # User profile dashboard
│   ├── Settings.jsx     # User settings
│   ├── AdminDashboard.jsx # Full admin panel with charts + CRUD + export
│   ├── About.jsx        # About page
│   ├── Contact.jsx      # Contact form
│   └── NotFound.jsx     # 404 page
├── App.jsx              # Routes
├── main.jsx             # Entry point with splash loader
└── index.css            # Tailwind + CSS variables
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool |
| Tailwind CSS v4 | Utility-first CSS |
| shadcn/ui + Base UI | Component primitives |
| react-router-dom v7 | Routing |
| axios | HTTP client |
| recharts | Charts |
| exceljs | Excel export |
| pdfmake | PDF export |
| lucide-react | Icons |
| class-variance-authority | Component variants |
