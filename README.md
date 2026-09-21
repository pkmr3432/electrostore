# ElectroStore

> A local-first, production-architecture mobile commerce app built with Expo and React Native — featuring a complete product catalog, cart, wishlist, authentication, search, and multi-step checkout, all backed by a clean-architecture repository layer.

---

## Overview

ElectroStore is a React Native / Expo mobile application for an electronics retail experience. The project is built around a strict **local-first architecture** — every feature is fully functional without a backend API. Repository interfaces define all data contracts, and the current implementations are mock or AsyncStorage-backed local providers that can be swapped for real APIs in a single place.

The codebase is designed to serve as a production-quality foundation, demonstrating clean architecture patterns at scale: domain models, repository interfaces, application hooks/view models, Zustand global state, TanStack Query server-state management, and ephemeral UI state — each kept in its proper layer.

---

## Current Status

| Phase | Feature | Status |
|-------|---------|--------|
| Phase 0 | Architecture Foundation, Repository pattern, Zustand, TanStack Query, Storage adapters | ✅ Complete |
| Phase 1 | Product Catalog, Product Details screen | ✅ Complete |
| Phase 2 | Cart, Wishlist, local AsyncStorage persistence, guest state | ✅ Complete |
| Phase 3 | Mock Authentication, Account screen, guest → authenticated state merge | ✅ Complete |
| Phase 4 | Search, filtering by category and availability, sorting | ✅ Complete |
| Phase 5 | Multi-step Checkout, address entry, shipping selection, mock payment, order confirmation | ✅ Complete |
| Phase 6 | Order History, Order Tracking, Shipment Tracking | ⬜ Not started |

**No real backend, payment gateway, or cloud database is connected. All data is local/mock.**

---

## Features

### Product Discovery
- Home screen with editorial hero showcase, featured edition, and new arrivals grid
- Full product catalog backed by `ProductRepository`
- Product Detail screen (specifications, images, stock status, badges)
- Search with ~300ms debounce, URL-parameter state via Expo Router
- Category and in-stock filtering; price ascending/descending sorting

### Cart
- Add, remove, and adjust quantities
- Subtotal calculation using live product prices
- Persistent via AsyncStorage — survives app restarts
- Cart validation before checkout (stock status, quantity limits)
- Cart preserved on payment failure; cleared only on successful order confirmation

### Wishlist
- Add/remove items; "Move to Cart" and "Move All to Cart"
- Persistent via AsyncStorage
- Subtotal value display, in-stock filter view

### Authentication
- Register, login, logout with mock `LocalAuthRepository`
- Session token stored in `expo-secure-store` (SecureStore)
- Session restored automatically on launch
- Guest cart and wishlist are merged into the authenticated user's state on login

### Account
- Profile display (name, email, join date)
- Edit profile form
- Logout

### Checkout (multi-step stack)
1. **Address** — form with validation, pre-fills from authenticated user's name
2. **Shipping** — Standard (free) or Express ($15) methods
3. **Payment** — Mock card entry; no real credentials stored or transmitted
4. **Review** — Full order summary with line items and totals
5. **Success** — Order confirmation reference number; cart cleared

### Architecture
- Repository interfaces define all data contracts
- Mock implementations can be replaced with real API clients in one file
- No UI component directly accesses AsyncStorage, SecureStore, or any network layer

---

## Tech Stack

