import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Afiliado} from "../../models/afiliado.model";
import {AfiliadosService} from "../../services/afiliados.service";
import {AboutPage} from "../about/about";

@Component({
  selector: 'page-afiliados',
  templateUrl: 'afiliados.html'
})
export class AfiliadosPage {
  afiliados;
  adminId: string;
  constructor(public navCtrl: NavController, private afiliadosService: AfiliadosService) {
    const loggedUser = JSON.parse(window.localStorage.getItem('logged_user'));
    this.adminId = loggedUser && loggedUser.uid;
    this.afiliados = this.afiliadosService.getForAdmin(this.adminId).valueChanges();
  }
  add() {
    this.navCtrl.push(AboutPage);
  }
  edit(record) {
    this.navCtrl.push(AboutPage, {'record': record});
  }
}
