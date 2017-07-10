import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import { NetworkServiceProvider } from '../network-service/network-service';

/*
  Generated class for the SafeHttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SafeHttpProvider {

  constructor(public http: Http, private networkService: NetworkServiceProvider) {
    console.log('Hello SafeHttpProvider Provider');
  }

  get(url: string, options?: RequestOptionsArgs) {
    if (this.networkService.noConnection()) {
      this.networkService.showNetworkAlert();
    } else { return this.http.get(url, options) }
  }


  post(url: string, body: string, options?: RequestOptionsArgs) {
    if (this.networkService.noConnection()) {
      this.networkService.showNetworkAlert();
    } else { return this.http.post(url, body, options) }
  }

}
