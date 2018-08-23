import {Component, OnInit} from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {AuthService} from '@shared/services/auth.service';
import {ProductService} from "@shared/services/product.service";

/**
 * @summary App component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: false,
      tapToDismiss: true,
      timeout: 6000,
      animation: 'fade',
      newestOnTop: false,
      positionClass : 'toast-top-center'
    });

  /**
   * @summary App component constructor
   * @param toasterService - Toaster service (toaster)
   * @param authService - Auth service
   * @param productService - Product service
   */
  constructor(private toasterService: ToasterService,
              private authService: AuthService,
              private productService: ProductService) {

  }

  /**
   * @summary Initialize the component and call initializeApp, checkLogining, getProducts methods.
   */
  ngOnInit() {
    this.authService.initializeApp();
    this.authService.checkLogining();
    this.productService.getProducts();
  }

}