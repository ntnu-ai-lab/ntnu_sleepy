import { getAuthenticatedSession } from "../auth/Auth";

export async function callApi<T>(
  path: string,
  init?: RequestInit
): Promise<{ response: Response; data?: T }> {
  const response = await fetch(`http://10.0.2.2:8000/${path}`, {
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
