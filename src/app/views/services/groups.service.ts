import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  getUserGroups(encodedUserEmail: string): Observable<any[]> {
    return this.db.list('/groups', ref =>
      ref.orderByChild(`members/${encodedUserEmail}`).equalTo(true)
    ).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val() as any
        }))
      )
    );
  }

  async createGroup(title: string, ownerEmail: string, memberEmails: string[]): Promise<any> {
    const groupRef = this.db.list('groups').push({
      title: title,
      members: {
        [btoa(ownerEmail)]: true
      }
    });

    const ref = await groupRef;
    const groupId = ref.key;
    const membersUpdates: { [key: string]: boolean; } = {};

    memberEmails.forEach(email => {
      if (email !== ownerEmail) {
        membersUpdates[`groups/${groupId}/members/${btoa(email)}`] = true;
      }
    });

    await this.db.database.ref().update(membersUpdates);

    return ({
      groupId: groupId,
      success: true
    });
  }
}
