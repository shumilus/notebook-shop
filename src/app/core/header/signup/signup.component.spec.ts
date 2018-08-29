import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../app.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {ToasterService} from 'angular2-toaster';
import {CommonService} from '@shared/services/common.service';

import {AuthService} from '@shared/services/auth.service';
import {MockAuthService} from '@shared/unit-test-services/mock-auth.service';
import {SignupComponent} from './signup.component';

describe('SignupComponent', () => {
  let component: any;
  let fixture: ComponentFixture<SignupComponent>;
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
      schemas: []
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SignupComponent);
      component = fixture.debugElement.componentInstance;
      component.ngOnInit();
    });

  }));

  it('Should create SignupComponent', async(() => {
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
    it(' init form',
      async(() => {
        component.initForm();
        expect(component.signupForm.value.email).toBe(null);
        expect(component.signupForm.value.password).toBe(null);
        expect(component.signupForm.value.confirmedPassword).toBe(null);
      }));
  });

  it('form invalid when empty', () => {
      expect(component.signupForm.valid).toBeFalsy();
    }
  );

  it('email field validity', () => {
    const email = component.signupForm.controls['email'];
    expect(email.valid).toBeFalsy();
  });

  describe('onSingup method', () => {
    it('Should call singupUser method with params email and password ',
      async(() => {
        const userData = {email: 'test', password: 'test'};
        component.signupForm.value = userData;
        const spy = spyOn(component.authService, 'singupUser');
        component.onSingup();
        expect(component.signupForm.value).toEqual(userData);
        expect(spy).toHaveBeenCalledWith(userData.email, userData.password);
      }));
  });

  describe('onCloseForm method', () => {
    it('close form',
      async(() => {
        const spy = spyOn(component, 'onCloseForm');
        component.onCloseForm();
        expect(spy).toHaveBeenCalledWith();
      }));
  });

});