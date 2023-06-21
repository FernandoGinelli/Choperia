// src/app/auth/auth.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { remult, UserInfo } from 'remult';
import { User } from 'src/shared/Users';
import { Caixa } from 'src/shared/caixa';
import { Fiscal } from 'src/shared/fiscalentrada';
import { FiscalSelf } from 'src/shared/fiscalself';
import { Cozinheiro } from 'src/shared/cozinheiro';
import { Repositor } from 'src/shared/repositor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  permissaoCaixa = remult.repo(Caixa);
  permissaoFiscal = remult.repo(Fiscal);
  permissaoRepositor = remult.repo(Repositor);
  permissaoCozinheiro = remult.repo(Cozinheiro);
  permissaoFiscalSelf = remult.repo(FiscalSelf);


  constructor(private http: HttpClient, private router: Router) {}


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

    }
    else if (this.users.find((user => user.name === this.signInUsername && user.password === this.signInSenha && user.roles.includes("FiscalEnt")))) {

      this.http
      .post<UserInfo>('/api/signIn', {
        username: "Fiscal de Entrada",
        password: "Fiscal de Entrada",
      })
      .subscribe({
        next: (user) => {
          this.remult.user = user;
          this.signInUsername = '';
          this.signInSenha = '';
        },
        error: (error) => alert(error.error),
      });}



      else if (this.users.find((user => user.name === this.signInUsername && user.password === this.signInSenha && user.roles.includes("cozin")))) {

        this.http
        .post<UserInfo>('/api/signIn', {
          username: "Cozinheiro",
          password: "Cozinheiro",
        })
        .subscribe({
          next: (user) => {
            this.remult.user = user;
            this.signInUsername = '';
            this.signInSenha = '';
          },
          error: (error) => alert(error.error),
        });}

        else if (this.users.find((user => user.name === this.signInUsername && user.password === this.signInSenha && user.roles.includes("Caixa")))) {

          this.http
          .post<UserInfo>('/api/signIn', {
            username: "Caixa",
            password: "Caixa",
          })
          .subscribe({
            next: (user) => {
              this.remult.user = user;
              this.signInUsername = '';
              this.signInSenha = '';
            },
            error: (error) => alert(error.error),
          });}
          else if (this.users.find((user => user.name === this.signInUsername && user.password === this.signInSenha && user.roles.includes("Cliente")))) {

            this.http
            .post<UserInfo>('/api/signIn', {
              username: "Cliente",
              password: "Cliente",
            })
            .subscribe({
              next: (user) => {
                this.remult.user = user;
                this.signInUsername = '';
                this.signInSenha = '';
              },
              error: (error) => alert(error.error),
            });}

          else if (this.users.find((user => user.name === this.signInUsername && user.password === this.signInSenha && user.roles.includes("Repositor")))) {

            this.http
            .post<UserInfo>('/api/signIn', {
              username: "Repositor de Estoque",
              password: "Repositor de Estoque",
            })
            .subscribe({
              next: (user) => {
                this.remult.user = user;
                this.signInUsername = '';
                this.signInSenha = '';
              },
              error: (error) => alert(error.error),
            });}


      else{
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
    this.router.navigate(['/']);


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
