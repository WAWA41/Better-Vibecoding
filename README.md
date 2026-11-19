# Better-Vibecoding

[简体中文](README.zh-CN.md)

A collection of skills and plugins for everyday development.

## Architecture and delivery rules

Open this checkout in an agent that reads [AGENTS.md](AGENTS.md) and describe the task normally. The project rules use progressive disclosure. A button label edit can go straight to the rendered button for verification. When a change has wider consequences, the agent uses the matching project workflow with the Better Vibecoding plugin.

- The [feature workflow](plugins/better-vibecoding/.agents/playbooks/feature-delivery.md) opens the [shared contract guide](plugins/better-vibecoding/.agents/references/shared-contracts.md) for changes such as migrating a saved setting. A batch of exports calls for the [batch delivery guide](plugins/better-vibecoding/.agents/references/batch-delivery.md). Both apply if the task involves both risks.
- The [bug-fix workflow](plugins/better-vibecoding/.agents/playbooks/bug-fix-delivery.md) starts with the reproduction. If two fixes based on the same assumption fail the same check, test the assumption before another patch. Open the structural repair guidance when the confirmed cause calls for it.

To adopt the integration elsewhere, merge the rules into the target project's `AGENTS.md` and copy `plugins/better-vibecoding/` into the same relative location. Preserve executable file modes.

Run the compatibility check from the repository root after adoption or an upgrade:

```sh
node plugins/better-vibecoding/skills/poteto-mode/scripts/check-playbooks.mjs .
```

The checker verifies that project workflows reference steps in this version of the plugin. Edit the [plugin source](plugins/better-vibecoding/README.md) directly to customize it. The [origins and licenses](plugins/better-vibecoding/ORIGINS.md) identify the original authors.

### Optional native Codex plugin

To expose Better Vibecoding in the native skill menu on a machine without the plugin, use this repository's [marketplace](.agents/plugins/marketplace.json):

```sh
codex plugin marketplace add WAWA41/Better-Vibecoding
codex plugin add better-vibecoding@better-vibecoding
```

Already registered this marketplace? Run `codex plugin marketplace upgrade better-vibecoding` before installing the new plugin ID. To carry over model settings, copy `pstack-models.md` to `better-vibecoding-models.md` in the same runtime configuration directory and update any explicit imports of that file. Update saved skill mentions to `better-vibecoding:<skill>`. If the old plugin is enabled, disable its routing hook to avoid duplicate instructions.

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
