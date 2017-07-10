import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicStorageModule } from '@ionic/storage';

import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';

import { MyApp } from './app.component';
// import { ProductPage } from '../pages/product/product';
// import { ProductDetailPage } from '../pages/product-detail/product-detail';
// import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
// import { OrderPage } from '../pages/order/order';
// import { PrescriptionPage } from '../pages/prescription/prescription';

// import { CartPage } from '../pages/cart/cart';
// import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountInfoPage } from '../pages/account-info/account-info';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalDataServiceProvider } from '../providers/global-data-service/global-data-service';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { UserDataProvider } from '../providers/user-data/user-data';
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { SafeHttpProvider } from '../providers/safe-http/safe-http';

@NgModule({
  declarations: [
    MyApp,
    // ProductPage,
    // AccountInfoPage,
    // ProductDetailPage,
    // AboutPage,
    // PopoverPage,
    // HomePage,
    // OrderPage,
    // PrescriptionPage,
    // CartPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: 'ProductPage', name: 'ProductPage', segment: 'products' },
        { component: 'AboutPage', name: 'About', segment: 'about' },
        { component: 'HomePage', name: 'Tutorial', segment: 'tutorial' },
        // { component: OrderPage, name: 'OrderPage', segment: 'OrderPage' },
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // ProductPage,
    // ProductDetailPage,
    AccountInfoPage,
    // AboutPage,
    // PopoverPage,
    HomePage,
    // OrderPage,
    // PrescriptionPage,
    // CartPage
  ],
  providers: [
    Camera,
    File,
    Transfer,
    FilePath,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalDataServiceProvider,
    UserDataProvider,
    NetworkServiceProvider,
    Network,
    Diagnostic,
    SafeHttpProvider
  ]
})
export class AppModule {}
