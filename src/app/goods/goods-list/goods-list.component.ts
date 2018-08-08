import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Goods} from '@shared/models/goods.model';
import {AdminService} from '@shared/services/admin.service';
import {ProductStorageService} from '@shared/services/products-storage-service';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent implements OnInit, OnDestroy {
  // goodsChangedSubscription: Subscription;
  goodsList: Goods[] = [];
  filteredPage = '';
  filteredCovMat = '';
  filteredMinPrice = '';
  filteredMaxPrice = '';
  goodsListSubscription: Subscription;
  p = 1;

  constructor(private adminService: AdminService,
              private productStorageService: ProductStorageService) { }

  ngOnInit() {
    this.goodsList = this.adminService.getGoods();
    this.goodsListSubscription = this.productStorageService.goodsListSubject
      .subscribe(
        (goods: Goods[]) => { this.goodsList = goods; }
      );
    this.productStorageService.getGoods();
    // this.goodsChangedSubscription = this.adminService.goodsChanged
    //   .subscribe(
    //     (goods: Goods[]) => { this.goodsList = goods; }
    //   );
    // this.goodsList = this.adminService.getGoods();
  }

  ngOnDestroy() {
    // this.goodsChangedSubscription.unsubscribe();
    this.goodsListSubscription.unsubscribe();
  }

}
