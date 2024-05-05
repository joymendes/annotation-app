import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html'
})
export class CreateNoteComponent {

  private subscriptions = new Subscription();
  public userData: any;
  public userNotes: any;
  public formGroup!: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
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
      text: [
        '',
        Validators.required
      ]
    })
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

  async addNote() {
    console.log(this.formGroup.controls);

    if(this.formGroup.valid) {
      try {
        const payload = {
          content: this.formGroup.controls['text'].value,
          uid: this.userData.uid
        }

        await this.dashboardService.addNote(payload.uid, payload.content);

        window.alert('Nota adicionada com sucesso!')

        this.router.navigate(['/dashboard']);
      } catch(error) {
        throw error;
      }
    }
  }
}
