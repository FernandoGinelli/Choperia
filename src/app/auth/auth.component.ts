// src/app/auth/auth.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { remult, UserInfo } from 'remult';
import { User } from 'src/shared/Users';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private http: HttpClient) {}


  usersRepo = remult.repo(User);
  users: User[] = []
  private  = this.usersRepo.find().then((users) => (this.users = users));


  signInUsername = '';
  signInSenha = '';
  remult = remult;
  validUsers: UserInfo[] = [];
  signIn() {



    if (this.users.find((user => user.name === this.signInUsername && user.password === this.signInSenha && user.roles.includes("admin")))) {

      this.http
      .post<UserInfo>('/api/signIn', {
        username: "Admin",
        password: "Admin",
      })
      .subscribe({
        next: (user) => {
          this.remult.user = user;
          this.signInUsername = '';
          this.signInSenha = '';
        },
        error: (error) => alert(error.error),
      });
    }
    else if (this.users.find((user => user.name === this.signInUsername && user.password === this.signInSenha && user.roles.includes("fisSelf")))) {

      this.http
      .post<UserInfo>('/api/signIn', {
        username: "FiscalSelf",
        password: "FiscalSelf",
      })
      .subscribe({
        next: (user) => {
          this.remult.user = user;
          this.signInUsername = '';
          this.signInSenha = '';
        },
        error: (error) => alert(error.error),
      });
    }else{
      this.http
      .post<UserInfo>('/api/signIn', {
        username: "x",
        password: "x",
      })
      .subscribe({
        next: (user) => {
          this.remult.user = user;
          this.signInUsername = '';
          this.signInSenha = '';
        },
        error: (error) => alert(error.error),
      });
    }

  }

  signOut() {
    this.http
      .post('/api/signOut', {})
      .subscribe(() => (this.remult.user = undefined));
      this.private  = this.usersRepo.find().then((users) => (this.users = users));
  }



  ngOnInit() {
    this.private  = this.usersRepo.find().then((users) => (this.users = users));
    this.http
      .get<User>('/api/currentUser')
      .subscribe((user) => (this.remult.user = user));
  }
}
