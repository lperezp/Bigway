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
  public map2: any;
  GoogleAutocomplete: any;
  autocompleteOrigen: any;
  autocompleteDestino: any;
  autocompleteItemsOrigen: any;
  autocompleteItemsDestino: any;
  directionsService: any;
  directionsDisplay: any;
  geocoder: any;
  markers: any;
  puntoLlegada: any;
  tarifa: any;
  trf:boolean;
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
    this.trf = false;
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
          console.log("PuntoA_", results[0]);
          console.log("PuntoA_", results[0].geometry.viewport.ma.j);
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

  initMap() {
    this.map2 = new google.maps.Map(document.getElementById('map2'), {
      center: {lat:-12.046373, lng:-77.042755 },
          zoom: 16,
          mapTypeControl: false,
          zoomControl: false,
          scaleControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP /* INICIO DEL STYLE */,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }]
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#f5f5f5" }]
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [{ color: "#bdbdbd" }]
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#eeeeee" }]
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#e5e5e5" }]
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }]
            },
            {
              featureType: "road.arterial",
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#dadada" }]
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }]
            },
            {
              featureType: "road.local",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }]
            },
            {
              featureType: "transit.line",
              elementType: "geometry",
              stylers: [{ color: "#e5e5e5" }]
            },
            {
              featureType: "transit.station",
              elementType: "geometry",
              stylers: [{ color: "#eeeeee" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#c9c9c9" }]
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }]
            }
          ]
        });
    }
  // METODO QUE SE REALIZA AL SELECCIONAR UN LUGAR
  selectDestinoResult(itemDestino) {
    this.autocompleteItemsDestino = [];
    this.geocoder.geocode(
      { placeId: itemDestino.place_id },
      (results, status) => {
        if (status === "OK" && results[0]) {
          console.log("location", results[0].formatted_address);
          console.log("PuntoA_lat", results[0].geometry.viewport.ma.j);
          console.log("PuntoA_lng", results[0].geometry.viewport.ga.l);
          this.puntoLlegada ="POINT(" + results[0].geometry.viewport.ga.l +" " + results[0].geometry.viewport.ma.j +")";
          console.log(this.puntoLlegada);
          this.calcularTarifa();
          this.initMap();
          this.calcularRuta(results[0].formatted_address);
          //completar el input según tu búsqueda
          this.autocompleteDestino.input = itemDestino.description;

          // LLAMAR AL METODO QUE CALCULE LA TARIFA
        } else {
          console.log("Error al ubicar el destino.");
        }
      }
    );
  }
  // METODO QUE PINTA LA RUTA DEL PUNTO A AL PUNTO B
  calcularRuta(destino:any) {
    let request = {
      origin: "Av. de la Floresta 497, San Borja 15037, Perú",
      destination: destino,
      travelMode: "DRIVING"
    }; 
    this.directionsService.route(request, (result, status) => {
      this.directionsDisplay = new google.maps.DirectionsRenderer();

      if (status == "OK") {
        this.directionsDisplay.setDirections(result);
        this.directionsDisplay.setMap(this.map2);
        this.directionsDisplay.setOptions({
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: "#13937b"
          }
        });
      }else{
        console.log("error")
      }
    });
  }

  calcularTarifa() {
    this.restProvider.getTarifa(this.puntoLlegada).then(respuesta => {
      // La variable precio toma el resultado del API.
      // Será un número.
      this.tarifa = respuesta;
      console.log("PRECIO",this.tarifa);
      if(this.tarifa!=null){
        this.trf= true;
      }
    });
  }

  aceptarViaje(){
    this.navCtrl.pop();
    this.toastCtrl.create({
      message: "Buscando conductor. Espere un momento por favor...",
      duration: 3000
    }).present();
    
  }
}
