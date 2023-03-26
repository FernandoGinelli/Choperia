import { Component, OnInit } from '@angular/core';
import { remult } from 'remult';
import { Produtos } from 'src/shared/Produtos';
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})

export class ProdutosComponent implements OnInit {
  produtosRepo = remult.repo(Produtos)
  produtoss: Produtos[] = []

  codigoBarras = ""
  nomeProduto = ""
  valorProduto = ""
  quantidadeProduto =""
  tipoProduto = ""



  async addProdutos() {
    try {
      const newProdutos = await this.produtosRepo.insert({ codigoBarras: this.codigoBarras, nomeProduto: this.nomeProduto, valorProduto: this.valorProduto,quantidadeProduto: this.quantidadeProduto, tipoProduto: this.tipoProduto})
      this.produtoss.push(newProdutos)
      this.codigoBarras = ""
      this.nomeProduto = ""
      this. valorProduto = ""
      this.quantidadeProduto =""
      this.tipoProduto = ""
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


gerarPDF(codigoBarras: string) {
  codigoBarras;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
    putOnlyUsedFonts: true
  });


  // Adiciona o código de barras ao documento
  JsBarcode(doc.canvas, codigoBarras, {
    format: 'CODE128',
    displayValue: true,
    textAlign:"Center",
    fontSize: 10, // largura do código de barras em mm
    height: 40, // altura do código de barras em mm
  });

  // Salva o PDF e abre a janela de impressão
  doc.save('codigo_barras.pdf');
  doc.autoPrint();
}

ngOnInit() {
  this.produtosRepo.find().then((items) => (this.produtoss = items));
}


}



