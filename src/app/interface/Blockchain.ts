export interface BlockChain {
  elecId: number;
  chain: Chain[];
  length: number;
}

export interface Chain {
  index: number;
  timestemp: string;
  nonce: number;
  data: ChainData;
  previous_hash: string;
  hash: string;
}

export interface ChainData {
  candidate: Candidate;
  student: Student;
}

interface Student {
  studentId: number;
  studentCode: string;
  studenName: string;
}

interface Candidate {
  candiId: number;
  candiName: string;
}