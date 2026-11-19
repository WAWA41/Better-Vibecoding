#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const BUNDLED = resolve(dirname(fileURLToPath(import.meta.url)), "../playbooks");
const PLUGIN_ROOT = resolve(BUNDLED, "../../..");
const CHANGE = /^\s*(?:[-*]|\d+\.)\s+\*\*(?:After|Before|Replace|In)\*\*\s+"([^"]+)"/;
const CHANGE_VERB = /^\s*(?:[-*]|\d+\.)\s+\*\*(?:After|Before|Replace|In)\*\*/;
const flat = (text) => text.replace(/\s+/g, " ");

export function checkPlaybooks(root, bundled = BUNDLED) {
  const dir = join(root, ".agents/playbooks");
  if (!existsSync(dir)) return [];
  const problems = [];
  for (const name of readdirSync(dir).filter((file) => file.endsWith(".md")).sort()) {
    const path = `.agents/playbooks/${name}`;
    const text = readFileSync(join(dir, name), "utf8").replace(/^\uFEFF/, "").replaceAll("\r\n", "\n");
    const front = text.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
    const field = (key) => front.match(new RegExp(`^${key}:[ \\t]*(.*)$`, "m"))?.[1].trim() ?? "";
    if (!field("when")) problems.push(`${path}: its frontmatter needs a "when:" line`);
    const bases = field("extends")
      .split(",")
      .map((stem) => stem.trim())
      .filter(Boolean)
      .map((stem) => {
        const file = join(bundled, `${stem}.md`);
        const known = !/[\\/]/.test(stem) && existsSync(file);
        return { stem, text: known ? readFileSync(file, "utf8") : null };
      });
    for (const base of bases) {
      if (base.text === null) problems.push(`${path}: extends \`${base.stem}\`, which this plugin has no playbook for`);
    }
    for (const line of text.split("\n")) {
      if (CHANGE_VERB.test(line) && !CHANGE.test(line)) {
        problems.push(`${path}: a change has no straight-quoted step text to anchor on: ${line.trim().slice(0, 80)}`);
      }
      const anchor = line.match(CHANGE)?.[1];
      if (anchor && !bases.some((base) => base.text && flat(base.text).includes(flat(anchor)))) {
        problems.push(`${path}: "${anchor}" is not in any playbook it extends`);
      }
    }
  }
  return problems;
}

// node leaves argv[1] unresolved and may set it to a non-file (`node -e ... arg`).
function invokedDirectly() {
  if (!process.argv[1]) return false;
  try {
    return fileURLToPath(import.meta.url) === realpathSync(process.argv[1]);
  } catch {
    return false;
  }
}

if (invokedDirectly()) {
  const root = resolve(process.argv[2] ?? ".");
  const problems = checkPlaybooks(PLUGIN_ROOT).map((message) => `Plugin: ${message}`);
  for (const file of ["feature-delivery.md", "bug-fix-delivery.md"]) {
    if (!existsSync(join(PLUGIN_ROOT, ".agents/playbooks", file))) problems.push(`Missing plugin workflow: ${file}`);
  }
  if (!statSync(root, { throwIfNoEntry: false })?.isDirectory()) problems.push(`${root} is not a directory`);
  else if (root !== PLUGIN_ROOT) problems.push(...checkPlaybooks(root));
  if (problems.length > 0) {
    console.error(problems.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("The bundled delivery workflows and any project playbooks match the installed playbook steps.");
  }
}
