import { atom } from "recoil";
import { Module, SleepDiary } from "../types/modules";
import { User } from "../types/Types";

export const loggedInUser = atom<User>({
  key: "loggedInUser",
  default: undefined,
});

export const cachedModules = atom<Module[]>({
  key: "cachedModules",
  default: undefined,
});

export const cachedSleepDiary = atom<SleepDiary>({
  key: "cachedSleepDiary",
  default: undefined,
});
