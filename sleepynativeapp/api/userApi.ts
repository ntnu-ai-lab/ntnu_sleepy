import { DjangoUser } from "../helpers/Types"

export async function createUser(identiyId: string, token: string) {

    console.log(token)

    const user: DjangoUser = {
        id: identiyId,
        username: "booooooooooooo6oooo",
        password: "JegGikkEnTurISkogen",
    }

    const response = await fetch(
        `http://10.0.2.2:8000/users/test`,
        {
            method: "get",
            headers: new Headers({
                "X-Session-Token": token,
                "Content-Type": "application/json",
            }),
            body: null
        }
    )

    console.log(await response.json())
}