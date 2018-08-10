import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Goods} from '@shared/models/goods.model';
import {ProductService} from '@shared/services/product.service';
import {CartService} from '@shared/services/cart.service';

@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['./goods-detail.component.scss']
})
export class GoodsDetailComponent implements OnInit {
  goods: Goods;
  id: number;

  constructor( private productService: ProductService,
               private router: Router,
               private route: ActivatedRoute,
               private cartService: CartService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.goods = this.productService.getProduct(this.id);
      }
    );

    this.productService.productsSubject
        .subscribe((goods: Goods[]) => {
        this.goods = this.productService.getProduct(this.id);
    })
  }

  toGoodsList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddToCart() {
    this.cartService.addCart(this.goods);
    this.cartService.setCart();
  }

}

