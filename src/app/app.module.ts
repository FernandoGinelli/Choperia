import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AcessoComponent } from "./acesso/acesso.component";
import { AdicionarProdutoComponent } from "./adicionar-produto/adicionar-produto.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { CadastroClienteComponent } from "./cadastro-cliente/cadastro-cliente.component";
import { CadastroUsuarioComponent } from "./cadastro-usuario/cadastro-usuario.component";
import { EditarComponent } from "./cadastro-usuario/editar/editar.component";
import { CaixaComponent } from "./caixa/caixa.component";
import { ChoppComponent } from "./chopp/chopp.component";
import { ButtontypeOkComponent } from "./components/buttontype-ok/buttontype-ok.component";
import { EditProdComponent } from "./edit-prod/edit-prod.component";
import { ProdutosComponent } from "./produtos/produtos.component";
import { ReporChoppComponent } from "./repor-chopp/repor-chopp.component";
import { RetirarProdutoComponent } from "./retirar-produto/retirar-produto.component";
import { SelfServiceComponent } from "./self-service/self-service.component";
import { TodoComponent } from "./todo/todo.component";
import { VincularClienteComponent } from "./vincular-cliente/vincular-cliente.component";
import { RelatoriosComponent } from './relatorios/relatorios.component';




@NgModule({
  declarations: [AppComponent, TodoComponent, AuthComponent, CadastroUsuarioComponent, ProdutosComponent, RetirarProdutoComponent, AdicionarProdutoComponent, CadastroClienteComponent, VincularClienteComponent, ChoppComponent, ReporChoppComponent, CaixaComponent, SelfServiceComponent, EditProdComponent, AcessoComponent, ButtontypeOkComponent, EditarComponent, RelatoriosComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, RouterModule, AppRoutingModule],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {}
