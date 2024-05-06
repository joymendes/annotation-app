import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GroupsService } from '../../services/groups.service';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../core/services/loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-group-note',
  templateUrl: './view-group-note.component.html'
})
export class ViewGroupNoteComponent implements OnInit {

  private subscriptions = new Subscription();
  public userData: any;
  public userGroups: any;
  public note: any;
  public noteComments: any;
  public author: any;
  public formGroup!: FormGroup;

  constructor(
    private groupsService: GroupsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.setFormGroup();
    this.getCurrentNavigation();
    this.getUserData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setFormGroup() {
    this.formGroup = this.formBuilder.group({
      comment: ['']
    })
  }

  async submitComment() {
    if(this.formGroup.valid) {
      try {
        const payload = {
          content: this.formGroup.controls['comment'].value,
          uid: this.userData.uid,
          noteId: this.note.key,
          displayName: this.userData.displayName,
          photoURL: this.userData?.photoURL,
          timestamp: Date.now()
        }

        await this.groupsService.addComment(payload);

        this.formGroup.reset();

      } catch(err) {
        window.alert(err);
      }
    }
  }

  getCurrentNavigation() {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const noteId = params['id'];

        this.loadNote(noteId);
        this.loadNoteComments(noteId);
      })
    )
  }

  getUserData() {
    this.subscriptions.add(
      this.authService.user$.subscribe(
        (response) => {
          if(response) {
            this.userData = response;
          }
        },
        (error) => {
          throw error;
        }
      )
    )
  }

  loadNote(id: string) {
    this.subscriptions.add(
      this.groupsService.getNoteById(id).subscribe((response) => {
        if (response) {
          this.note = response;

          console.log(this.note, 'nota individual');

          this.getUserByEmail(this.note?.uid);
        }
      },
      (error) => {
        window.alert(error);
        this.loaderService.hide();
      })
    )
  }

  loadNoteComments(id: string) {
    this.subscriptions.add(
      this.groupsService.getComments(id).subscribe((response: any) => {
        if (response) {
          this.noteComments = response;

          console.log(this.noteComments, 'comentarios');

          // this.getUserByEmail(this.note?.uid);
        }
      })
    )
  }

  getUserByEmail(uid: string) {
    this.subscriptions.add(
      this.groupsService.getUserByUid(uid).subscribe((response) => {
        if (response) {
          this.author = response;

          console.log(this.author, 'author');
          this.loaderService.hide();
        }
      })
    )
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
