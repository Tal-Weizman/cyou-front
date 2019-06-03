import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationServiceService } from './authentication-service.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationServiceService, private router: Router) {}

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
