import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/modules/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import {AdminModule} from './admin/admin.module';

import {CartService} from '@shared/services/cart.service';

import {AuthGuardService} from '@shared/services/auth-guard.service';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {ProductService} from '@shared/services/product.service';
import {AuthService} from '@shared/services/auth.service';

import {AppComponent} from './app.component';
import {GoodsComponent} from './goods/goods.component';
import {FooterComponent} from './footer/footer.component';
import {CartComponent} from './cart/cart.component';
import {GoodsItemComponent} from './goods/goods-item/goods-item.component';
import {GoodsDetailComponent} from './goods/goods-detail/goods-detail.component';
import {GoodsListComponent} from './goods/goods-list/goods-list.component';
import {CommonService} from '@shared/services/common.service';
import {OrderService} from "@shared/services/order.service";

@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    FooterComponent,
    CartComponent,
    GoodsItemComponent,
    GoodsDetailComponent,
    GoodsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    ToasterModule.forRoot(),
    AdminModule,
    NgxPaginationModule,
  ],
  providers: [
    AuthService,
    ToasterService,
    ProductService,
    CartService,
    OrderService,
    AuthGuardService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
