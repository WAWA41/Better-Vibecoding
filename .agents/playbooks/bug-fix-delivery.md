---
extends: bug-fix
when: A defect has an unknown cause, recurs after attempted fixes, or appears to affect multiple consumers of the same behavior.
---

- **In** "Binary-search the cause" if two fixes based on the same assumption fail the same reproduction, apply [Attack the Premise](../../plugins/better-vibecoding/skills/principle-attack-the-premise/SKILL.md). Before another patch, run a probe that can disprove that assumption.
- **In** "Plan the fix" check which callers or artifacts share the confirmed cause. Fix the affected cases within scope. For a structural repair, use the [refactoring playbook](../../plugins/better-vibecoding/skills/poteto-mode/playbooks/refactoring.md). If that repair changes a shared interface, state owner, or stored format, apply the [shared contract guide](../references/shared-contracts.md).
- **In** "Verify on the same surface" compare results before and after the fix using the same input, starting state, and entry point. For an intermittent failure, reproduce its trigger or report what remains uncertain. Check other confirmed affected cases. When practical, keep a regression check that fails on the original behavior.
