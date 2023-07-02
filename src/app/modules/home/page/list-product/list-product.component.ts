import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from 'src/app/share/service/role.service';
import { UtilsService } from 'src/app/share/service/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/service/product.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LINK_IMAGE } from 'src/app/core/constants/api';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  productList: any;
  categoryList: any;

  categoryId: string;

  offset = 0;
  limit = 8;

  totalRow: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  linkImage: string;
  constructor(private dialog: MatDialog,
    private roleService: RoleService,
    private utilsService: UtilsService,
    private productSevice: ProductService) {
      this.linkImage = LINK_IMAGE;
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProduct(this.limit, this.limit * this.offset);
  }

  search(event: PageEvent) {

    if (event) { // next page
      this.limit = event.pageSize;
      this.offset = event.pageIndex;
    } else {
      this.limit = 8;
      this.offset = 0;
    }

    this.getAllProduct(this.limit, this.limit * this.offset)
  }

  getAllProduct(_limit: number, _offset: number) {
    const payload = {
      categoryId: this.categoryId,
      offset: _offset,
      limit: _limit
    }

    this.productSevice.productGet(payload).subscribe(response => {
      if (response.resultCode == 0) {
        this.productList = response.data;
        this.totalRow = response.data[0].totalRows;
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  getAllCategory() {
    this.productSevice.categoriesGet({}).subscribe(response => {
      if (response.resultCode == 0) {
        this.categoryList = response.data;
      } else {
        this.utilsService.processResponseError(response, 'Lỗi: ' + response.errorMsg);
      }
    });
  }

  productDetail(product: any) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '1200px',
      data: {
        action: 'Detail',
        data: product
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
