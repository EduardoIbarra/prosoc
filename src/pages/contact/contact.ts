import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthenticationService} from "../../services/authentication.service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  loggedUser;
  constructor(public navCtrl: NavController, private authenticationService: AuthenticationService) {
    this.loggedUser = JSON.parse(window.localStorage.getItem('logged_user'));
  }

  logout() {
    this.authenticationService.logOut().then((data) => {
      window.localStorage.removeItem('logged_user');
      this.navCtrl.setRoot(LoginPage);
    }).catch((error) => {
      console.log(error);
    });
  }

}
