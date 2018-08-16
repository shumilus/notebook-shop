import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Goods} from '@shared/models/goods.model';
import {ProductService} from '@shared/services/product.service';
import {CartService} from '@shared/services/cart.service';
import {Subscription} from "rxjs";
import {CommonService} from "@shared/services/common.service";

@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['./goods-detail.component.scss']
})
export class GoodsDetailComponent implements OnInit, OnDestroy {
  goods: Goods;
  id: number;
  productsSubscription: Subscription;

  constructor( private productService: ProductService,
               private router: Router,
               private route: ActivatedRoute,
               private cartService: CartService,
               private commonService: CommonService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.goods = this.productService.getProduct(this.id);
      }
    );

    this.productsSubscription = this.productService.productsSubject
        .subscribe((goods: Goods[]) => {
        this.goods = this.productService.getProduct(this.id);
    })
  }

  toGoodsList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddToCart() {
    this.cartService.addCart(this.goods);
  }

  ngOnDestroy() {
    this.commonService.checkSubscription(this.productsSubscription);
  }

}

