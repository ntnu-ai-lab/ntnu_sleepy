import { storeLocalUser } from "../devicestorage/StorageController";
import { callApi } from "../helpers/callApi";
import { DjangoUser } from "../types/Types";

export async function createUser(
  user: DjangoUser,
  identiyId: string,
  token: string
) {
  await callApi<DjangoUser>(`/users/${identiyId}/`, {
    method: "PATCH",
    body: JSON.stringify(user),
  });
}

export async function getTest(identiyId: string) {
  const response = await callApi<DjangoUser>(`/users/${identiyId}/`, {
    method: "GET",
  });

  if (response.data) {
    const user: DjangoUser = {
      name: response.data.name,
    };
    storeLocalUser(user);
  }
}
