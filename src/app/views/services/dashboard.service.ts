import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';

import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private db: AngularFireDatabase) { }

  getNotes(uid: string): Observable<any[]> {
    return this.db.list(`/users/${uid}/notes`).snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  async addNote(uid: string, noteContent: string): Promise<any> {
    const noteRef = this.db.list(`/users/${uid}/notes`);

    return noteRef.push({
      content: noteContent,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
  }

  async deleteNote(userId: string, noteId: string): Promise<void> {
    try {
      await this.db.object(`/users/${userId}/notes/${noteId}`).remove();
    } catch (error) {
      throw error;
    }
  }
}
