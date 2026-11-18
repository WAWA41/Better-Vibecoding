# Better-Vibecoding

[简体中文](README.zh-CN.md)

A collection of skills and plugins for everyday development.

## Architecture and delivery rules

Open this checkout in an agent that reads [AGENTS.md](AGENTS.md) and describe the task normally. The project rules use progressive disclosure. A button label edit can go straight to the rendered button for verification. When a change has wider consequences, the agent uses the matching project workflow with bundled pstack.

- The [feature workflow](.agents/playbooks/feature-delivery.md) opens the [shared contract guide](.agents/references/shared-contracts.md) for changes such as migrating a saved setting. A batch of exports calls for the [batch delivery guide](.agents/references/batch-delivery.md). Both apply if the task involves both risks.
- The [bug-fix workflow](.agents/playbooks/bug-fix-delivery.md) starts with the reproduction. If two fixes based on the same assumption fail the same check, test the assumption before another patch. Open the structural repair guidance when the confirmed cause calls for it.

To adopt the integration elsewhere, merge the rules into the target project's `AGENTS.md` and copy `.agents/playbooks/`, `.agents/references/`, and `vendor/pstack/` into the same relative locations. Preserve executable file modes.

Run the compatibility check from the repository root after adoption or an upgrade:

```sh
node vendor/pstack/plugins/pstack/skills/poteto-mode/scripts/check-playbooks.mjs .
```

The checker verifies upstream step references. Validate the delivered behavior through the project's usual entry points. The [source record](vendor/pstack/UPSTREAM.md) identifies the pinned upstream revision and licenses.

### Optional native Codex plugin

To expose pstack in the native skill menu on a machine without the plugin, use this repository's [marketplace](.agents/plugins/marketplace.json):

```sh
codex plugin marketplace add WAWA41/Better-Vibecoding
codex plugin add pstack@better-vibecoding
```

An enabled native plugin can also inject its own routing instructions at session start, subject to the host's trust settings. Repository instructions work independently of those hooks. Tool availability, model access, and permissions depend on the host.

### Design references

- Cloudflare routes a task such as storing uploads to the relevant product guide. [Cloudflare Skills](https://github.com/cloudflare/skills/blob/main/skills/cloudflare/SKILL.md)
- Superpowers links from a specific debugging symptom, a failure deep in the call stack, to a separate tracing technique. [Systematic Debugging](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/SKILL.md)

## Skills

| Skill | What it does |
| --- | --- |
| [auto-chat](skills/auto-chat/SKILL.md) | Helps Codex desktop decide when to start a new chat. The receiving chat gets the project state, relevant user corrections, and acceptance criteria. |

### Install and use auto-chat

Copy the `skills/auto-chat` directory into your personal Codex skills directory. The default installed path is `~/.codex/skills/auto-chat/SKILL.md`. If you set `CODEX_HOME`, use the `skills/auto-chat/` directory underneath it.

In a project chat, say “When a new request would fit better in a separate chat, create one and hand it over.” You can also mention `$auto-chat` with the same request. To enable it for every project and new chat, add that instruction and its scope to your own global Codex rules.

Corrections and follow-ups stay in the current chat. A request with its own deliverable and acceptance criteria can move to a new chat that has access to the same working directory. Say “keep this one here” to override that decision.
