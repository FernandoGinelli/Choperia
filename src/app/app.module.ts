// src/app/app.module.ts

import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HttpClientModule } from "@angular/common/http"
import { FormsModule } from "@angular/forms"

import { AppComponent } from "./app.component";
import { TodoComponent } from './todo/todo.component';
import { AuthComponent } from './auth/auth.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { ProdutosComponent } from './produtos/produtos.component'
import { RouterModule } from "@angular/router";
import { RetirarProdutoComponent } from './retirar-produto/retirar-produto.component';
import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent, TodoComponent, AuthComponent, CadastroUsuarioComponent, ProdutosComponent, RetirarProdutoComponent, AdicionarProdutoComponent],
  imports: [ BrowserModule, HttpClientModule, FormsModule, RouterModule, AppRoutingModule],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {}
