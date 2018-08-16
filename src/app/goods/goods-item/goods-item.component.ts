import {Component, Input} from '@angular/core';
import {Goods} from '@shared/models/goods.model';
import {CartService} from '@shared/services/cart.service';

@Component({
  selector: 'app-goods-item',
  templateUrl: './goods-item.component.html',
  styleUrls: ['./goods-item.component.scss']
})
export class GoodsItemComponent {
  @Input() goods: Goods;
  @Input() index: number;

  constructor(private cartService: CartService) {
  }

  onAddToCart() {
    this.cartService.addCart(this.goods);
  }

}
