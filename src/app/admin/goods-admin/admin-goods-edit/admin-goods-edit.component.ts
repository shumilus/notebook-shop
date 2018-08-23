import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {ToasterService} from 'angular2-toaster';
import {ProductService} from "@shared/services/product.service";

/**
 * @summary AdminGoodsEdit component
 */
@Component({
  selector: 'app-admin-goods-edit',
  templateUrl: './admin-goods-edit.component.html',
  styleUrls: ['./admin-goods-edit.component.scss']
})

export class AdminGoodsEditComponent implements OnInit {
  id: number;
  editMode = false;
  goodsForm: FormGroup;

  /**
   * @summary AdminGoodsEdit component constructor.
   * @param router - Router service
   * @param dialog - MatDialog service (pop-up)
   * @param route - Activated route service
   * @param productService - Product service
   * @param toasterService - Toaster service (toaster)
   */
  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private toasterService: ToasterService,
              private dialog: MatDialog,) {
  }

  /**
   * Initialize the component and call initForm method
   */
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  /**
   * init form for add or edit product
   */
  private initForm() {
    let goodsName = '';
    let goodsImagePath = '';
    let goodsDescription = '';
    let goodsPrice = '';
    let goodsPages = '';
    let goodsCoverMaterial = '';

    if (this.editMode) {
      const product = this.productService.getProduct(this.id);

      goodsName = product.name;
      goodsImagePath = product.imagePath;
      goodsDescription = product.description;
      goodsPrice = product.price;
      goodsPages = product.pages;
      goodsCoverMaterial = product.coverMaterial;
    }

    this.goodsForm = new FormGroup({
      'name': new FormControl(goodsName, Validators.required),
      'imagePath': new FormControl(goodsImagePath, Validators.required),
      'description': new FormControl(goodsDescription, Validators.required),
      'price': new FormControl(goodsPrice, [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      'pages': new FormControl(goodsPages, [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      'coverMaterial': new FormControl(goodsCoverMaterial, Validators.required),
    });
  }

  /**
   * submit product to products list or edit product
   */
  onSubmit() {
    const newGoods = this.goodsForm.value;
    const products = this.productService.getCurrentProduct();
    if (this.editMode) {
      newGoods.id = this.id;
      products[this.id] = newGoods;
    } else {
      newGoods.id = this.productService.getCurrentProduct().length;
      products.push(newGoods);
    }
    this.onCancel();
    this.productService.storageGoods(products);
  }

  /**
   * Close dialog window with AdminGoodsEdit component and back to Admin component
   */
  onCancel() {
    this.dialog.closeAll();
    this.router.navigate(['/admin']);
  }

}