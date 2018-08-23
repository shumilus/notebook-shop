import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AppModule} from "../../../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

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