import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';

// import { OrderPage } from "../order/order";

/**
 * Generated class for the AccountInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'account-page'
})
@Component({
  selector: 'page-account-info',
  templateUrl: 'account-info.html',
})
export class AccountInfoPage {

  account: {fullName?: string, address?: string, phoneNumber?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserDataProvider, public toastCtrl: ToastController) {
    this.account = this.userData.getAccountInfo()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountInfoPage');
  }

  onSave(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.userData.saveAccountInfo(this.account);
      this.generateToast('Data successfully saved.');
      this.navCtrl.setRoot('OrderPage');
    }
  }

  generateToast(msg:string='',dur:number=2000) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: dur
    });
    toast.present();
  }

}
