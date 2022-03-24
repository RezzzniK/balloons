import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
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
  checkName = '';
  showSpinner = false;
  constructor(
    private store: Store,
    private httpService: RequestsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        this.forbiddenUName.bind(this),
        // this.checkNamePass(this.user.username, this.user.password),
      ]),
      password: new FormControl('', [
        Validators.required,
        this.forbiddenPass.bind(this),
        // this.checkNamePass(this.user.username, this.user.password),
      ]),
    });
    //this.checkNamePass(this.user.username, this.user.password);
  }
  onSubmit() {
    this.user.username = this.loginForm.value['username'];
    this.user.password = this.loginForm.value['password'];
    //this.checkNamePass(this.user.username, this.user.password);
    this.store.dispatch(LoginInProcess({ user: this.user }));
    this.showSpinner = true;
  }
  forbiddenPass(control: FormControl): { [s: string]: boolean } {
    const regex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const test = regex.test(control.value);
    // console.log(control.value.length);
    // console.log(test);
    if (this.forbiddenPasswords.indexOf(control.value) !== -1) {
      this.checkObj.pass = 'restricted password';
      return { passIsForbiddent: true };
    } else if (!test) {
      this.checkObj.pass =
        'Password must have at least one special character, digit and lenght from 8-12';
      return { passIsForbiddent: true };
    } else if (control.value.length < 8 || control.value.length > 12) {
      this.checkObj.pass = 'wrong lenght (must be from 8 up to 12 chars';
      return { passIsForbiddent: true };
    } else {
      this.checkObj.pass = '';
      return null;
    }
  }

  forbiddenUName(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserName.indexOf(control.value) !== -1) {
      this.checkObj.name = 'restircted username';
      return { nameIsForbiddent: true };
    } else if (control.value.length > 25 || control.value.length < 4) {
      this.checkObj.name = 'wrong lenght (must be from 4 up to 25 chars)';
      return { nameIsForbiddent: true };
    } else {
      this.checkObj.name = '';
      return null;
    }
  }
}
