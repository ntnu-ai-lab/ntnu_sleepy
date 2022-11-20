import { atom } from "recoil";
import { ModuleProgression, SleepRestriction, User } from "../types/Types";
import { Module, ModuleExpanded } from "../types/modules";
import { SleepDiary } from "../types/sleepDiary";

export const loggedInUser = atom<User | undefined>({
  key: "loggedInUser",
  default: undefined,
});

export const cachedModules = atom<ModuleExpanded[]>({
  key: "cachedModules",
  default: [],
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

export const mySleepRestriction = atom<SleepRestriction>({
  key: "mySleepRestriction",
  default: undefined,
});
