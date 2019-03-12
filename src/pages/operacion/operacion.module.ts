import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperacionPage } from './operacion';

@NgModule({
  declarations: [
    OperacionPage,
  ],
  imports: [
    IonicPageModule.forChild(OperacionPage),
  ],
})
export class OperacionPageModule {}
