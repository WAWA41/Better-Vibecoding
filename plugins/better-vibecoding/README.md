# Better Vibecoding

WAWA41 maintains this plugin in `plugins/better-vibecoding/`. Edit a skill's `SKILL.md` here to change how it works. The shared workflow entry is [poteto-mode](skills/poteto-mode/SKILL.md). Its [base playbooks](skills/poteto-mode/playbooks) define the steps for design, debugging, review, and delivery. The [delivery workflows](.agents/playbooks) and their [guides](.agents/references) ship with every install. A consuming repository can extend the base steps in its own `.agents/playbooks/`.

## Install and invoke

```sh
codex plugin marketplace add WAWA41/Better-Vibecoding
codex plugin add better-vibecoding@better-vibecoding
```

In Codex, select `better-vibecoding:poteto-mode` from the skill picker. For a local Claude Code session, run `claude --plugin-dir ./plugins/better-vibecoding` from the repository root and invoke `/better-vibecoding:poteto-mode`. Both use the files in this directory. The [repository README](https://github.com/WAWA41/Better-Vibecoding#architecture-and-delivery-rules) also covers using the rules directly from a checkout.

## Maintain the plugin

Edit [model defaults](models.json) here and run `node plugins/better-vibecoding/scripts/sync-model-defaults.mjs` from the repository root. After changing playbooks, run `node plugins/better-vibecoding/skills/poteto-mode/scripts/check-playbooks.mjs .` from the adopting project with the path to its copy of the plugin. When publishing a release, update `VERSION` and the native plugin manifests together.

The existing skill names, including `setup-pstack` and `poteto-mode`, remain available in the new namespace. For a migration, copy any settings you use from `pstack-models.md` to `better-vibecoding-models.md` alongside the original. If your runtime configuration explicitly includes the old sheet, point it at the new file. For example, update the `@.../pstack-models.md` import in your Claude Code instructions. Update explicit skill mentions to `better-vibecoding:<skill>`. Disable the previous plugin's routing hook if both installations are enabled. Existing Git resume checkpoints retain their storage format and location.

The [source history and licenses](ORIGINS.md) credit the original authors.
