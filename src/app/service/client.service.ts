import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  //student Service
  getAllStudent() {
    return this.http.get<any>(`api/student`);
  }

  getStudentById(id:number) {
    return this.http.get<any>(`api/student/${id}`);
  }

  addStudent(student:any){
    return this.http.post(`api/student/`,student);
  }

  //ElectionService
  getAllElection() {
    return this.http.get<any>(`api/election`);
  }

  getElectionByRegisOn(){
    return this.http.get<any>(`api/election/regis_on`);

  }

  getElectionById(id:number) {
    return this.http.get<any>(`api/election/${id}`);
  }

  addElection(election:any){
    return this.http.post(`api/election/`,election);
  }

  countCandidate(update:any){
    return this.http.put(`api/election/update_count`,update);
  }

  //electionAndStudent
  getElecByStudent(id:string){
    return this.http.get<any>(`api/elec_student/findbystudent/${id}`);
  }

  getStudentByElection(id:number){
    return this.http.get<any>(`api/elec_student/findbyelection/${id}`);
  }
  
  //electionAndCandidate
  getElecByCandidate(id:number){
    return this.http.get<any>(`api/elec_candidate/findbycandidate/${id}`);
  }

  getCandidateByElection(id:number){
    return this.http.get<any>(`api/elec_candidate/findbyelection/${id}`);
  }

  //createaCandidate
  createCandidate(candidateObj:any){
    return this.http.post<any>(`api/candidate`,candidateObj);
  }

  uploadImageCandidate(formdata:any){
    return this.http.post<any>(`api/candidate/upload`,formdata);
  }



}
