import { Component } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent {
  private subscriptions = new Subscription();
  public userData: any;
  public userGroups: any;

  constructor(
    private loaderService: LoaderService,
    private groupsService: GroupsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.getUserData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
        this.loaderService.hide();
      }
    });
  }

  goToGroupNotes(groupId: string) {
    this.router.navigate(['grupos', groupId]);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
