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
  { path: 'admin', component: AdminComponent, children: [
      { path: 'order', component: OrderComponent, canActivate: [AuthGuardService]},
      { path: '', component: GoodsAdminComponent, children: [
          { path: '', component: AdminGoodsStartComponent, canActivate: [AuthGuardService]},
          { path: ':id', component: AdminGoodsDetailComponent, canActivate: [AuthGuardService]},
          { path: ':id/edit', component: AdminGoodsEditComponent, canActivate: [AuthGuardService]},
        ]},
    ]},
];

@NgModule({
  imports: [ RouterModule.forChild(adminRoutes)],
  exports: [ RouterModule],
  providers: []
})

export class AdminRoutingModule {
}
