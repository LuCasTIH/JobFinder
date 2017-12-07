import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateValidatorProvider } from '../../providers/date-validator/date-validator';

@Component({
  selector: 'page-edit-posted-job',
  templateUrl: 'edit-posted-job.html',
})
export class EditPostedJobPage {


  postedJob = {
    title:'',
    kindofjob:'',
    amount:'',
    address:'',
    salary:'',
    form:'',
    endate:'',
    description:'',
    requirement:''
  };
  jobs = [];
  postJobForm: FormGroup;
  m: any;
  key: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public formBuilder: FormBuilder, private nativeGeocoder: NativeGeocoder, public navParams: NavParams) {
    this.postJobForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      kindofjob: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      salary: ['', Validators.compose([Validators.required])],
      form: ['', Validators.compose([Validators.required])],
      endate: ['', Validators.compose([Validators.required, DateValidatorProvider.isValid])],
      description: ['', Validators.compose([Validators.required])],
      requirement: ['', Validators.compose([Validators.required])]
    });
    this.m = new Date().toISOString();
    this.key= this.navParams.get('param');

  }


  ionViewDidLoad() {
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

    firebase.database().ref('/Jobs').on('value', (snapshot) => {
      snapshot.forEach((childsnapshot) => {
        this.jobs.push(childsnapshot.val().name);
        return false;
      });
    });
  }


  Update() {

    let succedAlert = this.alertCtrl.create({
      message: 'Cập nhật thành công!',
      buttons: ['Ok']
    });
    if (!this.postJobForm.valid) {
      console.log("Nice try!");
    } else {
      this.nativeGeocoder.forwardGeocode(this.postJobForm.value.address)
        .then((coordinates: NativeGeocoderForwardResult) => {
          if (!coordinates) {
            alert("Không lấy được tọa độ!")
          }
          var job = {
            title: this.postJobForm.value.title,
            kindofjob: this.postJobForm.value.kindofjob,
            amount: this.postJobForm.value.amount,
            address: this.postJobForm.value.address,
            salary: this.postJobForm.value.salary,
            form: this.postJobForm.value.form,
            endate: this.postJobForm.value.endate,
            description: this.postJobForm.value.description,
            requirement: this.postJobForm.value.requirement,
            lat: coordinates.latitude,
            lng: coordinates.longitude
          };

          firebase.database().ref('/PostedJobs').child(this.key).update(job).then(() => {
            succedAlert.present();
            this.navCtrl.pop();
          });
        })
        .catch((error: any) => console.log(error));
    }
  }
}