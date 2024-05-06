import { Component, Input } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() userData!: any;
  @Input() goBack!: boolean;
  @Input() title!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _location: Location
  ) {}

  logout() {
    this.authService.signOut().then(() => {
      window.location.reload();
    }).catch(error => {
      throw error;
    });
  }

  navigateToBack() {
    this._location.back();
  }
}