| Technology | Version | Role |
|-----------|---------|------|
| [Expo](https://expo.dev) | ~57.0.24 (SDK 57) | Native app platform |
| [React Native](https://reactnative.dev) | 0.86.3 | UI framework |
| [React](https://react.dev) | 19.2.3 | Component layer |
| [TypeScript](https://www.typescriptlang.org) | ~6.0.3 | Type safety |
| [Expo Router](https://expo.github.io/router) | ~57.0.22 | File-based routing |
| [Zustand](https://zustand-demo.pmnd.rs) | ^5.0.15 | Global client state (cart, wishlist, auth) |
| [TanStack Query](https://tanstack.com/query) | ^5.103.2 | Server/async state (products) |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | 2.2.0 | Cart/wishlist persistence |
| [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) | ~57.0.4 | Auth session token storage |
| [Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda) | @expo-google-fonts ^0.4.2 | Display / headline typeface |
| [Inter](https://fonts.google.com/specimen/Inter) | @expo-google-fonts ^0.4.2 | Body / UI typeface |
| [Jest](https://jestjs.io) | ^29.7.0 | Test runner |
| [jest-expo](https://www.npmjs.com/package/jest-expo) | ^57.0.5 | Expo-aware Jest preset |

---

## Architecture

The project enforces a strict layered architecture. Each layer may only depend on the layer directly beneath it.

```
┌─────────────────────────────────────────┐
│         UI — Screens & Components       │
│  src/app/**, src/components/**          │
├─────────────────────────────────────────┤
│   Hooks / View Models (Application)     │
│  src/application/hooks/**               │
├─────────────────────────────────────────┤
│  Application Services / Zustand Stores  │
│  src/application/services/**            │
│  src/store/**                           │
├─────────────────────────────────────────┤
│           Domain Models                 │
│  src/domain/models/index.ts             │
├─────────────────────────────────────────┤
│        Repository Interfaces            │
│  src/domain/repositories/index.ts       │
├─────────────────────────────────────────┤
│  Mock / Local Repository Implementations│
│  src/data/mock/**                       │
│  src/data/local/**                      │
├─────────────────────────────────────────┤
│         Storage / Future Backend        │
│  src/core/storage/AsyncStorageAdapter   │
│  src/core/storage/SecureStoreAdapter    │
└─────────────────────────────────────────┘
```

**Critical Rule:** UI components must **not** directly access `AsyncStorage`, `SecureStore`, `fetch`, `axios`, or any payment SDK. All data access flows through hooks → services → repository interfaces.

### Key Architectural Components

| Component | Location | Role |
|-----------|----------|------|
| `RepositoryProvider` | `src/core/di/RepositoryProvider.tsx` | Dependency injection — provides all repository instances to the component tree via React Context |
| `QueryClient` | `src/core/queryClient.ts` | TanStack Query client instance |
| Domain Models | `src/domain/models/index.ts` | Pure TypeScript interfaces: `Product`, `CartItem`, `WishlistItem`, `User`, `AuthSession`, `Address`, `ShippingMethod`, `Order` |
| Repository Interfaces | `src/domain/repositories/index.ts` | `ProductRepository`, `CartRepository`, `WishlistRepository`, `AuthRepository`, `PaymentProvider` |
| `useProducts` / `useProduct` | `src/application/hooks/useProducts.ts` | TanStack Query wrappers around `ProductRepository` |
| `useCart` | `src/application/hooks/useCart.ts` | Enriches `CartItem` IDs with product data; wraps Zustand cart store |
| `useWishlist` | `src/application/hooks/useWishlist.ts` | Enriches `WishlistItem` IDs with product data; wraps Zustand wishlist store |
| `useAuth` | `src/application/hooks/useAuth.ts` | Auth state, login/register/logout, guest-state merge on login |
| `CheckoutProvider` | `src/app/checkout/_layout.tsx` | Ephemeral React Context for multi-step checkout state — destroyed on completion or cancel |

---

## Project Structure

```
electrostore/
├── src/
│   ├── app/                     # Expo Router screens (file-based routes)
│   │   ├── _layout.tsx          # Root layout — fonts, providers, app initialization
│   │   ├── (tabs)/              # Bottom tab navigator
│   │   │   ├── _layout.tsx      # Tab navigator configuration
│   │   │   ├── index.tsx        # Home screen
│   │   │   ├── cart.tsx         # Cart screen
│   │   │   ├── wishlist.tsx     # Wishlist screen
│   │   │   └── account.tsx      # Account / profile screen
│   │   ├── auth/                # Auth screens (no bottom tab)
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   └── forgot-password.tsx
│   │   ├── checkout/            # Multi-step checkout stack
│   │   │   ├── _layout.tsx      # CheckoutProvider + native Stack
│   │   │   ├── address.tsx
│   │   │   ├── shipping.tsx
│   │   │   ├── payment.tsx
│   │   │   ├── review.tsx
│   │   │   └── success.tsx
│   │   ├── product/
│   │   │   └── [id].tsx         # Product Details (dynamic route)
│   │   └── search/
│   │       └── index.tsx        # Search screen (URL params as state)
│   │
│   ├── application/             # Application layer
│   │   ├── hooks/               # View-model hooks (useCart, useAuth, etc.)
│   │   └── services/            # Business logic (checkoutValidation, mergeGuestState)
│   │
│   ├── components/              # Reusable UI components
│   │   ├── layout/              # Header
│   │   └── ui/                  # ProductCard, WishlistCard, CartItem, Button, etc.
│   │
│   ├── core/                    # Infrastructure
│   │   ├── di/                  # RepositoryProvider (dependency injection)
│   │   ├── queryClient.ts       # TanStack Query client
│   │   └── storage/             # AsyncStorageAdapter, SecureStoreAdapter
│   │
│   ├── data/                    # Data layer
│   │   ├── mock/                # MockProductRepository, MockPaymentProvider
│   │   └── local/               # LocalCartRepository, LocalWishlistRepository, LocalAuthRepository
│   │
│   ├── domain/                  # Domain layer (pure TypeScript, no framework dependencies)
│   │   ├── models/              # Entity interfaces
│   │   └── repositories/        # Repository interface contracts
│   │
│   ├── store/                   # Zustand global state stores
│   │   ├── useCartStore.ts
│   │   ├── useWishlistStore.ts
│   │   └── useAuthStore.ts
│   │
│   └── __tests__/               # Jest test suites (mirrors src/ structure)
│       ├── core/
│       ├── data/
│       ├── services/
│       └── store/
│
├── theme/                       # Design system tokens
│   ├── colors.ts                # Color palette (cobalt primary, warm white surface)
│   ├── typography.ts            # Type scale (Bodoni Moda + Inter)
│   ├── spacing.ts               # Spacing scale
│   └── index.ts                 # Re-exports
│
├── assets/
│   └── images/                  # Product images, hero, logo, app icons
│
├── docs/
│   ├── FUNCTIONALITY_ARCHITECTURE.md
│   └── adr/                     # Architecture Decision Records
│
├── web-reference/               # Static HTML/React reference UI (design source)
│
├── app.json                     # Expo configuration
├── tsconfig.json                # TypeScript configuration
├── jest.config.js               # Jest configuration
└── package.json
```

---

## Prerequisites

- **Node.js** — tested with v22. No strict version constraint is declared in `package.json`.
- **npm** — comes with Node.js. Tested with v10.
- **Git** — for cloning.
- **Expo Go** (iOS or Android) — for testing on a physical device. Install from the [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent).

No additional environment variables, API keys, or local service configuration is required.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/pkmr3432/electrostore.git
cd electrostore
```

### 2. Verify the branch and commit

```bash
git branch   # should show: * main
git log -1 --oneline
```

### 3. Install dependencies

> **Note:** A peer dependency conflict exists between `@react-native/jest-preset@^0.87.1` (installed) and `jest-expo@57.0.5` (which requests `^0.86.3`). This conflict is cosmetic — the project works correctly. Use `--legacy-peer-deps` to install:

```bash
npm install --legacy-peer-deps
```

This installs approximately 932 packages.

### 4. Environment configuration

No `.env` file is required. The project is fully local-first:

- No backend API URL needed
- No payment gateway credentials needed
- No authentication service credentials needed

The only runtime use of an environment variable is `process.env.EXPO_OS`, which is set automatically by Expo and used internally.

### 5. Start the development server

```bash
npx expo start
```

Or with a cleared Metro cache (recommended after dependency changes):

```bash
npx expo start -c
```

### 6. Open on your device

After the server starts, the terminal displays a QR code and options:

| Target | Command | Notes |
|--------|---------|-------|
| Android (Expo Go) | Press `a` or scan QR | Requires Expo Go installed |
| iOS (Expo Go) | Press `i` or scan QR | Requires Expo Go installed |
| iOS Simulator | `npx expo start --ios` | Requires macOS + Xcode |
| Android Emulator | `npx expo start --android` | Requires Android Studio |
| Web | `npx expo start --web` | Experimental; app is mobile-first |

> **Physical device note:** Scan the QR code using the Expo Go app (Android) or the iOS Camera app (iOS). Ensure your device and development machine are on the same Wi-Fi network.

---

## Available Commands

All commands verified against `package.json` scripts:

| Command | Description |
|---------|-------------|
| `npx expo start` | Start the Metro development server |
| `npx expo start -c` | Start with cleared Metro cache |
| `npx expo start --android` | Start and open on Android |
| `npx expo start --ios` | Start and open on iOS Simulator |
| `npx expo start --web` | Start and open in browser |
| `npx tsc --noEmit` | TypeScript type-check (no output files) |
| `npm test` | Run the Jest test suite |
| `npm run lint` | Run Expo's ESLint configuration |

---

## Testing

Tests are written with [Jest](https://jestjs.io) and the `jest-expo` preset.

### Run all tests

```bash
npm test
```

### Run TypeScript check

```bash
npx tsc --noEmit
```

### Current test results (verified from fresh clone)

```
Test Suites:  10 passed, 10 total
Tests:        53 passed, 53 total
```

### Test coverage

| Suite | What is tested |
|-------|---------------|
| `MockProductRepository` | Product fetching, filtering, searching, sorting |
| `MockPaymentProvider` | Payment initialization and confirmation (success, declined, cancelled) |
| `LocalAuthRepository` | Login, registration, logout, session persistence and restoration |
| `LocalCartRepository` | Cart persistence: save, load, clear |
| `LocalWishlistRepository` | Wishlist persistence: save, load, clear |
| `cartStore` | Zustand cart store mutations (add, remove, update quantity, hydration) |
| `wishlistStore` | Zustand wishlist store mutations |
| `checkoutValidation` | Cart validation rules before checkout entry |
| `mergeGuestState` | Guest cart/wishlist merge logic on authentication |
| `storageAdapters` | AsyncStorageAdapter and SecureStoreAdapter behaviour |

---

## Design System

The visual language is editorial minimalism with Swiss/industrial references.

| Token | Value |
|-------|-------|
| **Primary (cobalt)** | `#00327d` / container `#0047ab` |
| **Surface** | `#fbf9f8` (warm off-white) |
| **On Surface** | `#1b1c1c` |
| **Display typeface** | Bodoni Moda 500/600 |
| **Body typeface** | Inter 400/500/600 |
| **Spacing unit** | 4px base scale |

Typography uses tight negative tracking at display sizes and generous line-height at body sizes. All design tokens are centralized in `theme/` and consumed via named exports — no inline hex values in component files.

---

## Development Guidelines

### Architecture boundaries

- **UI components must not** directly access `AsyncStorage`, `SecureStore`, `fetch`, `axios`, or any external SDK.
- All data access flows through: `Screen → useHook → ApplicationService/Store → RepositoryInterface → Implementation`
- To swap a mock for a real API client, change only `src/core/di/RepositoryProvider.tsx`.

### State management rules

| Type of state | Where it lives |
|--------------|----------------|
| Global client state (cart, wishlist, auth user) | Zustand store (`src/store/`) |
| Server / async data (products) | TanStack Query via `useProducts` |
| Ephemeral multi-step form state (checkout) | React Context (`CheckoutProvider`) — destroyed on completion |
| Ephemeral local UI state (modal open, input value) | `useState` in the component |

### Adding a new feature

1. Define or extend domain models in `src/domain/models/index.ts`
2. Define or extend the repository interface in `src/domain/repositories/index.ts`
3. Implement the interface in `src/data/local/` or `src/data/mock/`
4. Register the implementation in `RepositoryProvider`
5. Create the application hook in `src/application/hooks/`
6. Build the screen in `src/app/`
7. Write tests for the repository implementation and any application services

### Preserving the UI

The existing screen designs, typography, spacing, colors, and navigation behavior should not be changed outside of intentional design updates. The Stitch-derived component library in `src/components/ui/` is the source of truth for visual language.

---

## Current Limitations

The following functionality is **intentionally not implemented** in the current version. These are tracked as future phases, not bugs.

| Capability | Status | Notes |
|-----------|--------|-------|
| Order history | ⬜ Not implemented | `Order` type exists in domain models but no `OrderRepository` or UI exists |
| Order tracking / shipment status | ⬜ Not implemented | — |
| Real payment processing | ⬜ Not implemented | `MockPaymentProvider` simulates success/failure deterministically |
| Real authentication backend | ⬜ Not implemented | `LocalAuthRepository` uses an in-memory user store |
| Real product/inventory API | ⬜ Not implemented | `MockProductRepository` returns static local data |
| Cloud sync for cart/wishlist | ⬜ Not implemented | Stored in AsyncStorage on device only |
| Admin dashboard | ⬜ Not implemented | — |
| Refunds / returns processing | ⬜ Not implemented | — |
| Multi-currency / localization | ⬜ Not implemented | Domain models support `currency` field; UI currently USD only |
| Push notifications | ⬜ Not implemented | — |
| Analytics / tracking | ⬜ Not implemented | — |

### Mock payment testing

The `MockPaymentProvider` supports deterministic failure scenarios for testing. On the Payment screen, the **Name on Card** field accepts special test values:

| Name on Card | Outcome |
|-------------|---------|
| Any real name | ✅ Payment succeeds |
| `fail` | ❌ Payment declined on Review screen |
| `cancel` | ❌ Payment cancelled on Review screen |

In all failure cases, the cart is preserved so the user can retry.

---

## Roadmap / Phase Status

```
✅ Phase 0 — Architecture Foundation
✅ Phase 1 — Product Catalog & Product Details
✅ Phase 2 — Cart & Wishlist with Local Persistence
✅ Phase 3 — Mock Authentication & Account
✅ Phase 4 — Search, Filtering & Sorting
✅ Phase 5 — Multi-step Checkout & Mock Payment
⬜ Phase 6 — Order History & Tracking (not started)
```

---

## Repository

**GitHub:** [https://github.com/pkmr3432/electrostore](https://github.com/pkmr3432/electrostore)  
**Default branch:** `main`  
**Checkpoint commit:** `93865982` — `feat: complete local-first mobile foundation through checkout`

---

## Troubleshooting

### `npm install` fails with peer dependency conflict

```
Could not resolve dependency: peer @react-native/jest-preset@"^0.86.3" from jest-expo
```

**Solution:** Use `--legacy-peer-deps`:

```bash
npm install --legacy-peer-deps
```

This is a known cosmetic conflict between `jest-expo@57.0.5` and `@react-native/jest-preset@0.87.1`. The project functions correctly with either resolved version.

### Metro bundler shows stale errors after a dependency change

```bash
npx expo start -c
```

The `-c` flag clears the Metro transformer and module registry cache.

### Expo Go cannot connect to the development server

- Ensure your phone and Mac are on the **same Wi-Fi network**.
- If using a VPN, disconnect it — VPNs often block the LAN broadcast used by Expo.
- Press `r` in the terminal to reload the bundle manually.

### `SecureStore` errors on first launch

If you see `Invalid key provided to SecureStore` errors, ensure session keys do not contain `@` or other special characters. The project uses `auth_session` (valid) — not `@auth_session`.

### Font not loaded / blank screen on first launch

The app holds the splash screen until `useFonts()` resolves. If the splash screen persists beyond ~5 seconds, check that the Google Fonts packages are installed correctly:

```bash
npm install --legacy-peer-deps
npx expo start -c
```

---

*No license has been specified for this repository.*
