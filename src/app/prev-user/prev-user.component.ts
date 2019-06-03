import { Component, OnInit,NgZone } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router,ActivatedRoute  } from '@angular/router';
import {Location} from '@angular/common';
import { splitAtColon } from '@angular/compiler/src/util';



@Component({
  selector: 'app-prev-user',
  templateUrl: './prev-user.component.html',
  styleUrls: ['./prev-user.component.css']
})
export class PrevUserComponent implements OnInit {

  details:any = {};
  shortName:string = "";
  answersCount:number = 0;
  id:any;
  p1:any;
  p2:any;
  from:Date;
  to:Date;
  answers:any = [];
  all_answers:any = [];

  constructor(private location: Location ,  private zone: NgZone,private auth: AuthenticationServiceService,private router :Router,private route:ActivatedRoute) {
    this.from = new Date(0);
    this.to = new Date(0);

    this.route.params.subscribe(params => {
 
      this.id = params['id']; // (+) converts string 'id' to a number
      
      console.log(this.id);
      auth.user({id:this.id}).subscribe((res)=>{
          
        this.details = res;
        this.setShortName();

      });


      auth.AnswersCount({_id:this.id}).subscribe((res)=>{
        this.answersCount = res.toString();
      });

    });

   }

   setShortName(){

    var sn = this.details.name.split(" ");

    if(sn.length > 1)
    {
      this.shortName = sn[0][0] + sn[1][0];
      this.shortName = this.shortName.toUpperCase();
    }
    else
    {
      this.shortName = sn[0][0] + sn[0][1];
      this.shortName = this.shortName.toUpperCase();
    }

   }


   getUserReport(picker,picker2){


    this.from = new Date(this.p1);    
    this.to = new Date(this.p2);

    this.from.setDate(this.from.getDate() + 1);  
    this.to.setDate(this.to.getDate() + 1); 

  
    this.auth.reportanswer({user:this.id,"from":this.from,"to":this.to}).subscribe((res)=>{

        this.all_answers = res; 
        var date = "";
        var i= 0;
        var j = 0;
        var newList = [];
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          
         if(element.createdAt.split("T")[0] != date.split("T")[0] )
          {
            newList.push({date: element.createdAt,index:index,answers:[]});
            date = element.createdAt;
            i++;
          }

          newList[i-1].answers.push(element);
        }
        
        this.answers = newList;
        console.log(this.answers );

        for (let index = 0; index < newList.length; index++) {
          
          if(index == newList.length -1){
            newList[index].index = res.length - newList[index].index;
            continue;
          }

          newList[index].index = newList[index + 1].index - newList[index].index;

        }


        this.answers = newList;
        console.log(this.answers );   

        this.rerender();
    
    });
   }

   rerender(){

    this.zone.run(()=>{
      this.answers = this.answers;
    });

   }

   parseDate(date){
    return date.split('T')[0];
   }

   parseTime(date){
    var time  = date.split('T')[1];

    time = time.split(":")[0] +":" + time.split(":")[1]

    return time;
   }




  ngOnInit() {
  }

}
