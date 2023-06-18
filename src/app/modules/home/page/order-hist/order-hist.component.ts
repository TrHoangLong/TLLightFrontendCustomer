import { Component, OnInit, } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/share/service/utils.service';
import { RoleService } from 'src/app/share/service/role.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { OrderService } from 'src/app/core/service/order.service';
import { ProductService } from 'src/app/core/service/product.service';
import { CUST_ORDER_STATUS } from 'src/app/core/constants/cust-order';
import { OrderHistDialogComponent } from './order-hist-dialog/order-hist-dialog.component';

@Component({
  selector: 'app-order-hist',
  templateUrl: './order-hist.component.html',
  styleUrls: ['./order-hist.component.css']
})
export class OrderHistComponent implements OnInit {

  custOrderList: any;
  statusList: any;

  constructor(private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService,
    private orderService: OrderService) {
    this.statusList = CUST_ORDER_STATUS;
  }

  ngOnInit(): void {
    this.search();
  }

  getStatus(status: any): any {
    if (this.statusList == undefined) {
      return '';
    }
    if (typeof status === 'string') {
      for (const data of this.statusList) {
        if (data.value === status) {
          return data;
        }
      }
    } else {
      for (const data of this.statusList) {
        if (data.data === status) {
          return data;
        }
      }
    }
    return '';
  }

  search() {
    this.orderService.getCustOrder({}).subscribe(response => {
      if (response.resultCode == 0) {
        this.custOrderList = response.data;
      }
      else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  cancel(order: any) {
    const dialogRef = this.dialog.open(OrderHistDialogComponent, {
      width: '400px',
      data: {
        action: 'Cancel',
        data: order
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

}
