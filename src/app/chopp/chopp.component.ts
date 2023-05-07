import { Component, OnInit } from '@angular/core';
import { Remult, remult } from 'remult';
import { Cartao } from 'src/shared/Cartao';
import { Clients } from 'src/shared/Clients';
import { Produtos } from 'src/shared/Produtos';

@Component({
  selector: 'app-chopp',
  templateUrl: './chopp.component.html',
  styleUrls: ['./chopp.component.css'],
})
export class ChoppComponent implements OnInit {
  produtosRepo = remult.repo(Produtos);
  produtoss: Produtos[] = [];
  userRepo = remult.repo(Clients);
  cartaoRepo = remult.repo(Cartao);
  cartoes: Cartao[] = [];
  user: Clients[] = [];
  produtoAux: Produtos = new Produtos;

  numero_cartao = '';


  codigoBarras = '';
  nomeProduto = '';
  valorProduto = '';
  quantidadeProduto = '';
  tipoProduto = '';
  mostrarListaProdutos: boolean = true;
  mostrarCamposCartao: boolean = false;

  async addProdutos() {
    try {
      const produtoExistente = this.produtoss.find(
        (produto) => produto.codigoBarras === this.produtoAux.codigoBarras
      );
      if (produtoExistente && Number(produtoExistente.quantidadeProduto)-500 > 0) {
        this.quantidadeProduto = (
          Number(produtoExistente.quantidadeProduto) - 500
        ).toString();
        this.mostrarListaProdutos = true;
        this.mostrarCamposCartao = false;
        produtoExistente.quantidadeProduto = this.quantidadeProduto;
        this.quantidadeProduto = '';
        this.codigoBarras = '';
        this.nomeProduto = '';
        this.valorProduto = '';
        this.tipoProduto = '';

        this.adicionarValor()

        await this.saveProdutos(produtoExistente);
      }
      else{
        alert("Estoque abaixo do nescessario")
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


  async saveCartao(user: Cartao) {
    try {
      await this.userRepo.save(user);
    } catch (error: any) {
      alert(error.message);
    }
  }

  get valorAPagar(){
    return 0
  }


  escolher(produto: Produtos){
    this.produtoAux = produto
    this.mostrarListaProdutos = false;
    this.mostrarCamposCartao = true;
  }


  async adicionarValor(){

    const cartao = await this.cartaoRepo.find({
      where: { cartao_vinculado: this.numero_cartao },
    });

    cartao[0].produtos.push({
      nome: this.produtoAux.nomeProduto,
      preco: Number(this.produtoAux.valorProduto)
    })


    this.saveCartao(cartao[0]);
    // limpa o campo após adicionar o cartão
    this.numero_cartao = '';
  }

  ngOnInit() {


    this.produtosRepo
      .find({where:{ tipoProduto:{ $contains:"Bebida" }}})
      .then((items: Produtos[]) => (this.produtoss = items));
  }
}
