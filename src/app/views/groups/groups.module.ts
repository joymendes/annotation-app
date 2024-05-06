import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateGroupComponent } from './create-group/create-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewGroupComponent } from './view-group/view-group.component';
import { ViewGroupNoteComponent } from './view-group-note/view-group-note.component';


const routes: Routes = [
  {
    path: '',
    component: GroupsComponent
  },
  {
    path: 'criar',
    component: CreateGroupComponent
  },
  {
    path: ':id',
    component: ViewGroupComponent
  },
  {
    path: 'nota/:id',
    component: ViewGroupNoteComponent
  }
];

@NgModule({
  declarations: [
    GroupsComponent,
    CreateGroupComponent,
    ViewGroupComponent,
    ViewGroupNoteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GroupsModule { }
