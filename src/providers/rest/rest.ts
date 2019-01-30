import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = "http://desarrollo.cdiproject.com:70/remix/api/usuario/";
  rutaLogin = "http://desarrollo.cdiproject.com:70/remix/api/login/clddiente";

  constructor(public http: HttpClient) {}

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.rutaLogin).subscribe(
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
        .post(this.rutaLogin, JSON.stringify(data), { headers })
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
}
