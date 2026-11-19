---
extends: feature
when: A feature changes a shared contract, state owner, or persisted format, or ships a batch through a shared process.
---

- **In** "parallel design exploration" use the [shared contract guide](../references/shared-contracts.md) when changing a shared interface, state owner, or stored format.
- **In** "Write the throughput checkpoint" use the [batch delivery guide](../references/batch-delivery.md) when one process produces multiple deliverables.
- **In** "Verify on the matching surface" exercise the affected user journey and adjacent behavior at risk. For visual changes, compare the result with the accepted design when available.
