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

  constructor(private toasterService: ToasterService,
              private authService: AuthService,
              private http: HttpClient) {
  }

  private orderList: Order[] = [];

  getProduct(index: number) {
    return this.productsSubject.value[index];
  }

  getOrders() {
    return this.orderList.slice();
  }

  addOrder(order: Order) {
    this.orderList.push(order);
    this.orderUpdate();
    this.toasterService.pop('success', 'Your order is ready!');
  }

  deleteOrder(index: number) {
    this.orderList.splice(index, 1);
    this.orderUpdate();
    this.toasterService.pop('success', 'You delete order!');
  }

  orderUpdate() {
    this.orderChanged.next(this.orderList.slice());
  }

  setOrders(orders: Order[]) {
    this.orderList = orders;
    this.orderUpdate();
  }

  storageGoods(products: Goods[], isDelete?: boolean) {
    const token = this.authService.getToken().token;
    this.http.put(`https://myfirstangular6project.firebaseio.com/goods.json?auth=${token}`, products)
      .subscribe(
        (products: Goods[]) => {
          const message = `Product has been ${isDelete ? 'deleted' : 'added'}`;
          this.productsSubject.next(products);
          this.toasterService.pop('success', message);
          // console.log('test');
        });
  }

  getCurrentProductsList() {
    if (this.productsSubject.value === null){
      return [];
    }
    return this.productsSubject.value;
  }

  getProducts() {
    this.http.get('https://myfirstangular6project.firebaseio.com/goods.json')
      .map(
        (response:any) => {
          const goods: Goods[] = response;
          let index = 0;
          for (let product of goods){
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
