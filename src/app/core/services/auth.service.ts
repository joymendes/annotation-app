import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of, switchMap, take } from 'rxjs';

import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user$ = this.afAuth.authState;
  }

  async signInWithGoogle() {
    try {
      const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

      if (result.user) {
        await this.saveUser(result.user);
      } else {
        console.error('No user data available after sign-in.');
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  private async saveUser(user: firebase.User) {
    const userRef = this.db.object(`users/${user.uid}`);
    const userExists = await userRef.valueChanges().pipe(take(1)).toPromise();

    if (!userExists) {
      await userRef.set({
        uid: user.uid,
        email: user.email || null,
        displayName: user?.displayName,
        photoURL: user?.photoURL
      });
    }
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      throw error;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable((observer) => {
      this.afAuth.authState.subscribe(user => {
        observer.next(!!user);
      }, err => {
        observer.error(err);
      });
    });
  }
}
