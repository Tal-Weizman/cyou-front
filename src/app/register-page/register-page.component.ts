import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService, TokenPayload } from '../authentication-service.service';
import { Router } from '@angular/router';
import { StaticInjector } from '@angular/core/src/di/injector';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  error_msg:string = "";

  constructor(private auth: AuthenticationServiceService, private router: Router) { }

  ngOnInit() {
  }


  register() {
    console.log("registerd");
    
    this.auth.register(this.credentials).subscribe((x) => {
      console.log("registerd good",x);



    }, (err) => {
      
      console.error(err);
    });
  }

}
