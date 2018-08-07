import {Goods} from '../models/goods.model';
import {Subject} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {Injectable} from '@angular/core';

@Injectable()
export class CartService {
  cartChanged = new Subject<Goods[]>();

  constructor(private toasterService: ToasterService) {
  }

  private cartList: Goods[] = [];

  addCart(product: Goods) {
    this.cartList.push(product);
    this.cartChanged.next(this.cartList.slice());
    this.toasterService.pop('success', 'You added product!');
  }

  getGoods() {
    return this.cartList.slice();
  }

  deleteProduct(index: number) {
    this.cartList.splice(index, 1);
    this.cartChanged.next(this.cartList.slice());
    this.toasterService.pop('error', 'You delete product!');
  }

  saveInBasket() {
    this.setCart();
  }

  setCart () {
    const value = JSON.stringify(this.cartList);
    localStorage.setItem('cartList', value);
  }

  getCart () {
    const data = JSON.parse(localStorage.getItem('cartList'));
    if (data) {
      this.cartList = data;
    }
  }

  clearCart() {
    this.cartList = [];
    this.cartChanged.next(this.cartList.slice());
    this.setCart();
  }

}
