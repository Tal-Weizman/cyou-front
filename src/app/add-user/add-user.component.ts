import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router,ActivatedRoute  } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  id:any;
  user:any = {name:"",email:"",admin:false};

  constructor(private snackBar: MatSnackBar,private auth:AuthenticationServiceService,private router :Router,private route:ActivatedRoute) { 

    this.route.params.subscribe(params => {

      this.id = params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      
      if (this.id == '0')
      {
        console.log("new user");

      }
      else{

        auth.user({id:this.id}).subscribe((x)=>{
          this.user = x;

        });

      }
      // In a real app: dispatch action to load the details here.
   });

    


    //this.auth.user({})

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "X", {
      duration: 3000,
    });
  }

  valid_email():boolean{

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(this.user.email).toLowerCase()))
    {
      return true;
    }

    return false;
  }

  valid_name():boolean{
    var re = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
    if(re.test(String(this.user.name).toLowerCase()))
    {

      return true;
    }

    return false;
    
  }

  save_or_update(){

    if(!this.valid_email())
    {
      this.openSnackBar("email not good");
      return;
    }
    else if(!this.valid_name())
    {
      this.openSnackBar("name not good");
      return;
    }

    if(this.id == "0")
    {
    //new user
      this.auth.register(this.user).subscribe((x)=>{

        console.log(x);

      }, (err) => {
      
        console.log(err.error.message);
        this.openSnackBar(err.error.message);
        return;
      });

    }
    else{
    //update user

      this.auth.updateUser({_id:this.id,name:this.user.name,email:this.user.email,isAdmin:this.user.admin}).subscribe((res)=>{

        console.log(res);

      });

    }
    
  }

  ngOnInit() {
  }

}
