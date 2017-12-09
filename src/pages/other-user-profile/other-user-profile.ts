import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-other-user-profile',
  templateUrl: 'other-user-profile.html',
})
export class OtherUserProfilePage {
  bio: any;
  jobList=[];
  userphonenumber: any;
  useremail: any;
  username: any;
  uid: string;
  showEditBtn: boolean;
  cata: string;
  otheruid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.otheruid = this.navParams.get('id');
    this.cata = 'userInfo';
    this.showEditBtn = true;
    this.uid = firebase.auth().currentUser.uid;
    firebase.database().ref('/Users').child(this.uid).on('value', snapshot => {
      this.username = snapshot.val().name;
      this.useremail = snapshot.val().email;
      this.userphonenumber = snapshot.val().phonenumber;
      this.bio = snapshot.val().bio;
      return false;
    });
    this.Load();
  }

  Load() {
    firebase.database().ref('/PostedJobs').on('value', snapshot => {
      snapshot.forEach(childsnapshot => {
        if (childsnapshot.val().uid == this.uid) {
          var str = childsnapshot.val().endate;
          var year = str.slice(0, 4);
          var month = str.slice(5, 7);
          var day = str.slice(8, 10);
          var endatestr = day + "/" + month + "/" + year;
          this.jobList.push({
            key: childsnapshot.key,
            title: childsnapshot.val().title,
            kindofjob: childsnapshot.val().kindofjob,
            amount: childsnapshot.val().amount,
            address: childsnapshot.val().address,
            salary: childsnapshot.val().salary,
            form: childsnapshot.val().form,
            endate: endatestr,
            description: childsnapshot.val().description
          });
        }

        return false;
      });
    });
    this.postedjobamount = this.jobList.length;

  }
}
