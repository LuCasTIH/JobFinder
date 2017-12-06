
import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  Loading,
  AlertController,
  App
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth';

import { EmailValidator } from '../../providers/email';
// import { LoginPage } from '../login/login';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-signup-with-email',
  templateUrl: 'signup-with-email.html',
})
export class SignupWithEmailPage {

  public signupForm: FormGroup;
  public loading: Loading;
  constructor(public nav: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public app: App) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }


  Signup() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
        .then(() => {
          this.app.getRootNav().setRoot(LoginPage);
        }, (error) => {
          this.loading.dismiss().then(() => {
            var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
}
