import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { PostJobsPage } from '../pages/post-jobs/post-jobs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';
import { AngularFireModule } from "angularfire2";
import { JobListPage } from '../pages/job-list/job-list';


export const config = {
  apiKey: "AIzaSyATI7EYKRY3fQYCKiX38x7kZqi6T6F3Yyg",
  authDomain: "jobfinder-36e68.firebaseapp.com",
  databaseURL: "https://jobfinder-36e68.firebaseio.com",
  projectId: "jobfinder-36e68",
  storageBucket: "jobfinder-36e68.appspot.com",
  messagingSenderId: "312193015035"
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = JobListPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
    firebase.initializeApp(config);
    AngularFireModule.initializeApp(config);
    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: PostJobsPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
