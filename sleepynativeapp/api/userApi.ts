import { storeLocalUser } from "../state/StorageController";
import { callApi } from "./callApi";
import { User } from "../types/Types";

export async function createUser(user: User, identiyId: string) {
  await callApi<User>(`users/${identiyId}/`, {
    method: "PATCH",
    body: JSON.stringify(user),
  });
}

export async function getTest(identiyId: string) {
  const response = await callApi<User>(`users/${identiyId}/`, {
    method: "GET",
  });
  console.log("Trying to fetch user...");
  if (!response.response.ok) return 0;
  if (response.data) {
    const user: User = {
      name: response.data.name,
      email: response.data.email,
      username: response.data.email,
      dateOfBirth: response.data.dateOfBirth,
      gender: response.data.gender,
      occupation: response.data.occupation,
      relationshipStatus: response.data.relationshipStatus,
    };
    storeLocalUser(user);
    console.log("Fetched user: " + user.name);
  }
}
