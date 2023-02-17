import { Candidate } from "./Candidate";
import { Student } from "./Student";

export interface StudentAndCandidate {
  candidate: Candidate;
  scId: number;
  student: Student;
}

