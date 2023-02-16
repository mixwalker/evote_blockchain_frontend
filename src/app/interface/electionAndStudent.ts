import { Election } from "./Election";
import { Student } from "./Student";

export interface ElectionAndStudent {
  election: Election[];
  esId: number;
  student: Student[];
}

