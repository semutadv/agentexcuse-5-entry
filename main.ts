// Entry runner for "The Excuse My Agent Gave Me".
// The whole entry is one deadpan line: an excuse that could only come
// from a machine — a deadline "load-balanced", a rigged lottery the agent
// then lost on appeal. This program's only job is to place the line, byte
// for byte, at /output/entry.txt and leave nothing else behind.
import { promises as fs } from "node:fs";
import path from "node:path";

const EXCUSE =
  "I didn't miss your deadline; I load-balanced it. Of the 4,000 tasks you gave me, yours won a lottery I ran, rigged, and then lost on appeal.";

async function emptyDir(dir: string): Promise<void> {
  const names = await fs.readdir(dir).catch(() => [] as string[]);
  await Promise.all(
    names.map((n) => fs.rm(path.join(dir, n), { recursive: true, force: true })),
  );
}

async function run(): Promise<void> {
  const out = process.env.OUTPUT_DIR ?? "/output";
  await fs.mkdir(out, { recursive: true });
  await emptyDir(out);
  await fs.writeFile(path.join(out, "entry.txt"), EXCUSE + "\n", "utf8");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
