import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';

import {AdminComponent} from './admin.component';
import {AdminGoodsDetailComponent} from './goods-admin/admin-goods-detail/admin-goods-detail.component';
import {AdminGoodsEditComponent} from './goods-admin/admin-goods-edit/admin-goods-edit.component';
import {AdminGoodsListComponent} from './goods-admin/admin-goods-list/admin-goods-list.component';
import {AdminGoodsItemComponent} from './goods-admin/admin-goods-list/admin-goods-item/admin-goods-item.component';
import { AdminGoodsStartComponent } from './goods-admin/admin-goods-start/admin-goods-start.component';
import {SharedModule} from '@shared/modules/shared.module';
import { OrderComponent } from './order/order.component';
import { GoodsAdminComponent } from './goods-admin/goods-admin.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AdminComponent,
    AdminGoodsDetailComponent,
    AdminGoodsEditComponent,
    AdminGoodsListComponent,
    AdminGoodsItemComponent,
    AdminGoodsStartComponent,
    OrderComponent,
    GoodsAdminComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class AdminModule {
}
