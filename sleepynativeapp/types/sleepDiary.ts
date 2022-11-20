import { User } from "./Types";

export type Nap = [Date, Date];

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
}

export interface DiaryEntry extends DiaryEntryBase {
  date: Date;
  naps: Nap[];
  bedtime: Date;
  lights_out: Date;
  waketime: Date;
  risetime: Date;
}

export interface DiaryEntryServer extends DiaryEntryBase {
  date: string;
  naps: [string, string][];
  bedtime: string;
  lights_out: string;
  waketime: string;
  risetime: string;
}

export interface SleepDiary {
  id: string;
  user: User;
  started_date: Date;
  diary_entries: DiaryEntry[];
}
