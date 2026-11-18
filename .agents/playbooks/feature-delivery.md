---
extends: feature
when: A feature adds or changes behavior that someone will use.
---

- **In** "parallel design exploration" follow the [architecture rules](../../AGENTS.md#architecture-and-recurring-defects). Trace one real caller and sketch ownership, affected contracts, and how existing callers or data will migrate when the boundary changes.
- **Before** "Write the throughput checkpoint" identify the deliverable and the user-visible outcome from [the repository delivery rules](../../AGENTS.md). For a batch, choose one representative result to verify before repeating the work.
- **Before** "Rebase into small, ordered commits" check where the next change to the same business decision would go. Remove superseded internal paths; record why any external compatibility path still exists.
- **In** "Verify on the matching surface" exercise the actual deliverable through its normal entry point. Record the action, the observed result, and any relevant state that remains unchecked. Include that evidence in the feature handoff.
