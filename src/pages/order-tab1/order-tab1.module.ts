import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderTab1Page } from './order-tab1';

@NgModule({
  declarations: [
    OrderTab1Page,
  ],
  imports: [
    IonicPageModule.forChild(OrderTab1Page),
  ],
  exports: [
    OrderTab1Page
  ]
})
export class OrderTab1PageModule {}
