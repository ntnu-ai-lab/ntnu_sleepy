import { storeLocalUser } from "../state/StorageController";
import { callApi } from "./callApi";
import { User, Profile, DjangoUser } from "../types/Types";

export async function createUser(user: DjangoUser, identiyId: string) {
  const response = await callApi<DjangoUser>(`users/${identiyId}/`, {
    method: "PATCH",
    body: JSON.stringify(user),
  });
  return response.data;
}

export async function updateProfile(profile: Profile, identityId: string) {
  const response = await callApi<Profile>(`users/profiles/${identityId}/`, {
    method: "PATCH",
    body: JSON.stringify(profile),
  });
  return response.data;
}

export async function readyUserForSleepRestriction(
  user: User,
  identiyId: string
) {
  user.sleepRestriction = true;

  const response = await callApi<User>(`users/${identiyId}/`, {
    method: "PATCH",
    body: JSON.stringify(user),
  });
  return response.data;
}

export async function getUserByIdentiyId(identiyId: string) {
  const response = await callApi<User>(`users/profiles/${identiyId}/`, {
    method: "GET",
  });
  if (!response.response.ok) return undefined;
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
    return user;
  }
}
