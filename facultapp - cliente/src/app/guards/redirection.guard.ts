import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectionGuard implements CanActivate {

  constructor(private session: SessionService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.session.currentUser.type === 1) {
      this.router.navigate(['/studentHome']);
    } else if (this.session.currentUser.type === 2) {
      this.router.navigate(['/teacherHome']);
    } else if (this.session.currentUser.type === 3) {
      this.router.navigate(['/adminHome']);
    } else {
      this.router.navigate(['/accessDenied']);
    }
    return true;
  }
}
