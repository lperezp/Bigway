import { HomePage } from "./../pages/home/home";
import { StartPage } from "./../pages/start/start";
import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TravelPage } from "../pages/travel/travel";
import { PagoPage } from "../pages/pago/pago";
import { HelpPage } from "../pages/help/help";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = StartPage;

  pages: Array<{ title: string; component: any }>;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    this.pages = [
      { title: "Tus viajes", component: TravelPage },
      { title: "Pagos", component: PagoPage },
      { title: "Ayuda", component: HelpPage },
      { title: "Configuración", component: TravelPage },
      { title: "Cerrar sesión", component: TravelPage }
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
