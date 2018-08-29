import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {ProductService} from '@shared/services/product.service';
import {MockProductService, product} from '@shared/unit-test-services/mock-product.service';
import {ToasterService} from 'angular2-toaster';
import {CommonService} from '@shared/services/common.service';

import {GoodsListComponent} from './goods-list.component';

describe('GoodsListComponent', () => {
  let component: any;
  let fixture: ComponentFixture<GoodsListComponent>;
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
        CommonService
      ],
      schemas: [
        // CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GoodsListComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
    });

  }));

  it('Should create GoodsListComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {
    it('Should call getCurrentProduct & fetch  data for goodsList',
      async(() => {
        const spy = spyOn(component.productService, 'getCurrentProduct');
        // const spyProductsSubject = spyOn(component.productService, 'productsSubject');
        component.ngOnInit();
        expect(component.goodsList).toEqual([product]);
        expect(spy).toHaveBeenCalledWith();
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