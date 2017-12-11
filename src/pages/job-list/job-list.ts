import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { MapPage } from '../map/map';
import { JobDetailsPage } from '../job-details/job-details';
import { AuthProvider } from '../../providers/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-job-list',
  templateUrl: 'job-list.html',
})
export class JobListPage {
  p: any;
  jobList = [];
  loadedJobsList = [];
  kindOfJob = [];
  kindofjob:any;
  uid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
    this.p = this.navParams.get('param');
    if (this.p) {
      this.kindofjob= this.p;
    }
    this.uid= firebase.auth().currentUser.uid;
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
        if(this.uid!= childsnapshot.val().uid){
        let datenow = new Date().toISOString();
        if (childsnapshot.val().endate >= datenow) {
          var str = childsnapshot.val().endate;
          var year = str.slice(0, 4);
          var month = str.slice(5, 7);
          var day = str.slice(8, 10);
          var endatestr = day + "/" + month + "/" + year;
          jobs.push({
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
      }
      });
      this.jobList = jobs;
      this.loadedJobsList = jobs;
    });
  }

  LoadJobByKind(value) {
    firebase.database().ref('/PostedJobs').on('value', snapshot => {
      let jobs = [];
      snapshot.forEach(childsnapshot => {
        let datenow = new Date().toISOString();
        if(this.uid!= childsnapshot.val().uid){
        if (childsnapshot.val().endate >= datenow) {
          if (childsnapshot.val().kindofjob == value) {
            var str = childsnapshot.val().endate;
            var year = str.slice(0, 4);
            var month = str.slice(5, 7);
            var day = str.slice(8, 10);
            var endatestr = day + "/" + month + "/" + year;
            jobs.push({
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
        }
        return false;
      }
      });
      this.jobList = jobs;
      this.loadedJobsList = jobs;
    });
  }

  onSelectChange(selectedvalue) {
    if (selectedvalue == 0) {
      this.jobList.splice(0, this.jobList.length);
      this.loadedJobsList.splice(0, this.loadedJobsList.length);
      this.LoadAllJob();
    } else {
      this.jobList.splice(0, this.jobList.length);
      this.loadedJobsList.splice(0, this.loadedJobsList.length);
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
