import { SleepDiary } from "../types/modules";
import { callApi } from "./callApi";

export async function sendSleepDiary(SleepDiary: SleepDiary) {
  await callApi<never>(`sleepdiary/diary/`, {
    method: "PUT",
    body: JSON.stringify(SleepDiary),
  });
}
