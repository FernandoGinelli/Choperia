import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult } from 'remult';
import { Fluxo } from 'src/shared/Fluxo';
import { Produtos } from 'src/shared/Produtos';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {
  produtosRepo = remult.repo(Produtos)
  produtoss: Produtos[] = []
  fluxoRepo = remult.repo(Fluxo)
  fluxo: Fluxo[] = []

  codigoBarras = ""
  nomeProduto = ""
  valorProduto = ""
  tipoProduto = ""
  custo=""

  async addProdutos() {
    try {
      const produtoExistente = this.produtoss.find((produto) => produto.codigoBarras === this.codigoBarras);
      if (produtoExistente && produtoExistente.tipoProduto == "Alimento" ) {
        produtoExistente.quantidadeProduto += 1;
        this.addfluxo(produtoExistente.custo)
        await this.saveProdutos(produtoExistente);
      } else {
        const newProdutos = await this.produtosRepo.insert({ codigoBarras: this.codigoBarras, nomeProduto: this.nomeProduto, valorProduto: this.valorProduto, tipoProduto: this.tipoProduto})
        this.produtoss.push(newProdutos);
      }
      this.codigoBarras = ""

    } catch (error: any) {
      alert(error.message)
    }
  }

  async addfluxo(custo: any){
    const currentDate = new Date();

    alert(currentDate.getFullYear().toString() + currentDate.getDate().toString()+ (currentDate.getMonth()+1).toString())

    try{
      const teste = this.fluxo.find((fluxo) => fluxo.data.ano == currentDate.getFullYear().toString() && fluxo.data.dia == currentDate.getDate().toString() && fluxo.data.mes == (currentDate.getMonth()+1).toString())

      if (teste) {
        teste.despesas = teste.despesas+custo

        alert(teste)
        await this.saveFluxo(teste)
      }
      else{
        this.fluxoRepo.insert({despesas: custo})

      }

    }
    catch(error: any) {

      alert(error.message)
    }finally{
      this.ngOnInit()
    }



}
async saveProdutos(produtos: Produtos) {
  try {
    await this.produtosRepo.save(produtos)
  } catch (error: any) {
    alert(error.message)
  }
}

async saveFluxo(produtos: Fluxo) {
  try {
    await this.fluxoRepo.save(produtos)
  } catch (error: any) {
    alert(error.message)
  }
}
// src/app/todo/todo.component.ts

async deleteProdutos(produtos: Produtos) {
  await this.produtosRepo.delete(produtos);
  this.produtoss = this.produtoss.filter(t => t !== produtos);
}



ngOnInit() {
  this.produtosRepo
      .find({where:{ tipoProduto:{ $contains:"Alimento" }}})
      .then((items: Produtos[]) => (this.produtoss = items));

      const currentDate = new Date();
  this.fluxoRepo
      .find()
      .then((items: Fluxo[]) => (this.fluxo = items));
  }
}





