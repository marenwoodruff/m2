export class ValidationService {
  static phoneNumberValidator(control) {
        if (control.value.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/) || control.value.match(/^$/)) {
            return null;
        } else {
            return { 'invalidPhoneNumber': true };
        }
    }
}
