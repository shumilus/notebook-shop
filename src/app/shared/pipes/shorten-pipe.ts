import {Pipe, PipeTransform} from '@angular/core';

/**
 * @summary Shorten pipe
 */
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number) {
    if (value && value.length > limit) {
      return value.substr(0, limit) + ' ...';
    } else {
      return value;
    }
  }
}
