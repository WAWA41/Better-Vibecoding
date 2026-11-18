---
extends: bug-fix
when: A reported defect requires reproduction, a fix, and verification of the delivered result.
---

- **In** "Binary-search the cause" track the hypothesis behind each attempted fix. If two fixes share a premise and fail the same reproduction, apply [Attack the Premise](../../vendor/pstack/plugins/pstack/skills/principle-attack-the-premise/SKILL.md). Run a discriminating probe before changing code again.
- **After** "Binary-search the cause" use [the repository delivery rules](../../AGENTS.md) to identify other entry points or outputs that share the confirmed cause. Check which are affected before broadening the fix.
- **In** "Plan the fix" locate the owner of the broken rule. For a structural change, apply the [architecture rules](../../AGENTS.md#architecture-and-recurring-defects), pin behavior to preserve, migrate callers and retire failed workarounds. Verify the corrected behavior against the original reproduction.
- **In** "Verify on the same surface" repeat the original reproduction on the deliverable the user will receive. Exercise confirmed affected cases and report the results, including any case that could only be tested in a substitute environment.
