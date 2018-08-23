import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@shared/services/auth.service';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';

/**
 * @summary Signin component
 */
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  /**
   * @summary Signin component constructor.
   * @param toasterService - Toaster service (toaster)
   * @param dialog - MatDialog service (pop-up)
   * @param authService - Auth service
   */
  constructor(private authService: AuthService,
              private toasterService: ToasterService,
              private dialog: MatDialog) {
  }

  /**
   * Initialize the component and call initForm method
   */
  ngOnInit() {
    this.initForm();
  }

  /**
   * init form
   */
  private initForm() {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  /**
   * login user
   */
  onSingin() {
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;
    this.authService.singinUser(email, password);
  }

  /**
   * Close dialog window
   */
  onCloseForm() {
    this.dialog.closeAll();
  }

}
