import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrxPage } from './trx';

@NgModule({
  declarations: [
    TrxPage,
  ],
  imports: [
    IonicPageModule.forChild(TrxPage),
  ],
})
export class TrxPageModule {}
