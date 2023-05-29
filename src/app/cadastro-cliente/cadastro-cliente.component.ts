import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult } from 'remult';
import { Cartao } from 'src/shared/Cartao';
import { Clients } from 'src/shared/Clients';
import { Produtos } from 'src/shared/Produtos';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css'],
})
export class CadastroClienteComponent implements OnInit {
  constructor(private router: Router) {}

  cartaoRepo = remult.repo(Cartao);

  produtosRepo = remult.repo(Produtos);
  produtos: Produtos[] = [];
  cartoes: Cartao[] = [];

  userRepo = remult.repo(Clients);
  users: Clients[] = [];

  nome = '';
  email = '';
  cpf = '';
  telefone = '';

  async addUser() {
    try {
      const newUser = await this.userRepo.insert({
        name: this.nome,
        email: this.email,
        cpf: this.cpf,
        telefone: this.telefone,
      });
      this.users.push(newUser);
      this.nome = '';
      this.email = '';
      this.cpf = '';
      this.telefone = '';
    } catch (error: any) {
      alert(error.message);
    }
    this.userRepo.find().then((items) => (this.users = items));
    this.cartaoRepo.find().then((items) => (this.cartoes = items));
  }

  async saveUser(user: Clients) {
    try {
      await this.userRepo.save(user);
    } catch (error: any) {
      alert(error.message);
    }
    this.userRepo.find().then((items) => (this.users = items));
    this.cartaoRepo.find().then((items) => (this.cartoes = items));

  }
  // src/app/todo/todo.component.ts

  async deleteUser(user: Clients) {
    if (await this.verifica(user)) {
      await this.userRepo.delete(user);
      this.users = this.users.filter((t) => t !== user);
      await this.cartaoRepo.delete({cartao_vinculado:user.cartao_vinculado});
    }else{
      alert("Não é possivel deletar devido a vinculo.")
    }

  }

  navegarParaVincular(cliente: Clients) {
    this.router.navigate(['/vincular'], { state: { cliente } });
  }

  verifica(user: Clients) {
    var i = 0;
    while (i < this.cartoes.length) {
      if (user.cartao_vinculado == this.cartoes[i].cartao_vinculado) {

        if ((this.cartoes[i].produtos.length < 1 )&& (user.compras.length < 1)) {

          return true;
        }
         else {

          return false;
        }
      }

      i++;
    }
    return true

  }

  ngOnInit() {
    this.userRepo.find().then((items) => (this.users = items));
    this.cartaoRepo.find().then((items) => (this.cartoes = items));
  }
}
