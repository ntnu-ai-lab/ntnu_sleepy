import { callApi } from "../helpers/callApi";
import { AnswerList } from "../types/modules";

export async function sendAnswerList(answerlist: AnswerList) {
    await callApi<never>(`modules/answer-list/`, {
        method: "POST",
        body: JSON.stringify(answerlist)
    });
}