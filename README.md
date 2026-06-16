# WatsNJoe Frontend

A mobile-first wayfinding web application for a care facility (woonzorgcentrum). It helps residents and visitors navigate through the building with interactive floor maps, opening hours, FAQ, and multilingual support (Dutch/English).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages & Routing](#pages--routing)
- [Internationalization](#internationalization)
- [Testing](#testing)
- [Scripts](#scripts)

---

## Features

- **Interactive Floor Maps** — Visual floor plan with 50+ room/location nodes and corridor-based pathfinding across multiple floors
- **Room-to-Room Navigation** — Dropdown selectors to pick a starting point and destination, with a route displayed on the floor plan
- **Onboarding** — Three-screen introduction flow for first-time users
- **Opening Hours** — Expandable sections for facility services (Grand Café, Hairdresser, Supermarket, etc.)
- **FAQ** — Accordion-style answers to common questions
- **Help / Contact** — Support information page
- **Multilingual** — Full Dutch and English support via a global language toggle
- **Mobile-First Design** — Designed for phone use, using the Comfortaa font and a consistent color scheme

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + React Router DOM 7 |
| Build Tool | Vite 8 |
| State Management | Zustand 5 |
| Animations | Framer Motion 12 |
| E2E Testing | Cypress 14 |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
git clone <repo-url>
cd watsnjoe-frontend
npm install
```

### Running Locally

```bash
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173) with hot module replacement.

### Production Build

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Project Structure

```
watsnjoe-frontend/
├── public/                   # Static assets served as-is
├── src/
│   ├── main.jsx              # Entry point — mounts app and defines all routes
│   ├── App.jsx               # Home/dashboard screen
│   ├── index.css             # Global styles (font, color variables)
│   │
│   ├── components/           # Shared UI components
│   │   ├── PhoneHeader.jsx   # Header with logo, back button, language toggle
│   │   ├── PhoneFooter.jsx   # Bottom navigation bar
│   │   ├── BannerTitle.jsx   # Reusable page title banner
│   │   └── phone_background.jsx
│   │
│   ├── pages/phone/          # All page-level components
│   │   ├── Splash.jsx        # Intro/loading splash screen
│   │   ├── Welcome1.jsx      # Onboarding step 1
│   │   ├── Welcome2.jsx      # Onboarding step 2
│   │   ├── Welcome3.jsx      # Onboarding step 3
│   │   ├── Email.jsx         # Landing page
│   │   ├── Visiting.jsx      # From/to room selector
│   │   ├── MapCombined.jsx   # Interactive map with pathfinding
│   │   ├── FloorMap.jsx      # Floor plan image view
│   │   ├── SecondFloor.jsx   # Second floor map
│   │   ├── Openinghours.jsx  # Opening hours with expandable sections
│   │   ├── Faq.jsx           # FAQ accordion
│   │   ├── Help.jsx          # Help and contact info
│   │   └── WelcomeSkip.jsx   # Recovery page for skipped onboarding
│   │
│   ├── store/
│   │   └── langStore.js      # Zustand store for active language (nl / en)
│   │
│   ├── styles/               # CSS modules and component styles
│   │   ├── phone.css
│   │   ├── PhoneHeaderFooter.css
│   │   ├── Map.css
│   │   ├── Onboarding.css
│   │   ├── FloorMap.css
│   │   └── fonts/            # Comfortaa font (Light → Bold weights)
│   │
│   └── images/               # Floorplan images, icons, logos
│
├── cypress/                  # E2E tests
│   ├── e2e/                  # Test specs
│   ├── support/              # Custom commands and setup
│   └── fixtures/             # Static test data
│
├── vite.config.js
├── cypress.config.js
├── eslint.config.js
└── package.json
```

---

## Pages & Routing

All routes are defined in [src/main.jsx](src/main.jsx).

| Path | Component | Description |
|---|---|---|
| `/` | `Email` | Landing page |
| `/Splash` | `Splash` | Animated intro screen |
| `/Welcome1` | `Welcome1` | Onboarding step 1 |
| `/Welcome2` | `Welcome2` | Onboarding step 2 |
| `/Welcome3` | `Welcome3` | Onboarding step 3 |
| `/App` | `App` | Main home dashboard |
| `/Visiting` | `Visiting` | Room-to-room navigation selector |
| `/MapCombined` | `MapCombined` | Interactive floor map with pathfinding |
| `/FloorMap` | `FloorMap` | Static floor plan view |
| `/secondfloor` | `SecondFloor` | Second floor map |
| `/OpeningHours` | `Openinghours` | Facility opening hours |
| `/Faq` | `Faq` | Frequently asked questions |
| `/Help` | `Help` | Help and contact information |
| `/WelcomeSkip` | `WelcomeSkip` | Skipped-onboarding recovery |

---

## Testing

End-to-end tests are written with [Cypress](https://www.cypress.io/) and live in [cypress/e2e/](cypress/e2e/).

### Run tests interactively

```bash
npx cypress open
```

### Run tests headlessly

```bash
npx cypress run
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint across the project |
