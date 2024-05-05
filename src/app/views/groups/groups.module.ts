import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateGroupComponent } from './create-group/create-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: GroupsComponent
  },
  {
    path: 'criar',
    component: CreateGroupComponent
  }
];

@NgModule({
  declarations: [
    GroupsComponent,
    CreateGroupComponent
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
