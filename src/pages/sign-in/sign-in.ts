import { RestProvider } from "./../../providers/rest/rest";
import { HomePage } from "./../home/home";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";
import { ResetPasswordPage } from "../reset-password/reset-password";
import {
  Form,
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  DefaultValueAccessor
} from "@angular/forms";
import { ResponseOptions } from "@angular/http";

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sign-in",
  templateUrl: "sign-in.html"
})
export class SignInPage {
  user: any;
  result: any;
  miFormulario: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public formBuilder: FormBuilder,
    public restProvider: RestProvider
  ) {
    //Creación de validaciones
    this.miFormulario = formBuilder.group({
      correo: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      clave: new FormControl("")
    });
  }
  ionViewDidEnter() {
    this.menu.enable(false);
  }
  goToBack() {
    this.navCtrl.pop();
  }

  openResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  ingresar() {
    if (!this.miFormulario.valid) {
      console.log("Error!");
    } else {
      /* console.log("Eureka!"); */
      this.validarUser();
    }
  }

  validarUser() {
    this.user = this.miFormulario.value;
    this.restProvider.validarUser(this.user).then(respuesta => {
      console.log("RESPUESTA DEL SERVIDOR", respuesta);
      let _correo = respuesta["correo"];
      let _clave = respuesta["clave"];
      /* console.log(this.user);
      console.log("VARIABLES LOCALES", this.user["correo"]);
      console.log("VARIABLES LOCALES", this.user["clave"]);
      console.log("VARIABLES DEL SERVIDOR", _clave);
      console.log("VARIABLES DEL SERVIDOR", _correo);*/
      if (_correo === this.user["correo"]) {
        this.navCtrl.push(HomePage);
        console.log("Bienvenido!");
      } else {
        console.log("Usuario incorrecto.");
      }
    });

    /* this.navCtrl.push(HomePage); */
  }
}
