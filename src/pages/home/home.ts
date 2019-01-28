import { Geolocation } from "@ionic-native/geolocation";
import { Component, NgZone, ViewChild } from "@angular/core";
import { NavController, MenuController } from "ionic-angular";
import {} from "googlemaps";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  google: any;
  public map: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any;
  geocoder: any;
  markers: any;
  myMarker: any;
  directionsService: any;
  directionsDisplay: any;
  puntoB: string;
  puntoA: string;
  @ViewChild("map") mapElement;
  constructor(
    public navCtrl: NavController,
    private zone: NgZone,
    private geolocation: Geolocation,
    public menu: MenuController
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: "" };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder();
    this.markers = [];
    this.directionsService = new google.maps.DirectionsService();
  }
  ionViewDidEnter() {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    /* ARRANCA EL MAPA CON LA BUSQUEDA DE POSICION
    INMEDIATA Y LUEGO LA MUESTRA EN PANTALLA*/
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        let pos = { lat: resp.coords.latitude, lng: resp.coords.longitude };
        let mapOptions: google.maps.MapOptions = {
          center: pos,
          zoom: 18,
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
        this.selectStart();
        google.maps.event.addListener(this.map, "dragend", () => {
          this.geocoder.geocode(
            { location: this.map.getCenter() },
            (result, status) => {
              if (status == "OK" && result[0]) {
                console.log(
                  "Direccion de tu marcador:",
                  result[0].formatted_address
                );
                this.puntoA = result[0].formatted_address;
              }
            }
          );
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  updateSearchResults() {
    if (this.autocomplete.input == "") {
      this.autocompleteItems = [];
      return;
    }

    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.autocomplete.input },
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

  selectSearchResult(item) {
    this.deleteMarker();
    this.autocompleteItems = [];

    this.geocoder.geocode({ placeId: item.place_id }, (results, status) => {
      console.log("item:", item.description);
      if (status === "OK" && results[0]) {
        this.calcularRuta(results[0].geometry.location);
        //completar el input según tu búsqueda
        this.autocomplete.input = item.description;
      } else {
        console.log("Error al ubicar el destino.");
      }
    });
  }

  calcularRuta(destino: any) {
    let request = {
      origin: this.map.getCenter(),
      destination: destino,
      travelMode: "DRIVING"
    }; //AQUI VA EL ORIGEN -> PUNTO ACTUAL
    this.directionsService.route(request, (result, status) => {
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      if (status == "OK") {
        console.log(result);
        this.directionsDisplay.setDirections(result);
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setOptions({
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: "#13937b"
          }
        });
      }
    });
  }

  deleteMarker() {
    //funcion que elimina Marker, es un metodo de Google Maps
  }

  selectStart() {
    this.geocoder.geocode(
      { location: this.map.getCenter() },
      (result, status) => {
        if (status == "OK" && result[0]) {
          console.log("Direccion de tu marcador:", result[0].formatted_address);
          this.puntoA = result[0].formatted_address;
        }
      }
    );
  }
}
