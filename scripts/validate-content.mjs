/**
 * Structural validation of the authored content.
 *
 * Catches the silent failures: a choice pointing at a misconception id that no
 * longer exists still renders fine to the student and simply vanishes from the
 * teacher rollup. Run in CI once content is real.
 *
 *   npm run validate:content
 */
import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const src = fileURLToPath(new URL("../src", import.meta.url));

const out = await build({
  entryPoints: [join(src, "content/validate.ts")],
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
  alias: { "@": src },
});

const dir = mkdtempSync(join(tmpdir(), "mc-validate-"));
const file = join(dir, "validate.mjs");
writeFileSync(file, out.outputFiles[0].text);

const { validateContent } = await import(file);

const issues = validateContent();
const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warning");

for (const i of issues) {
  const tag = i.level === "error" ? "ERROR  " : "warning";
  console.log(`${tag}  ${i.where}\n         ${i.message}`);
}

console.log(
  `\n${errors.length} error(s), ${warnings.length} warning(s)`,
);
process.exit(errors.length > 0 ? 1 : 0);
