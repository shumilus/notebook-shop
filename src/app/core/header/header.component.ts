import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  user: { email: string, isAdmin: boolean};

  constructor(private router: Router,
              private dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.userSubject
      .subscribe(
        (user: {email: string, isAdmin: boolean}) => {
          this.user = user;
        }
      );
  }

  openForm(typeWindow: string) {
    let signStatus;
    if (typeWindow === 'signup') {
      signStatus = SignupComponent;
    } else {
      signStatus = SigninComponent;
    }
    this.dialog.open(signStatus, {
      width: '450px',
      data: null
    });
  }

  onLogout() {
    this.authService.logout();
    // this.router.navigate(['/']);
    // this.toasterService.pop('success', 'You left your account!' );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
