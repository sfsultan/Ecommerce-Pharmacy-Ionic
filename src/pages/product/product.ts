import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalDataServiceProvider } from '../../providers/global-data-service/global-data-service';

import { ProductDetailPage } from '../product-detail/product-detail';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalService: GlobalDataServiceProvider) {
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
    console.log(val.toLowerCase());
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
    }
  }

  doInfinite(infiniteScroll:any) {
    console.log('Begin async operation: ' + this.start);
    this.start += 50;

    this.loadProducts().then(()=>{
       infiniteScroll.complete();
     });
  }

  openProductDetail(id) {

    if (id) {
      return new Promise(resolve => {
        this.globalService.load(this.start)
        .then(data => {
          console.log(data);
          for(let product of data) {
            this.productById = product;
            console.log('openProductDetail.receivedData');
            console.log(this.productById);
            this.navCtrl.push(ProductDetailPage, {
              product: this.productById
            });
          }
          resolve(true);
        });
      });
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

}
