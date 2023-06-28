import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/share/service/utils.service';
import { RoleService } from 'src/app/share/service/role.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { OrderService } from 'src/app/core/service/order.service';
import { CustService } from 'src/app/core/service/cust.service';
import { ProductDialogComponent } from '../product-dialog.component';

@Component({
  selector: 'app-accept-order',
  templateUrl: './accept-order.component.html',
  styleUrls: ['./accept-order.component.css']
})
export class AcceptOrderComponent implements OnInit {

  ACTION_PRODUCT_ORDER = "ProductOrder";
  ACTION_CART_ORDER = "CartOrder";
  action: string;

  quantity: number;
  productId: string;
  mobileNo: string;
  address: string;

  custName: string;

  message: string;
  messageYes: string;
  title: string;

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private authService: AuthService,
    private orderService: OrderService,
    private custService: CustService) {
    this.action = data.action;

    this.title = 'Xác nhận đặt hàng';
    this.messageYes = 'Đặt hàng';


    if (this.action === this.ACTION_PRODUCT_ORDER) {
      this.quantity = data.data.quantity;
      this.productId = data.data.productId;
    }

    this.getCustomer();
  }

  ngOnInit(): void {
    
  }

  onNoClick() {
    this.dialogRef.close();
  }

  getCustomer() {
    this.custService.getInfo({}).subscribe(response => {
      if (response.resultCode == 0) {
        this.custName = response.data.custName;
        this.mobileNo = response.data.mobileNo;
        this.address = response.data.address;
      }
      else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  onYesClick() {
    if (this.action === this.ACTION_PRODUCT_ORDER) {
      const payload = {
        productId: this.productId,
        quantity: this.quantity,
        mobileNo: this.mobileNo,
        address: this.address
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
    }
  }

}
