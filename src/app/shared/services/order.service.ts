import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {CartService} from './cart.service';
import {ProductService} from './product.service';
import {Order} from '../models/order.model';
import {ToasterService} from "angular2-toaster";

@Injectable()
export class OrderService {

  constructor(private http: HttpClient,
              private cartService: CartService,
              private authService: AuthService,
              private productService: ProductService,
              private toasterService: ToasterService) {
  }

  storageOrders(flag: string) {
    const token = this.authService.getToken().token;
    this.http.put(`https://myfirstangular6project.firebaseio.com/order.json?auth=${token}`,
      this.productService.getOrders()
    ).subscribe(
      (response: any) => {
        if(flag === 'delete'){
          this.toasterService.pop('success', 'You delete order!');
        }
      });
  }

  getOrders() {
    this.http.get('https://myfirstangular6project.firebaseio.com/order.json')
      .subscribe(
        (orders: Order[]) => {
          this.productService.setOrders(orders);
        });
  }

}
