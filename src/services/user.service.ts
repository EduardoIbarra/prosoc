import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class UserService {

  constructor(private angularFireDataBase: AngularFireDatabase) {
  }
  get() {
    return this.angularFireDataBase.list('users/');
  }
  getById(uid) {
    return this.angularFireDataBase.object('users/' + uid);
  }
  add(user) {
    return this.angularFireDataBase.object('/users/' + user.uid).set(user);
  }
  edit(user) {
    return this.angularFireDataBase.object('/users/' + user.uid).set(user);
  }
}
