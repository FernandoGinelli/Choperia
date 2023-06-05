import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";

@Entity<Fluxo>("fluxo", {
  allowApiCrud: Allow.everyone,
})
export class Fluxo {

  @Fields.string()
  id!: string;

  @Fields.object()
  data: Data = new Data;

  @Fields.number()
  vendas!: number;


  @Fields.number()
  despesas!: number;

  constructor() {
    const currentDate = new Date();
    this.data = new Data();
    this.data.dia = currentDate.getDate().toString();
    this.data.mes = (currentDate.getMonth() + 1).toString();
    this.data.ano = currentDate.getFullYear().toString();
    this.id=currentDate.getDate().toString()+(currentDate.getMonth() + 1).toString()+currentDate.getFullYear().toString()
  }

}

class Data {
  @Fields.string()
  dia!: string;

  @Fields.string()
  mes!: string;

  @Fields.string()
  ano!: string;


}
