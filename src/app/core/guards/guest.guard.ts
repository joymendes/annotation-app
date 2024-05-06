import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard {

  constructor(private authService: AuthService, private router: Router, private loaderService: LoaderService) {}

  canActivate(): Observable<boolean> {
    this.loaderService.show();

    return this.authService.isLoggedIn().pipe(
      map(isLoggedIn => {
        this.loaderService.hide();

        if (isLoggedIn) {
          this.router.navigate(['/dashboard']);
          return false;
        }
        return true;
      })
    );
  }
}
