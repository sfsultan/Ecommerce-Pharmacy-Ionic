import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController } from 'ionic-angular';


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close('http://www.globalcare.com.pk/privacy-policy/')">Privacy Policy</button>
      <button ion-item (click)="close('http://www.globalcare.com.pk/terms-of-use/')">Terms of Use</button>
      <button ion-item (click)="close('http://www.globalcare.com.pk/faq/')">FAQs</button>
      <button ion-item (click)="close('http://www.globalcare.com.pk/contact/')">Contact Us</button>
      <button ion-item (click)="close('http://www.globalcare.com.pk/')">Main Website</button>
    </ion-list>
  `
})
export class PopoverPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController
  ) { }

  support() {
    this.app.getRootNav().push('SupportPage');
    this.viewCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }
}