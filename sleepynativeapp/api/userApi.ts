import { DjangoUser } from "../helpers/Types"

export async function createUser(user: DjangoUser, identiyId: string, token: string) {

    const response = await fetch(
        `http://10.0.2.2:8000/users/${identiyId}/`,
        {
            method: "PATCH",
            headers: new Headers({
                "X-Session-Token": token,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(user)
        }
    )

    console.log(await response.json())
}

export async function getTest(identiyId: string, token: string) {

    const response = await fetch(
        `http://10.0.2.2:8000/users/${identiyId}/`,
        {
            method: "GET",
            headers: new Headers({
                "X-Session-Token": token,
                "Content-Type": "application/json",
            }),
            body: null
        }
    )

    console.log(await response.json())
}