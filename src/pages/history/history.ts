import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { EditPostedJobPage } from '../edit-posted-job/edit-posted-job';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  jobList = [];
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.Load();
  }

  Load() {

    firebase.database().ref('/PostedJobs').on('value', snapshot => {
      snapshot.forEach(childsnapshot => {
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
        return false;
      });
    });

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
