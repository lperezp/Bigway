import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarifaPage } from './tarifa';

@NgModule({
  declarations: [
    TarifaPage,
  ],
  imports: [
    IonicPageModule.forChild(TarifaPage),
  ],
})
export class TarifaPageModule {}
