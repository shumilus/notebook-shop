import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '@shared/modules/shared.module';
import {NavMenuComponent} from './header/nav-menu/nav-menu.component';
import {SigninComponent} from './header/signin/signin.component';
import {SignupComponent} from './header/signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    NavMenuComponent,
  ],
  imports: [
    // CommonModule,
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
