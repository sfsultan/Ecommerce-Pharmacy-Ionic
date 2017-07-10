import { Component } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalDataServiceProvider } from '../../providers/global-data-service/global-data-service';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { AlertController } from 'ionic-angular';

// import { CartPage } from '../cart/cart';

/**
 * Generated class for the ProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
  providers:[GlobalDataServiceProvider]
})
export class ProductPage {

  public products:any = [];
  public query:string;
  private start:number=0;
  public productById:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public globalService: GlobalDataServiceProvider,
    public toastCtrl: ToastController,
    public userData: UserDataProvider,
    public alertCtrl: AlertController
    ) {
  	this.loadProducts();
  }

  loadProducts() {

    return new Promise(resolve => {
      this.globalService.load(this.start)
      .then(data => {
        console.log(data);
        for(let product of data) {
          this.products.push(product);
        }
        resolve(true);
      });
    });
  }

  getProducts(ev: any) {

    // set val to the value of the searchbar
    let val = ev.target.value;
    this.products = [];
    // this.presentLoading();
    // console.log(val.toLowerCase());
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.query = val.toLowerCase();
      return new Promise(resolve => {
        this.globalService.searchData(this.start, this.query)
        .then(data => {
          console.log(data);
          for(let product of data) {
            this.products.push(product);
          }
          resolve(true);
        });
      });
    } else {
      this.start = 0;
      this.loadProducts();
    }
  }

  doInfinite(infiniteScroll:any) {
    console.log('Begin async operation: ' + this.start);
    this.start += 50;

    this.loadProducts().then(()=>{
       infiniteScroll.complete();
     });
  }

  // openProductDetail(id) {
  //   if (id) {
  //     return new Promise(resolve => {
  //       this.globalService.getDataById(id)
  //       .then(data => {
  //         console.log('openProductDetail.receivedData');
  //         console.log(data);
  //           this.navCtrl.push(ProductDetailPage, {
  //             product: data
  //           });
  //         resolve(true);
  //       });
  //     });
  //   }
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.showAlert('Help', 'Swipe left on medicine to add them to your cart.');
  }

  showToastWithCloseButton(msg:string) {
    const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  showSimpleToast(msg:string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      showCloseButton: false
    });
    toast.present();
  }

  addToCart(id) {
    console.log(id);
    this.userData.addCartItem(id);
    this.showSimpleToast("Product added to your cart");
  }

  openCartPage() {
    if(this.userData.listCartItems().length == 0) {
      this.showAlert('Help', 'Your cart is empty. Try adding some products to it.')
    } else {
      this.navCtrl.setRoot('CartPage');
    }
  }

  showAlert(title:string, subTitle:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
