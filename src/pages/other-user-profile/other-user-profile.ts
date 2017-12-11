import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-other-user-profile',
  templateUrl: 'other-user-profile.html',
})
export class OtherUserProfilePage {
  btnColor: string;
  followeramount: any;
  followers = [];
  postedjobamount: number;
  bio: any;
  jobList = [];
  userphonenumber: any;
  useremail: any;
  username: any;
  uid: string;
  showFollowBtn: boolean;
  isFollow: boolean;
  cata: string;
  otheruid: any;
  img: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.otheruid = this.navParams.get('id');
    this.cata = 'userInfo';
    this.uid = firebase.auth().currentUser.uid;
    this.LoadOtherUSerInfo();
    this.LoadOtherUserFollower();
    this.LoadOtherUserPostedJobs();
  }



  ionViewDidLoad() {
    firebase.database().ref('/Users').child(this.uid).on('value', snapshot => {
      if (snapshot.hasChild('Followee')) {
        if (snapshot.child('Followee').hasChild(this.otheruid)) {
          this.isFollow = true;
          this.btnColor = "green";
          this.showFollowBtn = false;
        } else {
          this.isFollow = false;
          this.btnColor = "red";
          this.showFollowBtn = true;
        }
      } else {
        this.showFollowBtn = true;
        this.btnColor = "red";
        this.isFollow = false;
      }
    });
  }

  LoadOtherUSerInfo() {
    firebase.database().ref('/Users').child(this.otheruid).on('value', snapshot => {
      this.username = snapshot.val().name;
      this.useremail = snapshot.val().email;
      this.userphonenumber = snapshot.val().phonenumber;
      this.bio = snapshot.val().bio;
    });
  }
  LoadOtherUserFollower(){
    this.followers=[];
    firebase.database().ref('/Users').child(this.otheruid).child('Followers').on('value', snapshot => {
      snapshot.forEach(childsnapshot => {
        this.followers.push(
          childsnapshot.val().uid
        );
        return false;
      });
    });
    this.followeramount = this.followers.length;
    console.log(this.followeramount,this.followers);
  }

  LoadOtherUserPostedJobs() {
    firebase.database().ref('/PostedJobs').on('value', snapshot => {
      snapshot.forEach(childsnapshot => {
        if (childsnapshot.val().uid == this.otheruid) {
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

  Follow() {
    firebase.database().ref('/Users').child(this.uid).child('Followee').child(this.otheruid).set({ uid: this.otheruid });
    firebase.database().ref('/Users').child(this.otheruid).child('Followers').child(this.uid).set({ uid: this.uid });
    this.LoadOtherUserFollower();
  }

  UnFollow() {
    firebase.database().ref('/Users').child(this.uid).child('Followee').child(this.otheruid).remove();
    firebase.database().ref('/Users').child(this.otheruid).child('Followers').child(this.uid).remove();
    this.LoadOtherUserFollower();
  }
}
