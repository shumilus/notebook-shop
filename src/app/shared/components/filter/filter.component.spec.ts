import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AppModule} from "../../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {order, product} from "@shared/unit-test-services/mock-product.service";

import {ToasterService} from "angular2-toaster";
import {CommonService} from "@shared/services/common.service";
import {FilterComponent} from "@shared/components/filter/filter.component";

describe('FilterComponent', () => {
  let component: any;
  let fixture: ComponentFixture<FilterComponent>;
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
        ToasterService,
        CommonService
      ],
      schemas: [
        // CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(FilterComponent);
      component = fixture.debugElement.componentInstance;
    });

  }));

  it('Should create FilterComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('sendPageParams method', () => {
    it('Should send page params for filter', () => {
      const spy = spyOn(component.filterPage, 'emit');
      const params = 'test';
      component.sendPageParams(params);
      expect(spy).toHaveBeenCalledWith(params);
    });
  });

  describe('sendCovMatParams method', () => {
    it('Should send cover material params for filter', () => {
      const spy = spyOn(component.filterCovMat, 'emit');
      const params = 'test';
      component.sendCovMatParams(params);
      expect(spy).toHaveBeenCalledWith(params);
    });
  });

  describe('minPriceFilter method', () => {
    it('Should send min value of price for filter', () => {
      component.minPrice = 10;
      const spy = spyOn(component.filterMinPrice, 'emit');
      component.minPriceFilter();
      expect(spy).toHaveBeenCalledWith(component.minPrice);
    });
  });

  describe('maxPriceFilter method', () => {
    it('Should send max value of price for filter', () => {
      component.maxPrice = 10;
      const spy = spyOn(component.filterMaxPrice, 'emit');
      component.maxPriceFilter();
      expect(spy).toHaveBeenCalledWith(component.maxPrice);
    });
  });

});