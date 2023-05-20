import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";

@Entity<Fluxo>("fluxo", {
  allowApiCrud: Allow.everyone,
})
export class Fluxo {

  @Fields.date()
  data!: Date;

  @Fields.object()
  vendas: Vendas[] = [];


  @Fields.object()
  despesas: Despesas[] = [];

}


class Despesas {
  @Fields.string()
  item!: string;

  @Fields.number()
  valor!: number;

  constructor(nome: string, valor: number) {
    this.item = nome;
    this.valor = valor;
  }
}


class Vendas {
  @Fields.string()
  nome!: string;

  @Fields.number()
  preco!: number;

  constructor(nome: string, preco: number) {
    this.nome = nome;
    this.preco = preco;
  }
}
