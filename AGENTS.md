# Delivery rules

Honor the user's goal, corrections, and scope. Check the deliverable through its normal entry point. Report what you delivered, what you observed, and any material verification gap.

## When to use a workflow

- Handle a well-understood local change directly. For a label edit, check the rendered button.
- For a feature that changes shared interfaces, state ownership, or stored data, or delivers a batch through a shared process, use the [feature workflow](.agents/playbooks/feature-delivery.md).
- For a defect with an unknown cause, repeated failed fixes, or other consumers likely to be affected, use the [bug-fix workflow](.agents/playbooks/bug-fix-delivery.md).

When a workflow applies, use it with [bundled pstack](vendor/pstack/plugins/pstack/skills/poteto-mode/SKILL.md). Open a linked guide when its condition arises. Revisit this choice if the work reveals a wider change.
