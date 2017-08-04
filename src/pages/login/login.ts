import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = '';
  password = '';

  authFailed = false;

  constructor(public navCtrl: NavController, private auth: AuthProvider) {
    
  }

  logForm() {
    this.auth.authenticate(this.user, this.password)
      .subscribe(
        () => console.log('ok'),
        () => this.authFailed = true
      );
  }
}
