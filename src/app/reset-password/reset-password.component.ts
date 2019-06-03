import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email:string = "";

  constructor(private auth: AuthenticationServiceService) { }


  ngOnInit() {
  }



  reset_password(email){

    console.log("reset password",this.email,email.value);

    if(email.value != "")
    {
      this.auth.resetPassword({email:email.value}).subscribe((res)=>{


        console.log(res);

      });
    }
  }




}//end class
