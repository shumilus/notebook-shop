import {Component, OnDestroy, OnInit} from '@angular/core';
import {Goods} from '@shared/models/goods.model';
import {CartService} from '@shared/services/cart.service';
import {Subscription} from 'rxjs';
import {AuthService} from '@shared/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderStorageService} from '@shared/services/order-storage-service';
import {AdminService} from '@shared/services/admin.service';
import {Order} from '@shared/models/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {
  cartList: Goods[];
  sum = 0;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  // user: { email: string, isAdmin: boolean};
  userEmail;
  order: Order = new Order();
  buyerForm: FormGroup;

  constructor(private cartService: CartService,
              private authService: AuthService,
              private orderStorageService: OrderStorageService,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.initForm();
    this.userSubscription = this.authService.userSubject
      .subscribe(
        (user: { email: string, isAdmin: boolean }) => {
          this.userEmail = user ? user.email : '';
          this.buyerForm.controls.email.setValue(this.userEmail);
        }
      );

    this.cartService.getCart();

    this.cartSubscription = this.cartService.cartChanged
      .subscribe(
        (goods: Goods[]) => {
          this.cartList = goods;
        }
      );
    this.cartList = this.cartService.getGoods();
    this.getSum();
  }

  getSum() {
    for (const product of this.cartList) {
      this.sum += +product.price;
    }
  }

  onDelete(index: number, price: string) {
    this.cartService.deleteProduct(index);
    this.sum -= +price;
    this.cartService.setCart();
  }

  onSubmit() {
    this.onAddOrder();
    // this.saveOrder();
    this.cartService.clearCart();
    this.buyerForm.reset();
    this.sum = 0;
    this.saveOrder();
  }

  saveOrder() {
    this.orderStorageService.storageOrders().subscribe(
      (response: any) => {
        console.log('order saved!');
      });
  }

  onAddOrder() {
    this.order.name = this.buyerForm.value.name;
    this.order.surname = this.buyerForm.value.surname;
    this.order.phone = this.buyerForm.value.phone;
    this.order.email = this.buyerForm.value.email;
    this.order.goods = this.cartList;
    this.adminService.addOrder(this.order);
  }

  private initForm() {
    this.buyerForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'surname': new FormControl('', Validators.required),
      'phone': new FormControl('', [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
      'email': new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}


