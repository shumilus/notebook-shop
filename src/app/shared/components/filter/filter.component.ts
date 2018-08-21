import {Component, EventEmitter, OnInit, Output} from '@angular/core';

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

  sendPageParams(params: string) {
    this.filterPage.emit(params);
  }

  sendCovMatParams(params: string) {
    this.filterCovMat.emit(params);
  }

  minTest() {
    this.filterMinPrice.emit(this.minPrice);
  }

  maxTest() {
    this.filterMaxPrice.emit(this.maxPrice);
  }
}
