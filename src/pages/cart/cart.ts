import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GlobalDataServiceProvider } from '../../providers/global-data-service/global-data-service';
import { AlertController } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { LoadingController } from 'ionic-angular';
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
  private account:{fullName?: string, address?: string, phoneNumber?: string} = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserDataProvider,
    public toastCtrl: ToastController,
    public globalService: GlobalDataServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    ) {
    console.log(this.userData.listCartItems());
    this.storedCartItems = this.userData.listCartItems();
    this.account = this.userData.getAccountInfo();
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
    console.log(this.userData.listCartItems().length);
    if(this.userData.listCartItems().length>0) {
      let alert = this.alertCtrl.create({
        title: 'Your Details',
        message: "Please make sure that the following details are correct. Please update the information if needed.",
        inputs: [
          {
            name: 'fname',
            placeholder: 'Full Name',
            value: this.account.fullName
          },
          {
            name: 'phone',
            placeholder: 'Phone Number',
            type: 'tel',
            value: this.account.phoneNumber
          },
          {
            name: 'address',
            placeholder: 'Address',
            value: this.account.address
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
            text: 'Confirm',
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

              let loader = this.presentLoading();

              this.account.fullName = data.fname;
              this.account.phoneNumber = data.phone;
              this.account.address = data.address;
              this.userData.saveAccountInfo(this.account);
              // console.log(data);
              this.globalService.postCartItems(this.userData.listCartItems(), data).then(response => {
                // console.log('Alert closed');
                console.log(response);
                if(JSON.parse(response['_body']).success) {
                  this.navCtrl.setRoot(ProductPage);
                  this.userData.emptyCart();
                  this.generateToast('Order has been successfully placed. You will be contacted shortly for confirmation on the provided phone number.', 5000,'middle');
                  alert.dismiss();
                  loader.dismiss();
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




  generateToast(msg:string='',dur:number=2000, pos:string='bottom') {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: dur,
      position: pos
    });
    toast.present();
  }


  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    return loader;
  }


  openProductsPage() {
      this.navCtrl.setRoot(ProductPage);
  }
}
