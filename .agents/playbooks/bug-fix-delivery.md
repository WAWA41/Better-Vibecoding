---
extends: bug-fix
when: A reported defect requires reproduction, a fix, and verification of the delivered result.
---

- **After** "Binary-search the cause" use [the repository delivery rules](../../AGENTS.md) to identify other entry points or outputs that share the confirmed cause. Check which are affected before broadening the fix.
- **In** "Verify on the same surface" repeat the original reproduction on the deliverable the user will receive. Exercise confirmed affected cases and report the results, including any case that could only be tested in a substitute environment.
