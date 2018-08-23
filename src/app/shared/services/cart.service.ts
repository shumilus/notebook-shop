import {Goods} from '../models/goods.model';
import {Subject} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {Injectable} from '@angular/core';

@Injectable()
export class CartService {
  cartChanged = new Subject<Goods[]>();
  private cartList: Goods[] = [];

  /**
   * @summary Cart service constructor.
   * @param toasterService - Toaster service (toaster)
   */
  constructor(private toasterService: ToasterService) {
  }

  /**
   * Add product to cart list
   */
  addCart(product: Goods) {
    this.cartList.push(product);
    this.cartChanged.next(this.cartList.slice());
    this.setCart();
    this.toasterService.pop('success', 'You added product!');
  }

  /**
   * Get copy of cart list
   */
  getGoods() {
    return this.cartList.slice();
  }

  /**
   * Delete product from cart list
   */
  deleteProduct(index: number) {
    this.cartList.splice(index, 1);
    this.cartChanged.next(this.cartList.slice());
    this.toasterService.pop('success', 'You delete product!');
  }

  /**
   * Save cart list data to local storage
   */
  setCart () {
    const value = JSON.stringify(this.cartList);
    localStorage.setItem('cartList', value);
  }

  /**
   * Get cart list data from local storage
   */
  getCart () {
    const data = JSON.parse(localStorage.getItem('cartList'));
    if (data) {
      this.cartList = data;
      this.cartChanged.next(data);
    }

  }

  /**
   * Cleanup cart list
   */
  clearCart() {
    this.cartList = [];
    this.cartChanged.next(this.cartList.slice());
    this.setCart();
  }

}
