import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { ContactPage } from '../pages/contact/contact';
import { ProductPage } from '../pages/product/product';
import { AccountInfoPage } from '../pages/account-info/account-info';
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

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  // appPages: Array<{title: string, component: any, tabComponent: any, icon:string}>;
  // appInfoPages: Array<{title: string, component: any, icon:string}>;

  appPages: PageInterface[] = [
    { title: 'Medicines', name: 'OrderPage', component: OrderPage, tabComponent: ProductPage, index: 0, icon: 'medkit' },
    { title: 'Upload Prescription', name: 'OrderPage', component: OrderPage, tabComponent: OrderTab1Page, index: 1, icon: 'arrow-dropup-circle' },
    { title: 'About', name: 'OrderPage', component: AboutPage, tabComponent: AboutPage, index: 2, icon: 'information-circle' },
  ];

  constructor(public platform: Platform, public statusBar: StatusBar, public storage: Storage, public splashScreen: SplashScreen) {
    // this.initializeApp();

    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = OrderPage;
        } else {
          this.rootPage = HomePage;
        }
        this.platformReady()
      });

    // this.appInfoPages = [
    //   { title: 'About', component: AboutPage, icon: 'information-circle' }
    // ];
    // this.pages = [
    //   { title: 'How to Order', component: HomePage },
    //   { title: 'Place Order', component: OrderPage },
    //   { title: 'Products', component: ProductPage },
    //   { title: 'My Cart', component: CartPage },
    //   { title: 'About Us', component: AboutPage },
    //   { title: 'Privacy Policy', component: PrivacyPage },
    //   { title: 'Terms of Service', component: TermsPage },
    //   { title: 'FAQs', component: FaqPage }
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let params = {};
    if (page.index) {
      params = { tabIndex: page.index };
    }
    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    console.log("Child Index: " + page.index)
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
      console.log(this.nav.getActiveChildNav())
      // Set the root of the nav with params if it's a tab index
    } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
    // this.nav.setRoot(page.component);
  }


  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  openTutorial() {
    this.nav.setRoot(HomePage);
  }

  openAccountInfo() {
    this.nav.setRoot(AccountInfoPage);
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
}
