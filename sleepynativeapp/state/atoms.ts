import { atom } from "recoil"
import { DjangoUser } from "../helpers/Types"

export const loggedInUser = atom<DjangoUser>({
    key: "loggedInUser",
    default: undefined
})