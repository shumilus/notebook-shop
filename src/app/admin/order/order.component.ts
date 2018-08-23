import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '@shared/models/order.model';
import {ProductService} from '@shared/services/product.service';
import {Subscription} from 'rxjs';
import {OrderService} from '@shared/services/order.service';
import {CommonService} from "@shared/services/common.service";

/**
 * @summary Order component
 */
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit, OnDestroy {
  orderList: Order[] = [];
  orderChangedSubscription: Subscription;

  /**
   * @summary Order component constructor.
   * @param productService - Product service
   * @param orderService - Order service
   * @param commonService - Common service
   */
  constructor(private productService: ProductService,
              private orderService: OrderService,
              private commonService: CommonService) {
  }

  /**
   * Initialize the component and call getOrders method
   */
  ngOnInit() {
    this.getOrders();
  }

  /**
   * Get orders and listener for update order list
   */
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

  /**
   * Delete order from order list
   */
  onDelete(index: number) {
    this.productService.deleteOrder(index);
    this.orderService.storageOrders('delete');
  }

  /**
   * Cleanup logic
   */
  ngOnDestroy() {
    this.commonService.checkSubscription(this.orderChangedSubscription);
  }

}
