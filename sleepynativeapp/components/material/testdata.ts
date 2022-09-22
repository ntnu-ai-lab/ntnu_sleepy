import { User } from '../../helpers/Types';
import {Module, Page, Section, Answer, AnswerList} from '../../types/modules'

const testTextSection: Section = {
    id: "test-section",
    heading: "Test heading",
    content: "Test Content",
    page: "test-page",
    type: "text"
}



const testFormSection: Section = {
    id: "test-section",
    heading: "Test heading",
    form: [
        {
            id: "test-input",
            type: "text",
            name: "test-name-input",
            label: "Test Label",
            helptext: "Test helptext",
            value: "Test value",
            section: "test-section",
            answers: [
                {
                    id: "test-answer-list",
                    input: "test-section",
                    answers: "test-answer-list",
                    value: "Test answer value"
                }
            ]
        }
    ],
    page: "test-page",
    type: "form",
    answer_lists: [{
        id: "test-answer-list",
        section: "test-section",
        user: "",
        answers: [
            {
                id: "test-answer-list",
                input: "test-section",
                answers: "test-answer-list",
                value: "Test answer value"
            }
        ]
    }]
}

const user: User = {
    email: "user@example.com",
    name: "User Name",
    dateOfBirth: "21072000",
    gender: "male",
    occupation: "Lawyer",
    relationshipStatus: "married"
};

const testPage: Page =  {
    id: "test-page",
    module: "aloihføsiegildrulairuhgliafliaøwodijaøowd",
    sections: [testTextSection]
};


export const testData: Module = {
    id: "aloihføsiegildrulairuhgliafliaøwodijaøowd",
    pages: [testPage]

};
