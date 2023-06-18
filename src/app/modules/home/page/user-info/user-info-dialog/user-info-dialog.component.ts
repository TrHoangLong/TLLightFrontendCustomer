import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/share/service/utils.service';
import { RoleService } from 'src/app/share/service/role.service';
import { CustService } from 'src/app/core/service/cust.service';
import { UserInfoComponent } from '../user-info.component';
import { CUST_USER_GENDER } from 'src/app/core/constants/cust-user';

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.css']
})
export class UserInfoDialogComponent implements OnInit {

  ACTION_UPDATE = 'Update'
  action: string;

  message: string;
  messageYes: string;
  title: string;

  genderList: any;

  custUserId: string;
  custName: string;
  gender: number;
  birthday: Date;
  mobileNo: string;
  email: string;
  address: string;


  constructor(public dialogRef: MatDialogRef<UserInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private custService: CustService) {
    this.action = data.action;
    this.genderList = CUST_USER_GENDER;

    if (this.action === this.ACTION_UPDATE) {
      this.title = 'Sửa thông tin cá nhân';
      this.messageYes = 'Sửa';
    }

    if (this.action === this.ACTION_UPDATE) {
      this.custUserId = data.data.custUserId;
      this.custName = data.data.custName;
      this.gender = this.getGender(data.data.gender).value;
      this.birthday = data.data.birthday;
      this.mobileNo = data.data.mobileNo;
      this.email = data.data.email;
      this.address = data.data.address;
    }
  }

  ngOnInit(): void {
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

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.action === this.ACTION_UPDATE) {
      const payload = {
        custUserId: this.custUserId,
        custName: this.custName,
        gender: this.getGender(this.gender).data,
        birthday: this.birthday,
        mobileNo: this.mobileNo,
        email: this.email,
        address: this.address
      }

      this.custService.updateInfo(payload).subscribe(response => {
        if (response.resultCode == 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, "Sửa thông tin thành công");
        }
        else {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    }
  }

}
