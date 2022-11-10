import { SleepRestriction } from "../types/Types";
import { callApi } from "./callApi";

export async function startSleepRestriction(riseTime: string) {
  const riseTimeObject = {custom_rise_time: riseTime}
  const response = await callApi<SleepRestriction>(
    `sleepdiary/sleeprestriction/`,
    {
      method: "POST",
      body: JSON.stringify(riseTimeObject),
    }
  );
  return response.data;
}

export async function getSleepRestriction() {
  const response = await callApi<SleepRestriction>(
    `sleepdiary/sleeprestriction/`,
    {
      method: "GET",
      body: null,
    }
  );
  return response.data;
}

export async function changeRiseTimeSleepRestriction(riseTime: string, id: string) {
  const riseTimeObject = {custom_rise_time: riseTime}
  const response = await callApi<SleepRestriction>(
    `sleepdiary/sleeprestriction/${id}/`,
    {
      method: "PATCH",
      body: JSON.stringify(riseTimeObject),
    }
  );
  return response.data;
}
