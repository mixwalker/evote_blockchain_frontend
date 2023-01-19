import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAdminById(adminId:string){
    return this.http.get<any>(`api/student/${adminId}`);
  }
}
