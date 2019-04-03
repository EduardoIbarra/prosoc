import {Injectable} from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import {Afiliado} from "../models/afiliado.model";

@Injectable()
export class AfiliadosService {
  constructor(private angularFirestore: AngularFirestore) {}
  NODE_NAME: string = 'afiliados';
  save(afiliado: Afiliado, adminId: string) {
    return this.angularFirestore.doc(`admins/${adminId}/${this.NODE_NAME}/${afiliado.id}`).set(afiliado);
  }
  getForAdmin(adminId: string) {
    return this.angularFirestore.collection(`admins/${adminId}/${this.NODE_NAME}`);
  }
}
