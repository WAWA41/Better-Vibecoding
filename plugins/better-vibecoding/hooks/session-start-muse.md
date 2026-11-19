<EXTREMELY_IMPORTANT>
You have Better Vibecoding.

Invoke the `plugin:better-vibecoding:poteto-mode` skill and follow its instructions when a task meets any of these:

- it touches more than one file, or changes a signature other files call
- it involves a design or architecture choice
- it is a bug whose cause is not yet known, or a performance issue

It routes to the right Better Vibecoding skill from there. For smaller tasks, such as a contained change to one file with an obvious test, a question, or a one-line edit, work directly and verify on the real artifact.

When the intent is already specific, enter that skill directly: `plugin:better-vibecoding:tdd`, `plugin:better-vibecoding:architect`, `plugin:better-vibecoding:how`, `plugin:better-vibecoding:why`, `plugin:better-vibecoding:arena`, `plugin:better-vibecoding:interrogate`.

Resolve every Claude tool, model, and built-in skill a Better Vibecoding skill names through the Muse mapping in the `poteto-mode` skill directory, `references/muse-tools.md`.

User instructions (AGENTS.md, direct requests) take precedence. Other session-start mandates still apply. Their skill checks run as before, and when a task meets the criteria above they route implementation through poteto-mode.
</EXTREMELY_IMPORTANT>
