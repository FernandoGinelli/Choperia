import { Component, OnInit } from '@angular/core';
import {
  NgbDate,
  NgbActiveModal,
  NgbCalendar,
} from '@ng-bootstrap/ng-bootstrap';
import autoTable from 'jspdf-autotable';
import { remult } from 'remult';
import { Fluxo } from 'src/shared/Fluxo';
import jsPDF from 'jspdf';
import { Clients } from 'src/shared/Clients';
import { Produtos } from 'src/shared/Produtos';

@Component({
  selector: 'app-compra-clientes',
  templateUrl: './compra-clientes.component.html',
  styleUrls: ['./compra-clientes.component.scss'],
})
export class CompraClientesComponent implements OnInit{
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  clientes: Clients[] = [];
  clientesRepo = remult.repo(Clients);
  produtosRepo = remult.repo(Produtos)
  produtos: Produtos[] = []
  constructor(public activeModal: NgbActiveModal, calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  role = '';





  funcao() {
    this.atualizaNomes()



    this.fromDate;
    this.toDate;
    const from = new Date(
      this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day
    );

    var toDa = new Date();
    if (this.toDate) {
      toDa = new Date(
        this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day
      );
    }

    var fluxoAux: Clients[] = [];

    fluxoAux = this.clientes.filter(function (fluxo) {

      for (const compra in fluxo.compras) {
        if (fluxo.compras.hasOwnProperty(compra)) {
          const compraAtual = fluxo.compras[compra];
          var fluxoData = new Date(
            compraAtual.data.ano +
              '-' +
              compraAtual.data.mes +
              '-' +
              compraAtual.data.dia
          );

          if (fluxoData >= from && fluxoData <= toDa) {
          } else {
            fluxo.compras.splice(
              fluxo.compras.indexOf(fluxo.compras[compra]),
              1
            );
          }
        }
      }
      if (fluxo.compras.length >= 1) {
        return fluxo;
      } else return;
    });

    const sortedClients = fluxoAux.sort((a, b) => {
      const valorTotalA = a.compras.reduce(
        (total, compra) =>
          total +
          compra.produtos.reduce((subtotal, produto) => subtotal + produto.preco, 0),
        0
      );

      const valorTotalB = b.compras.reduce(
        (total, compra) =>
          total +
          compra.produtos.reduce((subtotal, produto) => subtotal + produto.preco, 0),
        0
      );

      return valorTotalB - valorTotalA; // Ordena em ordem decrescente pelo valor total
    });

    const result = sortedClients.map((client) => {
      const comprasCliente = client.compras.map((compra) => {
        const itensComprados = compra.produtos.map((produto) => ({
          NomeProduto: produto.nome,
          ValorProduto: produto.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        }));

        return {
          DataCompra: `${compra.data.dia}/${compra.data.mes}/${compra.data.ano}`,
          ItensComprados: itensComprados,
        };
      });

      const valorTotal = client.compras.reduce(
        (total, compra) =>
          total +
          compra.produtos.reduce((subtotal, produto) => subtotal + produto.preco, 0),
        0
      );

      return {
        NomeCliente: client.name,
        ValorComprado: valorTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        Compras: comprasCliente,
      };
    });

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Consumo de Cliente por período:', 50, 20);

    const tableData = result.flatMap((item) => {
      const rows = [['__________________','________________________________'],
        [item.NomeCliente, item.ValorComprado],
        ['DATA', 'Itens Comprados'],
      ];

      item.Compras.forEach((compra) => {
        rows.push([compra.DataCompra, '']);
        compra.ItensComprados.forEach((itemComprado) => {
          rows.push(['', `${itemComprado.NomeProduto} - ${itemComprado.ValorProduto}`]);
        });
      });

      return rows;
    });

    autoTable(doc, {
      head: [['Nome do Cliente', 'Valor Comprado']],
      body: tableData,
      startY: 30,
      styles: {

        fontSize: 12,
        halign: 'left',

      },
      columnStyles: {
        0: { fontStyle: 'bold' }, // Aplica negrito à primeira coluna (nome do cliente)
      },
    });

    doc.save('Relatorio_Consumo_Clients.pdf');
  }
  async atualizaNomes() {
    for (let i = 0; i < this.clientes.length; i++) {
      const cliente = this.clientes[i];

      if (cliente.compras && cliente.compras.length > 0) {
        for (let j = 0; j < cliente.compras.length; j++) {
          const compra = cliente.compras[j];

          if (compra.produtos && compra.produtos.length > 0) {
            for (let k = 0; k < compra.produtos.length; k++) {
              const produto = compra.produtos[k];

              const produtoEncontrado = this.produtos.find(
                (p) => p.codigoBarras === produto.ide
              );

              if (produtoEncontrado) {
                produto.nome = produtoEncontrado.nomeProduto;
              }
            }
          }
        }
      }
    }
  }






   ngOnInit(): void{

    this.clientesRepo.find().then((items: Clients[]) => (this.clientes = items));
    this.produtosRepo.find().then((items: Produtos[]) => (this.produtos = items));
    this.atualizaNomes()
    this.clientesRepo.find().then((items: Clients[]) => (this.clientes = items));




  }
}
