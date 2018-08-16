import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {AppModule} from "../../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

import {ToasterService} from "angular2-toaster";
import {CommonService} from "@shared/services/common.service";

import {AuthService} from "@shared/services/auth.service";
import {MockAuthService} from "@shared/unit-test-services/mock-auth.service";
import {SigninComponent} from "./signin.component";

describe('SigninComponent', () => {
  let component: any;
  let fixture: ComponentFixture<SigninComponent>;
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
      fixture = TestBed.createComponent(SigninComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
    });

  }));

  it('Should create SigninComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit method', () => {
    it('Should call initForm',
      async(() => {
        const spy = spyOn(component, 'initForm');
        component.ngOnInit();
        expect(spy).toHaveBeenCalledWith();
      }));
  });

  describe('initForm method', () => {
    it('init form',
      async(() => {
        component.initForm();
        expect(component.signinForm.value.email).toEqual(null);
        expect(component.signinForm.value.password).toEqual(null);

      }));
  });

  describe('onSingin method', () => {
    it('Should call singinUser method with params email and password ',
      async(() => {
        const userData = { email: 'test', password: 'test'};
        component.signinForm.value = userData;
        const spy = spyOn(component.authService, 'singinUser');
        component.onSingin();
        expect(component.signinForm.value).toEqual(userData);
        expect(spy).toHaveBeenCalledWith(userData.email, userData.password);
      }));
  });

  describe('onCloseForm method', () => {
    it('close form',
      async(() => {
        const spy = spyOn(component.dialog, 'closeAll');
        component.onCloseForm();
        expect(spy).toHaveBeenCalledWith();
      }));
  });

});