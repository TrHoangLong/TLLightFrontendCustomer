import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { HOST_CUST} from '../constants/api';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RoleService } from 'src/app/share/service/role.service';
import { Response } from '../../data/schema/response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: null
  };

  setHeader(header: any): void {
    this.httpOptions = header;
  }

  constructor(private http: HttpClient, private roleService: RoleService) {
    const header = {
      'content-type': 'application/json',
      authorization: roleService.getToken()
    };

    this.httpOptions = {
      headers: new HttpHeaders(header)
    };
  }

  productGet(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'product/get', payload);
  }

  categoriesGet(payload: any): Observable<any> {
    return this.http.post<Response>(HOST_CUST + 'categories/get', payload);
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
