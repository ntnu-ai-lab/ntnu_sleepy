import { atom } from "recoil";
import { User } from "../types/Types";

export const loggedInUser = atom<User>({
  key: "loggedInUser",
  default: undefined,
});
