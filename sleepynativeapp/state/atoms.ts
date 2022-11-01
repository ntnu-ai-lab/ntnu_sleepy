import { atom } from "recoil";
import { Module, SleepDiary } from "../types/modules";
import { ModuleProgression, User } from "../types/Types";

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

// This should be stored on server aswell so that users that log out of the app does not lose progression
export const moduleProgression = atom<ModuleProgression[]>({
  key: "moduleProgression",
  default: []
})
