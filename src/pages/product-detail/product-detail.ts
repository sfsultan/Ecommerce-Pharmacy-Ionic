import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { GlobalDataServiceProvider } from '../../providers/global-data-service/global-data-service';
import { UserDataProvider } from '../../providers/user-data/user-data';
/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  public product: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalDataServiceProvider, public userData: UserDataProvider, public toastCtrl: ToastController) {
    this.product = this.navParams.get('product');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  addToCart(id) {
    console.log(id);
    this.userData.addCartItem(id);
    let toast = this.toastCtrl.create({
      message: 'Product added to your cart',
      duration: 2000
    });
    toast.present();
  }

}
