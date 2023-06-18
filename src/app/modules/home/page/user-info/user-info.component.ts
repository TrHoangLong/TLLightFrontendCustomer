import { Component, OnInit, } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/share/service/utils.service';
import { RoleService } from 'src/app/share/service/role.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { CustService } from 'src/app/core/service/cust.service';
import { CUST_USER_GENDER } from 'src/app/core/constants/cust-user';
import { UserInfoDialogComponent } from './user-info-dialog/user-info-dialog.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userInfo: any;
  genderList: any;

  constructor(private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private custService: CustService
  ) {
    this.genderList = CUST_USER_GENDER;
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.custService.getInfo({}).subscribe(response => {
      if (response.resultCode == 0) {
        this.userInfo = response.data;
      }
      else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  update(user) {
    const dialogRef = this.dialog.open(UserInfoDialogComponent, {
      width: '800px',
      data: {
        action: 'Update',
        data: user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserInfo();
    });
  }

  getGender(gender: any): any {
    if (this.genderList == undefined) {
      return '';
    }
    if (typeof gender === 'string') {
      for (const data of this.genderList) {
        if (data.value === gender) {
          return data;
        }
      }
    } else {
      for (const data of this.genderList) {
        if (data.data === gender) {
          return data;
        }
      }
    }
    return '';
  }
}
