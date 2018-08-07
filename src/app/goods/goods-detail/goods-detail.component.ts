import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Goods} from '../../shared/models/goods.model';
import {AdminService} from '../../shared/services/admin.service';
import {CartService} from '../../shared/services/cart.service';

@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['./goods-detail.component.scss']
})
export class GoodsDetailComponent implements OnInit {
  goods: Goods;
  id: number;

  constructor( private adminService: AdminService,
               private router: Router,
               private route: ActivatedRoute,
               private cartService: CartService) { }

  ngOnInit() {
    // console.log(this.id);
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // console.log(this.id);
        this.goods = this.adminService.getProduct(this.id);
        // if (this.goods === undefined) {
        //   this.router.navigate(['../'], {relativeTo: this.route}); //how to do no bag after reload?
        //   return;
        // }
      }
    );
  }

  toGoodsList() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onAddToCart() {
    this.cartService.addCart(this.goods);
    // console.log(this.goods);
    this.cartService.saveInBasket();
  }

}

