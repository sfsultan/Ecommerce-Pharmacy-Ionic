import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderTab2Page } from './order-tab2';

@NgModule({
  declarations: [
    OrderTab2Page,
  ],
  imports: [
    IonicPageModule.forChild(OrderTab2Page),
  ],
  exports: [
    OrderTab2Page
  ]
})
export class OrderTab2PageModule {}
