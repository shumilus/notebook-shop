import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {CartService} from './cart.service';
import {AdminService} from './admin.service';
import {Order} from '../models/order.model';

@Injectable()
export class OrderStorageService {

  constructor (private http: HttpClient,
               private cartService: CartService,
               private authService: AuthService, private adminService: AdminService) {}

  storageOrders() {
    const token = this.authService.getToken();
    return this.http.put(`https://myfirstangular6project.firebaseio.com/order.json?auth=${token}`,
      this.adminService.getOrders());
  }

  getOrders() {
    this.http.get('https://myfirstangular6project.firebaseio.com/order.json')
      .subscribe(
        (orders: Order[]) => {
          this.adminService.setOrders(orders);
        });
  }

}
