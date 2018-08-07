import {Goods} from './goods.model';

export class Order {
  public name: string;
  public surname: string;
  public phone: string;
  public email: string;
  public goods: Goods[];

  constructor(name?: string, surname?: string, phone?: string, email?: string, goods?: Goods[]) {
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;
    this.goods = goods;
  }
}
