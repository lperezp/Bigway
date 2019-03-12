import { OperacionPage } from "./../operacion/operacion";
import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  ModalController
} from "ionic-angular";
import {} from "googlemaps";
import { Geolocation } from "@ionic-native/geolocation";

/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-mapa",
  templateUrl: "mapa.html"
})
export class MapaPage {
  google: any;
  public map: any;
  @ViewChild("map") mapElement;
  cliente: any;
  lugar: any;
  geocoder: any;
  puntoGPS: any;
  center: any;
  focus: boolean;
  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public menu: MenuController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.cliente = this.navParams.get("respuesta");
    this.lugar = [];
    this.geocoder = new google.maps.Geocoder();
    this.lugar = this.cliente.cliente.direcciones;
    console.log("Rutas del usuario:", this.lugar);
    this.puntoGPS = "Buscando tu ubicación...";
    this.focus = false;
  }

  ionViewDidEnter() {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.initMap();
  }
  // METODO QUE INICIA EL MAPA
  initMap() {
    let mapOptions: google.maps.MapOptions = {
      center: { lat: -12, lng: -77 },
      zoom: 16,
      mapTypeControl: false,
      zoomControl: false,
      scaleControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      /* INICIO DEL STYLE */
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
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.getGeolocation();
  }

  getGeolocation() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        let pos = { lat: resp.coords.latitude, lng: resp.coords.longitude };
        console.log("POSICIÓN ACTUAL: ", pos);
        let mapOptions: google.maps.MapOptions = {
          center: pos,
          zoom: 16,
          mapTypeControl: false,
          zoomControl: false,
          scaleControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          /* INICIO DEL STYLE */
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
          /* FIN DEL STYLE */
        };
        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );
        this.obtenerPosicionActual();
        google.maps.event.addListener(this.map, "dragend", () => {
          this.geocoder.geocode(
            { location: this.map.getCenter() },
            (result, status) => {
              if (status == "OK" && result[0]) {
                this.puntoGPS = result[0].formatted_address;
                console.log("UBICACIÓN DEL MARCADOR", result[0]);
              }
            }
          );
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  obtenerPosicionActual() {
    this.geocoder.geocode(
      { location: this.map.getCenter() },
      (result, status) => {
        if (status == "OK" && result[0]) {
          console.log("Direccion de tu marcador:", result[0].formatted_address);
          this.center = this.map.getCenter();
          console.log("CENTER", this.center);
          this.puntoGPS = result[0].formatted_address;
          console.log("OBTENER POSICION ACTUAL", this.puntoGPS);
        }
      }
    );
  }

  focusTrue() {
    this.focus = true;
    this.openOperacion();
  }
  focusFalse() {
    this.focus = false;
    this.openOperacion();
  }

  openOperacion() {
    let modal = this.modalCtrl.create(OperacionPage, {
      lugar: this.lugar,
      puntoGPS: this.puntoGPS,
      focus: this.focus
    });
    modal.present();
  }
}
