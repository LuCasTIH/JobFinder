import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { MapPage } from '../map/map';
import { JobDetailsPage } from '../job-details/job-details';
import { AuthProvider } from '../../providers/auth';

@Component({
  selector: 'page-job-list',
  templateUrl: 'job-list.html',
})
export class JobListPage {

  public jobList = [];
  public loadedJobsList = [];
  kindOfJob = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {

  }

  logOut(){
    this.auth.logoutUser();
    console.log("thoat");
}

  ionViewDidLoad() {
    firebase.database().ref('/Jobs').once('value', (snapshot) => {
      snapshot.forEach((childsnapshot) => {
        this.kindOfJob.push(childsnapshot.val().name);
        return false;
      });
    });
    this.LoadAllJob();
  }

  LoadAllJob() {
    firebase.database().ref('/PostedJobs').on('value', snapshot => {
      let jobs = [];
      snapshot.forEach(childsnapshot => {
        jobs.push({
          key: childsnapshot.key,
          title: childsnapshot.val().title,
          kindofjob: childsnapshot.val().kindofjob,
          amount: childsnapshot.val().amount,
          address: childsnapshot.val().address,
          salary: childsnapshot.val().salary,
          form: childsnapshot.val().form,
          endate: childsnapshot.val().endate,
          description: childsnapshot.val().description
        });
        return false;
      });
      this.jobList = jobs;
      this.loadedJobsList = jobs;
    });
  }

  LoadJobByKind(value) {
    firebase.database().ref('/PostedJobs').on('value', snapshot => {
      let jobs = [];
      snapshot.forEach(childsnapshot => {
        if (childsnapshot.val().kindofjob == value) {
          jobs.push({
            key: childsnapshot.key,
            title: childsnapshot.val().title,
            kindofjob: childsnapshot.val().kindofjob,
            amount: childsnapshot.val().amount,
            address: childsnapshot.val().address,
            salary: childsnapshot.val().salary,
            form: childsnapshot.val().form,
            endate: childsnapshot.val().endate,
            description: childsnapshot.val().description
          });
        }
        return false;
      });
      this.jobList = jobs;
      this.loadedJobsList = jobs;
    });
  }

  onSelectChange(selectedvalue) {
    if (selectedvalue == 0) {
      this.jobList.splice(0);
      this.loadedJobsList.splice(0);
      this.LoadAllJob();
    } else {
      this.jobList.splice(0);
      this.loadedJobsList.splice(0);
      this.LoadJobByKind(selectedvalue);
    }
  }

  initializeItems(): void {
    this.jobList = this.loadedJobsList;
  }

  getItems(searchbar) {
    this.initializeItems();

    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }

    this.jobList = this.jobList.filter((v) => {
      if (v.title && q) {
        if (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  GoToDetail(key) {
    this.navCtrl.push(JobDetailsPage, { param: key });
  }

  GoToMap() {
    this.navCtrl.push(MapPage);
  }

}
