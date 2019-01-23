import { HomePage } from "./../home/home";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";
import { ResetPasswordPage } from "../reset-password/reset-password";

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sign-in",
  templateUrl: "sign-in.html"
})
export class SignInPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController
  ) {}

  ionViewDidEnter() {
    this.menu.enable(false);
  }
  goToBack() {
    this.navCtrl.pop();
  }

  openResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  openHome() {
    this.navCtrl.push(HomePage);
  }
}
