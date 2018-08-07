import {Component, Input, OnInit} from '@angular/core';
import {Goods} from '../../shared/models/goods.model';
import {CartService} from '../../shared/services/cart.service';

@Component({
  selector: 'app-goods-item',
  templateUrl: './goods-item.component.html',
  styleUrls: ['./goods-item.component.scss']
})
export class GoodsItemComponent implements OnInit {
  @Input() goods: Goods;
  @Input() index: number;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
  }

  onAddToCart() {
    this.cartService.addCart(this.goods);
    // console.log(this.goods);
    this.cartService.saveInBasket();
  }


}
