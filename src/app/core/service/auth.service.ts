import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { HOST_CUST } from '../constants/api';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthLoginInfo } from 'src/app/data/schema/login';
import { RoleService } from 'src/app/share/service/role.service';
import { Response } from '../../data/schema/response';

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

  httpOptionsCheck = {
    headers: null
  };

  setHeader(header: any): void {
    this.httpOptionsCheck = header;
  }

  constructor(private http: HttpClient, private roleService: RoleService) {
    const header = {
      'content-type': 'application/json',
      authorization: roleService.getToken()
    };
    this.httpOptionsCheck = {
      headers: new HttpHeaders(header)
    };
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<Response> {
    const user = {
      email: credentials.email,
      password: credentials.password
    };
    return this.http.post<Response>(this.loginURL, user)
  }

  checkLogin(token: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'checklogin', token);
  }

  signup(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'signup', payload).pipe(
      catchError(this.handleError('signup', payload))
    );
  }

  logout(token: string): Observable<any> {
    const header = {
      'content-type': 'application/json',
      Authorization: token
    };
    this.httpOptions.headers = new HttpHeaders(header);
    return this.http.post<string>(this.logoutURL, {}, this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?): any {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    // console.log(`Mstservice: ${message}`);
  }
}
