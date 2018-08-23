import {Component, EventEmitter, Output} from '@angular/core';

/**
 * @summary Filter component
 */
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent {
  page = '';
  covMat = '';
  minPrice = '';
  maxPrice = '';

  @Output() filterPage = new EventEmitter<string>();
  @Output() filterCovMat = new EventEmitter<string>();
  @Output() filterMinPrice = new EventEmitter<string>();
  @Output() filterMaxPrice = new EventEmitter<string>();

  /**
   * @summary Send params for page filter.
   * @param params - number of page.
   */
  sendPageParams(params: string) {
    this.filterPage.emit(params);
  }

  /**
   * @summary Send params for cover material filter.
   * @param params - type of cover material.
   */
  sendCovMatParams(params: string) {
    this.filterCovMat.emit(params);
  }

  /**
   * @summary Send params of min price for price filter.
   * @param params - min price.
   */
  minPriceFilter() {
    this.filterMinPrice.emit(this.minPrice);
  }

  /**
   * @summary Send params of max price for price filter.
   * @param params - max price.
   */
  maxPriceFilter() {
    this.filterMaxPrice.emit(this.maxPrice);
  }
}
