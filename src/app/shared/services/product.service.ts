import {Goods} from '../models/goods.model';
import {Subject} from 'rxjs';
import {ToasterService} from 'angular2-toaster';
import {Injectable} from '@angular/core';
import {Order} from '../models/order.model';
import {AuthService} from "@shared/services/auth.service";
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from "rxjs/index";

@Injectable()
export class ProductService {
    goodsChanged = new Subject<Goods[]>();
    orderChanged = new Subject<Order[]>();
    productsSubject = new BehaviorSubject<Goods[]>([]);

    constructor(private toasterService: ToasterService,
                private authService: AuthService,
                private http: HttpClient) {
    }

    private orderList: Order[] = [];
    private goodsList: Goods[] = [
        // new Goods(
        //   'Monocolor',
        //   'The notebook with one color',
        //   'http://bloktetradi.pp.ua/wp-content/uploads/2017/12/IMG_2116.jpg',
        //   '120',
        //   'Laminated cardboard',
        //   '140'
        // )
    ];

    getGoods() {
        return this.goodsList.slice();
    }

    getProduct(index: number) {
        return this.productsSubject.value[index];
    }

    addGoods(product: Goods) {
        this.goodsList.push(product);
        this.goodsChanging();
    }

    updateGoods(index: number, product: Goods) {
        this.goodsList[index] = product;
        this.goodsChanging();
    }

    deleteGoods(index: number) {
        this.goodsList.splice(index, 1);
        this.goodsChanging();
        this.toasterService.pop('error', 'You delete product!');
    }

    goodsChanging() {
        this.goodsChanged.next(this.goodsList.slice());
    }

    getOrders() {
        return this.orderList.slice();
    }

    addOrder(order: Order) {
        this.orderList.push(order);
        this.orderUpdate();
        this.toasterService.pop('success', 'Your order is ready!');
    }

    deleteOrder(index: number) {
        this.orderList.splice(index, 1);
        this.orderUpdate();
        this.toasterService.pop('error', 'You delete order!');
    }

    orderUpdate() {
        this.orderChanged.next(this.orderList.slice());
    }

    setOrders(orders: Order[]) {
        this.orderList = orders;
        this.orderUpdate();
    }

    storageGoods() {
        const token = this.authService.getTokenId();
        return this.http.put(`https://myfirstangular6project.firebaseio.com/goods.json?auth=${token}`, this.goodsList);
    }

    getCurrentProductsList() {
        return this.productsSubject.value.slice();
    }

    getProducts() {
        this.http.get('https://myfirstangular6project.firebaseio.com/goods.json')
            .subscribe(
                (goods: Goods[]) => {
                    goods.forEach(function (item, i) {
                        item.id = i;
                    });
                    this.goodsList = goods;
                    this.productsSubject.next(goods);
                    this.goodsChanging();
                    // this.goodsListSubject.next(goods);
                });
    }

}
