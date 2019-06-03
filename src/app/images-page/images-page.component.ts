import { Component, OnInit , ViewChild,AfterContentInit,OnChanges } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ImageData} from '../interfaces/ImageData'
import { AuthenticationServiceService } from '../authentication-service.service';


@Component({
  selector: 'app-images-page',
  templateUrl: './images-page.component.html',
  styleUrls: ['./images-page.component.css']
})
export class ImagesPageComponent implements OnInit {

  displayedColumns: string[] = ['id','image', 'question', 'answers'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  @ViewChild(MatSort,) sort: MatSort;
  images:any;
  loading:boolean;
  display:string;
  
  constructor(private api:AuthenticationServiceService) { 


  }

  ngOnInit() {

    this.loading = true;
    this.display = 'none';

    this.api.images().subscribe((res)=>{

      this.images = res;


      this.dataSource = new MatTableDataSource(this.images); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
      this.loading = false;
      this.display = 'block'

    });
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
