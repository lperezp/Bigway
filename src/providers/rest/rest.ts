import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  /*  apiUrl = "http://desarrollo.cdiproject.com:70/remix/api/usuario/"; */
  rutaAPI = "http://desarrollo.cdiproject.com:70/remix/api/";

  constructor(public http: HttpClient) {}

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

  getTarifa(id_direccion,puntoB,distancia) {
    let param = `{"id_direccion": ${id_direccion},"destino": "${puntoB}","distancia": "${distancia}","id_cliente": 1}`;
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


  solicitarViaje(pointA,pointB,distancia){
    let param = `{"id_direccion": ${pointA},"destino": "${pointB}","distancia": "${distancia}","id_cliente": 1,"tarifa": "1.1 km"}`;
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
}
