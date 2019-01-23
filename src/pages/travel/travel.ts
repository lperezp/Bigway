import { SelectedTravelPage } from "./../selected-travel/selected-travel";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the TravelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-travel",
  templateUrl: "travel.html"
})
export class TravelPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  travel: any[];
  _travels: any[] = [
    {
      name: "Jose Díaz",
      dni: "12345678",
      vehiculo: "Ford GT90",
      placa: "GT4-590",
      precio: "11.00",
      modoPago: "Efectivo",
      datetime: "09/01/2019 05:40 p.m."
    },
    {
      name: "Javier Prado",
      dni: "87654321",
      vehiculo: "Chevrolet Camaro",
      placa: "AWS-103",
      precio: "23.00",
      modoPago: "Efectivo",
      datetime: "09/01/2019 05:40 p.m."
    },
    {
      name: "Raul Chavez",
      dni: "12345678",
      vehiculo: "Ford GT90",
      placa: "GT4-590",
      precio: "6.00",
      modoPago: "Efectivo",
      datetime: "09/01/2019 05:40 p.m."
    },
    {
      name: "Luis Perez",
      dni: "87654321",
      vehiculo: "Chevrolet Camaro",
      placa: "AWS-103",
      precio: "11.60",
      modoPago: "Efectivo",
      datetime: "09/01/2019 05:40 p.m."
    },
    {
      name: "Fernando Mucha",
      dni: "12345678",
      vehiculo: "Ford GT90",
      placa: "GT4-590",
      precio: "32.50",
      modoPago: "Efectivo",
      datetime: "09/01/2019 05:40 p.m."
    },
    {
      name: "Eduardo de la Cruz",
      dni: "87654321",
      vehiculo: "Chevrolet Camaro",
      placa: "AWS-103",
      precio: "32.70",
      modoPago: "Efectivo",
      datetime: "09/01/2019 05:40 p.m."
    },
    {
      name: "José de San Martin",
      dni: "87654321",
      vehiculo: "Chevrolet Camaro",
      placa: "AWS-103",
      precio: "12.50",
      modoPago: "Efectivo",
      datetime: "09/01/2019 05:40 p.m."
    }
  ];

  selectedTravel(event, item) {
    this.navCtrl.push(SelectedTravelPage, { item: item });
  }
}
