import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrderPage } from '../../pages/order/order';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  slides = [
    {
      title: "Welcome to the GlobalCare Pharmacy!",
      description: "<b>Buy Medicines Online & Cash on Delivery across Pakistan</b></br>You just have to upload your prescription, Our pharmacist will review it and create your order. Proceed further to view the individual steps.",
      image: "img/health-clinic.png",
    },
    {
      title: "Step 1",
      description: "<b>Upload</b><br/>Upload your prescription by taking a new picture or choose one from the gallery.",
      image: "img/text-file.png",
    },
    {
      title: "Step 2",
      description: "<b>Provide Details</b><br/>Fill the required details in the online form. This will include your name, email, contact number, and address.",
      image: "img/forms.png",
    },
    {
      title: "Step 3",
      description: "<b>Submit your order</b><br/>You can also place an order through Whatsapp on the phone number +92 311 176 1222",
      image: "img/paper-plane.png",
    },
    {
      title: "Step 4",
      description: "<b>Review Process</b>Our Pharmacist will review your prescription and it will be shipped on your provided address.",
      image: "img/good-review.png",
    },
    {
      title: "Step 5",
      description: "<b>Pay</b><br/> Pay the amount when you receive the medicine at your provided address.",
      image: "img/coins.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


  showOrderPage() {
    this.navCtrl.setRoot(OrderPage);
  }

}
