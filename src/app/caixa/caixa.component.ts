import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult } from 'remult';
import { async, find } from 'rxjs';
import { Cartao } from 'src/shared/Cartao';
import { Clients } from 'src/shared/Clients';
import { Fluxo } from 'src/shared/Fluxo';
import { Produtos } from 'src/shared/Produtos';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { User } from 'src/shared/Users';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit{
  constructor(private router: Router) {}

userRepo = remult.repo(Clients);
cartaoRepo = remult.repo(Cartao);
produtosRepo = remult.repo(Produtos);
produtos: Produtos[] =[]
cartoes: Cartao[] = []
user: Clients[] = []
fluxoRepo = remult.repo(Fluxo)
fluxo: Fluxo[] = []


numero_cartao = ""



total = 0; // nova propriedade para armazenar o total

async addCartao() {
  const verificador = this.cartoes.find((cartao)=> cartao.cartao_vinculado == this.numero_cartao)
  if (verificador) {
    alert("cartão adicionado")
  }else{
  const cartao = await this.cartaoRepo.find({
    where:{ cartao_vinculado: this.numero_cartao}});

    var i = 0
    while (i < cartao[0].produtos.length)
    {

      this.total += Number(cartao[0].produtos[i].preco);
      i++
    }
    i = 0

    while (i < cartao[0].produtos.length)
    {

      if (cartao[0].produtos[i].ide != "comida") {
      this.produtos = await this.produtosRepo.find({
      where:{ codigoBarras: cartao[0].produtos[i].ide}});
      cartao[0].produtos[i].nome =  this.produtos[0].nomeProduto;
    }

      i++
    }

    cartao[0].produtos
    this.cartoes.push(cartao[0])
  // limpa o campo após adicionar o cartão
}
  this.numero_cartao = "";
}



valorPago: number = 0;

get troco() {
  if (this.valorPago - this.total<0) {
    return 0
  }
  return this.valorPago - this.total;
}

pagar() {
  if (this.valorPago < this.total) {
    alert("Valor pago é menor que o total!");

    return;
  }else{
    this.addfluxo(this.total)
    this.deleteProdutos()
  }

  // Aqui você pode executar as operações de pagamento e atualizar a tabela de cartões
}


async deleteProdutos() {
  this.nota_fiscal()
  var i = 0
  var j =0
  while (i< this.cartoes.length) {
    while (j< this.user.length) {
      if (this.user[j].cartao_vinculado == this.cartoes[i].cartao_vinculado) {
        //this.user[j].cartao_vinculado = ""
        const hoje = new Date()

        this.user[j].compras.push({
          data:{dia: hoje.getDate().toString(),mes: (hoje.getMonth()+1).toString(), ano: hoje.getFullYear().toString() },
          produtos: this.cartoes[i].produtos
        })
        this.cartoes[i].produtos = []
        this.cartoes[i].total = "0"
        var user = this.user[j]
        this.saveUser(user)
      }
      j++
    }
    j = 0
    
    //await this.cartaoRepo.delete(this.cartoes[i]);
    i++
  }
  await this.cartaoRepo.save(this.cartoes);
  this.cartoes = []
  this.total =0
  this.valorPago =0
  alert("Tudo, pago.")
}



async addfluxo(vendas: any){
  const currentDate = new Date();


  try{
    const teste = this.fluxo.find((fluxo) => fluxo.data.ano == currentDate.getFullYear().toString() && fluxo.data.dia == currentDate.getDate().toString() && fluxo.data.mes == (currentDate.getMonth()+1).toString())

    if (teste) {
      teste.vendas = teste.vendas+vendas

      await this.saveFluxo(teste)
    }
    else{
      this.fluxoRepo.insert({vendas: vendas})

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


async saveUser(user: Clients) {
  try {
    await this.userRepo.save(user)
  } catch (error: any) {
    alert(error.message)
  }
}

cancelar(){
  this.cartoes = []
  this.total =0
  this.valorPago =0
}

nota_fiscal() {
  this.gerarPDF()
}



gerarPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
    putOnlyUsedFonts: true
  });

  const mywindow = window.open('', '', 'height=800');

  const svg: any = document.getElementById("divCodigoBarras");

  const image = document.createElement('img');
  image.src = svg!.toDataURL();
  image.style.width = '100px';
  image.style.margin = '10px';

  const divPrincipal = document.createElement('div');
  const notaFiscal = this.gerarNotaFiscal();

  // Adiciona o estilo para manter as quebras de linha
  divPrincipal.style.whiteSpace = 'pre-wrap';

  // Cria um elemento de parágrafo para a nota fiscal
  const paragraph = document.createElement('p');
  paragraph.innerText = notaFiscal;

  divPrincipal.appendChild(paragraph);

  mywindow!.document.body.appendChild(divPrincipal);

  mywindow!.print();
}



gerarNotaFiscal(): string {
  const documentTitle = "Choperia\n-----------------------------------------------------";
  const total = this.total;
  var quantidade = 1

  let documentContent = `${documentTitle}\n\nProdutos:\n`;

  for (const cartao of this.cartoes) {
    documentContent += `\nCartão: ${cartao.cartao_vinculado}\n`;
    for (const produto of cartao.produtos) {
      documentContent += ` ${quantidade} - ${produto.ide} - ${produto.nome} - R$${produto.preco.toFixed(2)}\n`;
      quantidade++
    }
  }

  documentContent += `\nTotal: R$${total.toFixed(2)}`;
  var valorPago= total+this.troco
  documentContent += `\nValor Pago: R$${valorPago.toFixed(2)}`;
  documentContent += `\nTroco: R$${this.troco.toFixed(2)}\n\n-----------------------------------------------------`;
  
  return documentContent;
}

ngOnInit() {
  this.cartoes = []
  this.total =0
  this.valorPago =0

  this.userRepo.find().then((items) => (this.user = items));
  this.fluxoRepo
      .find()
      .then((items: Fluxo[]) => (this.fluxo = items));
  }

}


