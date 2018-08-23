import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AppModule} from "../../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

import {ToasterService} from "angular2-toaster";
import {CommonService} from "@shared/services/common.service";
import {MockOrderService} from "@shared/unit-test-services/mock-order.service";
import {OrderService} from "@shared/services/order.service";
import {ProductService} from "@shared/services/product.service";
import {MockProductService, product} from "@shared/unit-test-services/mock-product.service";

import {AdminGoodsDetailComponent} from "./admin-goods-detail.component";
import {Router} from "@angular/router";
import {AdminComponent} from "../../admin.component";

describe('AdminGoodsDetailComponent', () => {
  let component: any;
  let fixture: ComponentFixture<AdminGoodsDetailComponent>;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'admin', component: AdminComponent}
        ]),
        HttpClientModule,
        ReactiveFormsModule,
        AppModule
      ],
      providers: [
        {provide: OrderService, useClass: MockOrderService},
        {provide: ProductService, useClass: MockProductService},
        ToasterService,
        CommonService
      ],
      schemas: [
        // CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AdminGoodsDetailComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
    });
    router = TestBed.get(Router);
  }));

  it('Should create AdminGoodsDetailComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {
    it('init getProduct method',
      async(() => {
        const spy = spyOn(component, 'getProduct');
        component.ngOnInit();
        expect(spy).toHaveBeenCalledWith();
      }));
  });

  describe('getProduct method', () => {
    it('get product by id',
      async(() => {
        component.id = 1;
        const spy = spyOn(component.productService, 'getProduct');
        component.getProduct();
        component.product = product;
        expect(spy).toHaveBeenCalledWith(component.id);
        expect(component.product).toEqual(product);
      }));
  });

  describe('onDeleteGoods method', () => {
    it('init getCurrentProduct, storageGoods delete product from goodsList and back to admin page',
      async(() => {
        const flag = true;
        component.id = 0;
        const productCur = [product];
        const spyStorageGoods = spyOn(component.productService, 'storageGoods');
        const spyNav = spyOn(component.router, 'navigate');
        component.onDeleteGoods();
        expect(spyStorageGoods).toHaveBeenCalledWith(productCur, flag);
        expect(productCur.length).toBe(1);
        expect(spyNav).toHaveBeenCalledWith(['/admin']);
      }));
  });

});