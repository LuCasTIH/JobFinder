import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import firebase from 'firebase';
// import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';


// export const config = {
//   apiKey: "AIzaSyATI7EYKRY3fQYCKiX38x7kZqi6T6F3Yyg",
//   authDomain: "jobfinder-36e68.firebaseapp.com",
//   databaseURL: "https://jobfinder-36e68.firebaseio.com",
//   projectId: "jobfinder-36e68",
//   storageBucket: "jobfinder-36e68.appspot.com",
//   messagingSenderId: "312193015035"
// };
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    afAuth: AngularFireAuth
  ) {

    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = TabsPage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });

    this.initializeApp();
    // firebase.initializeApp(config);
    // set our app's pages
    // this.pages = [
    //   { title: 'Hello Ionic', component: HelloIonicPage },
    //   { title: 'My First List', component: PostJobsPage },
    //   { title: 'Map', component: MapPage }
    // ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // openPage(page) {
  //   // close the menu when clicking a link from the menu
  //   this.menu.close();
  //   // navigate to the new page if it is not the current page
  //   this.nav.setRoot(page.component);
  // }
}
