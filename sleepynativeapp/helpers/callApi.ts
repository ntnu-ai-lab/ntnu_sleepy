import { getAuthenticatedSession } from "../auth/Auth";
import Constants from "expo-constants";
const { manifest } = Constants;

const api =
  typeof manifest?.packagerOpts === `object` &&
  manifest.packagerOpts.dev &&
  manifest.debuggerHost
    ? "http://" + manifest.debuggerHost.split(`:`).shift()?.concat(`:8000`)
    : `https://somnus.idi.ntnu.no/api`;

export async function callApi<T>(
  path: string,
  init?: RequestInit
): Promise<{ response: Response; data?: T }> {
  const response = await fetch(`${api}/${path}`, {
    ...init,
    headers: {
      "X-Session-Token": (await getAuthenticatedSession())?.session_token ?? "",
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
  });
  if (
    response.ok &&
    response.headers.get("Content-Type") === "application/json"
  ) {
    return { response, data: await response.json() };
  }
  return { response };
}
