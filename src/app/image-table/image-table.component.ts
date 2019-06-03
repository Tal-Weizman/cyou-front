import { Component, OnInit,Input ,ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-image-table',
  templateUrl: './image-table.component.html',
  styleUrls: ['./image-table.component.css']
})
export class ImageTableComponent implements OnInit {


  @Input() images;

  displayedColumns: string[] = ['id','image', 'question', 'answers'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  @ViewChild(MatSort,) sort: MatSort;


  constructor() { 

    this.dataSource = new MatTableDataSource(this.images); 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 

  }

  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
  }

}
