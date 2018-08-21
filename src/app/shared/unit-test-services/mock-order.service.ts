import {of} from "rxjs";
import {order} from "@shared/unit-test-services/mock-product.service";


export class MockOrderService {

  getOrders() {
    return;
  }

  storageOrders() {
    return of([order]);
  }

}