import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';

import { HomeComponent } from './home.component';
import { CartComponent } from './page/cart/cart.component';
import { OrderHistComponent } from './page/order-hist/order-hist.component';
import { UserInfoComponent } from './page/user-info/user-info.component';
import { ProductDialogComponent } from './page/product-dialog/product-dialog.component';
import { CartDialogComponent } from './page/cart/cart-dialog/cart-dialog.component';
import { InfoShopComponent } from './page/info-shop/info-shop.component';
import { ContactShopComponent } from './page/contact-shop/contact-shop.component';
import { OrderHistDialogComponent } from './page/order-hist/order-hist-dialog/order-hist-dialog.component';
import { UserInfoDialogComponent } from './page/user-info/user-info-dialog/user-info-dialog.component';
import { AcceptOrderComponent } from './page/product-dialog/accept-order/accept-order.component';
import { ListProductComponent } from './page/list-product/list-product.component'; 

@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    OrderHistComponent,
    UserInfoComponent,
    ProductDialogComponent,
    CartDialogComponent,
    InfoShopComponent,
    ContactShopComponent,
    OrderHistDialogComponent,
    UserInfoDialogComponent,
    AcceptOrderComponent,
    ListProductComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule, 
    MatIconModule, 
    FormsModule, 
    MatTableModule, 
    MatPaginatorModule, 
    HttpClientModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatListModule,
    MatTabsModule
  ]
})
export class HomeModule { }
