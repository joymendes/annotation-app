import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private db: AngularFireDatabase) { }

  getNotes(uid: string) {
    return this.db.list('notes', ref => ref.orderByChild('uid').equalTo(uid))
    .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any })
        )
      )
    )
  }

  async addNote(uid: string, noteContent: string, groupId?: string): Promise<any> {
    const noteRef = this.db.list(`/notes`);

    const noteData: any = {
      content: noteContent,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      uid: uid
    };

    if (groupId) {
      noteData.groupId = groupId;
    }

    return noteRef.push(noteData);
  }

  async deleteNote(noteId: string): Promise<void> {
    try {
      await this.db.object(`/notes/${noteId}`).remove();
    } catch (error) {
      throw error;
    }
  }
}
