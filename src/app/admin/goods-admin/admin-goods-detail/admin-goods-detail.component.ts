import {Component, OnInit} from '@angular/core';
import {Goods} from '@shared/models/goods.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '@shared/services/product.service';
import {MatDialog} from "@angular/material";
import {AdminGoodsEditComponent} from "../admin-goods-edit/admin-goods-edit.component";

@Component({
  selector: 'app-admin-goods-detail',
  templateUrl: './admin-goods-detail.component.html',
  styleUrls: ['./admin-goods-detail.component.scss']
})
export class AdminGoodsDetailComponent implements OnInit {
  goods: Goods;
  id: number;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getProduct()
  }

  getProduct() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.goods = this.productService.getProduct(this.id);
      }
    );
  }

  openDialog(product: any) {
    this.dialog.open(AdminGoodsEditComponent, {
      width: '800px',
      autoFocus: false,
      data: product
    });
  }

  onDeleteGoods() {
    const products = this.productService.getCurrentProduct();
    products.splice(this.id, 1);
    this.productService.storageGoods(products, true);
    this.router.navigate(['/admin']);
  }

}
