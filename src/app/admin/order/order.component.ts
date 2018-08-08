import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '@shared/models/order.model';
import {ProductService} from '@shared/services/product.service';
import {Subscription} from 'rxjs';
import {OrderStorageService} from '@shared/services/order-storage-service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  orderList: Order[] = [];
  orderChangedSubscription: Subscription;

  constructor(private productService: ProductService,
              private orderStorageService: OrderStorageService) {
  }

  ngOnInit() {
    this.fetchOrders();
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
    // this.sum -= +price;
    this.saveOrder();
  }

  fetchOrders() {
    this.orderStorageService.getOrders();
  }

  saveOrder() {
    this.orderStorageService.storageOrders().subscribe(
      (response: any) => {
        console.log('order delete!');
      });
  }

  ngOnDestroy() {
    this.orderChangedSubscription.unsubscribe();
  }

}
