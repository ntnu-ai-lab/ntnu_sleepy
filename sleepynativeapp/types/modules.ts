import { User } from "./Types";

export interface Answer {
  id?: string;
  input: string;
  answerList?: string;
  value: string | number | boolean;
}
export interface AnswerList {
  id?: string;
  section: string;
  user: string;
  answers: Answer[];
}
export interface Input {
  id: string;
  type: string;
  name: string;
  label: string;
  helptext: string;
  value: string;
  section: string;
  options?: FormSelectOption[];
  answers?: Answer[];
}

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface Question {
  options: QuizOption[];
  question: string;
}

export interface QuizOption {
  label: string;
  correct: boolean;
}
export interface Module {
  title: string;
  id: string;
  parts: string[];
}

export interface ModuleExpanded {
  title: string;
  id: string;
  parts: Part[];
}

export interface Part {
  title: string;
  id: string;
  module: string;
  pages: Page[];
}

export interface Page {
  title: string;
  id: string;
  part: string;
  sections: Section[];
}

export interface BaseSection {
  id: string;
  heading?: string;
  page: string;
}

export interface TextSection extends BaseSection {
  type: "text";
  content: string;
}

export interface ImageSection extends BaseSection {
  type: "img";
  content: string;
  uri: string;
}

export interface VideoSection extends BaseSection {
  type: "video";
  uri: string;
}

export interface FormSection extends BaseSection {
  type: "form";
  form: Input[];
  answer_lists?: AnswerList[];
}

export interface QuizSection extends BaseSection {
  type: "quiz";
  questions: Question[];
}

export type Section =
  | TextSection
  | ImageSection
  | VideoSection
  | FormSection
  | QuizSection;
