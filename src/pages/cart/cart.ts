import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GlobalDataServiceProvider } from '../../providers/global-data-service/global-data-service';
import { AlertController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';

import { ProductPage } from '../product/product';
/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers:[GlobalDataServiceProvider]
})
export class CartPage {

  public storedCartItems:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserDataProvider, public toastCtrl: ToastController, public globalService: GlobalDataServiceProvider,public alertCtrl: AlertController) {
    console.log(this.userData.listCartItems());
    this.storedCartItems = this.userData.listCartItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  getTotal() {
    let total = 0;
    for (var i = 0; i < this.storedCartItems.length; i++) {
      if (this.storedCartItems[i].data.price) {
        total += parseInt(this.storedCartItems[i].data.price) * parseInt(this.storedCartItems[i].quantity);
      }
    }
    return total;
  }

  removeCartItem(index:number) {
    this.userData.removeCartItem(index);
    this.generateToast('Product removed from your cart');
  }

  updateCartItem(index:number, updateNum:number) {
    // console.log(index,updateNum);
    this.userData.updateCartItem(index, updateNum);
    if(this.storedCartItems.length <= 0) {
      this.navCtrl.setRoot(ProductPage);
    }
  }

  checkout() {
    console.log("checkout function");
    console.log(this.userData.listCartItemIDs().length);
    if(this.userData.listCartItemIDs().length>0) {
      let alert = this.alertCtrl.create({
        title: 'Your Details',
        inputs: [
          {
            name: 'fname',
            placeholder: 'Full Name'
          },
          {
            name: 'phone',
            placeholder: 'Phone Number',
            type: 'tel'
          },
          {
            name: 'address',
            placeholder: 'Address',
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Done',
            handler: (data) => {
              if (data.fname.length < 3) {
                this.generateToast('Enter a valid name');
                return false;
              }
              if (data.phone.length < 5) {
                this.generateToast('Enter a valid phone number');
                return false;
              }
              if (data.address.length < 5) {
                this.generateToast('Enter a valid address');
                return false;
              }
              // console.log(data);
              this.globalService.postCartItems(this.userData.listCartItems(), data).then(response => {
                // console.log('Alert closed');
                console.log(response);
                if(JSON.parse(response['_body']).success) {
                  this.generateToast('Order has been successfully placed');
                  alert.dismiss();
                } else {
                  this.generateToast('Unable to place an order')
                }
              });
              return false;
            }
          }
        ]
      });
      alert.present();
    } else {
      this.generateToast('Your cart is empty');
    }
  }




  generateToast(msg:string='',dur:number=2000) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: dur
      });
      toast.present();
  }


  openProductsPage() {
      this.navCtrl.setRoot(ProductPage);
  }
}
