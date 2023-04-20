import { Component, OnInit } from '@angular/core';
import { remult } from 'remult';
import { Produtos } from 'src/shared/Produtos';

@Component({
  selector: 'app-repor-chopp',
  templateUrl: './repor-chopp.component.html',
  styleUrls: ['./repor-chopp.component.css']
})
export class ReporChoppComponent implements OnInit {
  produtosRepo = remult.repo(Produtos);
  produtoss: Produtos[] = [];

  codigoBarras = '';
  nomeProduto = '';
  valorProduto = '';
  quantidadeProduto = '';
  tipoProduto = '';

  async addProdutos() {
    try {
      const produtoExistente = this.produtoss.find(
        (produto) => produto.codigoBarras === this.codigoBarras
      );
      if (produtoExistente && Number(produtoExistente.quantidadeProduto) > 0) {
        this.quantidadeProduto = (
          Number(produtoExistente.quantidadeProduto) + 100000
        ).toString();
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

  ngOnInit() {


    this.produtosRepo
      .find({where:{ tipoProduto:{ $contains:"Bebida" }}})
      .then((items: Produtos[]) => (this.produtoss = items));
  }
}