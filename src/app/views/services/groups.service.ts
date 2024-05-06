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

  getUserGroups(uid: string): Observable<any[]> {
    return this.db.list('/groups', ref =>
      ref.orderByChild(`members/${uid}`).equalTo(true)
    ).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val() as any
        }))
      )
    );
  }

  getNotesByGroup(groupId: string): Observable<any[]> {
    return this.db.list('notes', ref => ref.orderByChild('groupId').equalTo(groupId))
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any })
        )
      )
    );
  }

  async createGroup(title: string, ownerEmail: string, memberEmails: string[]): Promise<any> {

    const ownerSnapshot = await this.db.database.ref('users').orderByChild('email').equalTo(ownerEmail).once('value');
    const ownerId = Object.keys(ownerSnapshot.val())[0];

    const membersUpdates: { [key: string]: boolean } = {};
    membersUpdates[ownerId] = true;

    for (const email of memberEmails) {
      if (email !== ownerEmail) {
        const memberSnapshot = await this.db.database.ref('users').orderByChild('email').equalTo(email).once('value');
        if (!memberSnapshot.exists()) {
          throw new Error(`Usuário não encontrado: ${email}`);
        }
        const memberId = Object.keys(memberSnapshot.val())[0];
        membersUpdates[memberId] = true;
      }
    }

    const groupRef = await this.db.list('groups').push({
      title: title,
      members: membersUpdates
    });

    const groupId = groupRef.key;
    const groupMembersUpdate: any = {};

    Object.keys(membersUpdates).forEach(memberId => {
      groupMembersUpdate[`groups/${groupId}/members/${memberId}`] = true;
    });
    await this.db.database.ref().update(groupMembersUpdate);

    return {
      groupId: groupId,
      success: true
    };
  }

  getNoteById(noteId: string): Observable<any> {
    return this.db.object(`notes/${noteId}`).snapshotChanges().pipe(
      map((snapshot: any) => ({
        key: snapshot.key,
        ...snapshot.payload.val()
      }))
    );
  }

  getUserByUid(uid: string): Observable<any> {
    return this.db.object(`users/${uid}`).valueChanges();
  }

  async addComment(payload: any): Promise<void> {
    const commentRef = this.db.list(`notes/${payload.noteId}/comments`);
    await commentRef.push(payload);
  }

  getComments(noteId: string): Observable<any[]> {
    return this.db.list(`notes/${noteId}/comments`, ref => ref.orderByChild('timestamp').limitToLast(100)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => c.payload.val()).reverse()
      )
    );
  }

  async deleteGroup(groupId: string) {
    await this.db.database.ref(`groups/${groupId}`).remove();
  }

  async deleteNotesByGroupId(groupId: string) {
    const notesSnapshot = await this.db.database.ref('notes').orderByChild('groupId').equalTo(groupId).once('value');
    if (notesSnapshot.exists()) {
      const notes = notesSnapshot.val();
      for (const noteId in notes) {
        await this.db.database.ref(`notes/${noteId}`).remove();
      }
    }
  }
}
