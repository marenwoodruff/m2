export class ValidationService {

  static getValidatorErrorMessage(code: string) {
        let config = {
            'required': 'Required',
            'invalidPhoneNumber': 'Invalid phone number format',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.'
        };
        return config[code];
    }

  static phoneNumberValidator(control) {
        if (control.value.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/) || control.value.match(/^$/)) {
            return null;
        } else {
            return { 'invalidPhoneNumber': true };
        }
    }

  static passwordValidator(control) {
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
        return null;
    } else {
        return { 'invalidPassword': true };
    }
  }

  static emailValidator(control) {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
  }
}
