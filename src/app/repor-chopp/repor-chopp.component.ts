import { Component, OnInit } from '@angular/core';
import { remult } from 'remult';
import { Fluxo } from 'src/shared/Fluxo';
import { Produtos } from 'src/shared/Produtos';

@Component({
  selector: 'app-repor-chopp',
  templateUrl: './repor-chopp.component.html',
  styleUrls: ['./repor-chopp.component.css']
})
export class ReporChoppComponent implements OnInit {
  produtosRepo = remult.repo(Produtos);
  produtoss: Produtos[] = [];
  fluxoRepo = remult.repo(Fluxo)
  fluxo: Fluxo[] = []

  codigoBarras = '';
  nomeProduto = '';
  valorProduto = '';
  quantidadeProduto = '';
  tipoProduto = '';
  custo=""


  async addProdutos() {
    try {
      const produtoExistente = this.produtoss.find(
        (produto) => produto.codigoBarras === this.codigoBarras
      );
      if (produtoExistente) {
        this.quantidadeProduto = (
          Number(produtoExistente.quantidadeProduto) + 100000
        ).toString();
        this.addfluxo(produtoExistente.custo)
        produtoExistente.quantidadeProduto = this.quantidadeProduto;
        this.quantidadeProduto = '';
        this.codigoBarras = '';
        this.nomeProduto = '';
        this.valorProduto = '';
        this.tipoProduto = '';
        await this.saveProdutos(produtoExistente);
      }
      this.codigoBarras = '';
    } catch (error: any) {
      alert(error.message);
    }
    this.ngOnInit()
  }

  async saveProdutos(produtos: Produtos) {
    try {
      await this.produtosRepo.save(produtos);
    } catch (error: any) {
      alert(error.message);
    }
  }
  // src/app/todo/todo.component.ts

  async deleteProdutos(produtos: Produtos) {
    await this.produtosRepo.delete(produtos);
    this.produtoss = this.produtoss.filter((t) => t !== produtos);
  }


  async addfluxo(custo: any){
    const currentDate = new Date();


    try{
      const teste = this.fluxo.find((fluxo) => fluxo.data.ano == currentDate.getFullYear().toString() && fluxo.data.dia == currentDate.getDate().toString() && fluxo.data.mes == (currentDate.getMonth()+1).toString())

      if (teste) {
        teste.despesas = teste.despesas+ Number(custo)

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


async saveFluxo(produtos: Fluxo) {
  try {
    await this.fluxoRepo.save(produtos)
  } catch (error: any) {
    alert(error.message)
  }
}
// src

  ngOnInit() {


    this.produtosRepo
      .find({where:{ tipoProduto:{ $contains:"Bebida" }}})
      .then((items: Produtos[]) => (this.produtoss = items));
  
  this.fluxoRepo
      .find()
      .then((items: Fluxo[]) => (this.fluxo = items));
  
  }
}
