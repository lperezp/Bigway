import { AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/Rx";
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  /*  apiUrl = "http://desarrollo.cdiproject.com:70/remix/api/usuario/"; */
  rutaAPI = "http://desarrollo.cdiproject.com:70/remix/api/";

  constructor(public http: HttpClient,public alertCtrl : AlertController) {}

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.rutaAPI).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  validarUser(data) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json;charset = utf-8");
      this.http
        .post(this.rutaAPI + "login/cliente", JSON.stringify(data), {
          headers
        })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log("Fallo el servidor: ", err);
          }
        );
    });
  }

  getTarifa(id_direccion, puntoB, distancia) {
    let param = `{"id_direccion": ${id_direccion},"destino": "${puntoB}","distancia": "${distancia}","id_cliente": 1,"origen": ""}`;
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json;charset = utf-8");
      this.http
        .post(this.rutaAPI + "tarifa/zona", param, { headers })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log("Error!");
          }
        );
    });
  }

  solicitarViaje(pointA, pointB, distancia, precio) {
    let param = {
      id_servicio: 24,
      id_conductor: 20,
      id_usuario: 6,
      nombre_conductor: "",
      kilometro: distancia,
      precio: precio,
      origen: "POINT(-77.13674111970852 -12.0395974802915)",
      destino: pointB
    };
    console.log(param)
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json;charset = utf-8");
      this.http
        .post(this.rutaAPI + "servicio/registrar", param, { headers })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log("Error!");
          }
        );
    });
  }

  consultarSevicio(id_servicio) {
    return this.http
      .get(this.rutaAPI + "servicio/pendiente?id_servicio=" + id_servicio)
      .map((res: Response) => {
        return res;
      });
  }

  confirmarConductor(id_servicio) {
    let param = {
      id_servicio: id_servicio
    };
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.set("Content-Type", "application/json;charset = utf-8");
      this.http
        .post(this.rutaAPI + "servicio/procesar", param, { headers })
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            console.log("Error!");
          }
        );
    });
  }

  terminadoServicio(id_servicio) {
    return this.http
      .get(this.rutaAPI + "servicio/terminado?id_servicio=" + id_servicio)
      .map((res: Response) => {
        return res;
      });
  }
}
