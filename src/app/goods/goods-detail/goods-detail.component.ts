import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Goods} from '@shared/models/goods.model';
import {ProductService} from '@shared/services/product.service';
import {CartService} from '@shared/services/cart.service';
import {Subscription} from "rxjs";
import {CommonService} from "@shared/services/common.service";

/**
 * @summary GoodsDetail component
 */
@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['./goods-detail.component.scss']
})
export class GoodsDetailComponent implements OnInit, OnDestroy {
  product: Goods;
  id: number;
  productsSubscription: Subscription;

  /**
   * @summary GoodsDetail component constructor.
   * @param productService - Product service
   * @param router - Router service
   * @param route - Activated route service
   * @param cartService - Cart service
   * @param commonService - Common service
   */
  constructor( private productService: ProductService,
               private router: Router,
               private route: ActivatedRoute,
               private cartService: CartService,
               private commonService: CommonService) {

  }

  /**
   * Initialize the component and call getProductById method
   */
  ngOnInit() {
    this.getProductById();
  }

  /**
   * Get product by id from products list
   */
  getProductById() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.product = this.productService.getProduct(this.id);
      }
    );
    this.productsSubscription = this.productService.productsSubject
      .subscribe((goods: Goods[]) => {
        this.product = this.productService.getProduct(this.id);
      })
  }

  /**
   * @summary Add product to cart
   */
  onAddToCart() {
    this.cartService.addCart(this.product);
  }

  /**
   * Cleanup logic
   */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.productsSubscription);
  }

}

