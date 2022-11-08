import { callApi } from "./callApi";
import { AnswerList } from "../types/modules";

export async function sendAnswerList(answerlist: AnswerList) {
    const response = await callApi<never>(`modules/answer-lists/`, {
        method: "POST",
        body: JSON.stringify(answerlist)
    });
    return response
}