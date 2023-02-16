import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from '../interface/Student';
import { Election } from '../interface/Election';
import { ElectionAndStudent } from '../interface/ElectionAndStudent';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  //student Service
  getAllStudent() {
    return this.http.get<Student>(`api/student`);
  }

  getStudentById(id: number) {
    return this.http.get<Student>(`api/student/${id}`);
  }

  addStudent(student: Student) {
    return this.http.post(`api/student/`, student);
  }

  //ElectionService
  getAllElection() {
    return this.http.get<Election>(`api/election`);
  }

  getElectionByRegisOn() {
    return this.http.get<Election>(`api/election/regis_on`);

  }

  getElectionById(id: number) {
    return this.http.get<Election>(`api/election/${id}`);
  }

  addElection(election: Election) {
    return this.http.post(`api/election/`, election);
  }

  countCandidate(update: number) {
    return this.http.put(`api/election/update_count`, update);
  }

  //electionAndStudent
  getElecByStudent(id: string) {
    return this.http.get<ElectionAndStudent>(`api/elec_student/findbystudent/${id}`);
  }

  getStudentByElection(id: number) {
    return this.http.get<ElectionAndStudent>(`api/elec_student/findbyelection/${id}`);
  }

  //electionAndCandidate
  getElecByCandidate(id: number) {
    return this.http.get<any>(`api/elec_candidate/findbycandidate/${id}`);
  }

  getCandidateByElection(id: number) {
    return this.http.get<any>(`api/elec_candidate/findbyelection/${id}`);
  }

  createElecWCandidate(ElecWCandi: any) {
    return this.http.post<any>(`api/elec_candidate/`, ElecWCandi);
  }

  //Candidate
  createCandidate(candidateObj: any) {
    return this.http.post<any>(`api/candidate`, candidateObj);
  }

  uploadImageCandidate(formdata: any) {
    return this.http.post<any>(`api/candidate/upload`, formdata);
  }

  //studentBeCandidate
  createStdBeCandidate(stdBCandi: any) {
    return this.http.post<any>(`api/student_candidate`, stdBCandi);
  }
  getCandidatebyStudent(id: string) {
    return this.http.get<any>(`api/student_candidate/findbystudent/${id}`);
  }
  getStudentbyCandidate(id: number) {
    return this.http.get<any>(`api/student_candidate/findbycandidate/${id}`);
  }


}
