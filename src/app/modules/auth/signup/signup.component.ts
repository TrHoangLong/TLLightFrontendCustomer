import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { CUST_USER_GENDER } from 'src/app/core/constants/cust-user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide1 = true;
  hide2 = true;

  password: string;
  confirmPassword: string;
  custName: string;
  gender: number;
  birthday: Date;
  mobileNo: string;
  email: string;
  address: string;

  genderList: any;

  constructor(private router: Router,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private authService: AuthService) {
    this.genderList = CUST_USER_GENDER;
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

  signUp() {
    if (this.password === this.confirmPassword) {
      const payload = {
        custName: this.custName,
        mobileNo: this.mobileNo,
        gender: this.getGender(this.gender).data,
        birthday: this.birthday,
        email: this.email,
        password: this.password,
        address: this.address
      }

      this.authService.signup(payload).subscribe(response => {
        if (response.resultCode === 0) {
          this.router.navigate(['/dashboard/home']);
          this.utilsService.processResponseError(response, 'Thêm thành công');
        } else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    } else {
      this.utilsService.processResponseError('', 'Lỗi: ' + 'Mật khẩu nhập lại không giống với mật khẩu trước đó');
    }
  }

  exit() {
    this.router.navigate(['/dashboard/home']);
  }

}
