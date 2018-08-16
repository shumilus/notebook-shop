import {Goods} from "@shared/models/goods.model";
import {Observable} from "rxjs";
import {Order} from "@shared/models/order.model";

export const goods: Goods = {
  name: 'test',
  description: 'test',
  imagePath: 'test',
  pages: 'test',
  coverMaterial: 'test',
  price: 'test',
  id: 0
};

export const order: Order = {
  name: 'test',
  surname: 'test',
  phone: 'test',
  email: 'test',
  goods: [goods]
};

export class MockProductService {
  productsSubject = Observable.of([goods]);
  orderChanged = Observable.of([order]);

  getCurrentProduct() {
    return [goods];
  }

  getProduct(index: number) {
    return goods[index];
  }

  getOrders() {
    return [order];
  }

  deleteOrder(index: number) {

  }

}