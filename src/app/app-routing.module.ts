import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GoodsComponent} from './goods/goods.component';
import {CartComponent} from './cart/cart.component';
import {HomeComponent} from './core/home/home.component';
import {GoodsDetailComponent} from './goods/goods-detail/goods-detail.component';
import {GoodsListComponent} from './goods/goods-list/goods-list.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'products', component: GoodsComponent, children: [
      {path: '', component: GoodsListComponent},
      {path: ':id', component: GoodsDetailComponent},
    ]
  },
  {path: 'cart', component: CartComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
