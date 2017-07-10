import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { SafeHttpProvider  } from '../safe-http/safe-http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
/*
  Generated class for the GlobalDataServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalDataServiceProvider {

  perpage:number = 10;
  query:string;
  // url:string = "http://globalapilumen.loc/api/v1"
  url:string = "http://www.globalcare.com.pk/api/v1"

  productById:any;

  constructor(public http: SafeHttpProvider) {
    // console.log('Hello GlobalDataServiceProvider Provider');
  }

  load(start:number=0):Promise<[any]> {

    return new Promise(resolve => {
      this.http.get(this.url + '/products/' + start)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });

  }

  searchData(start:number=0, query:string=''):Promise<[any]> {

    console.log("Search Data Function");
    console.log(query);
    console.log(start);

    return new Promise(resolve => {
      this.http.get(this.url + '/products/' + start + '/' + query)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getDataById(id:number=null) {
    // console.log('getDataById: ' + id);
    return new Promise(resolve => {
      this.http.get(this.url + '/product/' + id)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          resolve(data);
        });
    });
  }

  postCartItems(items, userData) {
    // console.log("Items Received");
    // console.log(JSON.stringify(items));
    let itemList:{id:number, quantity:number}[] = [{id: items[0]['data']['id'], quantity:items[0]['quantity']}];
    for (var i = 1; i < items.length; i++) {
      itemList.push({id: items[i]['data']['id'], quantity:items[i]['quantity']});
    }
    // console.log('Prepared Items');
    // console.log(itemList);
    return new Promise(resolve => {
      let header = {"Content-Type": "application/json"}
      let body = [itemList, userData];
      console.log(JSON.stringify(body));
      this.http.post(this.url + "/saveOrder", JSON.stringify(body), header)
        .subscribe(data => {
          resolve(data);
        }, error => {
          console.log("Oooops!");
        });
    });
  }

  uploadPrescription(targetPath, url, options) {

  }

  saveOrderWithPrescription(storedFileName, userData) {

    return new Promise(resolve => {
      let header = {"Content-Type": "application/json"}
      let body = [storedFileName, userData];
      console.log(JSON.stringify(body));
      this.http.post(this.url + "/saveOrderWithPrescription", JSON.stringify(body), header)
        .subscribe(data => {
          resolve(data);
        }, error => {
          console.log("Oooops!");
        });
    });
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
