import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";

@Entity<Caixa>("cartao", {
  allowApiCrud: Allow.authenticated,
  allowApiInsert:["admin","Caixa"],
  allowApiDelete:["admin","Caixa"],
  allowApiUpdate: ["admin","Caixa"],

})
export class Caixa {

  @Fields.string()
  cartao_vinculado!: string;


}




