import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/share/service/utils.service';
import { RoleService } from 'src/app/share/service/role.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { HomeComponent } from '../../home.component';
import { CartService } from 'src/app/core/service/cart.service';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  ACTION_DETAIL = "Detail";
  action: string;

  product: any;

  quantity: number = 1;

  constructor(public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService) {
    this.action = data.action;

    if (this.action === this.ACTION_DETAIL) {
      this.product = data.data;
    }
  }

  ngOnInit(): void {

  }

  getDescription(description: string): any {
    let result = description.split(';')
    return result
  }

  addCart() {
    const token = {
      token: this.roleService.getToken()
    }

    this.authService.checkLogin(token).subscribe(response => {
      if (response.resultCode == 0) {
        const payload = {
          productId: this.product.productId,
          quantity: this.quantity
        }

        this.cartService.addCart(payload).subscribe(response => {
          if (response.resultCode == 0) {
            this.dialogRef.close();
            this.utilsService.processResponseError(response, "Thêm giỏ hàng thành công");
          }
          else {
            this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
          }
        });
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });

  }

  productOrder() {
    const token = {
      token: this.roleService.getToken()
    }

    this.authService.checkLogin(token).subscribe(response => {
      if (response.resultCode == 0) {
        const payload = {
          productId: this.product.productId,
          quantity: this.quantity
        }

        this.orderService.productOrder(payload).subscribe(response => {
          if (response.resultCode == 0) {
            this.dialogRef.close();
            this.utilsService.processResponseError(response, "Đặt hàng thành công");
          }
          else {
            this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
          }
        });
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });

  }

}
