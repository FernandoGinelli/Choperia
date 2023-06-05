import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { remult } from 'remult';
import { Produtos } from 'src/shared/Produtos';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EditarComponent } from '../cadastro-usuario/editar/editar.component';
import { FluxoComponent } from './fluxo/fluxo.component';
import { CompraClientesComponent } from './compra-clientes/compra-clientes.component';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
})
export class RelatoriosComponent implements OnInit {
  produtosRepo = remult.repo(Produtos);
  produtos: Produtos[] = [];
  produtosB: Produtos[] = [];
  produtosFalta: Produtos[] = [];
  produtosFaltaB: Produtos[] = [];
  constructor( private modalService: NgbModal){}


  gerarRelatorio() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Relatório de Saldo de Produtos da Cozinha:', 50, 20);

    this.criarTabela(doc, this.produtos, 50);

    doc.addPage();

    doc.text('Relatório de Saldo de Produtos do Chopp', 50, 20);

    this.criarTabela(doc, this.produtosB, 50);

    doc.save('Estoque.pdf');
  }

  criarTabelaRanking(doc: jsPDF, produtos: any[], startY: number) {
    const columns = [
      { header: 'Qtd Consumo', dataKey: 'nomeProduto' },
      { header: 'Nome do Produto', dataKey: 'nomeProduto' },
      { header: 'Codigo', dataKey: 'quantidadeProduto' },
      { header: 'Saldo', dataKey: 'quantidadeProduto' },
    ];

    const rows = produtos.map((produto) => [
      produto.consumidoXVezes,
      produto.nomeProduto,
      produto.codigoBarras,
      produto.quantidadeProduto.toString(),
    ]);

    autoTable(doc, {
      head: [columns.map((column) => column.header)],
      body: rows,
      startY: startY,
      styles: {
        fontSize: 12,
        halign: 'left',
      },
      columnStyles: {
        nomeProduto: { fontStyle: 'bold' },
        quantidadeProduto: { halign: 'right' },
      },
    });
  }

  criarTabela(doc: jsPDF, produtos: any[], startY: number) {
    const columns = [
      { header: 'Nome do Produto', dataKey: 'nomeProduto' },
      { header: 'Codigo', dataKey: 'quantidadeProduto' },
      { header: 'Saldo', dataKey: 'quantidadeProduto' },
    ];

    const rows = produtos.map((produto) => [
      produto.nomeProduto,
      produto.codigoBarras,
      produto.quantidadeProduto.toString(),
    ]);

    autoTable(doc, {
      head: [columns.map((column) => column.header)],
      body: rows,
      startY: startY,
      styles: {
        fontSize: 12,
        halign: 'left',
      },
      columnStyles: {
        nomeProduto: { fontStyle: 'bold' },
        quantidadeProduto: { halign: 'right' },
      },
    });
  }
  gerarRelatorioFalta() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Relatório de Produtos Com Baixo Saldo da Cozinha:', 50, 20);

    this.criarTabela(doc, this.produtosFalta, 50);

    doc.addPage();

    doc.text('Relatório de Produtos Com Baixo Saldo do Chopp', 50, 20);

    this.criarTabela(doc, this.produtosFaltaB, 50);

    doc.save('FaltaCozinha.pdf');
  }

  gerarRelatorioChopp() {
    const doc = new jsPDF();

    doc.text('Ranking Chopp mais vendidos', 50, 20);

    this.criarTabelaRanking(doc, this.produtosB, 40);

    doc.save('ChoppMaisVendido.pdf');
  }


  gerarRelatorioFluxo(){

    const options: NgbModalOptions = {
      backdrop: false, // Configuração para desativar o backdrop
      keyboard: true,
      centered: true
      // Configuração para desativar o fechamento do modal com a tecla ESC
    };
    var modalRef = this.modalService.open(FluxoComponent, options);
  }

  gerarRelatorioCliente(){
    const options: NgbModalOptions = {
      backdrop: false, // Configuração para desativar o backdrop
      keyboard: true,
      centered: true
      // Configuração para desativar o fechamento do modal com a tecla ESC
    };
    var modalRef = this.modalService.open(CompraClientesComponent, options);
  }

  ngOnInit(): void {
    this.produtosRepo
      .find({ where: { tipoProduto: { $contains: 'Alimento' } } })
      .then((items) => (this.produtos = items));
    this.produtosRepo
      .find({
        where: { tipoProduto: { $contains: 'Bebida' } },
        orderBy: { consumidoXVezes: 'desc' },
      })
      .then((items) => (this.produtosB = items));
    //this.produtosRepo.find({where:{ quantidadeProduto:["1","2","3","4","5","0"]}}).then((items) => (this.produtos = items));
    this.produtosRepo
      .find({
        where: {
          quantidadeProduto: { '<': '5' },
          tipoProduto: { $contains: 'Alimento' },
        },
      })
      .then((items) => (this.produtosFalta = items));
    this.produtosRepo
      .find({
        where: {
          quantidadeProduto: { '<': '5' },
          tipoProduto: { $contains: 'Bebida' },
        },
      })
      .then((items) => (this.produtosFaltaB = items));
  }
}
