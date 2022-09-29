import { atom } from "recoil";
import { Module } from "../types/modules";
import { DjangoUser } from "../types/Types";

export const loggedInUser = atom<DjangoUser>({
  key: "loggedInUser",
  default: undefined,
});

export const cachedModules = atom<Module[]>({
  key: "cachedModules",
  default: undefined,
});
