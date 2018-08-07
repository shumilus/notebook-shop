import {Component, Input} from '@angular/core';
import {Goods} from '../../../../shared/models/goods.model';

@Component({
  selector: 'app-admin-goods-item',
  templateUrl: './admin-goods-item.component.html',
  styleUrls: ['./admin-goods-item.component.scss']
})
export class AdminGoodsItemComponent  {
  @Input() goods: Goods;
  @Input() index: number;
}
