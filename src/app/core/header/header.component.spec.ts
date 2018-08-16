import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AppModule} from "../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

import {ToasterService} from "angular2-toaster";
import {CommonService} from "@shared/services/common.service";

import {AuthService} from "@shared/services/auth.service";
import {HeaderComponent} from "./header.component";
import {MockAuthService, user} from "@shared/unit-test-services/mock-auth.service";

describe('HeaderComponent', () => {
  let component: any;
  let fixture: ComponentFixture<HeaderComponent>;
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
        ToasterService,
        CommonService
      ],
      schemas: [
        // CUSTOM_ELEMENTS_SCHEMA
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
    });

  }));

  it('Should create HeaderComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {
    it('get user data',
      async(() => {
        component.ngOnInit();
        expect(component.user).toEqual(user);
      }));
  });

  describe('openForm method', () => {
    it('Should open singup or singin modal window',
      async(() => {
        const signStatus = 'test';
        const spy = spyOn(component.dialog, 'open');
        const params = {
          width: '450px',
        };
        component.openForm(signStatus);
        expect(spy).toHaveBeenCalledWith(jasmine.any(Function), params);
      }));
  });

  describe('onLogout method', () => {
    it('Should left account',
      async(() => {
        const spy = spyOn(component.authService, 'logout');
        component.onLogout();
        expect(spy).toHaveBeenCalledWith();
      }));
  });

  describe('ngOnDestroy method', () => {
    it('Should unsubscribe',
      async(() => {
        const spy = spyOn(component.userSubscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(spy).toHaveBeenCalledWith();
      }));
  });

});