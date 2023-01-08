import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly api = environment.api
  constructor(private http: HttpClient) { }

  //student Service
  getAllStudent() {
    return this.http.get<any>(this.api + `/student`);
  }

  getStudentById(id:string) {
    return this.http.get<any>(this.api + `/student/${id}`);
  }

  addStudent(student:any){
    return this.http.post(this.api + `/student/`,student);
  }
}
