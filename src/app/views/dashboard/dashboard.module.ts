import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CreateNoteComponent } from './create-note/create-note.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewNoteComponent } from './view-note/view-note.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'criar',
    component: CreateNoteComponent
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    CreateNoteComponent,
    ViewNoteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
