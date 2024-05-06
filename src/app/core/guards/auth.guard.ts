import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router, private loaderService: LoaderService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.loaderService.show();

    return this.authService.isLoggedIn().pipe(
      take(1),
      map(user => {
        const isLoginRoute = state.url === '/';
        this.loaderService.hide();

        if (user && isLoginRoute) {
          this.router.navigate(['/dashboard']);
          return false;
        } else if (!user && !isLoginRoute) {
          this.router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}
