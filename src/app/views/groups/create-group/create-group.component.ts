import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../../services/groups.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html'
})
export class CreateGroupComponent implements OnInit {

  private subscriptions = new Subscription();
  public userData: any;
  public formGroup!: FormGroup;
  public emails: Array<string> = [];
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public addOnBlur: boolean = true;

  constructor(
    private groupsService: GroupsService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUserData();
    this.setFormGroup();
  }

  getUserData() {
    this.subscriptions.add(
      this.authService.user$.subscribe(
        (response) => {
          if(response) {
            this.userData = response;

            console.log(response);
          }
        },
        (error) => {
          throw error;
        }
      )
    )
  }

  setFormGroup() {
    this.formGroup = this.formBuilder.group({
      name: [ '', Validators.required ],
      emails: [ this.emails ]
    })
  }

  add(event: any): void {
    const value = (event.value || '').trim();

    if (value) {
      this.emails.push(value);
    }

    console.log(this.emails, 'emails');

    if (event.input) {
      event.input.value = '';
    }
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);
    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  edit(email: string, newName: any): void {
    const index = this.emails.indexOf(email);
    if (index >= 0) {
      this.emails[index] = newName;
    }
  }

  trackByEmail(index: number, email: any): string {
    return email;
  }


  async addGroup() {
    if(this.formGroup.valid) {
      try {
        const payload = {
          name: this.formGroup.controls['name'].value,
          userEmail: this.userData.email,
          membros: this.emails
        }

        await this.groupsService.createGroup(payload.name, payload.userEmail, payload.membros);

        window.alert('Grupo criado com sucesso!')

        this.router.navigate(['/grupos']);
      } catch(error) {
        window.alert(error);
      }
    }
  }
}
