import {Component, OnInit} from '@angular/core';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private toasterService: ToasterService,
  private authService: AuthService) {}

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
  }

}
