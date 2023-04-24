import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult } from 'remult';
import { Cartao } from 'src/shared/Cartao';
import { Clients } from 'src/shared/Clients';
import { User } from 'src/shared/Users';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit{
  constructor(private router: Router) {}

userRepo = remult.repo(Clients);
cartaoRepo = remult.repo(Cartao);
cartoes: Cartao[] = []
user: Clients[] = []

numero_cartao = ""



total = 0; // nova propriedade para armazenar o total

async addCartao() {
  const cartao = await this.cartaoRepo.find({
    where:{ cartao_vinculado: this.numero_cartao}});


    this.total += Number(cartao[0].conta)+1;
    this.cartoes.push(cartao[0])
  // limpa o campo após adicionar o cartão
  this.numero_cartao = "";
}



valorPago: number = 0;

get troco() {
  return this.valorPago - this.total;
}

pagar() {
  if (this.valorPago < this.total) {
    alert("Valor pago é menor que o total!");
    return;
  }else{
    this.deleteProdutos()
  }

  // Aqui você pode executar as operações de pagamento e atualizar a tabela de cartões
}


async deleteProdutos() {
  var i = 0
  var j =0
  while (i< this.cartoes.length) {
    while (j< this.user.length) {
      if (this.user[j].cartao_vinculado === this.cartoes[i].cartao_vinculado) {
        this.user[j].cartao_vinculado= ""
        var user = this.user[j]
        this.saveUser(user)
      }
      j++
    }
    j = 0
    await this.cartaoRepo.delete(this.cartoes[i]);
    i++
  }

  this.cartoes = []
  this.total =0
  this.valorPago =0
  alert("Tudo, pago.")
}



async saveUser(user: Clients) {
  try {
    await this.userRepo.save(user)
  } catch (error: any) {
    alert(error.message)
  }
}

cancelar(){}
ngOnInit() {
  this.cartoes = []
  this.total =0
  this.valorPago =0

  this.userRepo.find().then((items) => (this.user = items));

}

}
