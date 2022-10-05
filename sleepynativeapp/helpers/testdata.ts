import { User } from '../types/Types';
import {Module, Page, Section, Answer, AnswerList, TextSection, FormSection, ImageSection, VideoSection} from '../types/modules'

const testTextSection: TextSection = {
    id: "test-section",
    heading: "Test heading",
    content: "Test Content",
    page: "test-page",
    type: "text"
}



const testFormSection: FormSection = {
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

const testImageSection: ImageSection = {
    id: "test-section",
    heading: "Test heading",
    content: "Test content",
    uri: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/325353_2200-1200x628.jpg",
    page: "test-page",
    type: "img",
    
}

const testVideoSection: VideoSection = {
    type: 'video',
    uri: 'https://media.istockphoto.com/videos/happy-young-couple-cuddling-together-in-the-bed-sleeping-at-night-video-id1126490961',
    id: 'test-section',
    heading: 'Test video heading',
    page: 'test-page'
}

const user: User = {
    email: "user@example.com",
    name: "User Name",
    dateOfBirth: "21072000",
    gender: "male",
    occupation: "Lawyer",
    relationshipStatus: "married"
};

export const testPage: Page =  {
    id: "test-page",
    module: "aloihføsiegildrulairuhgliafliaøwodijaøowd",
    sections: [testTextSection, testVideoSection]
};


export const testData: Module = {
    id: "aloihføsiegildrulairuhgliafliaøwodijaøowd",
    pages: [testPage]

};

