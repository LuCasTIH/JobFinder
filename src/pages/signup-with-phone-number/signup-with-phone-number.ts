
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
@Component({
  selector: 'page-signup-with-phone-number',
  templateUrl: 'signup-with-phone-number.html',
})
export class SignupWithPhoneNumberPage {


  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

  }


  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function (response) {
      }
    });
  }

  signIn(phonenumber) {
    const appVerifier = this.recaptchaVerifier;
    console.log(phonenumber);
    const phoneNumberString = "+84" + phonenumber;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(confirmationResult => {
        loading.present();
        let prompt = this.alertCtrl.create({
          title: 'Nhập mã xác nhận',
          inputs: [{ name: 'confirmationCode' }],
          buttons: [
            {
              text: 'Hủy',
              handler: data => {
                loading.dismiss();
              }
            },
            {
              text: 'Ok',
              handler: data => {
                confirmationResult.confirm(data.confirmationCode)
                  .then((newUser) => {
                    var ref =  firebase.database().ref('/Users');
                    ref.on('value', snapshot=>{
                      if(snapshot.hasChild(newUser.user.uid)){
                        loading.dismiss();
                        this.navCtrl.setRoot(TabsPage);
                      }else{
                        ref.child(newUser.user.uid).set({phonenumer: phonenumber,
                        name: phonenumber
                        }).then(()=>{
                          loading.dismiss();
                          this.navCtrl.setRoot(TabsPage);
                        });
                      }
                    });
                  });
              }
            }
          ]
        });
        prompt.present();
      })
      .catch(function (error) {
        console.error("SMS not sent", error);
      });

  }

}
