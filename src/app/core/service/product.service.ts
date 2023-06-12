import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoleService } from 'src/app/share/service/role.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HOST_CUST } from '../constants/api';

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
}
