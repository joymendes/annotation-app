import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.user$.pipe(
      take(1),
      map(user => {
        const isLoginRoute = state.url === '/';

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
