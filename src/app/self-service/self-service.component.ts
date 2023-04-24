import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult } from 'remult';
import { async } from 'rxjs';
import { Cartao } from 'src/shared/Cartao';
import { Clients } from 'src/shared/Clients';

@Component({
  selector: 'app-self-service',
  templateUrl: './self-service.component.html',
  styleUrls: ['./self-service.component.css'],
})
export class SelfServiceComponent implements OnInit {
  constructor(private router: Router) {}

  userRepo = remult.repo(Clients);
  cartaoRepo = remult.repo(Cartao);
  cartoes: Cartao[] = [];
  user: Clients[] = [];

  numero_cartao = '';

  multiplicado_self_service = 1; // nova propriedade para armazenar o multiplicado_self_service

  async addCartao() {
    const cartao = await this.cartaoRepo.find({
      where: { cartao_vinculado: this.numero_cartao },
    });

    this.multiplicado_self_service += Number(cartao[0].conta) + 1;
    this.cartoes.push(cartao[0]);
    // limpa o campo após adicionar o cartão
    this.numero_cartao = '';
  }

  peso: number = 0;

  get valorAPagar() {
    return this.peso * this.multiplicado_self_service;
  }

  pagar() {
    if (this.peso < this.multiplicado_self_service) {
      alert('Valor pago é menor que o multiplicado_self_service!');
      return;
    } else {
      this.deleteProdutos();
    }

    // Aqui você pode executar as operações de pagamento e atualizar a tabela de cartões
  }

  async deleteProdutos() {
    var i = 0;
    var j = 0;
    while (i < this.cartoes.length) {
      while (j < this.user.length) {
        if (
          this.user[j].cartao_vinculado === this.cartoes[i].cartao_vinculado
        ) {
          this.user[j].cartao_vinculado = '';
          var user = this.user[j];
          this.saveUser(user);
        }
        j++;
      }
      j = 0;
      await this.cartaoRepo.delete(this.cartoes[i]);
      i++;
    }

    this.cartoes = [];
    this.multiplicado_self_service = 0;
    this.peso = 0;
    alert('Tudo, pago.');
  }

  async saveUser(user: Clients) {
    try {
      await this.userRepo.save(user);
    } catch (error: any) {
      alert(error.message);
    }
  }


  async saveCartao(user: Cartao) {
    try {
      await this.userRepo.save(user);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async adicionarValor(){

    const cartao = await this.cartaoRepo.find({
      where: { cartao_vinculado: this.numero_cartao },
    });

    cartao[0].conta  += this.valorAPagar
    var card =
    this.saveCartao(cartao[0]);
    // limpa o campo após adicionar o cartão
    this.numero_cartao = '';
  }
  cancelar() {}
  ngOnInit() {
    this.cartoes = [];
    this.multiplicado_self_service = 0;
    this.peso = 0;

    this.userRepo.find().then((items) => (this.user = items));
  }
}
