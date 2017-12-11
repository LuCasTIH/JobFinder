import { Component } from '@angular/core';
import { AlertController, NavController, App } from 'ionic-angular';
import firebase from 'firebase';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { AuthProvider } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { EditPostedJobPage } from '../edit-posted-job/edit-posted-job';
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  followeramount: number;
  followers = [];
  postedjobamount: number;
  jobList = [];
  userphonenumber: any;
  bio: any;
  img: any;
  useremail: any;
  username: any;
  uid: string;
  cata: string;
  constructor(public app: App, public authProvider: AuthProvider, public navCtrl: NavController, public alertCtrl: AlertController) {
    this.cata = 'userInfo';
    this.uid = firebase.auth().currentUser.uid;

  }
  
  ionViewDidLoad() {
    this.LoadUserFollower();
    this.LoadUSerInfo();
    this.LoadUserPostedJobs();
    console.log(this.followers, this.followeramount, this.jobList, this.postedjobamount);
  }

  LoadUSerInfo() {
    firebase.database().ref('/Users').child(this.uid).on('value', snapshot => {
      this.username = snapshot.val().name;
      this.useremail = snapshot.val().email;
      this.userphonenumber = snapshot.val().phonenumber;
      this.bio = snapshot.val().bio;
    });
  }

  LoadUserFollower(){
    firebase.database().ref('/Users').child(this.uid).child('Followers').on('value', snapshot => {
      snapshot.forEach(childsnapshot => {
        this.followers.push(
          childsnapshot.val().uid
        );
        return false;
      });
    });
    this.followeramount = this.followers.length;
  
  }

  LoadUserPostedJobs() {
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


  logOut() {
    this.authProvider.logoutUser();
    this.app.getRootNav().setRoot(LoginPage);
  }


  GoToChangeProfile() {
    this.navCtrl.push(EditProfilePage);
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
            this.LoadUserPostedJobs();
            this.followers =[];
            this.LoadUserFollower();
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
