import {Component} from '@angular/core';

/**
 * @summary Admin component
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent {
  toggle = true;

  toggleOn() {
    this.toggle = !this.toggle;
    console.log(this.toggle);
  }
}