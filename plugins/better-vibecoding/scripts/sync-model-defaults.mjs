import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const plugin = new URL("../", import.meta.url);
const command = "node plugins/better-vibecoding/scripts/sync-model-defaults.mjs";
const args = process.argv.slice(2);
const check = args[0] === "--check";
if (args.length !== Number(check)) {
  console.error(`Usage: ${command} [--check]`);
  process.exit(2);
}

const { available, defaultEffort, efforts, pi, roles, tiers } = JSON.parse(
  readFileSync(new URL("models.json", plugin), "utf8"),
);
if (defaultEffort !== "session" && !efforts.includes(defaultEffort)) {
  throw new Error(`Unknown default effort ${defaultEffort} in models.json.`);
}
const labels = { default: "Default", strongest: "Strongest", worker: "Worker", panel: "Panel" };
const asList = (value) => Array.isArray(value) ? value : [value];
const codeList = (values) => asList(values).map((value) => `\`${value}\``).join(", ");
const pending = new Map();

function replaceBlock(file, name, lines, { prefix = "<!--", suffix = " -->" } = {}) {
  const path = new URL(file, plugin);
  const original = readFileSync(path, "utf8");
  const newline = original.includes("\r\n") ? "\r\n" : "\n";
  const source = (pending.get(file) ?? original).split(newline);
  const start = source.indexOf(`${prefix} BEGIN GENERATED ${name}${suffix}`);
  const end = source.indexOf(`${prefix} END GENERATED ${name}${suffix}`);
  if (start < 0 || end <= start) {
    throw new Error(`${file} is missing the generated ${name} markers.`);
  }
  source.splice(start + 1, end - start - 1, ...lines);
  const updated = source.join(newline);
  if (updated !== original) pending.set(file, updated);
  else pending.delete(file);
}

const skillNames = new Set(roles.map(({ skill }) => skill));
for (const { role, models } of roles) {
  if (!Object.hasOwn(labels, models) || !Object.hasOwn(tiers, models)) {
    throw new Error(`Unknown model tier ${models} for ${role} in models.json.`);
  }
}

for (const entry of readdirSync(new URL("skills/", plugin), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = `skills/${entry.name}/SKILL.md`;
  const source = readFileSync(new URL(file, plugin), "utf8");
  if (!source.includes("<!-- BEGIN GENERATED role defaults -->")) continue;
  const defaults = roles.filter(({ skill }) => skill === entry.name);
  replaceBlock(file, "role defaults", defaults.map(({ role, models }) => `- ${role}: ${codeList(tiers[models])}`));
  skillNames.delete(entry.name);
}
if (skillNames.size > 0) {
  throw new Error(`Missing generated role defaults in ${[...skillNames].join(", ")}.`);
}

const setup = "skills/setup-pstack";
replaceBlock(`${setup}/SKILL.md`, "Claude model catalog", [
  `- Available Claude models: ${codeList(available)}`,
  `- Default panel: ${codeList(tiers.panel)}`,
  `- Reasoning effort levels: ${codeList(efforts)}`,
  `- Default reasoning effort for a new sheet: ${codeList(defaultEffort)}`,
  `- Single-role default: ${codeList(tiers.default)}`,
]);
replaceBlock(`${setup}/SKILL.md`, "Claude sheet defaults", [
  "```text",
  ...roles.map(({ role, models }) => `${role}: ${asList(tiers[models]).join(", ")}`),
  "",
  `default effort: ${defaultEffort}`,
  "fast mode: off",
  "session hook: on",
  "```",
]);
replaceBlock(`${setup}/copilot.md`, "Copilot role tiers", [
  "| Tier | Roles |",
  "| --- | --- |",
  ...Object.entries(labels).map(([tier, label]) => {
    const names = roles.filter(({ models }) => models === tier).map(({ role }) => role);
    return `| ${label} | ${codeList(names)} |`;
  }),
]);
replaceBlock(`${setup}/scripts/sheet.awk`, "sheet metadata", [
  ...roles.map(({ role }) => `  roles[++n] = ${JSON.stringify(role)}`),
  ...roles.filter(({ models }) => models === "panel").map(({ role }) => `  panel[${JSON.stringify(role)}] = 1`),
  ...efforts.map((effort) => `  SHEET_EFFORT[${JSON.stringify(effort)}] = 1`),
], { prefix: "  #", suffix: "" });

const providers = Object.keys(pi.models);
replaceBlock("skills/poteto-mode/references/pi-tools.md", "Pi model mappings", [
  `| Alias | ${providers.map((provider) => `\`${provider}\``).join(" | ")} |`,
  `| ${["Alias", ...providers].map(() => "---").join(" | ")} |`,
  ...available.map((alias) => {
    const ids = providers.map((provider) => pi.models[provider][alias]);
    return `| \`${alias}\` | ${ids.map((id) => id ? `\`${id}\`` : "").join(" | ")} |`;
  }),
]);

if (check && pending.size > 0) {
  console.error(`Model defaults are out of date:\n${[...pending.keys()].join("\n")}\nRun ${command}.`);
  process.exitCode = 1;
} else {
  for (const [file, source] of pending) writeFileSync(new URL(file, plugin), source);
}
