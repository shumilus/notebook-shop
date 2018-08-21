import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AdminGoodsEditComponent} from './admin-goods-edit/admin-goods-edit.component';

@Component({
  selector: 'app-goods-admin',
  templateUrl: './goods-admin.component.html',
  styleUrls: ['./goods-admin.component.scss']
})

export class GoodsAdminComponent {
  constructor(private dialog: MatDialog) {
  }

  onNewGoods() {
    this.dialog.open(AdminGoodsEditComponent, {
      width: '550px',
    });
  }

}
