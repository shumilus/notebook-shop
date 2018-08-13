import {Goods} from "@shared/models/goods.model";
import {Observable} from "rxjs";

export const goods: Goods = {
  name: 'test',
  description: 'test',
  imagePath: 'test',
  pages: 'test',
  coverMaterial: 'test',
  price: 'test',
  id: 0
};

export class MockProductService {
  productsSubject = Observable.of([goods]);

  getCurrentProduct() {
    return [goods];
  }
}