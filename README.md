# Better-Vibecoding

[简体中文](README.zh-CN.md)

A collection of skills and plugins for everyday development.

## Architecture and delivery rules

Open this checkout in an agent that reads [AGENTS.md](AGENTS.md) and describe the task normally. A clear local change goes straight to implementation and verification. For work that needs a deeper workflow, the checkout includes [pstack](vendor/pstack/plugins/pstack/skills/poteto-mode/SKILL.md) and these project extensions:

- The [feature workflow](.agents/playbooks/feature-delivery.md) traces a real caller and uses `architect` to settle shared boundaries. Before delivery, it checks for competing business rules and obsolete paths.
- The [bug-fix workflow](.agents/playbooks/bug-fix-delivery.md) reproduces the defect and identifies its owner. If two fixes based on the same assumption fail the same check, it tests that assumption before another patch. Structural repairs preserve caller contracts and retire superseded implementations.

To adopt the integration elsewhere, merge the rules into the target project's instructions and copy `.agents/playbooks/` and `vendor/pstack/` into the same relative locations. Preserve executable file modes. Agents with a different instruction entry point can reference `AGENTS.md` there.

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

Startup hooks use the host's trust settings. Repository instructions work independently of those hooks. Tool availability, model access, and permissions depend on the host.

## Skills

| Skill | What it does |
| --- | --- |
| [auto-chat](skills/auto-chat/SKILL.md) | Helps Codex desktop decide when to start a new chat. The receiving chat gets the project state, relevant user corrections, and acceptance criteria. |

### Install and use auto-chat

Copy the `skills/auto-chat` directory into your personal Codex skills directory. The default installed path is `~/.codex/skills/auto-chat/SKILL.md`. If you set `CODEX_HOME`, use the `skills/auto-chat/` directory underneath it.

In a project chat, say “When a new request would fit better in a separate chat, create one and hand it over.” You can also mention `$auto-chat` with the same request. To enable it for every project and new chat, add that instruction and its scope to your own global Codex rules.

Corrections and follow-ups stay in the current chat. A request with its own deliverable and acceptance criteria can move to a new chat that has access to the same working directory. Say “keep this one here” to override that decision.
