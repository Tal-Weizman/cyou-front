import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  details:any = {};

  constructor(private auth: AuthenticationServiceService) {

    this.auth.profile().subscribe(user => {
      this.details = user;
      console.log(user);
    }, (err) => {
      console.error(err);
    });

   }

  ngOnInit() {


    
  }




}
