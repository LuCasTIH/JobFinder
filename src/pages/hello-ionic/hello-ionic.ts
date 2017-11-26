import { Component } from '@angular/core';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  myDate: String = new Date().toISOString();
  constructor() {

    console.log(this.myDate);
  }

  

}