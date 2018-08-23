import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Goods} from "@shared/models/goods.model";

import {AuthService} from '@shared/services/auth.service';
import {CommonService} from "@shared/services/common.service";
import {CartService} from "@shared/services/cart.service";


import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';

/**
 * @summary Header component
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  cartSubscription: Subscription;
  user: { email: string, isAdmin: boolean };
  cartData: {sum: number, total: number} = {sum: 0, total: 0};
  sum: number = 0;
  total: number = 0;

  /**
   * @summary Header component constructor.
   * @param router - Router service
   * @param dialog - MatDialog service (pop-up)
   * @param authService - Auth service
   * @param cartService - Cart service
   * @param commonService - Common service
   */
  constructor(private router: Router,
              private dialog: MatDialog,
              private authService: AuthService,
              private commonService: CommonService,
              private cartService: CartService) {
  }

  /**
   * Initialize the component and call getUser and getCart method
   */
  ngOnInit() {
    this.getUser();
    this.getCart();
  }

  /**
   * listener for check on admin
   */
  getUser() {
    this.userSubscription = this.authService.userSubject
      .subscribe(
        (user: { email: string, isAdmin: boolean }) => {
          this.user = user;
        }
      );
  }

  /**
   * listener for update cart list and total and sum value of cart
   */
  getCart() {
    this.cartSubscription = this.cartService.cartChanged
      .subscribe(
        (products: Goods[]) => {
          this.getCartData(products);
        }
      );
    this.cartService.getCart();
  }

  /**
   * Get total and sum value of cart
   */
  getCartData(products: Goods[]) {
    this.cartData.sum = 0;
    for (const product of products) {
      this.cartData.sum += +product.price;
    }
    this.cartData.total = products.length;
  }

  /**
   * Open dialog window of signup or signin component
   */
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

  /**
   * Left account
   */
  onLogout() {
    this.authService.logout();
  }

  /**
   * Cleanup logic
   */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.userSubscription);
  }

}
