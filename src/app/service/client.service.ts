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

  editStudent(student:Student){
    return this.http.put(`api/student/`,student);
  }

  getStudentInElection(id: number) {
    return this.http.get(`api/student/std_have_elec/${id}`)
  }

  getStudentNotInElection(id: number) {
    return this.http.get(`api/student/std_no_elec/${id}`)
  }

  getStudentDataByCandidateId(id:number){
    return this.http.get<any>(`api/student/std_by_candi/${id}`)
  }

  deleteStudentById(id:number){
    return this.http.delete<Student>(`api/student/${id}`);
  }


  //ElectionService
  getAllElection() {
    return this.http.get<any>(`api/election`);
  }

  getElectionByRegisOn() {
    return this.http.get<any>(`api/election/regis_on`);
  }

  getElectionOnVote() {
    return this.http.get<any>(`api/election/on_vote`);
  }

  getElectionComingSoon() {
    return this.http.get<any>(`api/election/coming_soon`);
  }

  getElectionVoteComplete() {
    return this.http.get<any>(`api/election/vote_complete`);
  }

  createElection(election: Election) {
    return this.http.post<Election>(`api/election/`, election);
  }

  editElection(election: Election) {
    return this.http.put<Election>(`api/election/update/${election.elecId}`, election);
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

  checkElectionTime() {
    return this.http.get<any>(`api/election/check_time`);
  }

  countCandidate() {
    return this.http.get(`api/election/update_count`);
  }

  deleteElectionById(id: number){
    return this.http.delete<any>(`api/election/${id}`);
  }



  //electionAndStudent
  getElecOnVoteByStudent(id: string) {
    return this.http.get<ElectionAndStudent[]>(`api/elec_student/find_onvotebystudent/${id}`);
  }

  getStudentByElection(id: number) {
    return this.http.get<ElectionAndStudent[]>(`api/elec_student/findbyelection/${id}`);
  }

  getEWSByStdIdAndElecId(stdId: number, elecId: number) {
    return this.http.get<ElectionAndStudent[]>(`api/elec_student/findByStdIdAndElecId/${stdId}/${elecId}`);
  }

  createEs(es: any) {
    return this.http.post<any>(`api/elec_student`, es);
  }

  deleteEsByStudent(id: number) {
    return this.http.delete<any>(`api/elec_student/delby_student/${id}`)
  }

  //electionAndCandidate
  getElecByCandidate(id: number) {
    return this.http.get<any>(`api/elec_candidate/findbycandidate/${id}`);
  }

  getCandidateByElection(id: number) {
    return this.http.get<any>(`api/elec_candidate/findbyelection/${id}`);
  }

  getCandidateByElectionWithApprove(id: number) {
    return this.http.get<any>(`api/elec_candidate/findbyelectionwith_approve/${id}`);
  }

  createElecWCandidate(ElecWCandi: any) {
    return this.http.post<any>(`api/elec_candidate/`, ElecWCandi);
  }

  //Candidate
  getCandidateById(candiId: number) {
    return this.http.get<any>(`api/candidate/${candiId}`);
  }

  editCandidateById(candiId: number, candiObj: Candidate) {
    return this.http.put<any>(`api/candidate/${candiId}`, candiObj);
  }

  createCandidate(candidateObj: any) {
    return this.http.post<any>(`api/candidate`, candidateObj);
  }

  uploadImageCandidate(formdata: any) {
    return this.http.post<any>(`api/candidate/upload`, formdata);
  }

  unApprove(candiId:number){
    return this.http.get<any>(`api/candidate/candidate_unapprove/${candiId}`);
  }

  Approve(candiId:number){
    return this.http.get<any>(`api/candidate/candidate_approve/${candiId}`);
  }

  notApprove(candiId:number){
    return this.http.get<any>(`api/candidate/candidate_notapprove/${candiId}`);
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

  getCandidateApprove(id: number) {
    return this.http.get<any>(`api/student_candidate/candidate_aprrove_elec/${id}`)
  }

  getCandidateNotApprove(id: number) {
    return this.http.get<any>(`api/student_candidate/candidate_notaprrove_elec/${id}`)
  }



  //voteAndCheckVote
  vote(id: number, vote: any) {
    return this.http.put<any>(`api/elec_student/vote/${id}`, vote);
  }

  checkVote(id: number) {
    return this.http.get<any>(`api/elec_student/check_voted/${id}`);
  }

  //Annoucement
  getAllAnnoucementList(){
    return this.http.get<any>(`api/annoucement`);
  }

  getStatusOnAnnoucementList(){
    return this.http.get<any>(`api/annoucement/get_status_on`);
  }

  deleteAnnoucement(id:number){
    return this.http.delete<any>(`api/annoucement/${id}`);
  }

  setStatusAnnoucement(id:number,status:boolean){
    const annoucement = {
      announcementStatus: status
    }
    return this.http.put<any>(`api/annoucement/set_status/${id}`,annoucement);
  }
  
  createAnnounce(announce:any){
    return this.http.post<any>(`api/annoucement/`,announce);
  }

  uploadImageAnnounce(formdata: any){
    return this.http.post<any>(`api/annoucement/upload`,formdata);
  }

}
