import {Goods} from '../models/goods.model';
import {Subject} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {Injectable} from '@angular/core';
import {Order} from '../models/order.model';
import {AuthService} from "@shared/services/auth.service";
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from "rxjs/index";
import 'rxjs/Rx'


@Injectable()
export class ProductService {
  orderChanged = new Subject<Order[]>();
  productsSubject = new BehaviorSubject<Goods[]>([]);
  private orderList: Order[] = [];

  /**
   * @summary Product service constructor.
   * @param http - HttpClient service
   * @param authService - Auth service
   * @param toasterService - Toaster service (toaster)
   */
  constructor(private toasterService: ToasterService,
              private authService: AuthService,
              private http: HttpClient) {
  }

  /**
   * Get product by index
   */
  getProduct(index: number) {
    return this.productsSubject.value[index];
  }

  /**
   * Get copy of order list
   */
  getOrders() {
    return this.orderList.slice();
  }

  /**
   * Add order to order list
   */
  addOrder(order: Order) {
    this.orderList.push(order);
    this.orderUpdate();
    this.toasterService.pop('success', 'Your order is ready!');
  }

  /**
   * Delete order by index from order list
   */
  deleteOrder(index: number) {
    this.orderList.splice(index, 1);
    this.orderUpdate();
  }

  /**
   * Send order list data change
   */
  orderUpdate() {
    this.orderChanged.next(this.orderList.slice());
  }

  /**
   * Set data for order list
   */
  setOrders(orders: Order[]) {
    this.orderList = orders;
    this.orderUpdate();
  }

  /**
   * Send product list to firebase
   */
  storageGoods(products: Goods[], isDelete?: boolean) {
    const token = this.authService.getToken().token;
    this.http.put(`https://myfirstangular6project.firebaseio.com/goods.json?auth=${token}`, products)
      .subscribe(
        (products: Goods[]) => {
          const message = `Product has been ${isDelete ? 'deleted' : 'added'}`;
          this.productsSubject.next(products);
          this.toasterService.pop('success', message);
        });
  }

  /**
   * Get current product list
   */
  getCurrentProduct() {
    if (this.productsSubject.value === null) {
      return [];
    }
    return this.productsSubject.value;
  }

  /**
   * Get product list from firebase
   */
  getProducts() {
    this.http.get('https://myfirstangular6project.firebaseio.com/goods.json')
      .map(
        (response: any) => {
          const goods: Goods[] = response;
          let index = 0;
          for (let product of goods) {
            product.id = index++;
          }
          return goods;
        }
      )
      .subscribe(
        (goods: Goods[]) => {
          if (!goods) return;
          this.productsSubject.next(goods);
        });
  }

}
