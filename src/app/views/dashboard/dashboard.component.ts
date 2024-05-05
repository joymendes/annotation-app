import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private subscriptions = new Subscription();
  public userData: any;
  public userNotes: any;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

            console.log(response);

            this.getNotes(this.userData?.uid);
          }
        },
        (error) => {
          throw error;
        }
      )
    )
  }

  getNotes(uid: string) {
    this.dashboardService.getNotes(uid).subscribe((response) => {
      console.log(response, 'res notes');
      this.userNotes = response;
    })
  }

  async deleteNote(key: string) {
    try {
      await this.dashboardService.deleteNote(this.userData.uid, key);
    } catch (error) {
      throw error;
    }
  }

  submitNote(): void {
    this.dashboardService.addNote(this.userData.uid, 'teste 2 kkkk').then(() => {
      console.log('Note added successfully!');
    }).catch(error => {
      console.error('Error adding note:', error);
    });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/'])
    }).catch(error => {

    });
  }
}
