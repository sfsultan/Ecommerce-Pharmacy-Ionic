import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { ProductPage } from '../pages/product/product';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { OrderPage } from '../pages/order/order';
import { OrderTab1Page } from '../pages/order-tab1/order-tab1';
import { OrderTab2Page } from '../pages/order-tab2/order-tab2';
import { PrivacyPage } from '../pages/privacy/privacy';
import { TermsPage } from '../pages/terms/terms';
import { FaqPage } from '../pages/faq/faq';
import { CartPage } from '../pages/cart/cart';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountInfoPage } from '../pages/account-info/account-info';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalDataServiceProvider } from '../providers/global-data-service/global-data-service';

import { IonicStorageModule } from '@ionic/storage';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { UserDataProvider } from '../providers/user-data/user-data';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    ProductPage,
    AccountInfoPage,
    ProductDetailPage,
    AboutPage,
    PopoverPage,
    HomePage,
    OrderPage,
    OrderTab1Page,
    OrderTab2Page,
    PrivacyPage,
    TermsPage,
    FaqPage,
    CartPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: ProductPage, name: 'ProductPage', segment: 'products' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: HomePage, name: 'Tutorial', segment: 'tutorial' },
        { component: OrderPage, name: 'OrderPage', segment: 'OrderPage' },
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    ProductPage,
    ProductDetailPage,
    AccountInfoPage,
    AboutPage,
    PopoverPage,
    HomePage,
    OrderPage,
    OrderTab1Page,
    OrderTab2Page,
    PrivacyPage,
    TermsPage,
    FaqPage,
    CartPage
  ],
  providers: [
    Camera,
    File,
    Storage,
    Transfer,
    FilePath,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalDataServiceProvider,
    UserDataProvider
  ]
})
export class AppModule {}
