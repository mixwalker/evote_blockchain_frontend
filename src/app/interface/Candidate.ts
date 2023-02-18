export interface Candidate {
    candiExpList: CandiExpList[];
    candiId: number;
    candiImage: string;
    regisDate: string;
    candiStatus: string;
    candiPhone: string;
  }
  
export  interface CandiExpList {
    canExpId: number;
    years: string;
  }