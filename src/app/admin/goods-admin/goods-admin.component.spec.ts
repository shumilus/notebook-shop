import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AppModule} from "../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {GoodsAdminComponent} from "./goods-admin.component";

describe('GoodsAdminComponent', () => {
  let component: any;
  let fixture: ComponentFixture<GoodsAdminComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AppModule
      ],
      providers: [],
      schemas: []
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GoodsAdminComponent);
      component = fixture.debugElement.componentInstance;
    });
  }));

  it('Should create GoodsAdminComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('onNewGoods method', () => {
    it('Should get AdminGoodsEditComponent',
      async(() => {
        const signStatus = 'test';
        const spy = spyOn(component.dialog, 'open');
        const params = {
          width: '550px',
        };
        component.onNewGoods(signStatus);
        expect(spy).toHaveBeenCalledWith(jasmine.any(Function), params);
      }));
  });

});