import { TravelPage } from "./../pages/travel/travel";
import { SelectedTravelPage } from "./../pages/selected-travel/selected-travel";
import { PagoPage } from "./../pages/pago/pago";
import { HelpPage } from "./../pages/help/help";
import { RegisterPage } from "./../pages/register/register";
import { SignInPage } from "./../pages/sign-in/sign-in";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { StartPage } from "../pages/start/start";
import { ResetPasswordPage } from "../pages/reset-password/reset-password";
import { ConfirmPage } from "../pages/confirm/confirm";
import { Geolocation } from "@ionic-native/geolocation";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StartPage,
    SignInPage,
    RegisterPage,
    ResetPasswordPage,
    ConfirmPage,
    HelpPage,
    PagoPage,
    SelectedTravelPage,
    TravelPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: true,
      autoFocusAssist: false,
      scrollPadding: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StartPage,
    SignInPage,
    RegisterPage,
    ResetPasswordPage,
    ConfirmPage,
    HelpPage,
    PagoPage,
    SelectedTravelPage,
    TravelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
