import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserData} from '../interfaces/UserData'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  displayedColumns: string[] = ['id',"statics", 'name', 'email', 'admin',"index"];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, ) paginator: MatPaginator;
  @ViewChild(MatSort,) sort: MatSort;

  loading:boolean;
  selected_user : any;
  users_list: any;
  display:string;

  constructor(private auth:AuthenticationServiceService ) {
    this.display = 'none';
    this.loading = true;

    this.auth.users().subscribe(users => {
      this.users_list = users; 
      this.dataSource = new MatTableDataSource(this.users_list);
      console.log(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loading = false;
      this.display = 'block';
    }, (err) => {

      console.error(err);

    });

   }

  ngOnInit() {

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deleteUser(user){

    console.log(user);
    this.auth.deleteUser({id:user}).subscribe((res)=>{

      console.log(res);


    });

  }


}
