import { atom } from "recoil";
import { ModuleProgression, SleepRestriction, User } from "../types/Types";
import { DiaryEntry, Module, SleepDiary } from "../types/modules";

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
});

// This should be stored on server aswell so that users that log out of the app does not lose progression
export const moduleProgression = atom<ModuleProgression[]>({
  key: "moduleProgression",
  default: [],
});
export const cachedSleepDiaryEntry = atom<DiaryEntry>({
  key: "cachedSleepDiaryEntry",
  default: undefined,
});

export const mySleepRestriction = atom<SleepRestriction>({
  key: "mySleepRestriction",
  default: undefined,
})
