# Drivly

**A premium car rental and vehicle marketplace platform.**

Drivly connects vehicle owners with people who want to rent premium vehicles — combining a full-featured rental marketplace with an editorial, luxury-brand visual identity rather than a generic rental-app look and feel.

[![Frontend](https://img.shields.io/badge/frontend-live-C7A76C?style=flat-square)](https://drivly-frontend.vercel.app)
[![Backend](https://img.shields.io/badge/backend-live-C7A76C?style=flat-square)](https://drivly-backend.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-database-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com)

**Live app:** [drivly-frontend.vercel.app](https://drivly-frontend.vercel.app)
**API:** [drivly-backend.vercel.app](https://drivly-backend.vercel.app)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Models](#data-models)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Design System](#design-system)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Drivly is a **two-sided marketplace**: customers can browse and book premium vehicles, while vehicle owners can list, edit, and manage their own cars on the same platform. The product goal isn't just functional parity with a typical rental site — it's to feel like a luxury automotive brand: quiet, editorial, confident, and detail-driven.

**Core capabilities:**
- Browse, search, and filter available vehicles
- View detailed vehicle pages with full specifications
- Book a vehicle with real-time price calculation
- Manage and cancel bookings
- List, edit, and delete your own vehicles as an owner
- Authenticate via email/password or Google OAuth

---

## Features

### For Renters
- **Explore & Search** — filter by vehicle type (Sedan, SUV, Sports Coupe, Luxury, etc.) and availability, with a responsive 1 → 2 → 3 column grid
- **Vehicle Details** — full specs (seats, transmission, fuel type), pickup location, owner info, and availability status
- **Booking** — date-range picker, optional driver add-on, special notes, and a live total price calculated from rental days × daily rate
- **My Bookings** — view booking history and cancel active reservations, with confirmation and toast feedback

### For Vehicle Owners
- **Add a Vehicle** — structured form covering identity (brand, model, year, color, body style), specifications, pricing, pickup location, dynamic feature tags, and description
- **My Cars Dashboard** — manage all listed vehicles with edit and delete modals, and toggle availability
- **Empty States** — guided prompts to list a first vehicle when none exist yet

### Platform-Wide
- **Authentication** — email/password and Google OAuth via Better Auth, with JWT sessions cached for 7 days
- **Toast Notifications** — contextual success/error feedback across login, registration, bookings, and vehicle management
- **Responsive Design** — mobile-first layouts throughout, with an intentionally distinct (not just collapsed) mobile composition on the homepage

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS 4, DaisyUI |
| UI Components | HeroUI 3 |
| Animation | Framer Motion |
| Icons | React Icons |
| Notifications | React Hot Toast |
| Database | MongoDB |
| Auth | Better Auth (email/password + Google OAuth, MongoDB adapter) |
| Deployment | Vercel (frontend + backend) |

---

## Project Structure

```
drivly/
├── src/
│   ├── app/
│   │   ├── page.js                 # Homepage
│   │   ├── login/                  # Login
│   │   ├── register/               # Registration
│   │   ├── explore/                # Browse all vehicles
│   │   │   └── [id]/               # Vehicle detail page
│   │   ├── add-car/                # Add a vehicle (protected)
│   │   ├── my-cars/                # Manage listed vehicles (protected)
│   │   ├── my-bookings/            # Booking history (protected)
│   │   └── api/auth/[...all]/      # Better Auth catch-all route
│   ├── Components/
│   │   ├── Home/                   # Hero, Navbar, Footer, Featured Cars,
│   │   │                           # Why Drivly, How It Works,
│   │   │                           # Premium Experience, Testimonials, Final CTA
│   │   └── Functionality/          # Booking forms, vehicle cards, modals
│   └── lib/                        # Server- and client-side auth logic
├── next.config.mjs
├── jsconfig.json                   # `@/*` → `src/*`
└── tailwind.config.js
```

### Homepage Sections

| # | Section | Purpose |
|---|---|---|
| 01 | Hero | Cinematic entry point with primary "Explore Cars" CTA |
| 02 | Featured Cars | Curated, editorial gallery of premium vehicles |
| 03 | Why Drivly | Brand differentiation — curated selection, transparent booking, premium experience |
| 04 | How It Works | Explore → Reserve → Drive, as a simple three-step process |
| 05 | Premium Experience | Full-bleed cinematic brand statement |
| 06 | Testimonials / Trust | Social proof paired with platform trust metrics |
| 07 | Final CTA | Closing prompt to browse the fleet or list a vehicle |

---

## Data Models

**User**
| Field | Type |
|---|---|
| `id` | ObjectId |
| `name` | String |
| `email` | String |
| `password` | String (hashed) |
| `image` | String (URL) |
| `createdAt` | Date |

**Vehicle**
| Field | Type |
|---|---|
| `id` | ObjectId |
| `user_id` | ObjectId (owner) |
| `name`, `brand`, `model`, `year` | String / Number |
| `type` | String (Sedan, SUV, Sports Coupe, Luxury, …) |
| `color`, `body_style` | String |
| `daily_rent_price` | Number |
| `seat_capacity` | Number |
| `transmission` | String (Automatic / Manual) |
| `fuel_type` | String (Petrol / Diesel / Hybrid / Electric) |
| `pickup_location` | String |
| `availability` | Boolean |
| `image` | String (URL) |
| `key_features` | String[] |
| `description` | String |
| `user_name`, `user_image` | String (cached owner display data) |

**Booking**
| Field | Type |
|---|---|
| `id` | ObjectId |
| `user_id`, `car_id` | ObjectId |
| `user_name`, `user_image`, `car_name`, `car_image` | String (cached display data) |
| `pickup_location` | String |
| `pickup_date`, `return_date` | Date |
| `total_days` | Number |
| `driver_needed` | Boolean |
| `special_note` | String |
| `daily_rent_price`, `total_price` | Number |
| `booking_date` | Date |

---

## API Reference

Base URL: `https://drivly-backend.vercel.app`

**Vehicles**
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/cars` | Fetch all available vehicles |
| `GET` | `/cars/:id` | Fetch a single vehicle |
| `POST` | `/car` | Create a new vehicle listing *(auth required)* |
| `PUT` | `/car/:id` | Update a vehicle *(auth required)* |
| `DELETE` | `/car/:id` | Delete a vehicle *(auth required)* |
| `GET` | `/add-car/:user_id` | Fetch all vehicles listed by a specific user |

**Bookings**
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/booking` | Create a new booking *(auth required)* |
| `GET` | `/booking/:user_id` | Fetch all bookings for a user |
| `DELETE` | `/booking/:booking_id` | Cancel a booking |

**Auth**
| Method | Endpoint | Description |
|---|---|---|
| `*` | `/api/auth/[...all]` | Better Auth catch-all — sign-up, sign-in, sign-out, Google OAuth, session validation |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB instance (local or Atlas)
- A Google Cloud OAuth client (for Google sign-in)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/drivly.git
cd drivly

# Install dependencies
npm install

# Set up environment variables (see below)
cp .env.example .env.local

# Run the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `BETTER_AUTH_URL` | Base URL for Better Auth endpoints |
| `NEXT_PUBLIC_SERVER` | Base URL of the backend API |

---

## Design System

Drivly's visual identity is built around restraint: a warm ivory/obsidian palette with a single champagne accent, used deliberately rather than everywhere.

| Token | Value | Usage |
|---|---|---|
| Obsidian | `#0B0B0C` | Primary dark background |
| Dark Surface | `#151618` | Card/panel backgrounds on dark sections |
| Warm Ivory | `#F4F2ED` | Primary light background |
| Deep Black Text | `#111214` | Body text on light backgrounds |
| Stone Gray | `#6F706D` | Secondary/muted text |
| Warm Gray | `#D9D6CF` | Borders and dividers |
| Champagne | `#C7A76C` | Primary accent — eyebrows, key lines, CTAs |
| Champagne Hover | `#AF8D52` | Interactive hover state |
| Destructive Red | `#A64B45` | Errors, delete actions |

**Typography:** Geist, with large editorial headings, tight tracking, and a clear contrast step between headings and supporting copy.

**Motion:** Framer Motion is used sparingly — content reveals once on scroll into view, with no continuous looping or bouncy easing, so the site feels alive without feeling animated *at* the visitor.

---

## Roadmap

- [ ] Payment processing integration
- [ ] Review and rating system for vehicles and users
- [ ] In-app messaging between renters and owners
- [ ] Advanced filters (price range, location radius)
- [ ] Owner analytics dashboard
- [ ] Promotion / discount codes
- [ ] Email notifications for bookings
- [ ] Multi-photo gallery per vehicle

---

## Contributing

This is currently a solo project in active development. Issues and suggestions are welcome — open an issue describing the change before submitting a pull request.

---

<p align="center">Built with care, for people who care how they arrive.</p>