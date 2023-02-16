import { Candidate } from "./Candidate";
import { Election } from "./Election";

export interface ElectionAndCandidate {
  candidate: Candidate[];
  ecId: number;
  election: Election[];
}