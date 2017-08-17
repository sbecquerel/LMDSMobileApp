import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = '';
  password = '';

  authFailed = false;

  constructor(
    public navCtrl: NavController, 
    private auth: AuthProvider, 
    private loadingCtrl: LoadingController) {    
  }

  logForm() {
    let loader = this.loadingCtrl.create({
      content: "Merci de patienter..."
    });
    loader.present();    
    this.auth.authenticate(this.user, this.password)
      .subscribe(
        () => {
          loader.dismiss();
        },
        () => {
          loader.dismiss();
          this.authFailed = true
        }
      );
  }
}
