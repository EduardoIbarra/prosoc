import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Afiliado} from "../../models/afiliado.model";
import {AfiliadosService} from "../../services/afiliados.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {ProgramasService} from "../../services/programas.service";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  afiliado: Afiliado = {
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    edad: 0,
    fecha_nacimiento: 0
  };
  adminId: string;
  programas;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  coords: any;
  constructor(public navCtrl: NavController,
              private afiliadosService: AfiliadosService,
              private geolocation: Geolocation,
              public navParams: NavParams,
              private programasService: ProgramasService,
              private toastController: ToastController
  ) {
    const loggedUser = JSON.parse(window.localStorage.getItem('logged_user'));
    this.adminId = loggedUser && loggedUser.uid;
    this.afiliado = this.navParams.get('record');
    if(!this.afiliado) this.initAfiliado();
    programasService.getForAdmin(this.adminId).valueChanges().subscribe((programas) => {
      console.log(programas);
      this.programas = programas;
    });
    window.setTimeout(() => {
      this.loadMap();
    }, 400)
    this.geolocation.getCurrentPosition().then((resp) => {
      this.afiliado.geolocation = {lat: resp.coords.latitude, lng: resp.coords.longitude};
      console.log(resp.coords);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.coords = data.coords;
      console.log(data.coords);
    });
  }
  loadMap() {
    if (!this.coords) {
      return;
    }
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.coords.latitude,
          lng: this.coords.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map', mapOptions);
    let marker: Marker = this.map.addMarkerSync({
      title: 'Dirección del Usuario',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.coords.latitude,
        lng: this.coords.longitude
      },
      draggable: true
    });
    this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe((data) => {
      console.log(data);
      console.log(data.target);
      marker.setPosition({
        lat: data.target.lat,
        lng: data.target.lon
      });
    });
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((data) => {
      marker.setPosition(data[0]);
      this.afiliado.geolocation = data[0];
      const toast = this.toastController.create({message: 'Ubicación cambiada correctamente', duration: 4000, position: 'bottom'});
      console.log(this.afiliado);
      toast.present();
    });
  }
  initAfiliado() {
    this.afiliado = {
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      edad: null,
      fecha_nacimiento: null
    };
  }
  save() {
    this.afiliado.id = this.afiliado.id || Date.now();
    this.afiliado.programas = this.programas.filter((programa) => programa.selected);
    this.afiliadosService.save(this.afiliado, this.adminId).then((data) => {
      console.log(data);
      alert('Afiliado con éxito');
      this.navCtrl.pop();
    }).catch((error) => {
      alert('No se pudo afiliar');
      console.log(error);
    });
  }
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
