import { callApi } from "./callApi";
import { AnswerList } from "../types/modules";

export async function sendAnswerList(answerlist: AnswerList) {
    await callApi<never>(`modules/answer-lists/`, {
        method: "POST",
        body: JSON.stringify(answerlist)
    });
}