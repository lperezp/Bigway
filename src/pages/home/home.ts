import { Geolocation } from "@ionic-native/geolocation";
import { Component, NgZone, ViewChild } from "@angular/core";
import { NavController, MenuController } from "ionic-angular";
import {} from "googlemaps";
import { analyzeAndValidateNgModules } from "@angular/compiler";
/* declare var geoXML3; */

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("map") mapElement;
  google: any;
  map: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  autocompleteItems: any;
  geocoder: any;
  markers: any;
  myMarker: any;
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
  }
  ionViewDidEnter() {
    this.menu.enable(true);
  }

  ngOnInit() {
    /*  this.initTodo(); */
    this.initMap();
    this.tryGeolocation();
    this.timeReal();
  }

  /*  initTodo(){
     let setMap;
       let myParser = new geoXML3.parser({ map: this.map });
       myParser.parse(
         "http://www.desarrollo-lp.byethost16.com/map_bit_way_taxi.kml"
       );
   } */

  initMap() {
    let coords = new google.maps.LatLng(-12.046374, -77.0427934);
    let mapOptions: google.maps.MapOptions = {
      center: coords,
      zoom: 17,
      mapTypeControl: false,
      zoomControl: false,
      scaleControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP /* INICIO DEL STYLE */,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
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
      if (status === "OK" && results[0]) {
        let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };

        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });

        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
        console.log(results[0].geometry.location);
      }
    });
  }

  deleteMarker() {
    this.markers = [];
  }

  tryGeolocation() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        let pos = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };

        let marker = new google.maps.Marker({
          position: pos,
          draggable: true,
          map: this.map,
          title: "Estas aqui!"
        });

        this.markers.push(marker);
        this.map.setCenter(pos);
      })
      .catch(error => {
        console.log("Error al obtener la ubicación", error);
      });
  }

  timeReal() {
    this.geolocation.watchPosition().subscribe(position => {
      console.log(position.coords.longitude + " " + position.coords.latitude);
      console.log("hola", position);
      let latitud = position.coords.latitude;
      let longitud = position.coords.longitude;
      let coords = new google.maps.LatLng(latitud, longitud);
      let marker = new google.maps.Marker({
        position: coords,
        map: this.map
      });
    });
    this.deleteMarker();
  }
}
