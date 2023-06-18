import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';

import { CartComponent } from './page/cart/cart.component';
import { UserInfoComponent } from './page/user-info/user-info.component';
import { OrderHistComponent } from './page/order-hist/order-hist.component';
import { InfoShopComponent } from './page/info-shop/info-shop.component';
import { ContactShopComponent } from './page/contact-shop/contact-shop.component';

const routes: Routes =[
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'cart',
                component: CartComponent
            },
            {
                path: 'user-info',
                component: UserInfoComponent
            },
            {
                path: 'order-hist',
                component: OrderHistComponent
            },
            {
                path: 'info-shop',
                component: InfoShopComponent
            },
            {
                path: 'contact-shop',
                component: ContactShopComponent
            },
        ]
      }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule {
}