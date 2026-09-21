# ADR-004: Payment Provider Abstraction

## Status
Accepted

## Context
The ElectroStore application includes a complete Checkout flow terminating in payment processing. While Stripe is the expected eventual provider, hard-coding Stripe SDK calls directly into UI components or checkout business logic violates clean architecture and makes local development impossible without an active Stripe environment. 

## Decision
We will build a **Payment Provider Abstraction**.

- We define an interface `PaymentProvider` exposing methods such as `initializePayment()`, `confirmPayment()`, and `handleWebhookCallback()`.
- **Phase 0-5 (Local First):** We inject a `MockPaymentProvider` that simulates successful or failed payment processing asynchronously without hitting any external network.
- **Phase 7 (Production):** We implement `StripePaymentProvider` (wrapping `@stripe/stripe-react-native`) and swap out the interface implementation.
- UI components (like the final Checkout confirmation screen) only know about the `PaymentProvider` interface.

## Consequences
- **Positive:** UI and checkout logic remain totally ignorant of Stripe's specific API surface.
- **Positive:** Enables robust local testing of success/failure states without burning real API keys.
- **Positive:** Allows easy migration to alternative gateways if required in the future.
- **Negative:** Adds a slight architectural overhead in defining the generalized payment interfaces.
