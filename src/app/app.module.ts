import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ProgramasService} from "../services/programas.service";

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AfiliadosService } from "../services/afiliados.service";
import {AuthenticationService} from "../services/authentication.service";
import {LoginPage} from "../pages/login/login";
import {UserService} from "../services/user.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AfiliadosPage} from "../pages/afiliados/afiliados";
import {MapPage} from "../pages/map/map";

export const firebaseConfig = {
  apiKey: "AIzaSyAJkFoWO68gjPO3bdN3CMs8mr9J1KbdSRU",
  authDomain: "programas-sociales-6619b.firebaseapp.com",
  databaseURL: "https://programas-sociales-6619b.firebaseio.com",
  projectId: "programas-sociales-6619b",
  storageBucket: "programas-sociales-6619b.appspot.com",
  messagingSenderId: "439873107789"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    AfiliadosPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    AfiliadosPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProgramasService,
    AngularFirestore,
    AuthenticationService,
    AfiliadosService,
    UserService,
    Geolocation
  ]
})
export class AppModule {}
