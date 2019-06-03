import { Component } from '@angular/core';
import { AuthenticationServiceService } from './authentication-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private api:AuthenticationServiceService){

    
  }



}

