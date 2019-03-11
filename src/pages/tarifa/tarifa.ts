import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  ToastController,
  AlertController,
  MenuController,
  ModalController,
  NavParams
} from "ionic-angular";
import { RestProvider } from "../../providers/rest/rest";

interface respuesta {
  nombre_conductor: "";
}
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
  public puntoLlegada: any;
  tarifa: any;
  trf: boolean;
  puntoA: any;
  destination: any;
  puntoB: any;
  distancia: any;
  id_direccion: any;
  respuesta: any;
  rpta: any;
  e: any;
  arreglo: any;
  respPedido: Response;
  public estado: any = 1;
  lugar: any;
  constructor(
    public navCtrl: NavController,
    private zone: NgZone,
    public menu: MenuController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public restProvider: RestProvider,
    public navParams: NavParams
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
    this.puntoA = this.navParams.get("data");
    this.lugar = this.navParams.get("lugar");
  }

  ngOnInit() {
    console.log(this.lugar);
    this.id_direccion = 0;
  }

  elegirZona(i) {
    this.puntoA = this.lugar[i].nombre;
    this.id_direccion = this.lugar[i].id;
    console.log("elegir", this.puntoA);
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
    this.map2 = new google.maps.Map(document.getElementById("map2"), {
      center: { lat: -12.046373, lng: -77.042755 },
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
          this.puntoB = results[0].formatted_address;
          console.log("PuntoB_lat", results[0].geometry.viewport.ma.j);
          console.log("PuntoB_lng", results[0].geometry.viewport.ga.l);
          this.puntoLlegada =
            "POINT(" +
            results[0].geometry.viewport.ga.l +
            " " +
            results[0].geometry.viewport.ma.j +
            ")";
          console.log(this.puntoLlegada);
          this.initMap();
          this.calcularRuta(results[0].formatted_address);
          /*           this.id_direccion = 0; */
          this.calcularTarifa();
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
  calcularRuta(destino: any) {
    let request = {
      origin: this.puntoA,
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
      } else {
        console.log("error");
      }
    });
  }

  calcularTarifa() {
    this.destination = this.puntoB;
    var origin = this.puntoA;
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [this.destination],
        travelMode: google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false,
        unitSystem: google.maps.UnitSystem.METRIC
      },
      (response, status) => {
        var origin = this.puntoA;
        var destinations = this.puntoB;
        console.log("KM: ", response.rows[0].elements[0].distance);
        console.log("KM: ", response.rows[0].elements[0].distance.text);
        this.distancia = response.rows[0].elements[0].distance.text;
        this.restProvider
          .getTarifa(this.id_direccion, this.puntoLlegada, this.distancia)
          .then(respuesta => {
            // La variable precio toma el resultado del API.
            // Será un número.
            this.tarifa = respuesta;
            console.log("PRECIO", this.tarifa);
            if (this.tarifa != null) {
              this.trf = true;
            }
          });
      }
    );
  }

  aceptarViaje() {
    this.sendPush();
    this.navCtrl.pop();
    this.alertCtrl
      .create({
        subTitle: "Buscando un Bigway cerca, espere un momento...",
        buttons: ["Aceptar"]
      })
      .present();
  }

  /* ================================================================ */

  sendPush() {
    console.log(this.puntoLlegada);
    console.log(this.distancia);
    console.log(this.tarifa);
    this.restProvider
      .solicitarViaje(
        "POINT(-77.13674111970852 -12.0395974802915)",
        this.puntoLlegada,
        this.distancia,
        this.tarifa
      )
      .then(respuestaa => {
        console.log(respuestaa);
        this.respuesta = respuestaa;
        this.c1();
      });
  }

  c1() {
    console.log(this.respuesta.id_servicio);
    this.e = setInterval(() => {
      this.consultarSevicio();
    }, 5000);
  }

  consultarSevicio() {
    this.restProvider
      .consultarSevicio(this.respuesta.id_servicio)
      .subscribe(resultado => {
        this.respPedido = resultado;
        console.log("estado", this.respPedido["estado"]);
        this.mostrarServicio();
        this.estado = resultado["estado"];
      });
  }

  mostrarServicio() {
    console.log("estadomostrarServicio  ", this.estado);
    if (this.estado == 2) {
      this.alertCtrl
        .create({
          title: "Bigway!",
          subTitle:
            "El conductor: " +
            this.respPedido["nombre_conductor"] +
            " está en camino.",
          buttons: [
            {
              text: "Aceptar",
              handler: () => {
                this.confirmarConductor();
              }
            }
          ]
        })
        .present();
      clearInterval(this.e);
    }
  }

  confirmarConductor() {
    this.restProvider.confirmarConductor(this.respuesta.id_servicio);
    this.e = setInterval(() => {
      this.terminadoServicio();
    }, 5000);
  }

  terminadoServicio() {
    this.restProvider
      .terminadoServicio(this.respuesta.id_servicio)
      .subscribe(resultado => {
        console.log("terminadoServicio", resultado);
        console.log(resultado["estado"]);
        if (resultado["estado"] == 4) {
          clearInterval(this.e);
          this.alertCtrl
            .create({
              title: "Bigway!",
              subTitle: "Su viaje ha terminado. Gracias por usar Bigway",
              buttons: [{ text: "Aceptar" }]
            })
            .present();
        }
      });
  }
}
