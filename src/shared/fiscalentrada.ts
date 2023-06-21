import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";

@Entity<Fiscal>("cartao", {
  allowApiCrud: Allow.authenticated,
  allowApiInsert:["admin","FiscalEnt"],
  allowApiDelete:["admin","FiscalEnt"],
  allowApiUpdate: ["admin","FiscalEnt"],

})
export class Fiscal {

  @Fields.string()
  cartao_vinculado!: string;


}




