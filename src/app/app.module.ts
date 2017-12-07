import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ElasticModule } from 'angular2-elastic';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth';
import { JobDetailsPage } from '../pages/job-details/job-details';
import { SignupWithPhoneNumberPage } from '../pages/signup-with-phone-number/signup-with-phone-number';
import { SignupWithEmailPage } from '../pages/signup-with-email/signup-with-email';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { PostJobsPage } from '../pages/post-jobs/post-jobs';
import { DateValidatorProvider } from '../providers/date-validator/date-validator';
import { JobListPage } from '../pages/job-list/job-list';
import { MapPage } from '../pages/map/map';
import { HistoryPage } from '../pages/history/history';
import { EditPostedJobPage } from '../pages/edit-posted-job/edit-posted-job';

export const config ={
  apiKey: "AIzaSyATI7EYKRY3fQYCKiX38x7kZqi6T6F3Yyg",
  authDomain: "jobfinder-36e68.firebaseapp.com",
  databaseURL: "https://jobfinder-36e68.firebaseio.com",
  projectId: "jobfinder-36e68",
  storageBucket: "jobfinder-36e68.appspot.com",
  messagingSenderId: "312193015035"
};

@NgModule({
  declarations: [
    MyApp,
    PostJobsPage,
    JobListPage,
    MapPage,
    LoginPage,
    TabsPage,
    JobDetailsPage,
    SignupWithPhoneNumberPage,
    SignupWithEmailPage,
    UserProfilePage,
    EditProfilePage,
    HistoryPage,
    EditPostedJobPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    ElasticModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PostJobsPage,
    JobListPage,
    MapPage,
    TabsPage,
    LoginPage,
    TabsPage,
    JobDetailsPage,
    SignupWithPhoneNumberPage,
    SignupWithEmailPage,
    UserProfilePage,
    EditProfilePage,
    HistoryPage,
    EditPostedJobPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    NativeGeocoder,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DateValidatorProvider,
    AuthProvider
  ]
})
export class AppModule { }
