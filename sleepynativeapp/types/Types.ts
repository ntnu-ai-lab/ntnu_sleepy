export type gender = "male" | "female" | "other";
export type relationshipStatus =
  | "married"
  | "coliving"
  | "relationship"
  | "single";

export interface User {
  email: string;
  name: string;
  password?: string;
  dateOfBirth: string;
  gender: gender;
  occupation: string;
  relationshipStatus: relationshipStatus;
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
  relationshipStatus: "married"
}


