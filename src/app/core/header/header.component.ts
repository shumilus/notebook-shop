import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';

import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {CommonService} from "@shared/services/common.service";


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
              private authService: AuthService,
              private commonService: CommonService) { }

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
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    // this.userSubscription.unsubscribe();
    this.commonService.checkSubscription(this.userSubscription);
  }

}
