import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { TodoComponent } from './todo/todo.component';
import { RetirarProdutoComponent } from './retirar-produto/retirar-produto.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: RetirarProdutoComponent },
  { path: 'products', component: ProdutosComponent },
  { path: 'cadusuario', component: CadastroUsuarioComponent },
  { path: 'todo', component: TodoComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
