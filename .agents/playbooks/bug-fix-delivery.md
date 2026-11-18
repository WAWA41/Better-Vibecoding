---
extends: bug-fix
when: A defect has an unknown cause, recurs after attempted fixes, or appears to affect multiple consumers of the same behavior.
---

- **In** "Binary-search the cause" if two fixes based on the same assumption fail the same reproduction, apply [Attack the Premise](../../vendor/pstack/plugins/pstack/skills/principle-attack-the-premise/SKILL.md). Before another patch, run a probe that can disprove that assumption.
- **In** "Plan the fix" check which callers or artifacts share the confirmed cause. Fix the affected cases within scope. If a structural repair is warranted, use the [refactoring playbook](../../vendor/pstack/plugins/pstack/skills/poteto-mode/playbooks/refactoring.md) to pin behavior that callers rely on, migrate them, and retire failed workarounds.
- **In** "Verify on the same surface" rerun the original reproduction and the confirmed affected cases on the deliverable. When practical, preserve a repeatable regression check that rejects the known bad result.
