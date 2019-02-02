import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  ToastController,
  AlertController,
  MenuController,
  ModalController
} from "ionic-angular";
import { RestProvider } from "../../providers/rest/rest";

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
  google: any;
  public map: any;
  GoogleAutocomplete: any;
  autocompleteOrigen: any;
  autocompleteDestino: any;
  autocompleteItemsOrigen: any;
  autocompleteItemsDestino: any;
  directionsService: any;
  directionsDisplay: any;
  geocoder: any;
  markers: any;
  constructor(
    public navCtrl: NavController,
    private zone: NgZone,
    public menu: MenuController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public restProvider: RestProvider
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteOrigen = { input: "" };
    this.autocompleteItemsOrigen = [];
    this.autocompleteDestino = { input: "" };
    this.autocompleteItemsDestino = [];
    this.geocoder = new google.maps.Geocoder();
    this.markers = [];
    this.directionsService = new google.maps.DirectionsService();
  }

  updateSearchResultsOrigen() {
    if (this.autocompleteOrigen.input == "") {
      this.autocompleteItemsOrigen = [];
      return;
    }

    this.GoogleAutocomplete.getPlacePredictions(
      {
        input: this.autocompleteOrigen.input,
        componentRestrictions: { country: "pe" }
      },
      (predictions, status) => {
        this.autocompleteItemsOrigen = [];
        this.zone.run(() => {
          predictions.forEach(prediction => {
            this.autocompleteItemsOrigen.push(prediction);
          });
        });
      }
    );
  }

  // METODO QUE SE REALIZA AL SELECCIONAR UN LUGAR
  selectOrigenResult(itemOrigen) {
    this.autocompleteItemsOrigen = [];
    this.geocoder.geocode(
      { placeId: itemOrigen.place_id },
      (results, status) => {
        if (status === "OK" && results[0]) {
          /* this.calcularRuta(results[0].geometry.location); */
          //completar el input según tu búsqueda
          this.autocompleteOrigen.input = itemOrigen.description;
        } else {
          console.log("Error al ubicar el destino.");
        }
      }
    );
  }

  updateSearchResultsDestino() {
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
        if (status === "OK" && results[0]) {
          /* this.calcularRuta(results[0].geometry.location); */
          //completar el input según tu búsqueda
          this.autocompleteDestino.input = itemDestino.description;
        } else {
          console.log("Error al ubicar el destino.");
        }
      }
    );
  }
  // METODO QUE CALCULA LA RUTA DEL PUNTO A AL PUNTO B
  calcularRuta(destino: any) {
    let request = {
      origin: this.map.getCenter(),
      destination: destino,
      travelMode: "DRIVING"
    }; //AQUI VA EL ORIGEN -> PUNTO ACTUAL
    this.directionsService.route(request, (result, status) => {
      this.directionsDisplay = new google.maps.DirectionsRenderer();

      if (status == "OK") {
        this.directionsDisplay.setDirections(result);
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setOptions({
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: "#13937b"
          }
        });
      }
    });
  }
}
