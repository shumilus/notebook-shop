import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private authService: AuthService,
              private toasterService: ToasterService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  onSingin() {
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    this.authService.singinUser(email, password);
  }

  onCloseForm() {
    this.dialog.closeAll();
    // this.toasterService.pop('success', 'You have successfully registered!', );
  }

}
