import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

// import { ToastController, ActionSheetController, Platform, LoadingController, Loading } from 'ionic-angular';
// import { Camera, File, Transfer, FilePath } from 'ionic-native';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { Camera } from '@ionic-native/camera';
import { OrderTab1Page } from '../order-tab1/order-tab1';
import { AboutPage } from '../about/about';
import { ProductPage } from '../product/product';

declare var cordova: any;

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

  // lastImage: string = null;
  // loading: Loading;
  tab1Root: any = ProductPage;
  tab2Root: any = OrderTab1Page;
  tab3Root: any = AboutPage;
  mySelectedIndex: number;

  // constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

}
