import {Goods} from '../models/goods.model';
import {Subject} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {Injectable} from '@angular/core';
import {Order} from '../models/order.model';

@Injectable()
export class AdminService {
  goodsChanged = new Subject<Goods[]>();
  orderChanged = new Subject<Order[]>();

  constructor(private toasterService: ToasterService) {
  }
  private orderList: Order[] = [];
  private goodsList: Goods[] = [
    // new Goods(
    //   'My Style',
    //   'The notebook with four ring',
    //   'https://images.ua.prom.st/1079695606_w640_h640_kollazh._my_style.jpg',
    //   '120',
    //   'Laminated cardboard',
    //   '140'
    // ),
    // new Goods(
    //   'Monocolor',
    //   'The notebook with one color',
    //   'http://bloktetradi.pp.ua/wp-content/uploads/2017/12/IMG_2116.jpg',
    //   '120',
    //   'Laminated cardboard',
    //   '140'
    // )
  ];

  getGoods() {
    return this.goodsList.slice();
  }

  getProduct(index: number) {
    // console.log(this.goodsList);
    return this.goodsList[index];
  }

  addGoods(product: Goods) {
    this.goodsList.push(product);
    this.goodsChanging();
  }

  updateGoods(index: number, product: Goods) {
    this.goodsList[index] = product;
    this.goodsChanging();
  }

  deleteGoods(index: number) {
    this.goodsList.splice(index, 1);
    this.goodsChanging();
    this.toasterService.pop('error', 'You delete product!');
  }

  setGoods(goods: Goods[]) {
    this.goodsList = goods;
    this.goodsChanging();
  }

  goodsChanging() {
    this.goodsChanged.next(this.goodsList.slice());
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
    this.toasterService.pop('error', 'You delete order!');
  }

  orderUpdate() {
    this.orderChanged.next(this.orderList.slice());
  }

  setOrders(orders: Order[]) {
    this.orderList = orders;
    this.orderUpdate();
  }

}
