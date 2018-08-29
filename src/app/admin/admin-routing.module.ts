import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from '@shared/services/auth-guard.service';

import {GoodsAdminComponent} from './goods-admin/goods-admin.component';
import {AdminComponent} from './admin.component';
import {AdminGoodsStartComponent} from './goods-admin/admin-goods-start/admin-goods-start.component';
import {AdminGoodsDetailComponent} from './goods-admin/admin-goods-detail/admin-goods-detail.component';
import {AdminGoodsEditComponent} from './goods-admin/admin-goods-edit/admin-goods-edit.component';
import {OrderComponent} from './order/order.component';

const adminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: OrderComponent},
      {
        path: 'products', component: GoodsAdminComponent, children: [
          {path: '', component: AdminGoodsStartComponent},
          {path: ':id', component: AdminGoodsDetailComponent},
          {path: ':id/edit', component: AdminGoodsEditComponent},
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
  providers: []
})

export class AdminRoutingModule {
}
