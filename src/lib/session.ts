import type { Response } from "@/content/types";

/**
 * Anonymous session handling.
 *
 * This module is the enforcement point for the product's COPPA-aware claim.
 * The claim is only true if it is true *here*, so the rules are written down
 * rather than assumed:
 *
 *   1. No student name, email, username, or free-text identity field is
 *      collected anywhere in this app. There is no input for one.
 *   2. No device or browser fingerprinting, no analytics SDK, no third-party
 *      script that could correlate a session back to a person.
 *   3. A session code identifies a CLASS RUN, not a student. Several students
 *      share one code; responses inside it are not linked to each other.
 *   4. Per-student local state stays in this browser only, under a random
 *      participant id that is never sent anywhere and is not derived from
 *      anything about the device.
 *
 * If a future change adds a field that identifies a person, the privacy copy
 * in `src/content/copy.ts` becomes false and must change with it.
 */

/** Ambiguous glyphs removed -- these get read aloud and typed by 12-year-olds. */
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const GROUP = 3;
const GROUPS = 2;

function randomInts(count: number): Uint32Array {
  const out = new Uint32Array(count);
  crypto.getRandomValues(out);
  return out;
}

/** e.g. "K7M-4QP" -- readable across a classroom. */
export function generateSessionCode(): string {
  const values = randomInts(GROUP * GROUPS);
  const chars = Array.from(
    values,
    (v) => CODE_ALPHABET[v % CODE_ALPHABET.length],
  );
  return Array.from({ length: GROUPS }, (_, i) =>
    chars.slice(i * GROUP, (i + 1) * GROUP).join(""),
  ).join("-");
}

export function normaliseCode(input: string): string {
  const cleaned = input
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    // Forgive the glyphs excluded from the alphabet.
    .replace(/O/g, "0")
    .replace(/[IL]/g, "1")
    .slice(0, GROUP * GROUPS);
  return cleaned.length > GROUP
    ? `${cleaned.slice(0, GROUP)}-${cleaned.slice(GROUP)}`
    : cleaned;
}

export function isCompleteCode(code: string): boolean {
  return normaliseCode(code).replace("-", "").length === GROUP * GROUPS;
}

/**
 * A random per-browser participant id. Not derived from the device, not
 * transmitted, and used only so a student can resume a run they walked away
 * from. Clearing site data removes it and nothing is lost but progress.
 */
export function participantId(): string {
  const KEY = "mc.participant";
  let id = safeGet(KEY);
  if (!id) {
    id = Array.from(randomInts(4), (v) => v.toString(36)).join("");
    safeSet(KEY, id);
  }
  return id;
}

export interface SessionRun {
  code: string;
  startedAt: number;
  responses: Response[];
  completedAt: number | null;
}

const runKey = (code: string) => `mc.run.${code}.${participantId()}`;

export function loadRun(code: string): SessionRun | null {
  const raw = safeGet(runKey(code));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionRun;
  } catch {
    return null;
  }
}

export function saveRun(run: SessionRun): void {
  safeSet(runKey(run.code), JSON.stringify(run));
}

export function startRun(code: string): SessionRun {
  const run: SessionRun = {
    code,
    startedAt: Date.now(),
    responses: [],
    completedAt: null,
  };
  saveRun(run);
  return run;
}

export function clearRun(code: string): void {
  safeRemove(runKey(code));
}

/* localStorage is unavailable in some locked-down school profiles and in
   private windows -- degrade to in-memory rather than throwing. */
const memory = new Map<string, string>();

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    memory.set(key, value);
  }
}

function safeRemove(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    memory.delete(key);
  }
}
