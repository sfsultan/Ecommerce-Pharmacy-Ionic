import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, Loading } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';

import { UserDataProvider } from '../../providers/user-data/user-data';
import { GlobalDataServiceProvider } from '../../providers/global-data-service/global-data-service';

declare var cordova: any;
/**
 * Generated class for the PrescriptionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-prescription',
  templateUrl: 'prescription.html',
})
export class PrescriptionPage {

  public consolelog:string = "";
  private account:{fullName?: string, address?: string, phoneNumber?: string} = {};
  loading: Loading;
  public lastImage: string = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    public platform: Platform,
    private filePath: FilePath,
    public toastCtrl: ToastController,
    private file: File,
    private transfer: Transfer,
    public loadingCtrl: LoadingController,
    public userData: UserDataProvider,
    public globalService: GlobalDataServiceProvider,
    public alertCtrl: AlertController,
    ) {
    this.account = this.userData.getAccountInfo();
  }

  private openGallery (): void {
    const options: CameraOptions = {
      quality: 100,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      if (this.platform.is('android')) {
        this.filePath.resolveNativePath(imageData)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.lastIndexOf('?'));
            // this.filepath = currentName;
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
        var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
        // this.filepath = currentName;
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      // Handle error
    });
  }


  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }



  public uploadImage() {
    // Destination URL
    // var url = "http://globalapilumen.loc/api/v1/savePrescription";
    var url = "http://www.globalcare.com.pk/api/v1/savePrescription";

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;


    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      targetWidth: 1000,
      mimeType: "multipart/form-data",
      params : {fileName: filename}
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      // this.presentToast('Image succesful uploaded.');
      // this.consolelog = JSON.stringify(data);
      // this.consolelog += JSON.stringify(data['response']);
      // this.consolelog += JSON.parse(data['response']).success;

      //  IF FILE IS SUCCESSFULLY UPLOADED
      if(JSON.parse(data['response']).success){
        let serveResponse = JSON.parse(data['response'])
        let alert = this.alertCtrl.create({
          title: 'Your Details',
          message: "Please make sure that the following details are correct. Please update the information if needed.",
          inputs: [
            {
              name: 'fname',
              placeholder: 'Full Name',
              value: this.account.fullName
            },
            {
              name: 'phone',
              placeholder: 'Phone Number',
              type: 'tel',
              value: this.account.phoneNumber
            },
            {
              name: 'address',
              placeholder: 'Address',
              value: this.account.address
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Confirm',
              handler: (data) => {
                if (data.fname.length < 3) {
                  this.generateToast('Enter a valid name');
                  return false;
                }
                if (data.phone.length < 5) {
                  this.generateToast('Enter a valid phone number');
                  return false;
                }
                if (data.address.length < 5) {
                  this.generateToast('Enter a valid address');
                  return false;
                }

                this.account.fullName = data.fname;
                this.account.phoneNumber = data.phone;
                this.account.address = data.address;
                this.userData.saveAccountInfo(this.account);
                alert.dismiss();
                this.loading.present();
                this.consolelog += 'reached:1';
                // console.log(data);

                this.globalService.saveOrderWithPrescription(serveResponse.storedFileName, data).then(response => {
                    // this.consolelog += JSON.stringify(response);
                  if(JSON.parse(response['_body']).success) {
                    this.consolelog += 'reached:2';
                    this.lastImage = null;
                    this.generateToast('Order has been successfully placed. You will be contacted shortly for confirmation on the provided phone number.', 5000, 'middle');
                    this.loading.dismiss();
                  } else {
                    this.generateToast('Unable to place an order')
                  }
                });
                return false;
              }
            }
          ]
        });
        alert.present();

      }
      // this.presentToast(JSON.stringify(data));
      // this.presentToast('');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrescriptionPage');
  }

  generateToast(msg:string='',dur:number=2000, pos:string='bottom') {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: dur,
      position: pos
    });
    toast.present();
  }

}
