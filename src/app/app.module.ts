import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AcessoComponent } from './acesso/acesso.component';
import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { AuthComponent } from './auth/auth.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { EditarComponent } from './cadastro-usuario/editar/editar.component';
import { CaixaComponent } from './caixa/caixa.component';
import { ChoppComponent } from './chopp/chopp.component';
import { ButtontypeOkComponent } from './components/buttontype-ok/buttontype-ok.component';
import { EditProdComponent } from './edit-prod/edit-prod.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { ReporChoppComponent } from './repor-chopp/repor-chopp.component';
import { RetirarProdutoComponent } from './retirar-produto/retirar-produto.component';
import { SelfServiceComponent } from './self-service/self-service.component';
import { TodoComponent } from './todo/todo.component';
import { VincularClienteComponent } from './vincular-cliente/vincular-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbdCollapseNavbar } from './collapse-navbar';
import { FluxoComponent } from './relatorios/fluxo/fluxo.component';
import { CompraClientesComponent } from './relatorios/compra-clientes/compra-clientes.component';
import { EmailClientesComponent } from './relatorios/email-clientes/email-clientes.component';
import { EmailService } from './relatorios/email-clientes/email.service';

@NgModule({
  declarations: [
    AppComponent, TodoComponent, AuthComponent, CadastroUsuarioComponent, ProdutosComponent, RetirarProdutoComponent, AdicionarProdutoComponent, CadastroClienteComponent, VincularClienteComponent, ChoppComponent, ReporChoppComponent, CaixaComponent, SelfServiceComponent, EditProdComponent, AcessoComponent, ButtontypeOkComponent, EditarComponent, RelatoriosComponent, FluxoComponent, CompraClientesComponent, EmailClientesComponent
  ],
  imports: [NgbdCollapseNavbar,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule, FormsModule
  ],
  providers: [EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
