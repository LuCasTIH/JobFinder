import { FormControl } from '@angular/forms';
export class DateValidatorProvider {

  constructor() {

  }
  static isValid(control: FormControl): any {

    let datenow = new Date().toISOString();
    if (control.value >= datenow) { return null; }

    return { "notOldEnough": true };

  }

}
