import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}
  onsignup(form: NgForm) {
    this.auth
      .createUserWithEmailAndPassword(form.value.email, '12345678')
      .then((re) => {
        console.log(re, 'Success');
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(form.value.email);
  }
  googleSignIn() {
    this.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((re) => {
        console.log('success');
      })
      .catch((err) => {
        console.log("failed");
      });
      console.log("hello");

  }
}
