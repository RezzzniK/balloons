import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { User } from '../_models/user.model';
import { LoginInProcess } from './state/login.actions';
import { RequestsService } from '../_services/requests.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = { username: 'sadsfd', password: 'easfdg', _id: '12345' };
  loginForm: FormGroup;
  forbiddenPasswords = ['password'];
  forbiddenUserName = ['username'];
  checkObj = { name: '', pass: '' };
  showSpinner = false;
  constructor(private store: Store, private httpService: RequestsService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        this.forbiddenUName.bind(this),
      ]),
      password: new FormControl('', [
        Validators.required,
        this.forbiddenPass.bind(this),
      ]),
    });
    this.checkNamePass(this.user.username, this.user.password);
  }
  onSubmit() {
    this.user.username = this.loginForm.value['username'];
    this.user.password = this.loginForm.value['password'];
    this.checkNamePass(this.user.username, this.user.password);
    this.store.dispatch(LoginInProcess({ user: this.user }));
    this.showSpinner = true;
  }
  forbiddenPass(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenPasswords.indexOf(control.value) !== -1) {
      return { passIsForbiddent: true };
    } else {
      return null;
    }
  }

  forbiddenUName(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserName.indexOf(control.value) !== -1) {
      return { nameIsForbiddent: true };
    } else {
      return null;
    }
  }
  checkNamePass(name: string, password: string) {
    if (name.length <= 20 && name.length > 1) {
      this.checkObj.name = 'valid';
    } else {
      this.checkObj.name = 'invalid username lenght';
    }
    const regex = new RegExp('[^a-zA-Z0-9]+[0-9]+');
    const test = regex.test(password);
    console.log(test);
    if (test) {
      if (password.length >= 6 && password.length <= 12) {
        this.checkObj.pass = 'valid';
      } else {
        console.log('wrong lenght (must be from 6 up to 12 chars');
        this.checkObj.pass = 'wrong lenght (must be from 6 up to 12 chars';
      }
    } else {
      this.checkObj.pass =
        'Password must have at least one special character, digit and lenght from 8-12';
    }
    console.log(this.checkObj);
  }
}
