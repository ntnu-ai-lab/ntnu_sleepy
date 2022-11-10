import { SleepRestriction } from "../types/Types";
import { callApi } from "./callApi";

export async function startSleepRestriction(riseTime: string) {
  const riseTimeObject = {custom_rise_time: riseTime}
  console.log(riseTimeObject)
  const response = await callApi<SleepRestriction>(
    `sleepdiary/sleeprestriction/`,
    {
      method: "POST",
      body: JSON.stringify(riseTimeObject),
    }
  );
  console.log("POST: ",response.response)
  console.log("POST: ",response.data)
  console.log("POST: ",response.error)
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
  console.log("GET: ",response.response)
  console.log("GET: ",response.data)
  console.log("GET: ",response.error)
  return response.data;
}

export async function changeRiseTimeSleepRestriction(riseTime: string) {
  const response = await callApi<SleepRestriction>(
    `sleepdiary/sleeprestriction/`,
    {
      method: "PATCH",
      body: JSON.stringify(riseTime),
    }
  );
  return response.data;
}
