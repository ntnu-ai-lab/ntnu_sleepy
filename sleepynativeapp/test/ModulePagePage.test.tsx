// @ts-nocheck
import React from "react";
import renderer, { ReactTestRenderer } from "react-test-renderer";
import { RecoilRoot } from "recoil";
import { ModulePagePage } from "../components/module/ModulePagePage";
import { Page } from "../types/modules";

describe("Test that a module page get created correctly", () => {
  let page: ReactTestRenderer;

  const modulePage: Page = {
    id: "test-page",
    module: "nonexistant",
    sections: [
      {
        id: "testText",
        heading: "testText",
        content: "Lorem ipsum dolor sit amet",
        page: "test-page",
        type: "text",
      },
      {
        id: "testImg",
        heading: "testImg",
        content: "Sleeping man",
        uri: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/325353_2200-1200x628.jpg",
        page: "test-page",
        type: "img",
      },
      {
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
      },
    ],
  };

  beforeEach(() => {
    page = renderer.create(<RecoilRoot><ModulePagePage page={modulePage} /></RecoilRoot>);
  });

  it("renders", async () => {
    expect(page.toJSON()).toMatchSnapshot();
  })

  it("creates correct sections", async () => {
    const tree = page.toJSON();
    expect(tree.children).toBeTruthy();
    expect(tree.children[0].children[0].children.length).toBe(3);
  })
});
