import { User } from "./Types";

export type Nap = [Date, Date];

export type DjangoDate = `${string}-${string}-${string}`;
export type DjangoDateTime = `${DjangoDate}T${string}:${string}}${
  | "+"
  | "-"}${string}:${string}`;

interface DiaryEntryBase {
  id: string;
  day_rating: number;
  sleep_aides: boolean;
  sleep_aides_detail: string;
  notes: string;
  sleep_quality: number;
  time_to_sleep: number;
  night_wakes: number[];
  finished?: boolean;
  efficiency?: number;
  sleep_duration: number;
  bed_duration: number;
}

export interface DiaryEntry extends DiaryEntryBase {
  date: Date;
  naps: Nap[];
  bedtime: Date;
  lights_out: Date;
  waketime: Date;
  risetime: Date;
  fall_asleep_time: Date;
}

export interface DiaryEntryServer extends DiaryEntryBase {
  date: DjangoDate;
  naps: [DjangoDateTime, DjangoDateTime][];
  bedtime: DjangoDateTime;
  lights_out: DjangoDateTime;
  waketime: DjangoDateTime;
  risetime: DjangoDateTime;
  fall_asleep_time: DjangoDateTime;
}

export interface SleepDiaryBase {
  id: string;
  user: User;
  started_date: Date;
}

export interface SleepDiary extends SleepDiaryBase {
  diary_entries: DiaryEntry[];
}

export interface SleepDiaryServer extends SleepDiaryBase {
  diary_entries: DiaryEntryServer[];
}
