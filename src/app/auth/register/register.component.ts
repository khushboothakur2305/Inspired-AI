import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  NgForm,
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { auth } from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;

  error_messages = {
    fname: [{ type: 'required', message: 'Name is required.' }],

    lname: [{ type: 'required', message: 'Phone Number is required.' },
    { type: 'minlength', message: 'Phone Number length.' },
      { type: 'maxlength', message: 'Phone Number length.' },
      { type: 'required', message: 'please enter a valid Phone Number address.' },

  ],

    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length.' },
      { type: 'maxlength', message: 'Email length.' },
      { type: 'required', message: 'please enter a valid email address.' },
    ],

    password: [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
    ],
    confirmpassword: [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' },
      // {type:'passwordNotMatch', message:'Password Does Not Match'}
    ],
  };

  constructor(
    public formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group(
      {
        fname: new FormControl('', Validators.compose([Validators.required])),
        lname: new FormControl('', Validators.compose([Validators.required])),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        ),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        ),
        confirmpassword: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        ),
      },
      {
        validators: this.password.bind(this),
      }
    );
  }

  ngOnInit(): void {}
  onsignup(form: NgForm) {
    this.auth
      .createUserWithEmailAndPassword(form.value.email, form.value.password)
      .then((re) => {
        console.log(re, 'Success');
        this.snackbar.open('Registered User Successfully !!', 'Dismiss', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.log(err.message);
        this.snackbar.open(err.message, 'Dismiss', {
          duration: 3000,
        });
        console.log(form.value.email);
      });
  }
  googleSignIn() {
    this.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((re) => {
        console.log(re);
        this.snackbar.open('Registered User Successfully !!', 'Dismiss', {
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
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  RecoveryPassword(){}
}
