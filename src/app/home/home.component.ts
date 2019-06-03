import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data_index:any;
  userid:string;
  data:any = {answers:[],base64:"",question:""};
  loading:boolean = false;

  constructor(private lb:Lightbox,public dialog: MatDialog,private auth: AuthenticationServiceService) {

    console.log("home constractor..");


    this.userid = this.auth.getUserDetails()._id;
    this.getData();

  }


    getData(){
      console.log("loading data...");
      this.loading = true;
      this.auth.getUserIndex().subscribe((obj)=>{
        this.data_index = parseInt(obj.index);
    
          this.auth.imageByIndex({index:obj.index}).subscribe((res)=>{
            
            console.log(res);

            if(res.error == "NOINDEX")
            {
              console.log("index not found error");
              this.getData();
              return;
            }

            this.data = res;
            this.loading = false;
    
          }); 
      });
    }


  ngOnInit() {
    console.log("init class ...");
    this.loading = true;
  }


  openImageModel(image,capt){

    const album = {
      src: image,
      caption: capt,
      thumb: ""
    }

    this.lb.open([album],0);
  }

  answerClicked(ans){

    console.log("answer selected...");

    var obj = {answer:"",imageid:"",userid:"",index:0};

    obj.answer = ans;
    obj.imageid = this.data._id;
    obj.userid = this.userid;
    obj.index = this.data_index;

    this.auth.answer(obj).subscribe((x)=>{

      this.data_index = x.index;
      this.getData();

    });
    this.loading = true;

  }



  /*   ansSkiped(ans:string){

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog , {
      width: '250px',     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (result)
        console.log(result);
    });

    console.log(ans);
   

  } */




}

export interface DialogData {
  skip_res: string;
}


@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <div mat-dialog-content>
    <p>Why do you want to skip ?</p>
    <mat-form-field>
      <input matInput #resu>
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No Thanks</button>
    <button mat-button [mat-dialog-close]="resu.value" cdkFocusInitial>Ok</button>
  </div>`,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

