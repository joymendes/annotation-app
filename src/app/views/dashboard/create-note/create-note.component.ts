import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../../services/groups.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html'
})
export class CreateNoteComponent {

  private subscriptions = new Subscription();
  public userData: any;
  public userNotes: any;
  public userGroups: any;
  public formGroup!: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private groupsService: GroupsService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.setFormGroup();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setFormGroup() {
    this.formGroup = this.formBuilder.group({
      group: [''],
      text: [ '', Validators.required ]
    })
  }

  getUserData() {
    this.subscriptions.add(
      this.authService.user$.subscribe(
        (response) => {
          if(response) {
            this.userData = response;

            this.getGroups(this.userData?.uid);
          }
        },
        (error) => {
          throw error;
        }
      )
    )
  }

  getGroups(uid: string) {
    this.groupsService.getUserGroups(uid).subscribe(groups => {
      if(groups) {
        this.userGroups = groups;

        console.log(this.userGroups, 'groups');

      }
    });
  }

  async addNote() {
    console.log(this.formGroup.controls);

    if(this.formGroup.valid) {
      try {
        const payload = {
          content: this.formGroup.controls['text'].value,
          uid: this.userData.uid,
          groupId: this.formGroup.controls['group'].value
        }

        await this.dashboardService.addNote(payload.uid, payload.content, payload.groupId);

        window.alert('Nota adicionada com sucesso!')

        this._location.back();
      } catch(error) {
        throw error;
      }
    }
  }
}
