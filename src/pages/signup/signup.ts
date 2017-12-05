
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupWithPhoneNumberPage } from '../signup-with-phone-number/signup-with-phone-number';
import { SignupWithEmailPage } from '../signup-with-email/signup-with-email';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(public navCtrl: NavController) {}

  goToSignupWithEmail(){
    this.navCtrl.push(SignupWithEmailPage);
  }

  goToSignupWithPhoneNumber(){
    this.navCtrl.push(SignupWithPhoneNumberPage);
  }

}