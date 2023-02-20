import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from '../interface/Student';
import { Election } from '../interface/Election';
import { ElectionAndStudent } from '../interface/ElectionAndStudent';
import { Candidate } from '../interface/Candidate';


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

  getElectionOnVote(){
    return this.http.get<Election>(`api/election/on_vote`);
  }

  createElection(election:Election){
    return this.http.post<Election>(`api/election/`,election);
  }

  uploadImageElection(formdata: any) {
    return this.http.post<any>(`api/election/upload`, formdata);
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
  getElecOnVoteByStudent(id: string) {
    return this.http.get<ElectionAndStudent[]>(`api/elec_student/find_onvotebystudent/${id}`);
  }

  getStudentByElection(id: number) {
    return this.http.get<ElectionAndStudent[]>(`api/elec_student/findbyelection/${id}`);
  }

  getEWSByStdIdAndElecId(stdId:number,elecId:number){
    return this.http.get<ElectionAndStudent[]>(`api/elec_student/findByStdIdAndElecId/${stdId}/${elecId}`);
  }

  //electionAndCandidate
  getElecByCandidate(id: number) {
    return this.http.get<any>(`api/elec_candidate/findbycandidate/${id}`);
  }

  getCandidateByElection(id: number) {
    return this.http.get<any>(`api/elec_candidate/findbyelection/${id}`);
  }

  getCandidateByElectionWithApprove(id: number){
    return this.http.get<any>(`api/elec_candidate/findbyelectionwith_approve/${id}`);
  }

  createElecWCandidate(ElecWCandi: any) {
    return this.http.post<any>(`api/elec_candidate/`, ElecWCandi);
  }

  //Candidate
  getCandidateById(candiId:number){
    return this.http.get<any>(`api/candidate/${candiId}`);
  }

  editCandidateById(candiId:number,candiObj:Candidate){
    return this.http.put<any>(`api/candidate/${candiId}`,candiObj);
  }

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

  //voteAndCheckVote
  vote(id:number,vote:any){
    return this.http.put<any>(`api/elec_student/vote/${id}`,vote);
  }

  checkVote(id:number){
    return this.http.get<any>(`api/elec_student/check_voted/${id}`);
  }

}
