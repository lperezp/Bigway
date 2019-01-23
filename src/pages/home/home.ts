import { Component } from "@angular/core";
import { NavController, MenuController } from "ionic-angular";

//IMPORTAMOS LAS LIBRERIAS
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from "@ionic-native/google-maps";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  map: any;
  constructor(
    public navCtrl: NavController,
    public googleMaps: GoogleMaps,
    public menu: MenuController
  ) {}

  ionViewDidLoad() {
    this.cargarMapa();
  }
  //FUNCION PARA CARGAR EL MENU SLIDER
  ionViewDidEnter() {
    this.menu.enable(true);
  }

  cargarMapa() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: -12,
          lng: -70
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create("map_canvas", mapOptions);

    this.map
      .one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.getPosition();
      })
      .catch(error => {
        console.log(error);
      });
  }

  getPosition() {
    this.map.getMyLocation().then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: "GPS",
        icon: "blue",
        animation: "DROP",
        position: response.latLng
      });
      let h = response.latLng;
    });
  }
}
