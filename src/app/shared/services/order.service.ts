import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {CartService} from './cart.service';
import {ProductService} from './product.service';
import {Order} from '../models/order.model';
import {ToasterService} from 'angular2-toaster';

@Injectable()
export class OrderService {
  /**
   * @summary Order service constructor.
   * @param http - HttpClient service
   * @param productService - Product service
   * @param authService - Auth service
   * @param cartService - Cart service
   * @param toasterService - Toaster service (toaster)
   */
  constructor(private http: HttpClient,
              private cartService: CartService,
              private authService: AuthService,
              private productService: ProductService,
              private toasterService: ToasterService) {
  }

  /**
   * @summary Save order to firebase
   * @param isAdd - flag for add or delete
   */
  storageOrders(isAdd: boolean) {
    const token = this.authService.getToken().token;
    this.http.put(`https://myfirstangular6project.firebaseio.com/order.json?auth=${token}`,
      this.productService.getOrders()
    ).subscribe(
      (response: any) => {
        if (isAdd === false) {
          this.toasterService.pop('success', 'You delete order!');
        }
      });
  }

  /**
   * @summary Get order from firebase
   */
  getOrders() {
    this.http.get('https://myfirstangular6project.firebaseio.com/order.json')
      .subscribe(
        (orders: Order[]) => {
          this.productService.setOrders(orders);
        });
  }

}
