import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';
import {AdminGoodsEditComponent} from './admin-goods-edit/admin-goods-edit.component';

import { Router} from '@angular/router';

@Component({
  selector: 'app-goods-admin',
  templateUrl: './goods-admin.component.html',
  styleUrls: ['./goods-admin.component.scss']
})

export class GoodsAdminComponent {

  constructor(private dialog: MatDialog, private router: Router) {
  }

  onNewGoods() {
    this.dialog.open(AdminGoodsEditComponent, {
      width: '550px',
      data: null
    });
  }

  toOrder() {
    this.router.navigate(['admin', 'order'] );
    // this.router.navigate(['/admin']);
  }



}
