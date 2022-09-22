import { atom } from "recoil"
import { DjangoUser } from "../types/Types"

export const loggedInUser = atom<DjangoUser>({
    key: "loggedInUser",
    default: undefined
})