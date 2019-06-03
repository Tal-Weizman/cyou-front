import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  constructor(private auth: AuthenticationServiceService,private router :Router) { }

  ngOnInit() {
   
    
  }


  goBack(){

    console.log(this.router.url,this.router.url.split('/'));

    if(this.router.url === "/profile" || this.router.url === "/admin")
    {
      this.router.navigateByUrl('/home');
    }
    else if(this.router.url === "/admin/users" || this.router.url === "/admin/images"|| this.router.url === "/admin/predefines")
    {

      this.router.navigateByUrl('/admin');
    }
    else if(this.router.url.split('/')[2] === "addimage" )
    {

      this.router.navigateByUrl('/admin/images');
    }
    else if(this.router.url.split('/')[2] === "adduser" )
    {

      this.router.navigateByUrl('/admin/users');
    }
    else if(this.router.url.split('/')[2] === "addpredefine" )
    {

      this.router.navigateByUrl('/admin/predefines');
    }

  }

}
