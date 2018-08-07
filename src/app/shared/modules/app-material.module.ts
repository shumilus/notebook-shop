import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MatInputModule, MatToolbarModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {SignupComponent} from '../../core/header/signup/signup.component';
import {SigninComponent} from '../../core/header/signin/signin.component';


@NgModule({
  imports: [],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  entryComponents: [
    SignupComponent,
    SigninComponent
  ],
})

export class AppMaterialModule {

}
