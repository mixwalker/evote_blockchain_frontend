import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKENNAME = 'token';
  user: any;
  std:any;
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  
  get token() {
    return localStorage.getItem(this.TOKENNAME);
  }
  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.token)
    this.user = this.getStudent(this.token!);
  }

  checkLogin(studentCode: string, password: string) {
    return this.http.post('api/student/check_login',
      {
        studentCode: studentCode,
        password: password
      }).pipe(
        tap((res: any) => {
          this.std = {
            studentCode: res.studentCode,
            password: password,
          }
        })
      );
  }

  login(studentCode:string,password:string,otp:string){
    return this.http.post('api/student/login',
    {
      studentCode: studentCode,
      password: password,
      otpAccess: otp
    }).pipe(
      tap((res: any) => {
        this._isLoggedIn$.next(true);
        const stdData = {
          studentId: res.studentId,
          studentCode: res.studentCode,
          role: res.role
        }
        const stdEncode = btoa(JSON.stringify(stdData));
        localStorage.setItem(this.TOKENNAME, stdEncode);
        this.user = this.getStudent(stdEncode);
      })
    );
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.clear();
  }

  private getStudent(token: string) {
    if (!token) return;
    const stdDecode = JSON.parse(atob(token));
    return stdDecode;
  }

  
}
