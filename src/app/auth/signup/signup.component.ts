import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private auth: AngularFireAuth,private snackbar : MatSnackBar,private router : Router) {}

  ngOnInit(): void {}
  onsignup(form: NgForm) {
    this.auth
      .createUserWithEmailAndPassword(form.value.email,form.value.password)
      .then((re) => {
        console.log(re, 'Success');
        this.snackbar.open('Registered User Successfully !!', 'Dismiss', {
          duration: 3000
        });
        this.router.navigate(["/login"]);
      })
      .catch((err) => {
        console.log(err.message);
        this.snackbar.open(err.message, 'Dismiss', {
          duration: 3000
        });
    console.log(form.value.email);
  })
}
  googleSignIn() {
    this.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((re) => {
        console.log(re);
        this.snackbar.open('Registered User Successfully !!', 'Dismiss', {
          duration: 3000
        });
        this.router.navigate(["/login"]);
      })
      .catch((err) => {
        console.log("failed");
        this.snackbar.open(err.message, 'Dismiss', {
          duration: 3000
        });
      });

  }

}
