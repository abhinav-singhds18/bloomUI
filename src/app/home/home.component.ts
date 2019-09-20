import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {InteractionService} from '../interaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'Bloomberg OpenAPI';
  userNameEmail = 'Bob';
  username: string;
  nickName: string;
  password: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  baseUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient, private router: Router) {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      const formData = new FormData();
      // formData.append('file', form.get('profile').value);

      this.http.post<any>(this.baseUrl, JSON.stringify(form.value), this.httpOptions).subscribe(
        (res) => {
          sessionStorage.setItem('ProductName', res.access_token);
          this.router.navigate(['/dashboard-form']);
          console.log(res.access_token);
        },
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
