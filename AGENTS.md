# Delivery rules

Honor the user's goal, corrections, and scope. Choose an approach that fits the change. For a deliverable, use its normal entry point and check the outcome the user cares about. At handoff, identify the artifact, the result you observed, and any material gap in verification.

## When to use a workflow

- Handle a well-understood, local change directly. For example, verify a button label on the rendered button.
- For a feature that changes shared interfaces, state ownership, or stored data, or delivers a batch through a shared process, use the [feature workflow](.agents/playbooks/feature-delivery.md).
- For a defect with an unknown cause, repeated failed fixes, or other consumers likely to be affected, use the [bug-fix workflow](.agents/playbooks/bug-fix-delivery.md).

For a routed task, follow [the bundled pstack instructions](vendor/pstack/plugins/pstack/skills/poteto-mode/SKILL.md) and the matching project workflow. For other work, use your judgment about which tools and checks will help.
