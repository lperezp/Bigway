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
  FormBuilder
} from "@angular/forms";

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
      clave: new FormControl("", Validators.required)
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

  validarUser() {
    /* console.log(this.miFormulario.value); */
    this.user = this.miFormulario.value;
    /* console.log("hola", this.user); */
    this.restProvider.validarUser(this.user);
  }

  ingresar() {
    if (!this.miFormulario.valid) {
      console.log("Error!");
    } else {
      /* console.log("Eureka!"); */
      this.validarUser();
    }
  }
}
