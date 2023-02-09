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
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  
  get token() {
    return localStorage.getItem(this.TOKENNAME);
  }
  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.token)
    this.user = this.getStudent(this.token!);
  }

  login(studentCode: string, password: string) {
    return this.http.post('api/student/login',
      {
        studentCode: studentCode,
        password: password
      }).pipe(
        tap((res: any) => {
          this._isLoggedIn$.next(true);
          const std = {
            studentId: res.studentId,
            studentCode: res.studentCode,
            role: res.role
          }
          const stdEncode = btoa(JSON.stringify(std));
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
