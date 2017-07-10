import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../about-popover/about-popover';
/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create("PopoverPage");
    popover.present({ ev: event });
  }

}
