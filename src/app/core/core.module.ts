import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { env } from '../../../env';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(env.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  exports: [],
  providers: []
})
export class CoreModule { }
