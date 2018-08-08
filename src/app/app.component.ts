import {Component, OnInit} from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {AuthService} from '@shared/services/auth.service';
import {environment} from '../environments/environment';
import {ProductService} from "@shared/services/product.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private toasterService: ToasterService,
              private authService: AuthService,
              private productService: ProductService) {}

  toasterconfig: ToasterConfig =
    new ToasterConfig({
      showCloseButton: false,
      tapToDismiss: true,
      timeout: 6000,
      animation: 'fade',
      newestOnTop: false,
      positionClass : 'toast-top-center'
    });

  ngOnInit() {
    this.authService.initializeApp();
    this.authService.checkLogining();
    this.productService.getProducts();
  }

}
