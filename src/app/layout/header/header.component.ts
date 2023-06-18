import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { LINK_IMAGE } from 'src/app/core/constants/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: number = 0;

  @Output() sideNav: EventEmitter<any> = new EventEmitter();

  linkImage: string;

  constructor(private router: Router,
    private dialog: MatDialog,
    private roleService: RoleService,
    private authService: AuthService,
    private utilsService: UtilsService) { 
      this.linkImage = LINK_IMAGE;
    }

  ngOnInit(): void {
    this.checkLogin();
  }

  logout() {
    const token: string = this.roleService.getToken();
    this.authService.logout(token).subscribe(response => {
      this.roleService.clearToken();
      this.roleService.clearRole();
      this.router.navigate(['/dashboard/home']);
      this.refreshHeader2();
    });
  }

  refreshHeader2(): void {
    window.location.reload();
  }

  checkLogin() {
    const token = {
      token: this.roleService.getToken()
    }

    this.authService.checkLogin(token).subscribe(response => {
      if (response.resultCode == 0) {
        this.isLogin = 1
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  login(){
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '800px',
      height:'500px',
      data: {
        action: 'cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshHeader2();
    });
  }

  routerLogin(value: string) {
    this.router.navigate([value]);
  }

  routerMenu(key: string) {
    this.sideNav.emit(key);
  }
}
