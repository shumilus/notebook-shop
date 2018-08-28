import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@shared/services/auth.service';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {CommonService} from '@shared/services/common.service';

/**
 * @summary Signup component
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  invalidEmail = ['admin@admin.com'];

  /**
   * @summary Signup component constructor.
   * @param toasterService - Toaster service (toaster)
   * @param dialog - MatDialog service (pop-up)
   * @param authService - Auth service
   * @param formBuilder - FormBuilder service
   * @param commonService - Common service
   */
  constructor(private authService: AuthService,
              private toasterService: ToasterService,
              private dialog: MatDialog,
              private commonService: CommonService,
              private formBuilder: FormBuilder) { }

  /**
   * Initialize the component and call initForm method
   */
  ngOnInit() {
    this.initForm();
  }

  /**
   * init form
   */
  initForm() {
    this.signupForm = this.formBuilder.group({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email,
        this.forValidEmail.bind(this)]
      ),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      'confirmedPassword': new FormControl(null, [
        Validators.required,
        this.commonService.confirmPassword('password')
      ]),
    });
  }

  /**
   * register new user
   */
  onSingup() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.authService.singupUser(email, password);
  }

  /**
   * Check valid email name
   */
  forValidEmail(control: FormControl): { [key: string]: boolean } {
    for (const email of this.invalidEmail) {
      if (control.value === email) {
        return {'emailName': true};
      }
    }
    return null;
  }

  /**
   * Close dialog window
   */
  onCloseForm() {
    this.dialog.closeAll();
  }

}
