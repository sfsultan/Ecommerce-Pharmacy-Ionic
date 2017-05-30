import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, Platform, LoadingController, Loading} from 'ionic-angular';


import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TermsPage } from '../terms/terms';
import { PrivacyPage } from '../privacy/privacy';


/**
 * Generated class for the OrderTab1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-tab1',
  templateUrl: 'order-tab1.html',
})
export class OrderTab1Page {

  // @ViewChild('orderSlider') orderSlider: any;
  // lastImage: string = null;
  // loading: Loading;
  // data;
  // http;
  // submitAttempt: boolean = false;
  // orderFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	// this.http = http;
      // this.data = {
      //   fullname : '',
      //   email : '',
      //   tel : '',
      //   address : '',
      //   agree : false
      //  };
      //  this.platform = platform
      // this.orderFormGroup = new FormGroup({
      //   fullname:new FormControl(),
      //   email:new FormControl(),
      //   tel:new FormControl(),
      //   address:new FormControl(),
      //   agree:new FormControl()
      // });


      // this.orderFormGroup = formBuilder.group({
      //   fullname: new FormControl({value: ''}, Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      //   email: new FormControl({value: ''}, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])),
      //   tel: new FormControl({value: ''}, Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.pattern('[0-9]*'), Validators.required])),
      //   address: new FormControl({value: ''}, Validators.compose([Validators.maxLength(100), Validators.minLength(5), Validators.pattern('[a-zA-Z0-9-]*'), Validators.required])),
      //   agree: new FormControl({value: false}, Validators.pattern('true')),
      // });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderTab1Page');
  }

 //  public presentActionSheet() {
 //    let actionSheet = this.actionSheetCtrl.create({
 //      title: 'Select Image Source',
 //      buttons: [
 //        {
 //          text: 'Select from Storage',
 //          handler: () => {
 //            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
 //          }
 //        },
 //        {
 //          text: 'Use Camera',
 //          handler: () => {
 //            this.takePicture(Camera.PictureSourceType.CAMERA);
 //          }
 //        },
 //        {
 //          text: 'Cancel',
 //          role: 'cancel'
 //        }
 //      ]
 //    });
 //    actionSheet.present();
 //  }

 //  public takePicture(sourceType) {
 //    // Create options for the Camera Dialog
 //    var options = {
 //      quality: 100,
 //      sourceType: sourceType,
 //      saveToPhotoAlbum: false,
 //      correctOrientation: true
 //    };

 //    // Get the data of an image
 //    Camera.getPicture(options).then((imagePath) => {
 //      // Special handling for Android library
 //      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
 //        FilePath.resolveNativePath(imagePath)
 //        .then(filePath => {
 //            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
 //            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
 //          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
 //        });
 //      } else {
 //        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
 //        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
 //        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
 //      }
 //    }, (err) => {
 //      this.presentToast('Error while selecting image.');
 //    });
 //  }


 //  // Create a new name for the image
 //  private createFileName() {
 //    var d = new Date(),
 //    n = d.getTime(),
 //    newFileName =  n + ".jpg";
 //    return newFileName;
 //  }

 //  // Copy the image to a local folder
 //  private copyFileToLocalDir(namePath, currentName, newFileName) {
 //    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
 //      this.lastImage = newFileName;
 //      this.orderSlider.slideNext();
 //    }, error => {
 //      this.presentToast('Error while storing file.');
 //    });
 //  }

 //  private presentToast(text) {
 //    let toast = this.toastCtrl.create({
 //      message: text,
 //      duration: 3000,
 //      position: 'top'
 //    });
 //    toast.present();
 //  }

 //  // Always get the accurate path to your apps folder
 //  public pathForImage(img) {
 //    if (img === null) {
 //      return '';
 //    } else {
 //      return cordova.file.dataDirectory + img;
 //    }
 //  }


 //  public uploadImage() {
 //    // Destination URL
 //    var url = "http://globalapi.loc/api/v1/order/save";

 //    // File for Upload
 //    var targetPath = this.pathForImage(this.lastImage);

 //    // File name only
 //    var filename = this.lastImage;

 //    var options = {
 //      fileKey: "file",
 //      fileName: filename,
 //      chunkedMode: false,
 //      mimeType: "multipart/form-data",
 //      params : {'fileName': filename}
 //    };
 //    this.platform.ready().then(() => {
 //      let fileTransfer = new Transfer();

 //      this.loading = this.loadingCtrl.create({
 //        content: 'Uploading...',
 //      });
 //      this.loading.present();

 //      // Use the FileTransfer to upload the image
 //      fileTransfer.upload(targetPath, url, options).then(data => {
 //        this.loading.dismissAll()
 //        this.presentToast('Image succesful uploaded.');
 //      }, err => {
 //        this.loading.dismissAll()
 //        this.presentToast('Error while uploading file.');
 //      });
 //    });
 //  }

 //  showTermsPage() {
 //    this.navCtrl.push(TermsPage);
 //  }

 //  showPrivacyPage() {
 //    this.navCtrl.push(PrivacyPage);
 //  }



 //  public submitOrder() {

 //      this.submitAttempt = true;

	//   if(!this.orderFormGroup.valid){
	//     // this.uploadImage();
	//     // if(this.lastImage == null) {
	//     //   this.presentActionSheet();
	//     //   this.uploadImage();
	//     // }
	//       console.log(this.lastImage);
	//       console.log("Invalid Order Form");
	//   } else {
	//     // this.uploadImage();
	//     var link = 'http://globalapi.loc/api/v1/order/save';
	//     // var data = JSON.stringify({fullname: this.data.fullname});

	//     let headers = new Headers({ 'Content-Type': 'application/json'});
	//     let body = new FormData();
	//     body.append('fullname', this.data.fullname);
	//     body.append('email', this.data.email);
	//     body.append('tel', this.data.tel);
	//     body.append('address', this.data.address);
	//     body.append('agree', this.data.agree);

	//     let options = new RequestOptions({ headers: headers });

	//     this.http
	//       .post(link, body)
	//       .map(res => res.json())
	//       .subscribe(
	//           data => {
	//             console.log(data);
	//           },
	//           err => {
	//             console.log("ERROR!: ", err);
	//           }
	//       );

	//     // this.http.post(link, data)
	//     // .subscribe(data => {
	//     //  this.data.response = data._body;
	//     //    console.log(data);
	//     // }, error => {
	//     //     console.log("Oooops!");
	//     // });
	//   }
	// }

}
