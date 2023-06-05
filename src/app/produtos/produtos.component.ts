import { Component, OnInit, ViewChild } from '@angular/core';
import { remult } from 'remult';
import { Produtos } from 'src/shared/Produtos';
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, timer } from 'rxjs';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})

export class ProdutosComponent implements OnInit {
  produtosRepo = remult.repo(Produtos)
  produtoss: Produtos[] = []
  @ViewChild('divCodigoBarras') divCodigoBarras!: any;
  constructor(private router: Router) { }

  filter = "";


  codigoBarras = ""
  nomeProduto = ""
  valorProduto = ""
  custo =""
  quantidadeProduto =""
  tipoProduto = 'Alimento';






  async addProdutos() {
    try {
      const newProdutos = await this.produtosRepo.insert({ codigoBarras: this.codigoBarras, nomeProduto: this.nomeProduto, valorProduto: this.valorProduto, custo: this.custo, tipoProduto: this.tipoProduto})
      this.produtoss.push(newProdutos)
      this.codigoBarras = ""
      this.nomeProduto = ""
      this. valorProduto = ""
      this.quantidadeProduto =""
      this.tipoProduto = 'Alimento';

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
  if (produtos.consumidoXVezes<1) {
    await this.produtosRepo.delete(produtos);
    this.produtoss = this.produtoss.filter(t => t !== produtos);
  }
  else{
    alert("Produto não pode ser removido, pois ja foi movimentado")
  }
}


gerarPDF = async (codigoBarras: string) => {
  codigoBarras;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
    putOnlyUsedFonts: true
  });


  // Adiciona o código de barras ao documento
  await JsBarcode("#divCodigoBarras", codigoBarras, {
    format: 'CODE128',
    displayValue: true,
    textAlign:"Center",
    fontSize: 10, // largura do código de barras em mm
    height: 40, // altura do código de barras em mm
  });

  // Salva o PDF e abre a janela de impressão


  const mywindow = window.open('', '', 'height=800');

  var svg: any = document.getElementById("divCodigoBarras");


  const image = document.createElement('img');
  image.src = svg!.toDataURL();

  image.style.width = '100px'
  image.style.margin = '10px'


  const divPrincipal = document.createElement('div');

  divPrincipal.append(image!.cloneNode(), image!.cloneNode(), image!.cloneNode());


  // svg!.style.height = '500px';
  // svg!.style.fontSize = '500px';

  mywindow!.document.body.appendChild(divPrincipal!);


   mywindow!.print();

}

navegarParaEditar(cliente: Produtos) {
  this.router.navigate(['/editar'], { state: { cliente } });
}

atualiza(){

  this.produtosRepo.find({where: {nomeProduto:{$contains: this.filter}}}).then((items) => (this.produtoss = items));

  console.log(this.filter)

}

ngOnInit() {
  this.produtosRepo.find().then((items) => (this.produtoss = items));

}


}


