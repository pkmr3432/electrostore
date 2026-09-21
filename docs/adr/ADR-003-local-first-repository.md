# ADR-003: Local-First Repository Pattern

## Status
Accepted

## Context
The ElectroStore application's UI is frozen, but backend services do not currently exist. We must begin implementing functional requirements (adding to cart, checkout flow, filtering) without being blocked by API development. Additionally, we must enforce strict Clean Architecture boundaries to prevent UI components from tangling with data fetching logic (`axios`, `fetch`, etc.).

## Decision
We will adopt the **Repository Pattern** and a **Local-First Development Strategy**.

- **Interfaces:** Define TypeScript interfaces for all data domains (e.g., `ProductRepository`, `CartRepository`).
- **Mock Implementation:** For Phase 0-6, implement mock repositories (`MockProductRepository`) that return static/in-memory data (with simulated network latency).
- **Dependency Injection:** Repositories are injected into the application layer (Zustand stores or TanStack query functions) via environment configuration or a service locator.
- **Future API:** In Phase 7, when APIs are ready, we implement `ApiProductRepository` and swap the dependency without altering any UI components.

## Consequences
- **Positive:** Unblocks frontend functionality development immediately.
- **Positive:** Enforces strict boundary rules (UI -> Store/ViewModel -> Repository Interface -> Storage/API).
- **Positive:** Makes integration testing incredibly easy by injecting mock repositories.
- **Negative:** Requires writing and maintaining boilerplate interfaces and mock implementations.
