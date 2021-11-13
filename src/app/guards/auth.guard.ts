import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjConstants } from '../constants/proj_const.cnst';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable( observer => {
      const role = route.data.role;
      const isUserLoggedIn = this.authService.isUserLoggedIn();
      const userDetails = this.authService.getUserDetails();
      if (!isUserLoggedIn) {
        observer.next(false);
        this.router.navigateByUrl(ProjConstants.LOGIN_ROUTE);
        return;
      }
      if (userDetails.role !== role) {
        observer.next(false);
        this.router.navigateByUrl(ProjConstants.LOGIN_ROUTE);
        return
      };
      observer.next(true);
      observer.complete();
    })
  }

}
