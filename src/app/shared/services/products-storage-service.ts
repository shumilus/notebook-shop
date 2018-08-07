import {AdminService} from './admin.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Goods} from '../models/goods.model';
import {AuthService} from './auth.service';
import {Subject} from 'rxjs';

@Injectable()
export class ProductStorageService {
  goodsListSubject = new Subject<Goods[]>();

  constructor (private http: HttpClient,
               private adminService: AdminService,
               private authService: AuthService) {}

  storageGoods() {
    const token = this.authService.getToken();
    return this.http.put(`https://myfirstangular6project.firebaseio.com/goods.json?auth=${token}`, this.adminService.getGoods());
  }

  getGoods() {
    this.http.get('https://myfirstangular6project.firebaseio.com/goods.json')
      .subscribe(
        (goods: Goods[]) => {
          goods.forEach(function(item, i) {
            item.id = i;
          });
          this.adminService.setGoods(goods);
          this.goodsListSubject.next(goods);
        });
  }

}
