import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GlobalDataServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalDataServiceProvider {

  perpage:number = 10;
  query:string;
  url:string = "http://globalapi.loc/api/v1/product"

  productById:any;

  constructor(public http: Http) {
    // console.log('Hello GlobalDataServiceProvider Provider');
  }

  load(start:number=0):Promise<[any]> {

    return new Promise(resolve => {
      this.http.get(this.url + '?limit=' + this.perpage + '&skip=' + start)
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
      this.http.get(this.url + '?limit=' + this.perpage + '&skip=' + start + '&q=' + query)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getDataById(id:number=null) {
    console.log('getDataById: ' + id);
    return new Promise(resolve => {
      this.http.get(this.url + '?id=' + id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

}
