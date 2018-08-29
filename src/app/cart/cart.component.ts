import {Component, OnDestroy, OnInit} from '@angular/core';
import {Goods} from '@shared/models/goods.model';
import {Subscription} from 'rxjs';
import {AuthService} from '@shared/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Order} from '@shared/models/order.model';

import {OrderService} from '@shared/services/order.service';
import {CommonService} from '@shared/services/common.service';
import {ProductService} from '@shared/services/product.service';
import {CartService} from '@shared/services/cart.service';

/**
 * @summary Cart component
 */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {
  cartList: Goods[];
  cartData: { sum: number, total: number } = {sum: 0, total: 0};
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userEmail;
  order: Order = new Order();
  buyerForm: FormGroup;

  /**
   * @summary Cart component constructor.
   * @param orderService - Order service
   * @param productService - Product service
   * @param authService - Auth service
   * @param cartService - Cart service
   * @param commonService - Common service
   */
  constructor(private cartService: CartService,
              private authService: AuthService,
              private orderService: OrderService,
              private productService: ProductService,
              private commonService: CommonService) {
  }

  /**
   * @summary Initialize the component and call initForm, getUserEmail, getCart, getGoods and getCartData method
   */
  ngOnInit() {
    this.initForm();
    this.getUserEmail();
    this.cartService.getCart();
    this.getGoods();
    this.getCartData();
  }

  /**
   * @summary Listener for user email
   */
  getUserEmail() {
    this.userSubscription = this.authService.userSubject
      .subscribe(
        (user: { email: string, isAdmin: boolean }) => {
          this.userEmail = user ? user.email : '';
          this.buyerForm.controls.email.setValue(this.userEmail);
        }
      );
  }

  /**
   * @summary Listener for update cart list
   */
  getGoods() {
    this.cartSubscription = this.cartService.cartChanged
      .subscribe(
        (goods: Goods[]) => {
          this.cartList = goods;
        }
      );
    this.cartList = this.cartService.getGoods();
  }

  /**
   * @summary Get total and sum value of cart
   */
  getCartData() {
    for (const product of this.cartList) {
      this.cartData.sum += +product.price;
    }
    this.cartData.total = this.cartList.length;
  }

  /**
   * @summary Delete product from cart
   * @param index - product index
   * @param price - price data
   */
  onDelete(index: number, price: string) {
    this.cartService.deleteProduct(index);
    this.cartData.sum -= +price;
    this.cartData.total = this.cartList.length;
    this.cartService.setCart();
  }

  /**
   * @summary Submit order to order list
   */
  onSubmit() {
    this.onAddOrder();
    this.cartService.clearCart();
    this.buyerForm.reset();
    this.cartData.sum = 0;
    this.cartData.total = 0;
    this.orderService.storageOrders(true);
  }

  /**
   *@summary Add order to order list
   */
  onAddOrder() {
    this.order = this.buyerForm.value;
    this.order.goods = this.cartList;
    this.productService.addOrder(this.order);
  }

  /**
   * @summary Init form
   */
  private initForm() {
    this.buyerForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'surname': new FormControl('', Validators.required),
      'phone': new FormControl('', [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      'email': new FormControl('', [Validators.required, Validators.email]),
    });
  }

  /**
   * @summary Cleanup logic
   */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.cartSubscription);
    this.commonService.checkSubscription(this.userSubscription);
  }

}


