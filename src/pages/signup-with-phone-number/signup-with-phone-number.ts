
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-signup-with-phone-number',
  templateUrl: 'signup-with-phone-number.html',
})
export class SignupWithPhoneNumberPage {

  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) { }


  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  signIn(phoneNumber: number) {
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+84" + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(confirmationResult => {

        let prompt = this.alertCtrl.create({
          title: 'Nhập mã xác nhận',
          inputs: [{ name: 'confirmationCode' }],
          buttons: [
            {
              text: 'Hủy',
              role: 'cancel'
            },
            {
              text: 'Ok',
              handler: data => {
                confirmationResult.confirm(data.confirmationCode)
                  .then((newUser) =>{
                    console.log(newUser);
                    firebase.database().ref('/Users').child(newUser.user.uid).set({ phonenumber: phoneNumber });
                    this.navCtrl.setRoot(TabsPage);
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
