import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKENNAME = 'token';
  // private readonly api = environment.api
  user: any;
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  get token() {
    return sessionStorage.getItem(this.TOKENNAME);
  }
  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.token)
  }

  login(studentId: string, password: string) {
    return this.http.post('api/student/login',
      {
        studentId: studentId,
        password: password
      }).pipe(
        tap((res: any) => {
          this._isLoggedIn$.next(true);
          const encodeStudent = btoa(res.studentId)
          sessionStorage.setItem(this.TOKENNAME, encodeStudent);
          this.user = this.getStudentId(encodeStudent);
        })
      );
  }

  logout() {
    this._isLoggedIn$.next(false);
    sessionStorage.clear();
  }

  private getStudentId(token: string) {
    if (!token) return;
    const studentId = atob(token)
    return { studentId: studentId };
  }
}
