import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'page-job-list',
  templateUrl: 'job-list.html',
})
export class JobListPage {

  public jobList = [];
  public loadedJobsList = [];
  kindOfJob = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.LoadAllJob();
  }

  ionViewDidLoad(kindofjob) {
    firebase.database().ref('/Jobs').once('value', (snapshot) => {
      snapshot.forEach((childsnapshot) => {
        this.kindOfJob.push(childsnapshot.val().name);
        return false;
      });
    });
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

  LoadJobByKind(value){
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
    // Reset items back to all of the items
    this.initializeItems();
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
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

  GoToDetail(key){
    this.navCtrl.push(ItemDetailsPage, {param: key});
  }

}
