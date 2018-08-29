import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {ProductService} from '@shared/services/product.service';
import {MockProductService, product} from '@shared/unit-test-services/mock-product.service';
import {ToasterService} from 'angular2-toaster';
import {CommonService} from '@shared/services/common.service';

import {GoodsDetailComponent} from './goods-detail.component';
import {CartService} from '@shared/services/cart.service';

describe('GoodsDetailComponent', () => {
  let component: any;
  let fixture: ComponentFixture<GoodsDetailComponent>;
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
        {provide: ProductService, useClass: MockProductService},
        ToasterService,
        CommonService,
        CartService
      ],
      schemas: []
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GoodsDetailComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
    });

  }));

  it('Should create GoodsDetailComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {
    it('Should call getProductById',
      async(() => {
        const spy = spyOn(component, 'getProductById');
        // const spyProductsSubject = spyOn(component.productService, 'productsSubject');
        component.ngOnInit();
        expect(spy).toHaveBeenCalledWith();
      }));
  });

  describe('getProductById method', () => {
    it('Should watch on change id and get product from products list by id',
      async(() => {
        component.id = 1;
        const spy = spyOn(component.productService, 'getProduct').and.returnValue(product);
        // const spyProductsSubject = spyOn(component.productService, 'productsSubject');
        component.ngOnInit();
        expect(spy).toHaveBeenCalledWith(component.id);
        expect(component.product).toEqual(product);
      }));
  });

  describe('onAddToCart method', () => {
    it('Should add product to cart',
      async(() => {
        component.product = product;
        const spy = spyOn(component.cartService, 'addCart');
        component.onAddToCart();
        expect(spy).toHaveBeenCalledWith(product);
      }));
  });

  describe('ngOnDestroy method', () => {
    it('Should unsubscribe from productsSubject',
      async(() => {
        const spy = spyOn(component.commonService, 'checkSubscription');
        component.ngOnDestroy();
        expect(spy).toHaveBeenCalledWith(component.productsSubscription);
      }));
  });

});