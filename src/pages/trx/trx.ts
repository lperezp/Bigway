import { HomePage } from "./../home/home";
import { RestProvider } from "./../../providers/rest/rest";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";

/**
 * Generated class for the TrxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-trx",
  templateUrl: "trx.html"
})
export class TrxPage {
  conductor: any;
  tarifa: any;
  distancia: any;
  e: number;
  respuesta: any;
  id_servicio: any;
  confirmado : boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private restProvider: RestProvider,
    public alertCtrl: AlertController
  ) {
    this.confirmado = false;
    this.conductor = navParams.get("conductor");
    this.tarifa = navParams.get("tarifa");
    this.distancia = navParams.get("distancia");
    this.id_servicio = navParams.get("id_servicio");
  }

  ionViewDidLoad() {}

  ngOnInit() {
    this.e = setInterval(() => {
      this.terminadoServicio();
    }, 5000);
  }

  confirmarConductor() {

    this.restProvider.confirmarConductor(this.id_servicio);
    this.confirmado= true;
  }

  terminadoServicio() {
    this.restProvider
      .terminadoServicio(this.id_servicio)
      .subscribe(resultado => {
        console.log("terminadoServicio", resultado);
        console.log(resultado["estado"]);
        if (resultado["estado"] == 4) {
          clearInterval(this.e);
          this.alertCtrl
            .create({
              title: "Bigway!",
              subTitle: "Su viaje ha terminado. Gracias por usar Bigway",
              buttons: [
                {
                  text: "Aceptar",
                  handler: () => {
                   
                    this.navCtrl.pop();
                  }
                }
              ]
            })
            .present();
        }
      });
  }
}
