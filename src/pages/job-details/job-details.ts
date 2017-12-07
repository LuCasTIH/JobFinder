import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { UserProfilePage } from '../user-profile/user-profile';
import { JobListPage } from '../job-list/job-list';

@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
})
export class JobDetailsPage {
  user={
    name:'',
    phonenumber:''
  };
  key: any;
  userId: any;
  postedJob = {
    title: '',
    kindofjob: '',
    amount: '',
    address: '',
    salary: '',
    form: '',
    endate: '',
    description: '',
    requirement: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.key = this.navParams.get("param");
  }

  ionViewDidLoad() {
    this.userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/Users').child(this.userId).on('value',(snapshot)=>{
      this.user.name = snapshot.val().name;
      this.user.phonenumber= snapshot.val().phonenumber;
    });


    firebase.database().ref('/PostedJobs').child(this.key).on('value', (snapshot) => {
      this.postedJob.title = snapshot.val().title,
        this.postedJob.kindofjob = snapshot.val().kindofjob,
        this.postedJob.amount = snapshot.val().amount,
        this.postedJob.address = snapshot.val().address,
        this.postedJob.salary = snapshot.val().salary,
        this.postedJob.form = snapshot.val().form,
        this.postedJob.endate = snapshot.val().endate,
        this.postedJob.description = snapshot.val().description,
        this.postedJob.requirement = snapshot.val().requirement
      return false;

    });
  }

  GoToUserProfile(userId) {
    this.navCtrl.push(UserProfilePage, { id: userId });
  }

  GoToJobList(kindofjob){
    this.navCtrl.push(JobListPage,{param: kindofjob})
  }

}
