import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  ToastController
} from "ionic-angular";
import { RegisterPage } from "../register/register";
import { SignInPage } from "../sign-in/sign-in";
import { Network } from "@ionic-native/network";
import { AlertController } from "ionic-angular";

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
    public menu: MenuController,
    private network: Network,
    private alert: AlertController,
    public toast: ToastController
  ) {
    this.network.onConnect().subscribe(() => {
      this.toast
        .create({
          message: "Dispositivo con conexión a Internet",
          duration: 3000
        })
        .present();
      console.log("Hay Red");
    });

    this.network.onDisconnect().subscribe(() => {
      this.toast
        .create({
          message: "Dispositivo sin conexión a Internet",
          duration: 3000
        })
        .present();
      console.log("no Hay Red");
    });
  }

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
