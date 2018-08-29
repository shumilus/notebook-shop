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
import {MatIconModule} from '@angular/material/icon';
import {APP_BASE_HREF} from '@angular/common';

import {CartService} from '@shared/services/cart.service';
import {AuthGuardService} from '@shared/services/auth-guard.service';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {ProductService} from '@shared/services/product.service';
import {AuthService} from '@shared/services/auth.service';
import {CommonService} from '@shared/services/common.service';
import {OrderService} from '@shared/services/order.service';

import {AppComponent} from './app.component';
import {GoodsComponent} from './products/goods.component';
import {FooterComponent} from './footer/footer.component';
import {CartComponent} from './cart/cart.component';
import {GoodsItemComponent} from './products/goods-item/goods-item.component';
import {GoodsDetailComponent} from './products/goods-detail/goods-detail.component';
import {GoodsListComponent} from './products/goods-list/goods-list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    FooterComponent,
    CartComponent,
    GoodsItemComponent,
    GoodsDetailComponent,
    GoodsListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    ToasterModule.forRoot(),
    NgxPaginationModule,
    MatIconModule
  ],
  providers: [
    AuthService,
    ToasterService,
    ProductService,
    CartService,
    OrderService,
    AuthGuardService,
    CommonService,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
