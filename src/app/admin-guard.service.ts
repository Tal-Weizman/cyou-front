import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationServiceService } from './authentication-service.service';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(private auth: AuthenticationServiceService, private router: Router) {}

  canActivate() {
    if (!this.auth.isAdmin()) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}
