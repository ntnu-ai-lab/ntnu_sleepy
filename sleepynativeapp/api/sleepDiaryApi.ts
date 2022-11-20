import { DiaryEntry, DiaryEntryServer, SleepDiary } from "../types/sleepDiary";
import { callApi } from "./callApi";

// Overloads
// If we have a full entry we get a full entry
export function serverToClient(entry: DiaryEntryServer): DiaryEntry;
//If we have a partial entry we get exactly the same attributes back
export function serverToClient<T extends keyof DiaryEntryServer>(
  entry: Pick<DiaryEntryServer, T>
): Pick<DiaryEntry, T>;
// For unknown partials we get an unknown partial back
export function serverToClient(
  entry: Partial<DiaryEntryServer>
): Partial<DiaryEntry>;

export function serverToClient(
  entry: Partial<DiaryEntryServer>
): Partial<DiaryEntry> {
  return {
    ...entry,
    date: entry.date ? new Date(entry.date) : undefined,
    bedtime: entry.bedtime ? new Date(entry.bedtime) : undefined,
    lights_out: entry.lights_out ? new Date(entry.lights_out) : undefined,
    waketime: entry.waketime ? new Date(entry.waketime) : undefined,
    risetime: entry.risetime ? new Date(entry.risetime) : undefined,
    naps: entry.naps
      ? entry.naps.map((nap) => [new Date(nap[0]), new Date(nap[1])])
      : undefined,
  };
}

function dateToIsoTime(
  date: Date
): `${number}:${number}${"+" | "-"}${number}:${number}` {
  return `${date.getHours()}:${date.getMinutes()}${
    date.getTimezoneOffset() > 0 ? "+" : "-"
  }${Math.floor(date.getTimezoneOffset() / 60)}:${
    date.getTimezoneOffset() % 60
  }`;
}

function dateToIsoDate(date: Date): `${number}-${number}-${number}` {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function clientToServer(entry: DiaryEntry): DiaryEntryServer;
export function clientToServer<T extends keyof DiaryEntry>(
  entry: Pick<DiaryEntry, T>
): Pick<DiaryEntryServer, T>;
export function clientToServer(
  entry: Partial<DiaryEntry>
): Partial<DiaryEntryServer>;

export function clientToServer(
  entry: Partial<DiaryEntry>
): Partial<DiaryEntryServer> {
  return {
    ...entry,
    date: entry.date ? dateToIsoDate(entry.date) : undefined,
    bedtime: entry.bedtime?.toISOString(),
    lights_out: entry.lights_out?.toISOString(),
    waketime: entry.waketime?.toISOString(),
    risetime: entry.risetime?.toISOString(),
    naps: entry.naps?.map((nap) => [
      nap[0].toISOString(),
      nap[1].toISOString(),
    ]),
  };
}

export const createDiary = async () =>
  (await callApi<SleepDiary>("sleepdiary/diary/", { method: "POST" })).data;

export async function getDiary(): Promise<SleepDiary | undefined> {
  return (await callApi<SleepDiary[]>("sleepdiary/diary/")).data?.[0];
}

export async function listDiaryEntries(
  diary: SleepDiary["id"]
): Promise<DiaryEntry[] | undefined> {
  return (
    await callApi<DiaryEntryServer[]>(`sleepdiary/diary/${diary}/entries/`)
  ).data?.map((entry) => serverToClient(entry));
}

export async function createDiaryEntry(
  diary: SleepDiary["id"],
  entry: Pick<DiaryEntry, "day_rating" | "naps">
): Promise<Partial<DiaryEntry> | undefined> {
  const data = (
    await callApi<Partial<DiaryEntryServer>>(
      `sleepdiary/diary/${diary}/entries/`,
      {
        method: "POST",
        body: JSON.stringify(entry),
      }
    )
  ).data;
  return data && serverToClient(data);
}

export async function finishDiaryEntry(
  diary: SleepDiary["id"],
  entry: Partial<DiaryEntry>
): Promise<DiaryEntry | undefined> {
  return (
    await callApi<DiaryEntry>(
      `sleepdiary/diary/${diary}/entries/${entry.id}/`,
      {
        method: "PATCH",
        body: JSON.stringify(clientToServer(entry)),
      }
    )
  ).data;
}
