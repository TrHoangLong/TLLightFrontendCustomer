import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AuthLoginInfo } from 'src/app/data/schema/login';
import { AuthService } from 'src/app/core/service/auth.service';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from 'src/app/layout/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = '';
  isLoading = false;
  isLoggedIn = false;
  hide = true;

  isSaveLogin = false;

  email = '';
  password = '';
  private sub = new Subscription();

  constructor(private dialog: MatDialog,
    public dialogRef: MatDialogRef<HeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private authService: AuthService,
    private roleService: RoleService,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    if (this.roleService.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard/home']);
    } else {

    }
    const info = this.roleService.getLogin();
    this.email = info.email;
    this.password = info.password;

    if (this.email == null) {
      this.isSaveLogin = false;
    } else {
      this.isSaveLogin = true;
    }
  }

  login() {
    if (this.email === '' || this.password === '') {
      return;
    }
    const credentials: AuthLoginInfo = {
      email: this.email,
      password: this.password
    };

    this.sub = this.authService.attemptAuth(credentials).pipe()
      .subscribe(response => {
        if (response.resultCode == 0) {
          const token = response.data;
          const header = {
            'content-type': 'application/json',
            authorization: token
          };
          const httpOptions = {
            headers: new HttpHeaders(header)
          };

          this.roleService.saveToken(token);
          if (this.isSaveLogin === true) {
            this.roleService.saveLogin(this.email, this.password);
          }

          this.router.navigate(['/dashboard/home']);
          this.dialogRef.close();
          this.utilsService.processResponseError(response, "Đăng nhập thành công");
        }
        else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + "Đăng nhập không thành công");
        }
      });
  }
}
