import { Component, OnInit } from '@angular/core';
import {Goods} from '@shared/models/goods.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ProductService} from '@shared/services/product.service';
import {MatDialog} from '@angular/material';
// import {ProductStorageService} from '@shared/services/products-storage-service';

@Component({
  selector: 'app-admin-goods-detail',
  templateUrl: './admin-goods-detail.component.html',
  styleUrls: ['./admin-goods-detail.component.scss']
})
export class AdminGoodsDetailComponent implements OnInit {
  goods: Goods;
  id: number;

  constructor( private productService: ProductService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.goods = this.productService.getProduct(this.id);
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
    this.productService.deleteGoods(this.id);
    this.saveData();
    this.router.navigate(['/admin']);

    this.productService.getGoods();
  }

  saveData() {
    this.productService.storageGoods().subscribe(
      (response: any) => {
        console.log('test');
        // console.log(response);
      });
  }
}
