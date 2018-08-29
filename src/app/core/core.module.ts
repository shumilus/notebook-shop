import {NgModule} from '@angular/core';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '@shared/modules/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

import {NavMenuComponent} from './header/nav-menu/nav-menu.component';
import {SigninComponent} from './header/signin/signin.component';
import {SignupComponent} from './header/signup/signup.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    NavMenuComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
  ],
  providers: [],
})

export class CoreModule {
}
