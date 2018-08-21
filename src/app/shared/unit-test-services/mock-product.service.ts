import {Goods} from "@shared/models/goods.model";
import {of} from "rxjs";
import {Order} from "@shared/models/order.model";

export const product: Goods = {
  name: 'test',
  description: 'test',
  imagePath: 'test',
  pages: 'test',
  coverMaterial: 'test',
  price: '5',
  id: 0
};

export const order: Order = {
  name: 'test',
  surname: 'test',
  phone: 'test',
  email: 'test',
  goods: [product]
};

export class MockProductService {
  productsSubject = of([product]);
  orderChanged = of([order]);

  getCurrentProduct() {
    return [product, product];
  }

  getProduct(index: number) {
    return product[index];
  }

  getOrders() {
    return [order];
  }

  deleteOrder(index: number) {
  }

  addOrder() {
  }

  storageGoods() {

  }

}