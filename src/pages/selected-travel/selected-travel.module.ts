import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectedTravelPage } from './selected-travel';

@NgModule({
  declarations: [
    SelectedTravelPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectedTravelPage),
  ],
})
export class SelectedTravelPageModule {}
