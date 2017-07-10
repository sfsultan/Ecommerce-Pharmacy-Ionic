import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { PrescriptionPage } from '../prescription/prescription';
import { AboutPage } from '../about/about';
import { ProductPage } from '../product/product';

/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  private firstLoaded: boolean = false;
  tab1Root: any = ProductPage;
  tab2Root: any = PrescriptionPage;
  tab3Root: any = AboutPage;
  mySelectedIndex: number;


  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter OrderPage');
      // if (!this.firstLoaded && this.tabs.getSelected().length() >= 2) {
      //     this.tabs.getSelected().remove(0, this.tabs.getSelected().length() - 1);
      // }
      // this.firstLoaded = true;
  }

}
