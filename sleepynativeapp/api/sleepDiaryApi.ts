import { DiaryEntry, SleepDiary } from "../types/modules";
import { callApi } from "./callApi";

export const createDiary = async () =>
  (await callApi<SleepDiary>("/sleepdiary/diary/", { method: "POST" })).data;

export async function getDiary(): Promise<SleepDiary | undefined> {
  return (await callApi<SleepDiary[]>("/sleepdiary/diary/")).data?.[0];
}

export async function listDiaryEntries(
  diary: SleepDiary["id"]
): Promise<DiaryEntry[] | undefined> {
  return (await callApi<DiaryEntry[]>(`sleepdiary/diary/${diary}/entries/`))
    .data;
}

export async function createDiaryEntry(
  diary: SleepDiary["id"],
  entry: Pick<DiaryEntry, "day_rating" | "naps">
): Promise<Partial<DiaryEntry> | undefined> {
  return (
    await callApi<Partial<DiaryEntry>>(`/sleepdiary/diary/${diary}/entries/`, {
      method: "POST",
      body: JSON.stringify(entry),
    })
  ).data;
}

export async function finishDiaryEntry(
  diary: SleepDiary["id"],
  entry: Omit<DiaryEntry, "dayrating" | "naps">
): Promise<DiaryEntry | undefined> {
  return (
    await callApi<DiaryEntry>(
      `/sleepdiary/diary/${diary}/entries/${entry.id}`,
      { method: "PATCH", body: JSON.stringify(entry) }
    )
  ).data;
}
