import { Component, OnInit } from '@angular/core';
import {
  NgbDate,
  NgbActiveModal,
  NgbCalendar,
} from '@ng-bootstrap/ng-bootstrap';
import autoTable from 'jspdf-autotable';
import { remult } from 'remult';
import { Clients } from 'src/shared/Clients';
import { Produtos } from 'src/shared/Produtos';
import jsPDF from 'jspdf';
import * as nodemailer from 'nodemailer';
import { HttpClient } from '@angular/common/http';
import { email } from 'src/server/email';

@Component({
  selector: 'app-email-clientes',
  templateUrl: './email-clientes.component.html',
  styleUrls: ['./email-clientes.component.scss'],
})
export class EmailClientesComponent implements OnInit {
  to: string[];
  subject: string;
  text: string;
  html: string;
  response: any;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  clientes: Clients[] = [];
  clientesRepo = remult.repo(Clients);
  produtosRepo = remult.repo(Produtos);
  produtos: Produtos[] = [];
  constructor(
    public activeModal: NgbActiveModal,
    calendar: NgbCalendar,
    private http: HttpClient
  ) {
    this.to = [];
    this.subject = '';
    this.text = '';
    this.html = '';
    this.response = null;

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

  async funcao(subject: any, text: any, html: any) {
    this.subject = subject
    this.text =text
    this.html = html
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

    var i = 0;
    this.to =[]
    while (fluxoAux.length > i) {
      this.to.push(fluxoAux[i].email);

      i++;
    }

    this.sendEmail()
  }

  sendEmail() {
    const message = {
      to: this.to,
      subject: this.subject,
      text: this.text,
      html: this.html,
    };


    this.http.post('api/email',{
      to: this.to,
      subject: this.subject,
      text: this.text,
      html: this.html,
    }).subscribe(
      (res: any) => {
        console.log(this.response = res)
        alert("Email Enviado")

      },
      (error: any) => {
        alert("Email Não Enviado")
      }
    );
  }

  ngOnInit(): void {
    this.clientesRepo
      .find()
      .then((items: Clients[]) => (this.clientes = items));
    this.produtosRepo
      .find()
      .then((items: Produtos[]) => (this.produtos = items));
  }
}
