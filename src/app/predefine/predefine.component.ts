import { Component, OnInit,ViewChild,OnDestroy } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ImageData} from '../interfaces/ImageData'
import { AuthenticationServiceService } from '../authentication-service.service';
import { Observable, Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-predefine',
  templateUrl: './predefine.component.html',
  styleUrls: ['./predefine.component.css']
})
export class PredefineComponent implements OnInit {

  displayedColumns: string[] = ['id',"upload", 'question', 'answers','folder'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  @ViewChild(MatSort,) sort: MatSort;
  predefine:any;
  data:any;
  uploads:any[] = [];
  loading:boolean;
  display:string;
  uploading:boolean = false;
  ind:number;
  errorind:number;
  apicall:Subscription;

  constructor(private snackBar: MatSnackBar,private api:AuthenticationServiceService) { 

    this.loading = true;
    this.display = 'none';


    this.apicall = this.api.predefines().subscribe((res)=>{

      this.predefine = res;
      this.dataSource = new MatTableDataSource(this.predefine); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loading = false;
      this.display = 'block';
    });


  }



  ngOnInit() {
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "X", {
      duration: 3000,
    });
  }

  deletePre(id){

    console.log(id);

    this.api.delpredefine({id:id}).subscribe((res)=>{

      console.log(res);


    });

  }


  ngOnDestroy(): void {
    this.apicall.unsubscribe();
    
  }

  selected(obj){
    console.log("selected",obj);
    this.data = obj; 
  }




  async uploadData(){

    this.loading = true;
    this.display = "none";
    this.uploading = true;

    this.ind = 0;
    this.errorind = 0;

     if(this.uploads.length > 0)
    {
      
      await this.uploads.forEach(i => {
  
        this.api.addimage(i).subscribe((res)=>{

          if(res.Mstatus != undefined)
          {
            if(res.Mstatus == 'ok')
              this.ind += 1;
          }
          else{

            this.errorind += 1;
          }

          if(this.ind + this.errorind == this.uploads.length)
          {
            this.uploads = [];
            this.uploading = false;
            this.loading = false;
            this.display = "block";
            this.openSnackBar(this.ind + " images upload successfully");
          }

        });
      });



    }
    
  }


  onFileSelect(e){
    var files = e.target.files;
    
    if(files)
    {

        for (let i = 0; i < files.length; i++) {
          
          if (files[i]) {
            var reader = new FileReader();
      
            reader.onload = this._handleReaderLoaded.bind(this);
      
            reader.readAsBinaryString(files[i]);
          }
          
        }

    }
}


_handleReaderLoaded(e) {

      if(this.data)
      {
          this.uploads.push({base64:'data:image/png;base64,' + btoa(e.target.result),question:this.data.question,answers:this.data.answers});
          this.uploading = true;
      }
        
}



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
