# Better-Vibecoding

[简体中文](README.zh-CN.md)

A collection of skills and plugins for everyday development.

## Reusable agent rules

The [agent delivery rules](AGENTS.md) apply in this repository and can be reused in other projects. They cover acceptance criteria, testing the actual deliverable, investigating related defects, and verifying batches before handoff.

To adopt them in another repository, copy `AGENTS.md` to its root. If it already has an instructions file, merge the relevant sections and keep its project-specific commands and constraints. For an agent that reads a different instructions file, reference these rules from that entry point or merge them there. The rules work without pstack or a separately installed skill.

## Use pstack in a repository

Better-Vibecoding includes two native pstack project playbooks. The [feature playbook](.agents/playbooks/feature-delivery.md) adds acceptance checks to planning and verification. The [bug-fix playbook](.agents/playbooks/bug-fix-delivery.md) checks for the same defect in related outputs and reruns the original reproduction on the delivered version.

1. Install the pstack plugin once per Codex environment if needed. The [upstream installation guide](https://github.com/h00mankind/pstack#install) lists both Codex CLI commands:

   ```sh
   codex plugin marketplace add h00mankind/pstack
   codex plugin add pstack@pstack
   ```

2. To adopt this integration elsewhere, merge the root `AGENTS.md` and copy the two playbook files to `.agents/playbooks/` in the target repository. Commit them alongside its existing instructions. This checkout already includes both parts.
3. Open the repository in Codex and invoke `$pstack:poteto-mode` with a feature request or bug report. In the task plan, look for the acceptance check on the deliverable or the check for other affected outputs.

After updating pstack, run `node "<pstack-plugin-dir>/skills/poteto-mode/scripts/check-playbooks.mjs" .` from the repository root. Replace the placeholder with the installed plugin directory. The checker verifies that the extensions still match the upstream steps. Run the product's own checks to verify the deliverable.

## Skills

| Skill | What it does |
| --- | --- |
| [auto-chat](skills/auto-chat/SKILL.md) | Helps Codex desktop decide when to start a new chat. The receiving chat gets the project state, relevant user corrections, and acceptance criteria. |

### Install and use auto-chat

Copy the `skills/auto-chat` directory into your personal Codex skills directory. The default installed path is `~/.codex/skills/auto-chat/SKILL.md`. If you set `CODEX_HOME`, use the `skills/auto-chat/` directory underneath it.

In a project chat, say “When a new request would fit better in a separate chat, create one and hand it over.” You can also mention `$auto-chat` with the same request. To enable it for every project and new chat, add that instruction and its scope to your own global Codex rules.

Corrections and follow-ups stay in the current chat. A request with its own deliverable and acceptance criteria can move to a new chat that has access to the same working directory. Say “keep this one here” to override that decision.
