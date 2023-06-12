import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { HOST_CUST } from '../constants/api';
import { Observable } from 'rxjs';
import { AuthLoginInfo } from 'src/app/data/schema/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = HOST_CUST + 'login';
  private logoutURL = HOST_CUST + 'logout';

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<Response> {
    const user = {
      email: credentials.email,
      password: credentials.password
    };
    return this.http.post<Response>(this.loginURL, user)
  }

  logout(token: string): Observable<any> {
    const header = {
      'content-type': 'application/json',
      Authorization: token
    };
    this.httpOptions.headers = new HttpHeaders(header);
    return this.http.post<string>(this.logoutURL, {}, this.httpOptions);
  }
}
