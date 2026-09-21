# ADR-002: Data Fetching

## Status
Accepted

## Context
The application relies on server state for the product catalog, order history, and user profiles. Managing the lifecycle of asynchronous data (loading states, caching, invalidation, deduplication) manually in Redux or Zustand is complex and error-prone. We need a robust strategy to handle data fetching that aligns with our Local-First Repository Pattern (see ADR-003).

## Decision
We will use **TanStack Query (React Query)** to handle all server state and asynchronous data fetching.

- TanStack Query hooks (e.g., `useQuery`, `useMutation`) will wrap the calls to our Repository Interfaces.
- TanStack Query manages the cache, retry logic, background fetching, and provides reactive `isLoading`, `isError`, and `data` properties to the UI.
- **Offline Behavior:** While TanStack Query can serve stale cached data when offline, automatic offline mutation queuing is **not** included in the V1 scope. Mutations (like checkout) explicitly require network connectivity, though local mock mutations will function offline during local-first development.

## Consequences
- **Positive:** Massive reduction in state management code. Robust caching and loading state management out of the box.
- **Positive:** Perfectly complements the Repository Pattern; queries call `Repository.getProducts()` without caring if it's hitting a mock or real API.
- **Negative:** Adds a library dependency and a learning curve for invalidation strategies.
