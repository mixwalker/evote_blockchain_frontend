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

  getStudentById(id:string) {
    return this.http.get<any>(`api/student/${id}`);
  }

  addStudent(student:any){
    return this.http.post(`api/student/`,student);
  }
  

  //electionAndStudent
  getElecByStudent(id:string){
    return this.http.get<any>(`api/elec_student/findbystudent/${id}`);
  }

  getStudentByElection(id:string){
    return this.http.get<any>(`api/elec_student/findbyelection/${id}`);
  }
  
}
