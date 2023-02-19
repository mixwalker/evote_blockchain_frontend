export interface Candidate {
    candiExpList: CandiExpList[];
    candiId: number;
    candiImage: string;
    regisDate: Date;
    candiStatus: string;
    candiPhone: string;
  }
  
export  interface CandiExpList {
    canExpId: number;
    years: string;
    position: string;
  }