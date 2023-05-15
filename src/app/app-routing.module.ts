import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { TodoComponent } from './todo/todo.component';
import { RetirarProdutoComponent } from './retirar-produto/retirar-produto.component';
import { AdicionarProdutoComponent } from './adicionar-produto/adicionar-produto.component';
import { VincularClienteComponent } from './vincular-cliente/vincular-cliente.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ChoppComponent } from './chopp/chopp.component';
import { ReporChoppComponent } from './repor-chopp/repor-chopp.component';
import { CaixaComponent } from './caixa/caixa.component';
import { SelfServiceComponent } from './self-service/self-service.component';
import { EditProdComponent } from './edit-prod/edit-prod.component';
import { AcessoComponent } from './acesso/acesso.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: RetirarProdutoComponent },
  { path: 'products', component: ProdutosComponent },
  { path: 'cadusuario', component: CadastroUsuarioComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'retiprod', component: RetirarProdutoComponent },
  { path: 'addprod', component: AdicionarProdutoComponent },
  { path: 'cadclient', component: CadastroClienteComponent },
  {path: 'vincular', component: VincularClienteComponent },
  {path: 'saidachop', component: ChoppComponent},
  {path: 'entrachop', component: ReporChoppComponent},
  {path: 'caixa', component: CaixaComponent},
  {path: 'self', component: SelfServiceComponent},
  {path: 'editar', component: EditProdComponent},
  {path: 'verifica', component: AcessoComponent}


];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
