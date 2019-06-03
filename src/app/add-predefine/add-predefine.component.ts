import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router,ActivatedRoute  } from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-add-predefine',
  templateUrl: './add-predefine.component.html',
  styleUrls: ['./add-predefine.component.css']
})
export class AddPredefineComponent implements OnInit {

  id:any;
  quastion:string;
  folder:string;
  textbox:any[] = [{num:"1"}];
  datatext1:string;
  datatext2:string;
  datatext3:string;
  datatext4:string;
  datatext5:string;
  datatext6:string;
  datatext7:string;
  datatext8:string;
  datatext9:string;
  loading:boolean;

  constructor(private snackBar: MatSnackBar,private api:AuthenticationServiceService,private router :Router,private route:ActivatedRoute) {

    this.loading = true;

    this.route.params.subscribe(params => {

      this.id = params['id']; 

      console.log(this.id);
      
      if (this.id == '0')
      {
      
        this.loading = false;
        console.log("new predefine");

      }
      else{

        api.predefine({id:this.id}).subscribe((x)=>{
          console.log(x);
          this.quastion = x.question;

          for (let index = 0; index < x.answers.length; index++) {
            
            
            this["datatext" + (index + 1)] = x.answers[index];
            
            if(!(x.answers.length - 1 == index))
              this.add_text_box();
      
          }

          this.folder = x.folder;
          this.loading = false;
        });

      }
      // In a real app: dispatch action to load the details here.
   });

   }

  ngOnInit() {

  }


  openSnackBar(message: string) {
    this.snackBar.open(message, "X", {
      duration: 3000,
    });
  }


  add_text_box(){
    if(this.textbox.length < 9)
    {
    this.textbox.push({num:(this.textbox.length + 1).toString()});
    console.log(this.textbox);
    console.log(this.datatext1);
    }
  }

  save_or_update(){

    this.loading = true;

    var answers = this.buildAnswers();

    if(answers != [])
    if(this.id == "0")//new image 
    {

          if(answers.length > 1 && this.quastion) 
          {
            this.api.addpredefine({question:this.quastion,answers:answers,folder:this.folder}).subscribe((x)=>{

              console.log(x._id);
              this.router.navigateByUrl('/admin/predefines');
              this.loading = false;
            });

          }
          else{
            this.loading = false;
            this.openSnackBar("fill al fileds");
            return false;
          }

    }
    else{
    //update image
    console.log("update");
      this.api.updatePredefine({_id:this.id,question:this.quastion,answers:answers,folder:this.folder}).subscribe((res)=>{
        
        if(res.Mstatus == "ok")
          {
            this.openSnackBar("update ok");
           
          
          }
          else{

            this.openSnackBar("updat error");
          }
        
        this.loading = false;
      });
    }
  }

  buildAnswers(){

    var answers = [];

    for (let index = 1; index < 10; index++) {
      var element = this["datatext" + index]
      
      if (element)
      {
        answers.push(element);
      }

    }

    return answers;
  }

}
