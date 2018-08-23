import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {Goods} from '@shared/models/goods.model';
import {Subscription} from 'rxjs';
import {ProductService} from '@shared/services/product.service';
import {CommonService} from "@shared/services/common.service";

/**
 * @summary AdminGoods component
 */
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

  /**
   * @summary AdminGoods component constructor.
   * @param productService - Product service
   * @param authService - Auth service
   * @param commonService - Common service
   */
  constructor(private authService: AuthService,
              private productService: ProductService,
              private commonService: CommonService) {
  }

  /**
   * Initialize the component and call getUser and getCart method
   */
  ngOnInit() {
    this.getProducts()
  }

  /**
   * Get total and listener for update cart list and total and sum value of cart//
   */
  getProducts() {
    this.goodsList = this.productService.getCurrentProduct();
    this.productsSubscription = this.productService.productsSubject
      .subscribe((goods: Goods[]) => {
          this.goodsList = goods;
        }
      );
  }

  /**
   * Cleanup logic
   */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.productsSubscription);
  }

}
