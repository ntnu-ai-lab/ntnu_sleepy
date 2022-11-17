import { getAuthenticatedSession } from "../auth/Auth";
import Constants from "expo-constants";
const { manifest } = Constants;

const api =
  manifest?.extra?.useLocal === "true" && manifest?.debuggerHost
    ? `http://${manifest.debuggerHost.split(`:`).shift()}:8000`
    : manifest?.extra?.apiUrl;

export async function callApi<T>(
  path: string,
  init?: RequestInit
): Promise<{ response: Response; data?: T; error?: any }> {
  const response = await fetch(`${api}/${path}`, {
    ...init,
    headers: {
      "X-Session-Token": (await getAuthenticatedSession())?.session_token ?? "",
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
  });
  if (response.headers.get("Content-Type") === "application/json") {
    if (response.ok) {
      return { response, data: await response.json() };
    }
    const error = await response.json();
    console.error(error);
    return { response, error };
  }
  return { response };
}
