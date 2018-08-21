import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AppModule} from "../../../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

import {ToasterService} from "angular2-toaster";
import {CommonService} from "@shared/services/common.service";
import {MockOrderService} from "@shared/unit-test-services/mock-order.service";
import {OrderService} from "@shared/services/order.service";
import {ProductService} from "@shared/services/product.service";
import {MockProductService, order} from "@shared/unit-test-services/mock-product.service";

import {AdminGoodsItemComponent} from "./admin-goods-item.component";

describe('AdminGoodsItemComponent', () => {
  let component: any;
  let fixture: ComponentFixture<AdminGoodsItemComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppModule
      ],
      providers: [],
      schemas: []
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AdminGoodsItemComponent);
      component = fixture.debugElement.componentInstance;
    });
  }));

  it('Should create AdminGoodsItemComponent', async(() => {
    expect(component).toBeTruthy();
  }));

});