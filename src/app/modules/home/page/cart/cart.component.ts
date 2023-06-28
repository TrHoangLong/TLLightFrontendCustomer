import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/share/service/utils.service';
import { RoleService } from 'src/app/share/service/role.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { CartService } from 'src/app/core/service/cart.service';
import { ProductService } from 'src/app/core/service/product.service';
import { CUST_CART_STATUS } from 'src/app/core/constants/cust-cart';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  custCartList: any;
  productList: any;
  statusList: any;

  checked = false;

  selection = new SelectionModel<any>(true, []);

  constructor(private router: Router,
    private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService,
    private authService: AuthService,
    private cartService: CartService) {
      this.statusList = CUST_CART_STATUS;
    }

  ngOnInit(): void {
    this.search();
    this.getAllProduct();

    this.checkLogin();
  }

  checkLogin() {
    const token = {
      token: this.roleService.getToken()
    }

    this.authService.checkLogin(token).subscribe(response => {
      if (response.resultCode == 0) {
      } else {
        this.router.navigate(['/dashboard/home']);
      }
    });
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
    this.cartService.getCartForCust({}).subscribe(response => {
      if (response.resultCode == 0) {
        this.custCartList = response.data;
      }
      else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  getAllProduct() {
    this.productSevice.productGet({}).subscribe(response => {
      if (response.resultCode == 0) {
        this.productList = response.data;
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  onChangeSelected(element): void {
    this.selection.toggle(element);
  }

  update(cart: any) {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      width: '400px',
      data: {
        action: 'Update',
        data: cart
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  delete(cart: any) {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      width: '400px',
      data: {
        action: 'Delete',
        data: cart
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }

  order() {
    const cart = this.selection.selected;

    const dialogRef = this.dialog.open(CartDialogComponent, {
      width: '800px',
      data: {
        action: 'CartOrder',
        data: cart
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.search();
    });
  }
}
