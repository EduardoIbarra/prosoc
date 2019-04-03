import {Injectable} from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import {Programa} from "../models/programa.model";

@Injectable()
export class ProgramasService {
  constructor(private angularFirestore: AngularFirestore) {}
  NODE_NAME: string = 'programas';
  save(programa: Programa, adminId: string) {
    return this.angularFirestore.doc(`admins/${adminId}/${this.NODE_NAME}/${programa.id}`).set(programa);
  }
  getForAdmin(adminId: string) {
    return this.angularFirestore.collection(`admins/${adminId}/${this.NODE_NAME}`);
  }
}
