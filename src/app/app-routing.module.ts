import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GoodsComponent} from './goods/goods.component';
import {CartComponent} from './cart/cart.component';
import {HomeComponent} from './core/home/home.component';
import {GoodsDetailComponent} from './goods/goods-detail/goods-detail.component';
import {GoodsListComponent} from './goods/goods-list/goods-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'goods', component: GoodsComponent, children: [
      { path: '', component: GoodsListComponent},
      { path: ':id', component: GoodsDetailComponent}
    ]},
  { path: 'cart', component: CartComponent, data: {name: 'basket'}},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
