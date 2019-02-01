import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  AlertController
} from "ionic-angular";

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {}

  goToBack() {
    this.navCtrl.pop();
  }
  confirmar() {
    const alert = this.alertCtrl.create({
      title: "Confirmar viaje",
      subTitle: "¿Desea confimar el viaje?",
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
            // si cancela el viaje
            const toastCancel = this.toastCtrl.create({
              message: "Tu solicitud de viaje se ha cancelado.",
              duration: 4000
            });
            toastCancel.present();
          }
        },
        {
          text: "Confirmar viaje",
          handler: () => {
            const toastConfirm = this.toastCtrl.create({
              message: "Buscando un conductor...",
              duration: 4000
            });
            toastConfirm.present();
          }
        }
      ]
    });
    alert.present();
    this.goToBack();
  }
}
