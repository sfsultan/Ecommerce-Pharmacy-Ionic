import { Injectable } from '@angular/core';
import {AlertController, Platform} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';

/*
  Generated class for the NetworkServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NetworkServiceProvider {

  constructor(
    private network: Network,
    public alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    public platform: Platform,
    ) {
    console.log('Hello NetworkServiceProvider Provider');
  }

  noConnection() {
    return (this.network.type === 'none');
  }


  private showWifiSettings() {
    if (this.diagnostic.switchToWifiSettings) {
      this.diagnostic.switchToWifiSettings();
    } else {
      this.diagnostic.switchToSettings();
    }
  }


  private showMobileDataSettings() {
    if (this.diagnostic.switchToMobileDataSettings) {
      this.diagnostic.switchToMobileDataSettings();
    } else {
      this.diagnostic.switchToSettings();
    }
  }


  private quitApp() {
    this.platform.exitApp();
  }

  showNetworkAlert() {
    let networkAlert = this.alertCtrl.create({
      title: 'No Internet Connection',
      message: 'Please check your internet connection.',
      buttons: [
        {
          text: 'Close',
          handler: () => {
            networkAlert.dismiss().then(() => {
              this.quitApp();
            })
          }
        },
        {
          text: 'WiFi Settings',
          handler: () => {
            networkAlert.dismiss().then(() => {
              this.showWifiSettings();
              this.quitApp();
            })
          }
        },
        {
          text: 'Mobile Data Settings',
          handler: () => {
            networkAlert.dismiss().then(() => {
              this.showMobileDataSettings();
              this.quitApp();
            })
          }
        }
      ]
    });
    networkAlert.present();
  }

}
