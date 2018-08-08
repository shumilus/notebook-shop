import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {Goods} from '@shared/models/goods.model';
import {Subscription} from 'rxjs';
import {AdminService} from '@shared/services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductStorageService} from '@shared/services/products-storage-service';

@Component({
  selector: 'app-admin-goods-list',
  templateUrl: './admin-goods-list.component.html',
  styleUrls: ['./admin-goods-list.component.scss']
})
export class AdminGoodsListComponent implements OnInit, OnDestroy {
  goodsList: Goods[];
  goodsChangedSubscription: Subscription;
  filteredPage = '';
  filteredCovMat = '';
  filteredMinPrice = '';
  filteredMaxPrice = '';
  p = 1;

  constructor(private authService: AuthService,
              private adminService: AdminService,
              private router: Router,
              private route: ActivatedRoute,
              private productStorageService: ProductStorageService) { }

  ngOnInit() {
    this.fetchGoods();
    this.goodsChangedSubscription = this.adminService.goodsChanged
      .subscribe(
        (goods: Goods[]) => { this.goodsList = goods; }

      );
    this.goodsList = this.adminService.getGoods();
  }

  fetchGoods() {
    this.productStorageService.getGoods();
  }

  // onNewGoods() {
  //   this.dialog.open(AdminGoodsEditComponent, {
  //     width: '550px',
  //     data: null
  //   });
  // }

  ngOnDestroy() {
    this.goodsChangedSubscription.unsubscribe();
  }

}
