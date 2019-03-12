import { Component, NgZone } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the OperacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-operacion",
  templateUrl: "operacion.html"
})
export class OperacionPage {
  lugares: any;
  puntoGPS: any;
  focus: boolean;
  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocompleteOrigen: any;
  autocompleteItemsOrigen: any;
  autocompleteDestino: any;
  autocompleteItemsDestino: any;
  geocoder: google.maps.Geocoder;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private zone: NgZone
  ) {
    this.lugares = navParams.get("lugar");
    this.puntoGPS = navParams.get("puntoGPS");
    this.focus = navParams.get("focus");
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteOrigen = { input: "" };
    this.autocompleteItemsOrigen = [];
    this.autocompleteDestino = { input: "" };
    this.autocompleteItemsOrigen = [];
    this.geocoder = new google.maps.Geocoder();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OperacionPage");
    console.log("lugar", this.lugares);
    console.log("puntoGPS", this.puntoGPS);
    console.log("puntoGPS", this.focus);
  }

  /* updateSearchResultsDestino() {
    if (this.autocompleteDestino.input == "") {
      this.autocompleteItemsDestino = [];
      return;
    }

    this.GoogleAutocomplete.getPlacePredictions(
      {
        input: this.autocompleteDestino.input,
        componentRestrictions: { country: "pe" }
      },
      (predictions, status) => {
        this.autocompleteItemsDestino = [];
        this.zone.run(() => {
          predictions.forEach(prediction => {
            this.autocompleteItemsDestino.push(prediction);
          });
        });
      }
    );
  }

  // METODO QUE SE REALIZA AL SELECCIONAR UN LUGAR
  selectDestinoResult(itemDestino) {
    this.autocompleteItemsDestino = [];
    this.geocoder.geocode(
      { placeId: itemDestino.place_id },
      (results, status) => {
        if (status == "OK" && results[0]) {
          console.log("location", results[0].formatted_address);
          /*  this.puntoB = results[0].formatted_address;
          console.log("PuntoB_lat", results[0].geometry.viewport.ma.j);
          console.log("PuntoB_lng", results[0].geometry.viewport.ga.l); */
  /* this.puntoLlegada =
            "POINT(" +
            results[0].geometry.viewport.ga.l +
            " " +
            results[0].geometry.viewport.ma.j +
            ")";
          console.log(this.puntoLlegada);
          this.initMap();
          this.calcularRuta(results[0].formatted_address); */
  /*           this.id_direccion = 0; */
  /* this.calcularTarifa();
          //completar el input según tu búsqueda
          this.autocompleteDestino.input = itemDestino.description;
 */
  // LLAMAR AL METODO QUE CALCULE LA TARIFA
  /*      } else {
          console.log("Error al ubicar el destino.");
        }
      }
    );
  }  */
}
