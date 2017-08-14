import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { VideosPage } from '../pages/videos/videos';
import { AuthProvider } from '../providers/auth/auth';
import { UserModel } from './models/user.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string, component: any}> = [];
  user: UserModel;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private auth: AuthProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.auth.userEvent.subscribe((user: UserModel) => {
        if (user) {
          this.rootPage = VideosPage;
          this.pages = [
            { title: 'Vidéos', component: VideosPage }
          ];          
        } else {
          this.rootPage = LoginPage;
          this.pages = [
            { title: 'Connexion', component: LoginPage }
          ];          
        }
        this.user = user;
        this.splashScreen.hide();
      })
    });
  }

  openPage(component) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
    this.auth.logout()
      .subscribe(
        () => {},
        () => this.auth.user = undefined
      );
  }
}
