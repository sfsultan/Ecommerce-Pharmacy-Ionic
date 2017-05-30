import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastController, ActionSheetController, Platform, LoadingController, Loading } from 'ionic-angular';
// import { Camera, File, Transfer, FilePath } from 'ionic-native';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { Camera } from '@ionic-native/camera';
import { OrderTab1Page } from '../order-tab1/order-tab1';
import { OrderTab2Page } from '../order-tab2/order-tab2';

declare var cordova: any;

/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  lastImage: string = null;
  loading: Loading;
  tab1;
  tab2;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
  	this.tab1 = OrderTab1Page;
    this.tab2 = OrderTab2Page;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

}
