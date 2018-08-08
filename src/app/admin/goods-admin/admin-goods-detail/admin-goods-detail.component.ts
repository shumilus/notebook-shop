import { Component, OnInit } from '@angular/core';
import {Goods} from '@shared/models/goods.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AdminService} from '@shared/services/admin.service';
import {MatDialog} from '@angular/material';
import {ProductStorageService} from '@shared/services/products-storage-service';

@Component({
  selector: 'app-admin-goods-detail',
  templateUrl: './admin-goods-detail.component.html',
  styleUrls: ['./admin-goods-detail.component.scss']
})
export class AdminGoodsDetailComponent implements OnInit {
  goods: Goods;
  id: number;

  constructor( private adminService: AdminService,
               private router: Router,
               private route: ActivatedRoute,
               private dialog: MatDialog,
               private productStorageService: ProductStorageService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.goods = this.adminService.getProduct(this.id);
        // if (this.goods === undefined) {
        //   this.router.navigate(['../'], {relativeTo: this.route}); //how to do no bag after reload?
        //   return;
        // }
      }
    );
  }

  onEditGoods() {
    this.router.navigate(['edit'], { relativeTo: this.route});
    // this.dialog.open(AdminGoodsEditComponent, {
    //   width: '550px',
    //   data: null
    // });
  }

  onDeleteGoods() {
    this.adminService.deleteGoods(this.id);
    this.saveData();
    this.router.navigate(['/admin']);

    this.adminService.getGoods();
  }

  saveData() {
    this.productStorageService.storageGoods().subscribe(
      (response: any) => {
        console.log('test');
        // console.log(response);
      });
  }
}
