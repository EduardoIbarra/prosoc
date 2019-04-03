import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  password: 'aoeaoe';
  password2: 'aoeaoe';
  email: 'aoe@aoe.aoe';
  name: 'Eduardo';
  operation: string = 'login';
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthenticationService, public userService: UserService, private toastCtrl: ToastController) {
    this.authService.getStatus().subscribe((data) => {
      if(data) {
        this.navCtrl.setRoot(TabsPage);
      }
    }, (error) => {
      console.log(error);
    });
  }
  registerWithEmail() {
    if(this.password !== this.password2) {
      alert('Las contraseñas no coinciden');
      return;
    }
    this.authService.registerWithEmail(this.email, this.password).then((data) => {
      const user = {
        name: this.name,
        email: this.email,
        uid: data.user.uid,
        active: true
      };
      this.userService.add(user).then((data) => {
        let toast = this.toastCtrl.create({
          message: 'Usuario registrado con éxito',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.operation = 'login';
        console.log(data);
      }).catch((error) => {
        alert('Ocurrió un error');
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }
  loginWithEmail() {
    this.authService.loginWithEmail(this.email, this.password).then((data) => {
      console.log(data);
      let toast = this.toastCtrl.create({
        message: 'Bienvenido',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.setRoot(TabsPage);
    }).catch((error) => {
      alert('Ocurrió un error');
      console.log(error);
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goToHome() {
    this.navCtrl.setRoot(TabsPage);
  }
  backToHome() {
    this.navCtrl.pop();
  }

}
