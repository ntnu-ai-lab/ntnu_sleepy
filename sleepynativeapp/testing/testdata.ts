import { User, UserEx } from "../types/Types";
import {
  Module,
  Page,
  TextSection,
  FormSection,
  ImageSection,
  VideoSection,
  SleepDiary,
  DiaryEntry,
  Part,
} from "../types/modules";

const testTextSection: TextSection = {
  id: "test-section",
  heading: "En Text-section",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  page: "test-page",
  type: "text",
};

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
      value: "Test value", //????
      section: "test-section",
      answers: [
        {
          id: "test-answer-list",
          input: "test-section",
          answerList: "test-answer-list",
          value: "Test answer value",
        },
      ],
    },
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
          answerList: "test-answer-list",
          value: "Test answer value",
        },
      ],
    },
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
          answerList: "test-answer-list",
          value: "Test answer value",
        },
      ],
    },
    {
      id: "test-Check-input",
      type: "checkbox",
      name: "test-check-input",
      label: "Er du Gravid?",
      helptext: "Test helptext",
      value: "Test value",
      section: "test-section",
      answers: [
        {
          id: "test-answer-list",
          input: "test-section",
          answerList: "test-answer-list",
          value: "Test answer value",
        },
      ],
    },
    {
      id: "test-Check-input",
      type: "checkbox",
      name: "test-check-input",
      label: "Er du i fast jobb?",
      helptext: "Test helptext",
      value: "Test value",
      section: "test-section",
      answers: [
        {
          id: "test-answer-list",
          input: "test-section",
          answerList: "test-answer-list",
          value: "Test answer value",
        },
      ],
    },
    {
      id: "test-Check-input",
      type: "select",
      name: "test-check-input",
      label: "Jobbform",
      helptext: "Test helptext",
      value: "Test value",
      section: "test-section",
      options: [
        {
          value: "Skift",
          lable: "Skift",
        },
        {
          value: "Deltid",
          lable: "Deltid",
        },
        {
          value: "8-4",
          lable: "8-4",
        },
        {
          value: "Skift",
          lable: "Skift",
        },
        {
          value: "Deltid",
          lable: "Deltid",
        },
        {
          value: "8-4",
          lable: "8-4",
        },
      ],
      answers: [
        {
          id: "test-answer-list",
          input: "test-section",
          answerList: "test-answer-list",
          value: "Test answer value",
        },
      ],
    },
  ],
  page: "test-page",
  type: "form",
  answer_lists: [
    {
      id: "test-answer-list",
      section: "test-section",
      user: "",
      answers: [
        {
          id: "test-answer-list",
          input: "test-section",
          answerList: "test-answer-list",
          value: "Test answer value",
        },
      ],
    },
  ],
};

const testImageSection: ImageSection = {
  id: "test-section",
  heading: "En Bilde-section",
  content: "Sovende mann",
  uri: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/325353_2200-1200x628.jpg",
  page: "test-page",
  type: "img",
};

const testVideoSection: VideoSection = {
  type: "video",
  uri: "https://media.istockphoto.com/videos/happy-young-couple-cuddling-together-in-the-bed-sleeping-at-night-video-id1126490961",
  id: "test-section",
  heading: "Test video heading",
  page: "test-page",
};

/* const user: User = {
  email: "user@example.com",
  username: "user@example.com",
  name: "User Name",
  dateOfBirth: "21072000",
  gender: "male",
  occupation: "Lawyer",
  relationshipStatus: "married",
}; */

export const testPage: Page = {
  id: "test-page",
  part: "test-part",
  sections: [
    testTextSection,
    testImageSection,
    testVideoSection,
    testFormSection,
  ],
};
export const testPage2: Page = {
  id: "test-page2",
  part: "test-part",
  sections: [
    testFormSection,
    testTextSection,
    testImageSection,
    testVideoSection,
  ],
};

export const testPart: Part = {
  id: "test-part",
  module: "aloihf??siegildrulairuhgliaflia??wodija??owd",
  pages: [testPage, testPage2, testPage],
};

export const testData: Module = {
  id: "aloihf??siegildrulairuhgliaflia??wodija??owd",
  parts: [testPart, testPart, testPart],
};

const testDiaryEntry1: DiaryEntry = {
  notes: "Jeg sov veldig godt i natt",
  sleep_quality: 5,
  day_rating: 5,
  naps: [
    [new Date("2022-10-09"), new Date("2022-10-09")],
    [new Date("2022-10-09"), new Date("2022-10-09")],
  ],
  bedtime: new Date("2022-10-09"),
  risetime: new Date("2022-10-09"),
  date: new Date("2022-10-09"),
  sleep_aides: false,
  sleep_aides_detail: "",
  lights_out: new Date("2022-10-09"),
  time_to_sleep: 10,
  night_wakes: [10, 15],
  waketime: new Date("2022-10-09"),
  id: "",
};
const testDiaryEntry2: DiaryEntry = {
  notes: "Jeg sov veldig godt i natt",
  sleep_quality: 5,
  day_rating: 5,
  naps: [
    [new Date("2022-10-10"), new Date("2022-10-10")],
    [new Date("2022-10-10"), new Date("2022-10-10")],
  ],
  bedtime: new Date("2022-10-10"),
  risetime: new Date("2022-10-10"),
  date: new Date("2022-10-10"),
  sleep_aides: false,
  sleep_aides_detail: "",
  lights_out: new Date("2022-10-10"),
  time_to_sleep: 10,
  night_wakes: [10, 15],
  waketime: new Date("2022-10-10"),
  id: "",
};
const testDiaryEntry3: DiaryEntry = {
  notes: "Jeg sov veldig godt i natt",
  sleep_quality: 5,
  day_rating: 5,
  naps: [
    [new Date("2022-10-11"), new Date("2022-10-11")],
    [new Date("2022-10-11"), new Date("2022-10-11")],
  ],
  bedtime: new Date("2022-10-11"),
  risetime: new Date("2022-10-11"),
  date: new Date("2022-10-11"),
  sleep_aides: false,
  sleep_aides_detail: "",
  lights_out: new Date("2022-10-11"),
  time_to_sleep: 10,
  night_wakes: [10, 15],
  waketime: new Date("2022-10-11"),
  id: "",
};

export const testDiary: SleepDiary = {
  diary_entries: [testDiaryEntry1, testDiaryEntry2, testDiaryEntry3],
  user: UserEx,
  started_date: new Date("2022-10-09"),
  id: "",
};
