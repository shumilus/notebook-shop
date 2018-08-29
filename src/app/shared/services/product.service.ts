import {Goods} from '../models/goods.model';
import {Subject} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {Injectable} from '@angular/core';
import {Order} from '../models/order.model';
import {AuthService} from '@shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/index';
import 'rxjs/Rx';


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
   * @summary Get product by index
   * @param index - product index
   */
  getProduct(index: number) {
    return this.productsSubject.value[index];
  }

  /**
   * @summary Get copy of order list
   */
  getOrders() {
    return this.orderList.slice();
  }

  /**
   * @summary Add order to order list
   * @param order - order data
   */
  addOrder(order: Order) {
    this.orderList.push(order);
    this.orderUpdate();
    this.toasterService.pop('success', 'Your order is ready!');
  }

  /**
   * @summary Delete order by index from order list
   * @param index - order index
   */
  deleteOrder(index: number) {
    this.orderList.splice(index, 1);
    this.orderUpdate();
  }

  /**
   * @summary Send order list data change
   */
  orderUpdate() {
    this.orderChanged.next(this.orderList.slice());
  }

  /**
   * @summary Set data for order list
   * @param orders - order list data
   */
  setOrders(orders: Order[]) {
    this.orderList = orders;
    this.orderUpdate();
  }

  /**
   * @summary Send product list to firebase
   * @param products - products list
   * @param isDelete - flag for delete
   */
  storageGoods(products: Goods[], isDelete?: boolean) {
    const token = this.authService.getToken().token;
    this.http.put(`https://myfirstangular6project.firebaseio.com/products.json?auth=${token}`, products)
      .subscribe(
        (data: Goods[]) => {
          const message = `Product has been ${isDelete ? 'deleted' : 'added'}`;
          this.productsSubject.next(data);
          this.toasterService.pop('success', message);
        });
  }

  /**
   * @summary Get current product list
   */
  getCurrentProduct() {
    if (this.productsSubject.value === null) {
      return [];
    }
    return this.productsSubject.value;
  }

  /**
   * @summaryGet product list from firebase
   */
  getProducts() {
    this.http.get('https://myfirstangular6project.firebaseio.com/products.json')
      .map(
        (response: any) => {
          const products: Goods[] = response;
          let index = 0;
          for (const product of products) {
            product.id = index++;
          }
          return products;
        }
      )
      .subscribe(
        (goods: Goods[]) => {
          if (!goods) {
            return;
          }
          this.productsSubject.next(goods);
        });
  }

}
