export type gender = "male" | "female" | "other" | "undefined";
export type relationshipStatus =
  | "married"
  | "coliving"
  | "relationship"
  | "single"
  | "undefined";

export interface User {
  email: string;
  name: string;
  password?: string;
  dateOfBirth: string;
  gender: gender;
  occupation: string;
  relationshipStatus: relationshipStatus;
  sleepRestriction?: boolean;
}
export interface DjangoUser {
  name: string;
}

//temporary user before connecting to database
export const UserEx: User = {
  email: "test@test.com",
  name: "testname",
  password: "*******",
  dateOfBirth: "20.02.1999",
  gender: "male",
  occupation: "Advokat",
  relationshipStatus: "married",
};
export interface ModuleProgression {
  module: string //Id of module,
  part: number //Which part in module user is on currently
  finished: boolean //pretty selfexplanitory
}

export interface SleepRestriction {
  id: string,
  week: string,
  custom_rise_time: string,
  duration: string,
  bedtime: string,
}