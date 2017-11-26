import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidatorProvider } from '../../providers/date-validator/date-validator';

@Component({
  selector: 'page-post-jobs',
  templateUrl: 'post-jobs.html',
})
export class PostJobsPage {

  jobs = [];
  postJobForm: FormGroup;
  m: any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public formBuilder: FormBuilder) {
    this.postJobForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      kindofjob: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      salary: ['', Validators.compose([Validators.required])],
      form: ['', Validators.compose([Validators.required])],
      endate: ['', Validators.compose([Validators.required, DateValidatorProvider.isValid])],
      description: ['', Validators.compose([Validators.required])]
    });
    this.m = new Date().toISOString();

  }

  ionViewDidLoad() {
    firebase.database().ref('/Jobs').once('value', (snapshot) => {
      snapshot.forEach((childsnapshot) => {
        this.jobs.push(childsnapshot.val().name);
        return false;
      });
    });
  }

  Post() {

    let succedAlert = this.alertCtrl.create({
      message: 'Đăng thành công!',
      buttons: ['Ok']
    });
    if (!this.postJobForm.valid){
      console.log("Nice try!");
    } else {
    var job = {
      title: this.postJobForm.value.title,
      kindofjob: this.postJobForm.value.kindofjob,
      amount: this.postJobForm.value.amount,
      address: this.postJobForm.value.address,
      salary: this.postJobForm.value.salary,
      form: this.postJobForm.value.form,
      endate: this.postJobForm.value.endate,
      description: this.postJobForm.value.description
    };
    firebase.database().ref('/PostedJobs').push(job).then(() => {
      succedAlert.present();
      this.postJobForm.reset();
    });
  }
  }




}
