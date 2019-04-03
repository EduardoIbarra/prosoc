import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authenticationService: AuthenticationService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    authenticationService.getStatus().subscribe((data) => {
      if(!data) {
        this.nav.setRoot(LoginPage);
      } else {
        this.nav.setRoot(TabsPage);
        window.localStorage.setItem('logged_user', JSON.stringify(data));
      }
    }, (error) => {
      console.log(error);
    });
  }
}
