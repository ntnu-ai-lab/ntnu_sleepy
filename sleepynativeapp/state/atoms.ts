import { atom } from "recoil";
import { Module } from "../types/modules";
import { User } from "../types/Types";

export const loggedInUser = atom<User>({
  key: "loggedInUser",
  default: undefined,
});

export const cachedModules = atom<Module[]>({
  key: "cachedModules",
  default: undefined,
});
