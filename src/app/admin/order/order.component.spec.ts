import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AppModule} from "../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

import {ToasterService} from "angular2-toaster";
import {CommonService} from "@shared/services/common.service";
import {MockOrderService} from "@shared/unit-test-services/mock-order.service";
import {OrderService} from "@shared/services/order.service";
import {ProductService} from "@shared/services/product.service";
import {MockProductService, order} from "@shared/unit-test-services/mock-product.service";

import {OrderComponent} from "./order.component";

describe('OrderComponent', () => {
  let component: any;
  let fixture: ComponentFixture<OrderComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
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
      fixture = TestBed.createComponent(OrderComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
    });
  }));

  it('Should create OrderComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {
    it('init getOrders method',
      async(() => {
        component.ngOnInit();
      }));
  });

  describe('getOrders method', () => {
    it('get order from local storage and check on change of orderList',
      async(() => {
        const spy = spyOn(component.orderService, 'getOrders');
        const spyOrder = spyOn(component.productService, 'getOrders').and.returnValue([order]);
        component.orderList = order;
        component.ngOnInit();
        expect(spy).toHaveBeenCalledWith();
        expect(spyOrder).toHaveBeenCalledWith();
        expect(component.orderList).toEqual([order]);
      }));
  });

  describe('onDelete method', () => {
    it('delete order from order list and save new orderList in local storage',
      async(() => {
        const flag = false;
        const index = 1;
        const spy = spyOn(component.productService, 'deleteOrder');
        const spySaveOrder = spyOn(component.orderService, 'storageOrders');
        component.onDelete(index);
        expect(spy).toHaveBeenCalledWith(index);
        expect(spySaveOrder).toHaveBeenCalledWith(flag);
      }));
  });

  describe('ngOnDestroy method', () => {
    it('Should unsubscribe from orderChanged',
      async(() => {
        const spy = spyOn(component.commonService, 'checkSubscription');
        component.ngOnDestroy();
        expect(spy).toHaveBeenCalledWith(component.orderChangedSubscription);
      }));
  });

});