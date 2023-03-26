import { Component, OnInit } from '@angular/core';
import { remult } from 'remult';
import { Produtos } from 'src/shared/Produtos';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {
  produtosRepo = remult.repo(Produtos)
  produtoss: Produtos[] = []

  codigoBarras = ""
  nomeProduto = ""
  valorProduto = ""
  quantidadeProduto =""
  tipoProduto = ""

  async addProdutos() {
    try {
      const produtoExistente = this.produtoss.find((produto) => produto.codigoBarras === this.codigoBarras);
      if (produtoExistente) {
        produtoExistente.quantidadeProduto += 1;
        await this.saveProdutos(produtoExistente);
      } else {
        const newProdutos = await this.produtosRepo.insert({ codigoBarras: this.codigoBarras, nomeProduto: this.nomeProduto, valorProduto: this.valorProduto,quantidadeProduto: this.quantidadeProduto, tipoProduto: this.tipoProduto})
        this.produtoss.push(newProdutos);
      }
      this.codigoBarras = ""

    } catch (error: any) {
      alert(error.message)
    }
  }


async saveProdutos(produtos: Produtos) {
  try {
    await this.produtosRepo.save(produtos)
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
  this.produtosRepo.find().then((items) => (this.produtoss = items));
}


}


