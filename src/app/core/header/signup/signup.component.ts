import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {CommonService} from '../../../shared/services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  invalidEmail = ['test@test.com'];

  constructor(private authService: AuthService,
              private toasterService: ToasterService,
              private dialog: MatDialog,
              private commonService: CommonService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email,
        this.forValidProjectName.bind(this)]
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

  onSingup() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.authService.singupUser(email, password);
    // console.log(password);
  }

  forValidProjectName(control: FormControl): { [key: string]: boolean } {
    for (const email of this.invalidEmail) {
      if (control.value === email) {
        return {'emailName': true};
      }
    }
    return null;
  }

  onCloseForm() {
    this.dialog.closeAll();
    this.toasterService.pop('success', 'You have successfully logged in!');
  }


  testing() {
    console.log(this.signupForm);
  }
}
