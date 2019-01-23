import { NavController } from 'ionic-angular';
import { Component, Input, Output } from '@angular/core';

/**
 * Generated class for the HeaderFillComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-fill',
  templateUrl: 'header-fill.html'
})
export class HeaderFillComponent {

  text: string;
  @Input() titlePage;
  constructor(public navCtrl: NavController) {
  
  }

  goToBack(){
    this.navCtrl.pop();
  }
}
