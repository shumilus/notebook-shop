import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AppModule} from "../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

import {ToasterService} from "angular2-toaster";
import {CommonService} from "@shared/services/common.service";
import {CartService} from "@shared/services/cart.service";
import {MockCartService, product} from "@shared/unit-test-services/mock-cart.service";

import {GoodsItemComponent} from "./goods-item.component";

describe('GoodsItemComponent', () => {
  let component: any;
  let fixture: ComponentFixture<GoodsItemComponent>;
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
        {provide: CartService, useClass: MockCartService},
        ToasterService,
        CommonService
      ],
      schemas: [
        // CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GoodsItemComponent);
      component = fixture.debugElement.componentInstance;
    });

  }));

  it('Should create GoodsItemComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('onAddToCart method', () => {
    it('Should add product to cart',
      async(() => {
        component.goods = product;
        const spy = spyOn(component.cartService, 'addCart');
        component.onAddToCart();
        expect(spy).toHaveBeenCalledWith(product);
      }));
  });


});