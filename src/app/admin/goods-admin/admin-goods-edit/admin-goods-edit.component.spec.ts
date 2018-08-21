import {async, ComponentFixture, fakeAsync, TestBed} from "@angular/core/testing";
import {AppModule} from "../../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AppRoutingModule} from "../../../app-routing.module";
import {AdminRoutingModule} from "../../admin-routing.module";

import {ToasterService} from "angular2-toaster";
import {CommonService} from "@shared/services/common.service";
import {ProductService} from "@shared/services/product.service";
import {MockProductService, product} from "@shared/unit-test-services/mock-product.service";

import {AdminComponent} from "../../admin.component";
import {AdminGoodsEditComponent} from "./admin-goods-edit.component";

describe('AdminGoodsEditComponent', () => {
  let component: any;
  let fixture: ComponentFixture<AdminGoodsEditComponent>;
  // let location: Location;
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
        AppModule,
        AppRoutingModule,
        AdminRoutingModule
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
      fixture = TestBed.createComponent(AdminGoodsEditComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
    });
    router = TestBed.get(Router);
  }));

  it('Should create AdminGoodsEditComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {
    it('init initForm method',
      async(() => {
        const spy = spyOn(component, 'initForm');
        component.ngOnInit();
        expect(spy).toHaveBeenCalledWith();
      }));
  });

  describe('initForm method', () => {
    it(' init form',
      async(() => {
        const product = {
          name: '',
          imagePath: '',
          description: '',
          price: '',
          pages: '',
          coverMaterial: ''
        };
        component.initForm();
        expect(component.goodsForm.value).toEqual(product);
      }));
  });

  describe('initForm method', () => {
    it(' init form if editMode equal true',
      async(() => {
        expect(component.goodsForm.valid).toBeFalsy();
        const product = {
          name: 'test',
          imagePath: 'test',
          description: 'test',
          price: '5',
          pages: '5',
          coverMaterial: 'test'
        };
        component.initForm();
        component.goodsForm.setValue(product);
        expect(component.goodsForm.value).toEqual(product);
        expect(component.goodsForm.valid).toBeTruthy();
      }));
  });

  it('form invalid when empty', () => {
      expect(component.goodsForm.valid).toBeFalsy();
    }
  );

  it('name field validity', () => {
    let name = component.goodsForm.controls['name'];
    expect(name.valid).toBeFalsy();
  });

  describe('onSubmit method', () => {
    it('Should init getCurrentProduct, onCancel, storageGoods',
      async(() => {
        // const newGoods = product;
        component.editMode = true;
        const spy = spyOn(component.productService, 'getCurrentProduct').and.returnValue([product]);
        const spyOnCancel = spyOn(component, 'onCancel');
        // const spyStorageGoods = spyOn(component.productService, 'storageGoods');
        component.onSubmit();
        expect(spy).toHaveBeenCalledWith();
        expect(spyOnCancel).toHaveBeenCalledWith();
        // expect(spyStorageGoods).toHaveBeenCalledWith([newGoods]);
      }));
  });

  describe('onCancel method', () => {
    it('closeA dialog window navigate to admin page',
      fakeAsync(() => {
        const spy = spyOn(component.dialog, 'closeAll');
        const spyNav = spyOn(component.router, 'navigate');
        component.onCancel();
        expect(spy).toHaveBeenCalledWith();
        expect(spyNav).toHaveBeenCalledWith(['/admin']);
      }));
  });
});