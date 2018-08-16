import {Observable} from "rxjs";
import {order} from "@shared/unit-test-services/mock-product.service";


export class MockOrderService {

  getOrders() {
    return;
  }

  storageOrders() {
    return Observable.of([order]);
  }
}