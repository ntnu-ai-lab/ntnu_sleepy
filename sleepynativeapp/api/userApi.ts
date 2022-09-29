import { storeLocalUser } from "../devicestorage/StorageController";
import { callApi } from "../helpers/callApi";
import { User } from "../types/Types";

export async function createUser(user: User, identiyId: string) {
  await callApi<User>(`/users/${identiyId}/`, {
    method: "PATCH",
    body: JSON.stringify(user),
  });
}

export async function getTest(identiyId: string) {
  const response = await callApi<User>(`/users/${identiyId}/`, {
    method: "GET",
  });

  if (response.data) {
    const user: User = {
      name: response.data.name,
      email: response.data.email,
      dateOfBirth: response.data.dateOfBirth,
      gender: response.data.gender,
      occupation: response.data.occupation,
      relationshipStatus: response.data.relationshipStatus,
    };
    storeLocalUser(user);
  }
}
