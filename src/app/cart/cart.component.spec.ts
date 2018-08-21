import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AppModule} from "../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {order, product} from "@shared/unit-test-services/mock-product.service";

import {ToasterService} from "angular2-toaster";
import {CommonService} from "@shared/services/common.service";
import {AuthService} from "@shared/services/auth.service";
import {MockAuthService} from "@shared/unit-test-services/mock-auth.service";
import {OrderService} from "@shared/services/order.service";
import {MockOrderService} from "@shared/unit-test-services/mock-order.service";

import {CartComponent} from "./cart.component";
import {p} from "../../../node_modules/@angular/core/src/render3";

describe('CartComponent', () => {
  let component: any;
  let fixture: ComponentFixture<CartComponent>;
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
        {provide: AuthService, useClass: MockAuthService},
        {provide: OrderService, useClass: MockOrderService},
        ToasterService,
        CommonService
      ],
      schemas: [
        // CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CartComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
      component.initForm();
    });

  }));

  it('Should create CartComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {
    it('should init getCart, getGoods, getUserEmail, getSum, initForm method',
      async(() => {

        const spy = spyOn(component, 'initForm');
        const spyGetUserEmail = spyOn(component, 'getUserEmail');
        const spyGetCart = spyOn(component.cartService, 'getCart');
        const spyGetGoods = spyOn(component.cartService, 'getGoods');
        const spyGetSum = spyOn(component, 'getSum');
        component.ngOnInit();
        expect(spy).toHaveBeenCalledWith();
        expect(spyGetCart).toHaveBeenCalledWith();
        expect(spyGetGoods).toHaveBeenCalledWith();
        expect(spyGetSum).toHaveBeenCalledWith();
        expect(spyGetUserEmail).toHaveBeenCalledWith();
      }));
  });

  describe('getUserEmail method', () => {
    it('Should check if  client is login, take email for cart form', () => {
      const userEmail = 'test';
      component.getUserEmail();
      expect(component.userEmail).toEqual(userEmail);
    });
  });

  // describe('getGoods method', () => {
  //   it('Should check if  client is login, take email for cart form', () => {
  //     component.cartList = [product];
  //     component.getGoods();
  //     expect(component.cartList).toEqual([product]);
  //
  //   });
  // });

  describe('getSum method', () => {
    it('Should calculate sum of products', () => {
      component.cartList = [product];
      component.getSum();
      expect(component.sum).toBe(5);
    });
  });

  describe('onDelete method', () => {
    it('Should init deleteProduct and setCart method and deduct price from sum',
      async(() => {
        component.sum = 10;
        const index = 1;
        const price = 5;
        const spy = spyOn(component.cartService, 'deleteProduct');
        const spySetCart = spyOn(component.cartService, 'setCart');
        component.onDelete(index, price);
        expect(spy).toHaveBeenCalledWith(index);
        expect(spySetCart).toHaveBeenCalledWith();
        expect(component.sum).toBe(5);
      }));
  });

  describe('onSubmit method', () => {
    it('Should init onAddOrder, clearCart, reset, saveOrder method and do sum equal 0',
      async(() => {
        component.sum = 0;
        const add= 'add';
        const spy = spyOn(component, 'onAddOrder');
        const spyClearCart = spyOn(component.cartService, 'clearCart');
        const spyReset = spyOn(component.buyerForm, 'reset');
        const spySaveOrder = spyOn(component.orderService, 'storageOrders');
        component.onSubmit();
        expect(spy).toHaveBeenCalledWith();
        expect(spyClearCart).toHaveBeenCalledWith();
        expect(spyReset).toHaveBeenCalledWith();
        expect(component.sum).toBe(0);
        expect(spySaveOrder).toHaveBeenCalledWith(add);
      }));
  });

  describe('onAddOrder method', () => {
    it('order should equal form value and goods in order should equal cartList',
      async(() => {
        component.$order = order;
        const spy = spyOn(component.productService, 'addOrder');
        component.onAddOrder();
        expect(component.$order).toEqual(order);
        expect(spy).toHaveBeenCalledWith(component.order);
      }));
  });

  describe('initForm method', () => {
    it(' init form',
      async(() => {
        component.initForm();
        expect(component.buyerForm.value.name).toBe('');
        expect(component.buyerForm.value.surname).toBe('');
        expect(component.buyerForm.value.phone).toBe('');
        expect(component.buyerForm.value.email).toBe('');
      }));
  });

  it('form invalid when empty', () => {
      expect(component.buyerForm.valid).toBeFalsy();
    }
  );

  it('email field validity', () => {
    let email = component.buyerForm.controls['email'];
    expect(email.valid).toBeFalsy();
  });

  it('submitting a form emits a user', () => {
    expect(component.buyerForm.valid).toBeFalsy();
    component.buyerForm.controls['name'].setValue("test");
    component.buyerForm.controls['surname'].setValue("test");
    component.buyerForm.controls['phone'].setValue("55555555");
    component.buyerForm.controls['email'].setValue("test@test.com");
    expect(component.buyerForm.valid).toBeTruthy();
  });

  describe('ngOnDestroy method', () => {
    it('Should unsubscribe',
      async(() => {
        const spy = spyOn(component.commonService, 'checkSubscription');
        component.ngOnDestroy();
        expect(spy).toHaveBeenCalledWith(component.cartSubscription);
        expect(spy).toHaveBeenCalledWith(component.userSubscription);
      }));
  });

});