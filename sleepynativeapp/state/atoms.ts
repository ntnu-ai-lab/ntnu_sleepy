import { atom } from "recoil";
import { Module, SleepDiary } from "../types/modules";
import { User } from "../types/Types";

export const loggedInUser = atom<User | undefined>({
  key: "loggedInUser",
  default: undefined,
});

export const cachedModules = atom<Module[] | undefined>({
  key: "cachedModules",
  default: undefined,
});

export const cachedSleepDiary = atom<SleepDiary | undefined>({
  key: "cachedSleepDiary",
  default: undefined,
});

export const moduleIds = atom<Module[] | undefined>({
  key: "cachedModuleIds",
  default: undefined,
})
