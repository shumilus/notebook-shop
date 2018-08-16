import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@shared/modules/shared.module";
import {NgxPaginationModule} from "ngx-pagination";
import {AppMaterialModule} from "@shared/modules/app-material.module";
import {ProductService} from "@shared/services/product.service";
import {MockProductService} from "@shared/unit-test-services/mock-product.service";
import {ToasterService} from "angular2-toaster";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HomeComponent} from "../core/home/home.component";
import {CartComponent} from "../cart/cart.component";
import {SignupComponent} from "../core/header/signup/signup.component";
import {SigninComponent} from "../core/header/signin/signin.component";
import {CommonService} from "@shared/services/common.service";
import {GoodsDetailComponent} from "./goods-detail/goods-detail.component";
import {GoodsComponent} from "./goods.component";
import {GoodsListComponent} from "./goods-list/goods-list.component";
import {AppModule} from "../app.module";

describe('GoodsListComponent', () => {
  let component: any;
  let fixture: ComponentFixture<GoodsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        // GoodsComponent,
        // GoodsListComponent,
        // HomeComponent,
        // GoodsDetailComponent,
        // CartComponent,
        // SignupComponent,
        // SigninComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        // SharedModule,
        // NgxPaginationModule,
        // AppMaterialModule,
        AppModule
      ],
      providers: [
        ToasterService,
        CommonService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GoodsComponent);
      component = fixture.debugElement.componentInstance;
    });

  }));

  it('Should create GoodsComponent', async(() => {
    expect(component).toBeTruthy();
  }));

});