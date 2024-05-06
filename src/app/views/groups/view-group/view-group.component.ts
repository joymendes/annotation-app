import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html'
})
export class ViewGroupComponent implements OnInit{

  private subscriptions = new Subscription();
  public userData: any;
  public userGroups: any;
  public groupNotes: any;

  constructor(
    private loaderService: LoaderService,
    private groupsService: GroupsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.getCurrentNavigation();
    this.getUserData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getCurrentNavigation() {
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const groupId = params['id'];

        this.loadGroupNotes(groupId);
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

  showNote(key: Params) {
    this.router.navigate(['grupos/nota', key], { queryParamsHandling: 'merge' });
  }

  loadGroupNotes(groupId: string) {
    this.subscriptions.add(
      this.groupsService.getNotesByGroup(groupId).subscribe((response) => {
        if(response) {
          this.groupNotes = response;

          this.loaderService.hide();
        }
      })
    )
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
