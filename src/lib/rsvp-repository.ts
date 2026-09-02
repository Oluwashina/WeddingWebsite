import { promises as fs } from "fs";
import path from "path";
import type { RsvpRecord, RsvpSubmission } from "@/lib/types";
import { createReference } from "@/lib/utils";

/**
 * RSVP persistence.
 *
 * The prototype writes to `.data/rsvps.json` (and falls back to memory on
 * read-only filesystems) so the couple can see real responses while testing.
 * Swap in `supabaseRsvpRepository` when the project is connected:
 *
 *   await supabase.from("rsvps").insert({ ...submission, reference }).select().single();
 */
export interface RsvpRepository {
  create(submission: RsvpSubmission): Promise<RsvpRecord>;
  list(): Promise<RsvpRecord[]>;
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "rsvps.json");

// Survives hot reloads in dev, and covers serverless/read-only filesystems.
const memory: RsvpRecord[] = [];

async function readAll(): Promise<RsvpRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as RsvpRecord[];
  } catch {
    return memory;
  }
}

async function writeAll(records: RsvpRecord[]): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), "utf8");
  } catch {
    memory.splice(0, memory.length, ...records);
  }
}

const fileRsvpRepository: RsvpRepository = {
  async create(submission) {
    const records = await readAll();
    const record: RsvpRecord = {
      ...submission,
      id: `rsvp_${Date.now().toString(36)}`,
      reference: createReference(),
      createdAt: new Date().toISOString(),
    };
    records.push(record);
    memory.push(record);
    await writeAll(records);
    return record;
  },

  async list() {
    const records = await readAll();
    return [...records].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
};

export const rsvpRepository: RsvpRepository = fileRsvpRepository;
