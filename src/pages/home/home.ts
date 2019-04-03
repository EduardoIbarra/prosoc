import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProgramasService} from "../../services/programas.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  programas;
  adminId: string;
  constructor(public navCtrl: NavController, private programasService: ProgramasService) {
    const loggedUser = JSON.parse(window.localStorage.getItem('logged_user'));
    this.adminId = loggedUser && loggedUser.uid;
    programasService.getForAdmin(this.adminId).valueChanges().subscribe((programas) => {
      console.log(programas);
      this.programas = programas;
    });
  }

}
