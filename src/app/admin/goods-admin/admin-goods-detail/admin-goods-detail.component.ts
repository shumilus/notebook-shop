import {Component, OnInit} from '@angular/core';
import {Goods} from '@shared/models/goods.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '@shared/services/product.service';
import {MatDialog} from "@angular/material";
import {AdminGoodsEditComponent} from "../admin-goods-edit/admin-goods-edit.component";

/**
 * @summary AdminGoodsDetail component
 */
@Component({
  selector: 'app-admin-goods-detail',
  templateUrl: './admin-goods-detail.component.html',
  styleUrls: ['./admin-goods-detail.component.scss']
})
export class AdminGoodsDetailComponent implements OnInit {
  product: Goods;
  id: number;

  /**
   * @summary AdminGoodsEdit component constructor.
   * @param router - Router service
   * @param dialog - MatDialog service (pop-up)
   * @param route - Activated route service
   * @param productService - Product service
   */
  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  /**
   * Initialize the component and call getProduct method
   */
  ngOnInit() {
    this.getProduct()
  }

  /**
   * Get product by id
   */
  getProduct() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(this.id);
        this.id = +params['id'];
        console.log(this.id);
        this.product = this.productService.getProduct(this.id);
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

  /**
   * Delete product from product list
   */
  onDeleteGoods() {
    const products = this.productService.getCurrentProduct();
    products.splice(this.id, 1);
    this.productService.storageGoods(products, true);
    this.router.navigate(['/admin']);
  }

}
