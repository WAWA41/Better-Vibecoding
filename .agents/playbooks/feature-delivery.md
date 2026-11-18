---
extends: feature
when: A feature changes a shared contract, state owner, or persisted format, or ships a batch through a shared process.
---

- **In** "parallel design exploration" trace a real caller to the state or policy it depends on. For a shared contract change, identify affected consumers, including readers of existing data, and decide how they will migrate. Give each business rule a clear owner; add an abstraction when it removes concrete duplication or coupling.
- **In** "Write the throughput checkpoint" plan an end-to-end check of one representative deliverable before scaling up a batch. Give each subsequent item a lightweight check that distinguishes the intended output from a stale or template build. Repeat the full check if the shared delivery process changes.
- **In** "Verify on the matching surface" exercise the affected user journey and any adjacent state the change put at risk. For a visual change, use an accepted design as a reference when available. For a migrated contract, check for competing implementations; retire superseded paths and keep compatibility that existing callers or data still need.
