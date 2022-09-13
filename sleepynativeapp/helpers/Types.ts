export type gender = "male" | "female" | "other";
export type relationshipStatus =
  | "married"
  | "coliving"
  | "relationship"
  | "single";

export interface User {
  email: string;
  name: string;
  password: string;
  dateOfBirth: string;
  gender: gender;
  occupation: string;
  relationshipStatus: relationshipStatus;
}


