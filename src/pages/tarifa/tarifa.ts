import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the TarifaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-tarifa",
  templateUrl: "tarifa.html"
})
export class TarifaPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToBack() {
    this.navCtrl.pop();
  }
}
