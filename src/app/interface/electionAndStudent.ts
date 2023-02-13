export interface electionAndStudent {
  election: Election;
  esId: number;
  student: Student;
}

export interface Student {
  birthday: string;
  email: string;
  firstName: string;
  lastName: string;
  nationality: string;
  password: string;
  phoneNo: string;
  prefix: string;
  religion: string;
  role: string;
  studentAddress: StudentAddress;
  studentClassyear: string;
  studentCode: string;
  studentFaculty: string;
  studentGpa: number;
  studentId: number;
  studentMajor: string;
  studentRegisYear: string;
}

export interface StudentAddress {
  addDistrict: string;
  addHouse: string;
  addOriprovince: string;
  addPostCode: string;
  addProvince: string;
  addStreet: string;
  addSubDis: string;
  addVillage: string;
  studentAddId: number;
}

export interface Election {
  countCandi: number;
  elecDetail: string;
  elecEnddate: string;
  elecId: number;
  elecName: string;
  elecRegister: boolean;
  elecStartdate: string;
}