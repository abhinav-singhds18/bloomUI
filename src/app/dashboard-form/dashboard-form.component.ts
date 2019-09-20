import {Component, OnInit} from '@angular/core';
import {InteractionService} from '../interaction.service';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.css']
})
export class DashboardFormComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'JWT ' + sessionStorage.getItem('ProductName')
    })
  };

  baseUrl = 'http://localhost:5000/api/v1/private';

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    // console.log(JSON.parse(sessionStorage.getItem('ProductName')));
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const formData = new FormData();
    // formData.append('file', form.get('profile').value);

    this.http.post<any>(this.baseUrl, JSON.stringify(form.value), this.httpOptions).subscribe(
      (res) => {
        sessionStorage.setItem('ProductName', res.access_token);
        this.router.navigate(['/dashboard-form']);
        console.log(res);
      },
      (err) => console.log(err)
    );
    // ...our form is valid, we can submit the data

  }

}
