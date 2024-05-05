import { Component } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent {
  private subscriptions = new Subscription();
  public userData: any;
  public userGroups: any;

  constructor(
    private groupsService: GroupsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.subscriptions.add(
      this.authService.user$.subscribe(
        (response) => {
          if(response) {
            this.userData = response;

            console.log(response);

            this.getGroups(this.userData?.email);
          }
        },
        (error) => {
          throw error;
        }
      )
    )
  }

  getGroups(email: string) {
    const encodedEmail = btoa(email);

    console.log(encodedEmail, 'enc');

    this.groupsService.getUserGroups(encodedEmail).subscribe(groups => {
      if(groups) {
        this.userGroups = groups;
      }
    });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
