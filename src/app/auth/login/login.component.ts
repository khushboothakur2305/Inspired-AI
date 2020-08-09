import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}
  onsignup(form: NgForm) {
    this.auth
      .signInWithEmailAndPassword(form.value.email, form.value.password)
      .then((re) => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(form);
  }
}
