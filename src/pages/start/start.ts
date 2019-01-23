import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";
import { RegisterPage } from "../register/register";
import { SignInPage } from "../sign-in/sign-in";

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-start",
  templateUrl: "start.html"
})
export class StartPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController
  ) {}

  ionViewDidEnter() {
    this.menu.enable(false);
  }
  openSignPage() {
    this.navCtrl.push(SignInPage);
  }

  openRegister() {
    this.navCtrl.push(RegisterPage);
  }
}
