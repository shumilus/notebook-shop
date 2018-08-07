import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagesFilter'
})
export class PagesFilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if (value && value.length === 0) {return value; }
    if (!filterString) {return value; }
    return value.filter((item) => item[propName] === filterString);
  }
}
