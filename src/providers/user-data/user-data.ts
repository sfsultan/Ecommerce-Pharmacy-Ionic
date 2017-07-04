import { Injectable } from '@angular/core';
import { GlobalDataServiceProvider } from '../../providers/global-data-service/global-data-service';

/*
  Generated class for the UserDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserDataProvider {

  _user: any;
  _cartItems = [];
  _cartItemIDs = [];

  constructor(public globalService: GlobalDataServiceProvider) {
    console.log('Hello UserDataProvider Provider');
  }



  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  // login(accountInfo: any) {
  //   let seq = this.api.post('login', accountInfo).share();

  //   seq
  //     .map(res => res.json())
  //     .subscribe(res => {
  //       // If the API returned a successful response, mark the user as logged in
  //       if (res.status == 'success') {
  //         this._loggedIn(res);
  //       } else {
  //       }
  //     }, err => {
  //       console.error('ERROR', err);
  //     });

  //   return seq;
  // }









  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  // signup(accountInfo: any) {
  //   let seq = this.api.post('signup', accountInfo).share();

  //   seq
  //     .map(res => res.json())
  //     .subscribe(res => {
  //       // If the API returned a successful response, mark the user as logged in
  //       if (res.status == 'success') {
  //         this._loggedIn(res);
  //       }
  //     }, err => {
  //       console.error('ERROR', err);
  //     });

  //   return seq;
  // }









  /**
   * Log the user out, which forgets the session
   */
  // logout() {
  //   this._user = null;
  // }









  /**
   * Process a login/signup response to store user data
   */
  // _loggedIn(resp) {
  //   this._user = resp.user;
  // }





  addCartItem(productId: number): void {
    this._cartItemIDs.push(productId);
    // console.log("UserDataProvider Item Added: " + productId);
    let product = this.globalService.getDataById(productId);
    product.then(data => {
          // console.log(data['id']);
          //   if (this._cartItems[i]) {
          //     total += parseInt(this.storedCartItems[i].price);
          //   }
          // }
          let newItem = {data: data, quantity:1};
          let itemExists = null;

          if (this._cartItems.length == 0) {
            this._cartItems.push(newItem);
          } else {
            for (var i = 0; i < this._cartItems.length; i++) {
              if(this._cartItems[i]['data']['id'] == data['id']) {
                itemExists = i;
                this._cartItems[i]['quantity'] = this._cartItems[i]['quantity'] + 1;
                break;
              }
            }
            if(itemExists == null) {
              this._cartItems.push(newItem);
            }
          }
        });
  };

  removeCartItem(index: number): void {
    if (index > -1) {
      this._cartItems.splice(index, 1);
      this._cartItemIDs.splice(index, 1);
    }
  };

  updateCartItem(index: number, updateNum:number): void {
    console.log(this._cartItems);
    let itemExists = null;
    for (var i = 0; i < this._cartItems.length; i++) {
      if(this._cartItems[i]['data']['id'] == index) {
        this._cartItems[i]['quantity'] = this._cartItems[i]['quantity'] + updateNum;
        if(this._cartItems[i]['quantity'] <= 0) {
          this._cartItems.splice(i, 1);
        }
        break;
      }
    }
  };

  listCartItems():number[] {
    return this._cartItems;
  };

  listCartItemIDs():number[] {
    return this._cartItemIDs;
  };

}
