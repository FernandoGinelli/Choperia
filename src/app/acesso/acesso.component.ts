import { Component } from '@angular/core';
import { remult } from 'remult';
import { timer } from 'rxjs';
import { Cartao } from 'src/shared/Cartao';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent {
  cartaoRepo = remult.repo(Cartao);



  passou = false
  espera = true
  numero_cartao = ""


  total = 0; // nova propriedade para armazenar o total

  get valorT(){
    return this.total
  }

  async addCartao() {
    const cartao = await this.cartaoRepo.find({
      where:{ cartao_vinculado: this.numero_cartao}});

      var i = 0
      while (i < cartao[0].produtos.length)
      {

        this.total += Number(cartao[0].produtos[i].preco);
        i++
      }

      //this.cartoes.push(cartao[0])
    // limpa o campo após adicionar o cartão
    this.numero_cartao = "";
  }


  async verificaAcesso(){
    this.total = 0
    this.addCartao()

    this.espera = false


    timer(3000).subscribe(() => {
      this.espera = true
    });
  }
}
