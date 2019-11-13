import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Metadata Express';
  userNameEmail = 'Bob';
  username: string;
  nickName: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  baseUrl = 'http://localhost:5050/auth';

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      const formData = new FormData();
      // formData.append('file', form.get('profile').value);

      this.http.post<any>(this.baseUrl, JSON.stringify(form.value), this.httpOptions).subscribe(
        (res) => this.router.navigate(['/home']),
        (err) => console.log(err)
      );
      /*this.http.post<any>(this.SERVER_URL, formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );*/
      // ...our form is valid, we can submit the data
    }
  }
}


