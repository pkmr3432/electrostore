# ADR-001: State Management

## Status
Accepted

## Context
The ElectroStore application needs to manage different types of state: local UI state, global client state (e.g., active filters, checkout steps, search input), and server state (e.g., products, orders). The UI currently relies on hard-coded static data. We must select a state management architecture that scales with the application, enforces clean architecture boundaries, and minimizes unnecessary boilerplate.

## Decision
We will use **Zustand** for global client state management.

- **Global Client State (Zustand):** Zustand provides a minimalistic, hook-based API that does not require Provider wrappers or heavy boilerplate like Redux. It seamlessly integrates with React Native and enables clean abstraction of Use Cases (e.g., `useCartStore`, `useAuthStore`) that UI components can consume.
- **Server State:** Handled separately (see ADR-002), reducing the burden on the global client store.
- **Local Component State:** Standard `useState` / `useReducer` for ephemeral UI state (e.g., toggling a modal).

## Consequences
- **Positive:** Greatly reduced boilerplate compared to Redux. Easy integration with TypeScript and local storage middleware for persistence.
- **Negative:** Less opinionated than Redux, requiring developers to enforce clean domain logic separation manually inside the Zustand stores.
- **Enforcement:** UI components must call Zustand hooks (or custom View Model hooks) and MUST NOT interact with persistence or APIs directly.
