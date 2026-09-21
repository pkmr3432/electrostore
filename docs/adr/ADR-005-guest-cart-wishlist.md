# ADR-005: Guest Cart & Wishlist Lifecycle

## Status
Accepted

## Context
ElectroStore supports Guest Checkout and browsing. A guest user can add items to a local Cart and Wishlist (persisted via `AsyncStorage`). When this user eventually logs in or creates an account, we must define exactly what happens to this local data. Previously, the architecture suggested clearing all local data on logout, but failed to dictate the login synchronization process.

## Decision
We implement a **Deterministic Merge Strategy** for transitioning from Guest to Authenticated states.

- **Storage Separation:** We conceptually separate "Guest State" (`AsyncStorage`) from "Authenticated State" (remote DB / TanStack Query cache).
- **On Login:** 
  1. The app detects if there is populated Guest State in local storage.
  2. The app fetches the user's remote Authenticated State.
  3. A merge process occurs deterministically:
     - **Cart:** If a product ID exists in both, update to the maximum quantity (e.g., Guest has 2, Remote has 1 -> Merged is 2). If unique, add to the cart.
     - **Wishlist:** Perform a strict union of product IDs. No item is ever lost.
  4. The merged result is pushed to the remote DB via API.
  5. The Guest State is permanently cleared from local storage.
- **On Logout:**
  1. Secure tokens are deleted.
  2. Authenticated query caches are purged.
  3. The user reverts to an empty Guest State.

## Consequences
- **Positive:** Guarantees no data loss when a user decides to authenticate mid-session.
- **Positive:** Clear separation of concerns; the Guest cart does not silently "leak" into another user's session if they log out.
- **Negative:** Requires somewhat complex reconciliation logic in the `AuthStore` / `CartStore` upon login, ensuring API sync succeeds before deleting local data.
