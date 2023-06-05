import { Component } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { remult } from 'remult';
import { Fluxo } from 'src/shared/Fluxo';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-fluxo',
  templateUrl: './fluxo.component.html',
  styleUrls: ['./fluxo.component.scss'],
})
export class FluxoComponent {
  hoveredDate: NgbDate | null = null;

	fromDate: NgbDate;
	toDate: NgbDate | null = null;

  fluxo: Fluxo[] = [];
  fluxoRepo = remult.repo(Fluxo);
  constructor(public activeModal: NgbActiveModal,private calendar: NgbCalendar) {
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
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
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


  criarTabela(doc: jsPDF, produtos: any[], startY: number) {
    const columns = [
      { header: 'Dia', dataKey: 'nomeProduto' },
      { header: 'Mês', dataKey: 'nomeProduto' },
      { header: 'Ano', dataKey: 'nomeProduto' },
      { header: 'Despesa', dataKey: 'quantidadeProduto' },
      { header: 'Vendas', dataKey: 'quantidadeProduto' },
    ];

    const rows = produtos.map((produto) => [
      produto.data.dia,
      produto.data.mes,
      produto.data.ano,
      produto.despesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      produto.vendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
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

  funcao(){
    var despesasTotais = 0
    var vendasTotais = 0

    this.fromDate
    this.toDate
    const from = new Date(this.fromDate.year+'-'+this.fromDate.month+'-'+this.fromDate.day)

    var toDa= new Date()
    if (this.toDate) {
      toDa = new Date(this.toDate.year+'-'+this.toDate.month+'-'+this.toDate.day)
    }

    var fluxoAux: Fluxo[] =[]

    fluxoAux = this.fluxo.filter(function(fluxo) {
      var fluxoData = new Date(fluxo.data.ano+'-'+fluxo.data.mes+'-'+fluxo.data.dia)

      if (fluxoData>=from && fluxoData <= toDa) {
        vendasTotais +=fluxo.vendas
        despesasTotais += fluxo.despesas
        return fluxo
      }
      else{
        return
      }

    });
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Fluxo por periodo:', 50, 20);

    this.criarTabela(doc, fluxoAux, 50);

    autoTable(doc, {
      head: [['', '', '','DESPESAS TOTAIS ',' VENDAS TOTAIS']],
      body: [['','','',despesasTotais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),vendasTotais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })]],
      startY: false,

      styles: {
        fontSize: 12,
        halign: 'left',
      },
      columnStyles: {
        nomeProduto: { fontStyle: 'bold' },
        quantidadeProduto: { halign: 'right' },
      },
    });





    doc.save('FaltaCozinha.pdf');
  }

  async saveUser(user: Fluxo) {
    try {
      await this.fluxoRepo.save(user);
      this.activeModal.close();
    } catch (error: any) {
      alert(error.message);
    }
  }

  ngOnInit(): void {
    this.fluxoRepo.find().then((items: Fluxo[]) => (this.fluxo = items));
  }
}


