import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../shared/services/admin.service';
import {MatDialog} from '@angular/material';
import {ToasterService} from 'angular2-toaster';
import {ProductStorageService} from '../../../shared/services/products-storage-service';

@Component({
  selector: 'app-admin-goods-edit',
  templateUrl: './admin-goods-edit.component.html',
  styleUrls: ['./admin-goods-edit.component.scss']
})

export class AdminGoodsEditComponent implements OnInit {
  id: number;
  editMode = false;
  goodsForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private router: Router,
              private toasterService: ToasterService,
              private dialog: MatDialog,
              private productStorageService: ProductStorageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let goodsName = '';
    let goodsImagePath = '';
    let goodsDescription = '';
    let goodsPrice = '';
    let goodsPages = '';
    let goodsCoverMaterial = '';

    if (this.editMode) {
      const product = this.adminService.getProduct(this.id);

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

  onSubmit() {
    const newGoods = this.goodsForm.value;
    if (this.editMode) {
      newGoods.id = this.id;
      this.adminService.updateGoods(this.id, newGoods);
    } else {
      newGoods.id = this.adminService.getGoods().length;
      this.adminService.addGoods(newGoods);
    }
    this.onCancel();
    this.toasterService.pop('success', 'You added new goods!' );
    this.saveData();
  }

  saveData() {
    this.productStorageService.storageGoods().subscribe(
      (response: any) => {
        // console.log('test');
        // console.log(response);
      });
  }

  onCancel() {
    this.dialog.closeAll();
    this.router.navigate(['/admin'], {relativeTo: this.route});
  }

}
