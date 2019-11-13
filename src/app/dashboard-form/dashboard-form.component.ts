import { Component, OnInit, ViewChild } from '@angular/core';
import { InteractionService } from '../interaction.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import Character from '../Character';
import { HistoricaldataService } from '../historicaldata.service';
import { DataSource } from '@angular/cdk/table';


export interface UsersData {
  id: number;
  Connection_Name: string;
  Database_Name: string;
  Connection_String: string;
  Database_Type: string;
}

/* const ELEMENT_DATA: UsersData[] = [
  { id: 1560608769632, Connection_Name: 'Artificial Intelligence', Database_Name: 'Test', Connection_String: 'https://' ,Database_Type:'My SQL'},
  { id: 1560608796014, Connection_Name: 'Machine Learning', Database_Name: 'Test', Connection_String: 'https://',Database_Type:'My SQL'  },
  { id: 1560608787815, Connection_Name: 'Robotic Process Automation', Database_Name: 'Test', Connection_String: 'https://',Database_Type:'My SQL'},
  { id: 1560608805101, Connection_Name: 'Blockchain', Database_Name: 'Test', Connection_String: 'https://',Database_Type:'My SQL'}
]; */

let ELEMENT_DATA: UsersData[] = [];

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.css']
})
export class DashboardFormComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'Connection_Name', 'Database_Name', 'Connection_String', 'Database_Type', 'action'];
  //ELEMENT_DATA = (localStorage.length > 0 ) ? JSON.parse(localStorage.getItem('Userdata_ls')) : ELEMENT_DATA;
  //dataSource = JSON.parse(localStorage.getItem('Userdata_ls'));
  //dataSource = (localStorage.length > 0 ) ? JSON.parse(localStorage.getItem('Userdata_ls')) : ELEMENT_DATA;

  data = Object.assign(ELEMENT_DATA);
  dataSource = (localStorage.length > 0) ? JSON.parse(localStorage.getItem('Userdata_ls')) : new MatTableDataSource<UsersData>(this.data);
  selection = new SelectionModel<UsersData>(true, []);


  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  characters: Character[] = [];
  user_db_data: any[] = [];
  contenteditableproperty = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + sessionStorage.getItem('ProductName')
    })
  };

  baseUrl = 'http://localhost:5050/api/v1/private';
  baseUrl1 = 'http://localhost:5050/api/v1/testconnection';

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, public usrdata: HistoricaldataService) {

    if (localStorage.length > 0) {
      // We have items
      ELEMENT_DATA = JSON.parse(localStorage.getItem('Userdata_ls'));
      console.log(JSON.parse(localStorage.getItem('Userdata_ls')));
      console.log(ELEMENT_DATA);
    } else {
      // No items
    }

  }

  ngOnInit() {
    // console.log(JSON.parse(sessionStorage.getItem('ProductName')));
    if (localStorage.length > 0) {
      // We have items
      ELEMENT_DATA = JSON.parse(localStorage.getItem('Userdata_ls'));
      console.log(JSON.parse(localStorage.getItem('Userdata_ls')));
      console.log(ELEMENT_DATA);
    } else {
      // No items
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  removeSelectedRows() {

    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      console.log(this.data.findIndex(d => d === item));
      this.data.splice(index, 1)
      this.dataSource = new MatTableDataSource<UsersData>(this.data);
    });
    this.selection = new SelectionModel<UsersData>(true, []);
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }



  onSubmit(form: NgForm) {
    console.log(typeof (form.value));
    console.log(form.value);
    sessionStorage.setItem('Userdata', JSON.stringify(form.value));
    console.log(sessionStorage.getItem('Userdata'));
    console.log(typeof (sessionStorage.getItem('Userdata')));
    console.log(JSON.parse(sessionStorage.getItem('Userdata')));

    this.user_db_data.push(form.value);
    localStorage.setItem('Userdata_ls', JSON.stringify(this.user_db_data));
    console.log(JSON.parse(localStorage.getItem('Userdata_ls')));
    this.characters = JSON.parse(localStorage.getItem('Userdata_ls'));
    const formData = new FormData();
    // formData.append('file', form.get('profile').value);

    this.http.post<any>(this.baseUrl, JSON.stringify(form.value), this.httpOptions).subscribe(
      (res) => {
        // sessionStorage.setItem('ProductName', res.access_token);
        this.router.navigate(['/dashboard-form']);
        console.log(res);
      },
      (err) => console.log(err)
    );
    // ...our form is valid, we can submit the data

  }


  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '50%',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  executeDialog(action, obj) {
    console.log(obj);
    console.log((sessionStorage.getItem('ProductName')));
    console.log(this.httpOptions);
    this.http.post<any>(this.baseUrl, this.httpOptions).subscribe(
      (res) => {
        // sessionStorage.setItem('ProductName', res.access_token);
        console.log(res);
      },
      (err) => console.log(err)
    );
  }


  addRowData(row_obj) {
    alert('inside');
    var d = new Date();
    var time_d = d.getTime();
    this.dataSource.data.push({
      id: time_d,
      Connection_Name: row_obj.Connection_Name,
      Database_Name: row_obj.Database_Name,
      Connection_String: row_obj.Connection_String,
      Database_Type: row_obj.Database_Type

    });
    this.table.renderRows();
    row_obj['id'] = time_d;
    console.log(row_obj);

    //ELEMENT_DATA.push(row_obj);
    //this.usrdata.usrsData.push(row_obj);
    localStorage.setItem('Userdata_ls', JSON.stringify(this.dataSource.data));
    console.log(JSON.parse(localStorage.getItem('Userdata_ls')));




    this.http.post<any>(this.baseUrl1, JSON.stringify(row_obj), this.httpOptions).subscribe(
      (res) => {
        // sessionStorage.setItem('ProductName', res.access_token);
        console.log(res);
      },
      (err) => console.log(err)
    );

  }
  updateRowData(row_obj) {

    this.dataSource = this.dataSource.data.filter((value, key) => {

      if (value.id == row_obj.id) {
        value.Connection_Name = row_obj.Connection_Name;
        value.Database_Name = row_obj.Database_Name;
        value.Connection_String = row_obj.Connection_String;
      }
      localStorage.setItem('Userdata_ls', JSON.stringify(this.dataSource.data));
      return true;
    });
  }
  deleteRowData(row_obj) {

    /*    for ( let i = 0; i < this.dataSource.length; i++) {
         if ( this.dataSource.id == row_obj.id) {
           this.dataSource.splice(i, 1);
           console.log(this.dataSource);
           localStorage.setItem('Userdata_ls', JSON.stringify(this.dataSource));
         }
      } */


    //console.log(user_db_data);
    console.log(row_obj);
    this.dataSource = this.dataSource.filter((value, key) => {
      //localStorage.setItem('Userdata_ls', JSON.stringify(this.dataSource));
      console.log(this.dataSource);
      console.log(JSON.parse(localStorage.getItem('Userdata_ls')));
      return value.id != row_obj.id;
    });
  }

  newTab(action, obj) {
    obj.action = action;

    if (obj.action == 'INGEST') {
      //window.open('https://www.w3schools.com');
      obj.action = action;
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        width: '50%',
        data: obj
      });
      this.executeDialog(action, obj);
    } else if (obj.action == 'VIEW') {
      window.open('http://localhost:7474/browser/');
    } else if (obj.action == 'SEARCH') {
      window.open('http://localhost:5000');
    }

  }



}
