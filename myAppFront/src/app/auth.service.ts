import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient) {
    const cu = localStorage.getItem('currentUser');
    this.currentUserSubject = cu !== null ?new BehaviorSubject<any>(cu): new BehaviorSubject<any>("");
    this.currentUser = this.currentUserSubject.asObservable();
  }
   
  signUp(firstname: string, email:string, password: string, confirmPassword: string) {
    const formData = new FormData();
    formData.append('name', firstname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('c_password', confirmPassword);
    return this.http.post<any>(`http://localhost:8000/api/register`, formData)
    .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.success && data.success.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', data.success.name);
        }

        return data;
    }));
  }
   
  login(email: string, password:string) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return this.http.post<any>(`http://localhost:8000/api/login`, formData)
    .pipe(map(data => {
      // login successful if there's a jwt token in the response
      if (data && data.success && data.success.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', data.success.user);
          localStorage.setItem('currentUser', data.success.user.name);
          localStorage.setItem('token', data.success.token);
      }

      return data;
    }));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}
