import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

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
  googleSignIn() {
    this.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((re) => {
        console.log(re);
        this.snackbar.open('Login Successfully !!', 'Dismiss', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.log('failed');
        this.snackbar.open(err.message, 'Dismiss', {
          duration: 3000,
        });
      });
  }
  RecoveryPassword() {
    console.log('Password Reset');
  }
}
