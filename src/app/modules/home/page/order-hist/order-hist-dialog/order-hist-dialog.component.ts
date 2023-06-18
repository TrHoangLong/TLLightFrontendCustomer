import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/share/service/utils.service';
import { RoleService } from 'src/app/share/service/role.service';
import { OrderService } from 'src/app/core/service/order.service';
import { OrderHistComponent } from '../order-hist.component';

@Component({
  selector: 'app-order-hist-dialog',
  templateUrl: './order-hist-dialog.component.html',
  styleUrls: ['./order-hist-dialog.component.css']
})
export class OrderHistDialogComponent implements OnInit {

  ACTION_CANCEL = 'Cancel'

  action: string;
  message: string;
  messageYes: string;
  title: string;

  custOrderId: string;
  custOrderDate: Date;

  constructor(public dialogRef: MatDialogRef<OrderHistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private orderService: OrderService) {
    this.action = data.action;

    if (this.action === this.ACTION_CANCEL) {
      this.title = 'Yêu cầu hủy đơn hàng';
      this.message = 'Bạn đồng ý yêu cầu hủy đơn hàng?';
      this.messageYes = 'Yêu cầu hủy';
    }

    if (this.action === this.ACTION_CANCEL) {
      this.custOrderId = data.data.custOrderId;
      this.custOrderDate = data.data.custOrderDate;
    }
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.action === this.ACTION_CANCEL) {
      const payload = {
        custOrderDate: this.custOrderDate,
        custOrderId: this.custOrderId
      }

      this.orderService.cancelCustOrder(payload).subscribe(response => {
        if (response.resultCode == 0) {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, "Yêu cầu hủy đơn hàng thành công");
        }
        else {
          this.dialogRef.close();
          this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
        }
      });
    }
  }

}
