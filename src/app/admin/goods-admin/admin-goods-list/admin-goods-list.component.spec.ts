import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../app.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {ToasterService} from 'angular2-toaster';
import {CommonService} from '@shared/services/common.service';
import {ProductService} from '@shared/services/product.service';
import {MockProductService, product} from '@shared/unit-test-services/mock-product.service';
import {MockAuthService} from '@shared/unit-test-services/mock-auth.service';
import {AuthService} from '@shared/services/auth.service';

import {AdminGoodsListComponent} from './admin-goods-list.component';

describe('AdminGoodsListComponent', () => {
  let component: any;
  let fixture: ComponentFixture<AdminGoodsListComponent>;
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
        {provide: ProductService, useClass: MockProductService},
        ToasterService,
        CommonService
      ],
      schemas: []
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AdminGoodsListComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
    });
  }));

  it('Should create AdminGoodsListComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {
    it('init getCurrentProduct method',
      async(() => {
        component.goodsList = [product];
        const spy = spyOn(component.productService, 'getCurrentProduct');
        component.ngOnInit();
        expect(spy).toHaveBeenCalledWith();
        expect(component.goodsList).toEqual([product]);
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
