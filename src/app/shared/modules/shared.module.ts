import {NgModule} from '@angular/core';
import {AppMaterialModule} from './app-material.module';
import {CommonModule} from '@angular/common';
import {ShortenPipe} from '../pipes/shorten-pipe';
import {PagesFilterPipe} from '../pipes/pages-filter.pipe';
import {PriceFilterPipe} from '../pipes/price-filter.pipe';
import {FilterComponent} from '../components/filter/filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from "@angular/material";

@NgModule({
  declarations: [
    ShortenPipe,
    PagesFilterPipe,
    PriceFilterPipe,
    FilterComponent,
  ],
  imports: [
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
  ],
  exports: [
    CommonModule,
    AppMaterialModule,
    ShortenPipe,
    PagesFilterPipe,
    PriceFilterPipe,
    FilterComponent,
  ]
})

export class SharedModule {

}
