import {Component, Input} from '@angular/core';
import {Goods} from '@shared/models/goods.model';

/**
 * @summary AdminGoodsItem component
 */
@Component({
  selector: 'app-admin-goods-item',
  templateUrl: './admin-goods-item.component.html',
  styleUrls: ['./admin-goods-item.component.scss']
})

export class AdminGoodsItemComponent {
  @Input() product: Goods;
  @Input() index: number;
}
