# Agent delivery rules

Apply these rules when producing or fixing a deliverable. For an explanation or review, deliver the requested answer or findings. Use the project's existing tools and conventions. Keep the checks proportional to the change.

For nontrivial features and bug fixes, load the [bundled poteto-mode](vendor/pstack/plugins/pstack/skills/poteto-mode/SKILL.md) before editing. Follow its runtime mapping and the matching [feature](.agents/playbooks/feature-delivery.md) or [bug-fix](.agents/playbooks/bug-fix-delivery.md) extension. Resolve bundled skills and scripts relative to this checkout, including when the host has no pstack plugin installed. Use the tools and permissions available in the current session. Keep a contained, obvious change local and verify it directly.

## Architecture and recurring defects

- Trace a real caller through the affected path. Identify the owner of mutable state, the module responsible for each business decision, and the consumers that rely on its behavior. Look at an existing implementation of the same concept before adding another one.
- For changes to a shared interface, state ownership, or persisted format, use [architect](vendor/pstack/plugins/pstack/skills/architect/SKILL.md) before implementation. Sketch the boundary, its callers, and compatibility obligations. Keep one authority for the same business decision. Introduce an abstraction when it removes concrete duplication, coupling, or an invalid state; similar-looking code can serve different policies.
- When two attempted fixes based on the same assumption fail the same check, use [Attack the Premise](vendor/pstack/plugins/pstack/skills/principle-attack-the-premise/SKILL.md) before trying a third. State the shared assumption and run a probe whose outcome could disprove it. Locate the first divergence from expected behavior and fix the supported cause.
- If a structural repair is warranted, use the [refactoring playbook](vendor/pstack/plugins/pstack/skills/poteto-mode/playbooks/refactoring.md) to pin behavior that callers rely on. Migrate affected internal callers and remove superseded paths. Isolate required compatibility for external callers or existing data at the boundary.
- During review, trace a representative caller again. Ask where the next change to this rule would go and which old paths still implement it. Resolve competing authorities and stale workarounds in scope. Document a significant tradeoff or a remaining compatibility constraint when it affects the next maintainer.

## Define what done looks like

- Identify who will use the result, what they will receive, and one observable outcome that would satisfy their request. Carry forward the user's corrections and relevant constraints. For a small change, one sentence is enough.
- Infer routine details from the repository and existing examples. Resolve questions about behavior by inspecting or running the product. Ask the user when a material product decision still depends on their preference.

## Verify what the user will receive

- Exercise the delivered version through its normal entry point. Launch the packaged app, call the public API, import the distributed library, or follow the published instructions, as appropriate. Check that the artifact you tested is the one you will hand over.
- Observe the result that matters to the user. If the product reports a successful save, reopen the saved item. If an action targets another application, check the result there. Builds, unit tests, logs, and screenshots can support a claim; choose evidence that would actually fail if the reported behavior were broken.
- Walk through the changed workflow before handing it over. Check adjacent states affected by the change, such as cancelling, retrying, reopening, or using an alternate entry point. For visual changes, compare against a relevant design or an already accepted screen when available.

## Handle defects and batches

- When a user reports a defect, reproduce it on the relevant surface. Trace the cause and check other consumers of the same implementation or artifacts produced by the same faulty process. Fix confirmed instances within scope and rerun the original reproduction. Apply a subjective preference to the scope the user gave it.
- For repeated work, prove one representative result end to end before scaling up. Give each delivered item a lightweight check that distinguishes it from a stale build, a template, or the wrong output. Repeat the full check when the shared build or delivery process changes.
- Turn a recurring failure into a repeatable regression check when practical. Reuse existing checks. A useful check rejects a known bad result and accepts the intended one.

## Deliver and hand off

- Resolve failures within the authorized scope and rerun affected checks before reporting completion. If a necessary environment, account, or device is unavailable, complete the checks you can and name the precise behavior that remains unverified.
- Point the user to the deliverable. Briefly state what you actually exercised, what you observed, and any material limit. Carry those facts into a later handoff so a pending check stays pending.
