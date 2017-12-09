import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  userbio: any;
  uid: string;

  userphonenumber: any;

  username: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.uid = firebase.auth().currentUser.uid;
  }

  ionViewDidLoad() {
    firebase.database().ref('/Users').child(this.uid).on('value', snapshot => {
      this.username = snapshot.val().name;
      this.userbio = snapshot.val().bio;
      this.userphonenumber = snapshot.val().phonenumber;
      return false;
    });
  }

  Update() {
    firebase.database().ref('/Users').child(this.uid).update({
      name: this.username,
      phonenumber: this.userphonenumber,
      bio: this.userbio
    }).then(()=>{
      this.navCtrl.pop();
    });

  }

}
