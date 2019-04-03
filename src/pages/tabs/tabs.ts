import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {AfiliadosPage} from "../afiliados/afiliados";
import {MapPage} from "../map/map";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AfiliadosPage;
  tab3Root = ContactPage;
  tab4Root = MapPage;

  constructor() {

  }
}
