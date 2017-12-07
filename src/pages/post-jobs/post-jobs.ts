import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementRef, HostListener, Directive } from '@angular/core';
import { DateValidatorProvider } from '../../providers/date-validator/date-validator';

@Component({
  selector: 'page-post-jobs',
  templateUrl: 'post-jobs.html',
})
@Directive({
  selector: 'ion-textarea[autosize]'
})

export class PostJobsPage {


  jobs = [];
  postJobForm: FormGroup;
  m: any;

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public formBuilder: FormBuilder, private nativeGeocoder: NativeGeocoder, public element: ElementRef) {
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

  }

  ngOnInit(): void {
    setTimeout(() => this.adjust(), 2);
  }

  adjust(): void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + "px";
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

          firebase.database().ref('/PostedJobs').push(job).then(() => {
            succedAlert.present();
            this.postJobForm.reset();
          });
        })
        .catch((error: any) => console.log(error));
    }
  }




}
