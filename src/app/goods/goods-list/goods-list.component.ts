import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Goods} from '@shared/models/goods.model';
import {ProductService} from '@shared/services/product.service';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss']
})
export class GoodsListComponent implements OnInit, OnDestroy {
  goodsList: Goods[] = [];
  filteredPage = '';
  filteredCovMat = '';
  filteredMinPrice = '';
  filteredMaxPrice = '';
  productsSubscription: Subscription;
  page = 1;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.goodsList = this.productService.getCurrentProductsList();
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
