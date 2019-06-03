import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService, TokenPayload } from '../authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  error_msg:string;

  constructor(private auth: AuthenticationServiceService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.credentials).subscribe((x) => {
      console.log(x);
      this.router.navigateByUrl('/home');
      
    }, (err) => {
      
      this.error_msg = err.error.message;
    }); 

    return false;
  }

}
