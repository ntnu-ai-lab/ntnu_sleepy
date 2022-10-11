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
  lable: string;
}

export interface Module {
  id: string;
  pages: Page[];
}

export interface Page {
  id: string;
  module: string;
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

export type Nap = [Date, Date];
export interface DiaryAnswer {
  answer: string;
  question: string;
}
export interface DiaryEntry {
  notes: string;
  sleeprating: number;
  dayrating: number;
  naps: Nap[];
  bedtime: Date;
  risetime: Date;
  answers: DiaryAnswer[];
}
export interface SleepDiary {
  diary_entries: DiaryEntry[];
}

export type Section = TextSection | ImageSection | VideoSection | FormSection;
