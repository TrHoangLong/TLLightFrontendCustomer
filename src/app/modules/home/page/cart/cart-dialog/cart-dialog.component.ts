import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/share/service/utils.service';
import { RoleService } from 'src/app/share/service/role.service';
import { CartService } from 'src/app/core/service/cart.service';
import { OrderService } from 'src/app/core/service/order.service';
import { CartComponent } from '../cart.component';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {

  ACTION_UPDATE = 'Update';
  ACTION_DELETE = 'Delete';
  ACTION_ORDER = 'CartOrder'

  action: string;
  message: string;
  messageYes: string;
  title: string;

  cartList: any;

  quantity: number;
  custCartId: string;

  constructor(public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private cartService: CartService,
    private orderService: OrderService) {

    this.action = data.action;

    if (this.action === this.ACTION_ORDER) {
      this.cartList = data.data;
    } else {
      this.quantity = data.data.quantity;
      this.custCartId = data.data.custCartId;
    }

    if (this.action === this.ACTION_UPDATE) {
      this.title = 'Sửa thông tin giỏ hàng';
      this.messageYes = 'Sửa';
    } else if (this.action === this.ACTION_DELETE) {
      this.title = 'Xóa sản phẩm khỏi giỏ hàng';
      this.message = 'Bạn đồng ý xóa?';
      this.messageYes = 'Xóa';
    } else if (this.action === this.ACTION_ORDER) {
      this.title = 'Đặt hàng';
      this.messageYes = 'Đặt hàng';
    }

  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.action === this.ACTION_UPDATE) {
      const payload = {
        custCartId: this.custCartId,
        quantity: this.quantity
      }

      this.cartService.updateCart(payload).subscribe(response => {
        if (response.resultCode == 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, "Sửa thông tin giỏ hàng thành công");
        }
        else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    } else if (this.action === this.ACTION_DELETE) {
      const payload = {
        custCartId: this.custCartId
      }

      this.cartService.deleteCart(payload).subscribe(response => {
        if (response.resultCode == 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, "Xóa sản phẩm khỏi giỏ hàng thành công");
        }
        else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    } else if (this.action === this.ACTION_ORDER) {
      this.orderService.cartOrder(this.cartList).subscribe(response => {
        if (response.resultCode == 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, "Đặt hàng thành công");
        }
        else {
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
      
    }
  }

}
