import {Component, Input} from '@angular/core';
import {Goods} from '@shared/models/goods.model';
import {CartService} from '@shared/services/cart.service';

/**
 * @summary GoodsItem component
 */
@Component({
  selector: 'app-goods-item',
  templateUrl: './goods-item.component.html',
  styleUrls: ['./goods-item.component.scss']
})
export class GoodsItemComponent {
  @Input() product: Goods;
  @Input() index: number;

  /**
   * @summary GoodsItem component constructor.
   * @param cartService - Cart service
   */
  constructor(private cartService: CartService) {
  }

  /**
   * @summary Add product to cart.
   */
  onAddToCart() {
    this.cartService.addCart(this.product);
  }

}
