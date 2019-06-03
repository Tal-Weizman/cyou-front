import { Component, OnInit } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { AuthenticationServiceService,TokenPayload } from '../authentication-service.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import { NewUserDialogComponent } from '../new-user-dialog/new-user-dialog.component';


const URL = window.location.protocol + '//' + window.location.hostname + ":3000/api/uploadmultiple";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {

  public files: File[] = [];

  public uploader:FileUploader = new FileUploader({url: URL});

  public hasBaseDropZoneOver:boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required,Validators.maxLength(20)]);
  options: FormGroup;
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  base64textString:string;

  constructor(public dialog: MatDialog,private auth: AuthenticationServiceService,private http :HttpClient,private fb: FormBuilder) {


    this.options = fb.group({
      hideRequired: false,
    });

    fb.control([this.email,this.username])


   }

  ngOnInit() {
  }

  public browesd(event: any) {
    console.log(event);
   
    
  }

  register() {
    
    console.log("register start...");

    if (this.username.valid && this.email.valid)
    {
      console.log("fileds are valid");

      this.auth.register(this.credentials).subscribe((res) => {
        
        if (res.Mstatus === "ok")
        {
          console.log("new user was registerd");

          var t = "New user was secssfuly registerd";
          var b = "email with the password was sent to " + this.credentials.email;

          this.openNewUserDialog({title:t,body:b})
        }

      }, (err) => {

        console.log(err);
        if(err.status === "auth")
          this.authErrorDialog({title:"securty erorr",body:"user not registerd - authintiction errors"})
        
      });
    }
    else
    {
      console.log("fileds not valid");

      this.email.markAsTouched();
      this.username.markAsTouched();

    }
  }

  public fileOverBase(e:any):void {
    console.log(e);
    this.hasBaseDropZoneOver = e;
  }

  getErrorMessage() {
  
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getNameErrorMessage() {
    
    return this.username.hasError('required') ? 'You must enter a value' :
        this.username.hasError('maxlength') ? 'Maximum chercters alowed is 20' :
            '';
  }

  getSecssesMessage(){
    return "Ok";
  }


  public dropped(event: any) {
    console.log(event.files[0].fileEntry.file)
    /**
    this.files = event.files;
    for (const droppedFile of event.files) {
      console.log(droppedFile);
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          



        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }**/
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
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



_handleReaderLoaded(e) {
          this.base64textString = 'data:image/png;base64,' + btoa(e.target.result);
          console.log(this.base64textString);
  }


  public uploadFile(i){


    console.log("uploadin start....");

    const fd = new FormData();

    fd.append('image',this.files[i],this.files[i].name);

    
    console.log(fd,this.files[i],this.files[i].name);

    //this.auth.upload( fd);
    
    //this.uploader.uploadAll();
          
/*      this.http.post(window.location.protocol + '//' + window.location.hostname + ':3000/api/upload', this.files)
    .subscribe(data => {
      // Sanitized logo returned from backend
      console.log(data);
    });  */


  }

  openNewUserDialog(data): void {
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.credentials.email = "";
      this.credentials.name = "";
      this.username.markAsUntouched();
      this.email.markAsUntouched();
    });
  }

  authErrorDialog(data): void {
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
