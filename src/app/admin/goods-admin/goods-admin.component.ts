import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AdminGoodsEditComponent} from './admin-goods-edit/admin-goods-edit.component';

/**
 * @summary GoodsAdmin component
 */
@Component({
  selector: 'app-goods-admin',
  templateUrl: './goods-admin.component.html',
  styleUrls: ['./goods-admin.component.scss']
})

export class GoodsAdminComponent {
  /**
   * @summary GoodsAdmin component constructor.
   * @param dialog - MatDialog service (pop-up)
   */
  constructor(private dialog: MatDialog) {
  }

  /**
   * Open AdminGoodsEdit component in pop-up
   */
  onNewGoods() {
    this.dialog.open(AdminGoodsEditComponent, {
      width: '550px',
    });
  }

}
