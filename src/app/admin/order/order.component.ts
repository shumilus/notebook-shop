import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '@shared/models/order.model';
import {ProductService} from '@shared/services/product.service';
import {Subscription} from 'rxjs';
import {OrderService} from '@shared/services/order.service';
import {CommonService} from "@shared/services/common.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  orderList: Order[] = [];
  orderChangedSubscription: Subscription;

  constructor(private productService: ProductService,
              private orderService: OrderService,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders();
    this.orderChangedSubscription = this.productService.orderChanged
      .subscribe(
        (orders: Order[]) => {
          this.orderList = orders;
        }
      );
    this.orderList = this.productService.getOrders();
  }

  onDelete(index: number) {
    this.productService.deleteOrder(index);
    this.orderService.storageOrders('delete');
  }

  ngOnDestroy() {
    this.commonService.checkSubscription(this.orderChangedSubscription);
  }

}
