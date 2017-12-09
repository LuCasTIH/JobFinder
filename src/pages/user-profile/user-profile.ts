import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { EditPostedJobPage } from '../edit-posted-job/edit-posted-job';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { AuthProvider } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  cata: string;
  bio: any;
  // followers = [];
  uid: string;
  otheruid: any;
  // isFollow: boolean;
  userphonenumber: any;
  useremail: any;
  username: any;
  jobList = [];
  // btnColor: any;
  // showFollowBtn: any;
  showEditBtn: boolean;
  followeramount = 0;
  postedjobamount = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public auth: AngularFireAuth) {
    // this.showFollowBtn = this.navParams.get('showFollowBtn');
    // if(this.showEditBtn==false){
    //   this.otheruid = this.navParams.get('id');
    //   }

    // this.btnColor = "red";
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

  logOut() {
    firebase.auth().signOut();
    this.navCtrl.setRoot(LoginPage);
    console.log("thoat");
  }



  ionViewDidLoad() {
    // if (this.otheruid != this.uid) {
    //   // this.showEditBtn = false;
    //   // this.showFollowBtn = true;
    //   firebase.database().ref('/Users').child(this.otheruid).on('value', snapshot => {
    //     this.username = snapshot.val().name;
    //     this.useremail = snapshot.val().email;
    //     this.userphonenumber = snapshot.val().phonenumber;
    //     return false;
    //   });
    // } else {
    //   this.showEditBtn = true;
    //   this.showFollowBtn = false;
    //   this.GetUser();
    //   firebase.database().ref('/Users').child(this.otheruid).child("Followers").once('value', snapshot => {
    //     snapshot.forEach(childsnapshot => {
    //       this.followers.push({ fluid: childsnapshot.val().followeruid });
    //       return false;
    //     });
    //   }).then(() => {
    //     this.followeramount = this.followers.length;
    //   });
    // }
    // if(this.uid == this.otheruid)
    // {
    // console.log('bang nhau');

    // }
    // else{
    //   firebase.database().ref('/Users').child(this.otheruid).on('value', snapshot => {
    //     this.username = snapshot.val().name;
    //     this.useremail = snapshot.val().email;
    //     this.userphonenumber = snapshot.val().phonenumber;
    //     return false;
    //   });
    // }

  }

  // GetUser() {

  //   firebase.database().ref('/Users').child(this.uid).on('value', snapshot => {
  //     this.username = snapshot.val().name;
  //     this.useremail = snapshot.val().email;
  //     this.userphonenumber = snapshot.val().phonenumber;
  //     return false;
  //   });
  // }


  // Follow() {
  //   firebase.database().ref('/Users').child(this.otheruid).child('Followers').push({ followeruid: this.uid }).then(() => {
  //     this.showFollowBtn = false;
  //     this.isFollow = true;
  //   });
  // }

  GoToChangeProfile() {
    this.navCtrl.push(EditProfilePage);
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

  DeleteJob(key) {

    let prompt = this.alertCtrl.create({
      subTitle: 'Xóa xe này ?',
      buttons: [
        {
          text: "Hủy",
          role: "cancel"
        },
        {
          text: "Xóa",
          handler: data => {
            firebase.database().ref("/PostedJobs").child(key).remove();
            this.jobList = [];
            this.Load();
          }
        }

      ]
    });
    prompt.present();

  }

  GoToEditPostedJob(key) {
    this.navCtrl.push(EditPostedJobPage, { param: key });
  }
}
