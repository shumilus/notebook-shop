import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {CartService} from './cart.service';
import {ProductService} from './product.service';
import {Order} from '../models/order.model';

@Injectable()
export class OrderStorageService {

  constructor (private http: HttpClient,
               private cartService: CartService,
               private authService: AuthService,
               private productService: ProductService) {}

  storageOrders() {
    const token = this.authService.getTokenId();
    return this.http.put(`https://myfirstangular6project.firebaseio.com/order.json?auth=${token}`,
      this.productService.getOrders());
  }

  getOrders() {
    this.http.get('https://myfirstangular6project.firebaseio.com/order.json')
      .subscribe(
        (orders: Order[]) => {
          this.productService.setOrders(orders);
        });
  }

}
