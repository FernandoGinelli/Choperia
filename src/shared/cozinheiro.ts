import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";

@Entity<Cozinheiro>("cartao", {
  allowApiCrud: Allow.authenticated,
  allowApiInsert:["admin","cozin"],
  allowApiDelete:["admin","cozin"],
  allowApiUpdate: ["admin","cozin"],

})
export class Cozinheiro {

  @Fields.string()
  cartao_vinculado!: string;


}


