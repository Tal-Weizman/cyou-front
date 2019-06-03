import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Router,ActivatedRoute  } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  id:any;
  quastion:string;
  base64textString:string = "";
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

      this.id = params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
      
      if (this.id == '0')
      {
        console.log("new image");

        this.loading = false;
      }
      else{

        api.image({id:this.id}).subscribe((x)=>{
          console.log(x);
          this.quastion = x.question;
          this.base64textString = x.base64;


          for (let index = 0; index < x.answers.length; index++) {
            
            
            this["datatext" + (index + 1)] = x.answers[index];
            
            if(!(x.answers.length - 1 == index))
              this.add_text_box();
      
          }
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
  
  onFileSelect(e){
    var files = e.target.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}

add_text_box(){
  if(this.textbox.length < 9)
  {
  this.textbox.push({num:(this.textbox.length + 1).toString()});
  console.log(this.textbox);
  console.log(this.datatext1);
  }
}


_handleReaderLoaded(e) {
          this.base64textString = 'data:image/png;base64,' + btoa(e.target.result);
          console.log(this.base64textString);
  }

  save_or_update(){

    this.loading = true;
    var answers = this.buildAnswers();

    if(answers != [])
    if(this.id == "0")//new image 
    {

          if(answers.length > 1 && this.quastion && this.base64textString) 
          {
            this.api.addimage({base64:this.base64textString,question:this.quastion,answers:answers}).subscribe((x)=>{

              console.log(x);
              if(x.Mstatus == "ok")
              {
                this.router.navigateByUrl('/admin/images');

              }
              else{
                //TODO 
              }
            
            });


          }
          else{
            //no answers
            this.openSnackBar("fill all fileds and upload image");
            this.loading = false;
            return false;

          }
          this.loading = false;
    }
    else{
    //update image
 
      this.api.updateImage({_id:this.id,base64:this.base64textString,question:this.quastion,answers:answers}).subscribe((res)=>{
        
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
