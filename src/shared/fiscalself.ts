import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";

@Entity<FiscalSelf>("cartao", {
  allowApiCrud: Allow.authenticated,
  allowApiInsert:["admin","fisSelf"],
  allowApiDelete:["admin","fisSelf"],
  allowApiUpdate: ["admin","fisSelf"],

})
export class FiscalSelf {

  @Fields.string()
  cartao_vinculado!: string;


}




