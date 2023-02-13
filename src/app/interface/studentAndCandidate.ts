import { Student } from "./electionAndStudent";

interface studentAndCandidate {
  candidate: Candidate;
  scId: number;
  student: Student;
}

interface Candidate {
  candiExpList: CandiExpList[];
  candiId: number;
  candiImage: string;
  regisDate: string;
}

interface CandiExpList {
  canExpId: number;
  years: string;
}