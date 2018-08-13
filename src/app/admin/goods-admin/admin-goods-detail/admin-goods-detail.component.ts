import { Component, OnInit } from '@angular/core';
import {Goods} from '@shared/models/goods.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { ProductService} from '@shared/services/product.service';

@Component({
  selector: 'app-admin-goods-detail',
  templateUrl: './admin-goods-detail.component.html',
  styleUrls: ['./admin-goods-detail.component.scss']
})
export class AdminGoodsDetailComponent implements OnInit {
  goods: Goods;
  id: number;

  constructor( private productService: ProductService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.goods = this.productService.getProduct(this.id);
      }
    );
  }

  onEditGoods() {
    this.router.navigate(['edit'], { relativeTo: this.route});
    // this.dialog.open(AdminGoodsEditComponent, {
    //   width: '550px',
    //   data: null
    // });
  }

  onDeleteGoods() {
    const products = this.productService.getCurrentProduct();
    products.splice(this.id, 1);
    this.productService.storageGoods(products, true);;
    this.router.navigate(['/admin']);
  }

}
