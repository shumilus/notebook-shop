import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {Goods} from '@shared/models/goods.model';
import {Subscription} from 'rxjs';
import {ProductService} from '@shared/services/product.service';

@Component({
  selector: 'app-admin-goods-list',
  templateUrl: './admin-goods-list.component.html',
  styleUrls: ['./admin-goods-list.component.scss']
})
export class AdminGoodsListComponent implements OnInit, OnDestroy {
  goodsList: Goods[];
  productsSubscription: Subscription;
  filteredPage = '';
  filteredCovMat = '';
  filteredMinPrice = '';
  filteredMaxPrice = '';
  page = 1;

  constructor(private authService: AuthService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.goodsList = this.productService.getCurrentProduct();
    this.productsSubscription = this.productService.productsSubject
      .subscribe((goods: Goods[]) => {
          this.goodsList = goods;
        }
      );
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
