import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AppModule} from './app.module';

import {AuthService} from '@shared/services/auth.service';
import {MockAuthService} from '@shared/unit-test-services/mock-auth.service';
import {OrderService} from '@shared/services/order.service';
import {MockOrderService} from '@shared/unit-test-services/mock-order.service';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let component: any;
  let fixture: ComponentFixture<AppComponent>;
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
        {provide: OrderService, useClass: MockOrderService},
        ToasterService,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;
    });

  }));

  it('Should create AppComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  it('set toaster config', () => {
    const toasterconfig = new ToasterConfig({
      showCloseButton: false,
      tapToDismiss: true,
      timeout: 1,
      animation: 'fade',
      newestOnTop: false,
      positionClass: 'test'
    });
    component.toasterconfig = toasterconfig;
    expect(component.toasterconfig).toEqual(toasterconfig);
  });
});
