import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Goods} from '@shared/models/goods.model';
import {ProductService} from '@shared/services/product.service';
import {CommonService} from '@shared/services/common.service';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})

/**
 * @summary GoodsList component
 */
export class GoodsListComponent implements OnInit, OnDestroy {
  goodsList: Goods[] = [];
  filteredPage = '';
  filteredCovMat = '';
  filteredMinPrice = '';
  filteredMaxPrice = '';
  productsSubscription: Subscription;
  page = 1;

  /**
   * @summary GoodsList component constructor.
   * @param productService - Product service
   * @param commonService - Common service
   */
  constructor(private productService: ProductService,
              private commonService: CommonService) {
  }

  /**
   * @summary Fetch initial data for products list when GoodsList component init and when products list change.
   */
  ngOnInit() {
    this.goodsList = this.productService.getCurrentProduct();
    this.productsSubscription = this.productService.productsSubject
      .subscribe((goods: Goods[]) => {
          this.goodsList = goods;
        }
      );
  }

  /**
   * @summary Cleanup logic.
   */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.productsSubscription);
  }
}
