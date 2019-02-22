import { TarifaPage } from "./../tarifa/tarifa";
import { Geolocation } from "@ionic-native/geolocation";
import { Component, NgZone, ViewChild } from "@angular/core";
import {
  NavController,
  MenuController,
  ModalController,
  AlertController,
  ToastController,
  NavParams
} from "ionic-angular";
import {} from "googlemaps";
import { RestProvider } from "../../providers/rest/rest";

@Component({
  selector: "page-homev1",
  templateUrl: "homev1.html"
})
export class Homev1Page {
  google: any;
  public map: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any;
  directionsService: any;
  directionsDisplay: any;
  geocoder: any;
  markers: any;
  myMarker: any;
  puntoB: string;
  puntoA: string;
  coordsA: string;
  coordsB: string;
  marker: boolean;
  trf: boolean;
  precio: any;
  @ViewChild("map") mapElement;
  constructor(
    public navCtrl: NavController,
    private zone: NgZone,
    private geolocation: Geolocation,
    public menu: MenuController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public restProvider: RestProvider,
    public navParams: NavParams
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: "" };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder();
    this.markers = [];
    this.directionsService = new google.maps.DirectionsService();
    this.marker = true;
    this.trf = false;
    this.navParams.get('puntoA');
  }
  ionViewDidEnter() {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.initMap();
  }
  // METODO QUE INICIA EL MAPA
  initMap() {
    /* ARRANCA EL MAPA CON LA BUSQUEDA DE POSICION
    INMEDIATA Y LUEGO LA MUESTRA EN PANTALLA*/
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        let pos = { lat: resp.coords.latitude, lng: resp.coords.longitude };
        let mapOptions: google.maps.MapOptions = {
          center: pos,
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
        }; /* FIN DEL STYLE */
        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );
        var icon = {
          url: "../../assets/imgs/start.png", // url
          scaledSize: new google.maps.Size(30, 50), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
      };
        var marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          icon: icon
        });

        /* EFECTO DRAGEND -> ARRASTRE */
         this.selectStart();
        /* google.maps.event.addListener(this.map, "dragend", () => {
          this.geocoder.geocode(
            { location: this.map.getCenter() },
            (result, status) => {
              if (status == "OK" && result[0]) {
                this.puntoA = result[0].formatted_address;
                console.log("coordinada A", result[0]);
              }
            }
          );
        }); */
        /* EFECTO DRAGEND */
      })
      .catch(err => {
        console.error(err);
      });
  }

  // METODO QUE ACTUALIZA LOS RESULTADOS DE BUSQUEDA
  updateSearchResults() {
    if (this.autocomplete.input == "") {
      this.autocompleteItems = [];
      return;
    }

    this.GoogleAutocomplete.getPlacePredictions(
      {
        input: this.autocomplete.input,
        componentRestrictions: { country: "pe" }
      },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach(prediction => {
            this.autocompleteItems.push(prediction);
          });
        });
      }
    );
  }

  // METODO QUE SE REALIZA AL SELECCIONAR UN LUGAR
  selectSearchResult(item) {
    this.deleteMarker();
    this.autocompleteItems = [];

    this.geocoder.geocode({ placeId: item.place_id }, (results, status) => {
      console.log("Punto B:", item.description);

      if (status === "OK" && results[0]) {
        this.marker = false;
        this.trf = true;
        this.coordsB = results[0].geometry.location;
        this.calcularRuta(results[0].geometry.location);
        //completar el input según tu búsqueda
        this.autocomplete.input = item.description;
      } else {
        console.log("Error al ubicar el destino.");
      }
    });
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

  // METODO QUE LIMPIA EL MAPA
  deleteMarker() {}

  // METODO QUE IMPRIME LA UBICACIÓN DEL MARCADOR CENTRAL
    selectStart() {
    this.geocoder.geocode(
      { location: this.map.getCenter() },
      (result, status) => {
        if (status == "OK" && result[0]) {
          console.log("Direccion de tu marcador:", result[0].formatted_address);
          this.coordsA = this.map.getCenter();
          this.puntoA = result[0].formatted_address;
        }
      }
    );
  }


/*   openTarifaPage() {
    console.log("PuntoA: ", this.coordsA);
    console.log("PuntoB: ", this.coordsB);
    this.restProvider.getTarifa("ss").then(respuesta => {
      // La variable precio toma el resultado del API.
      // Será un número.
      this.precio = respuesta;
      const modal = this.modalCtrl.create(TarifaPage);
      modal.present();
    });
  } */

  launchModal() {
    const modal = this.modalCtrl.create(TarifaPage);
    modal.present();
  }
}
