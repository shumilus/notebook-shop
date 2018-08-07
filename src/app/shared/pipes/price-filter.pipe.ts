import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {
  transform(value: any, filterMinPrice: string, filterMaxPrice: string, propName: string): any {
    if (value && value.length === 0) {return value; }
    if (!filterMinPrice) {return value; }
    if (!filterMinPrice) {return value; }
    if (!filterMaxPrice) {return value; }
    return value.filter((item) => item[propName] >= +filterMinPrice && item[propName] <= +filterMaxPrice);
  }
}
