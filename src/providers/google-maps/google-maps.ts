import { Geolocation } from "@ionic-native/geolocation";
import { Injectable } from "@angular/core";
import {} from "googlemaps";

/*
  Generated class for the GoogleMapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleMapsProvider {
  public mapOptions: google.maps.MapOptions;
  public pos_lat: number;
  public pos_lng: number;
  
  constructor(public geolocation: Geolocation) {
    this.initMap();
    this.mapOptions = {
          center: {lat: -12, lng: -77},
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
  }

  // METODO QUE INICIA EL MAPA
  initMap() {
    /* ARRANCA EL MAPA CON LA BUSQUEDA DE POSICION INMEDIATA Y LUEGO LA MUESTRA EN PANTALLA*/
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        console.log("OK")
        this.pos_lat = resp.coords.latitude;
        this.pos_lng = resp.coords.longitude;
        console.log(this.pos_lat)
        

        /*  var icon = {
          url: "../../assets/imgs/start.png", // url
          scaledSize: new google.maps.Size(30, 50), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
      };
        var marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          icon: icon
        }); */
      })
      .catch(err => {
        console.log(err);
      });
  }
}
