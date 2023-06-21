
import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";

@Entity<Repositor>("cartao", {
  allowApiCrud: Allow.authenticated,
  allowApiInsert:["admin","Repositor"],
  allowApiDelete:["admin","Repositor"],
  allowApiUpdate: ["admin","Repositor", "Cliente"],

})
export class Repositor {

  @Fields.string()
  cartao_vinculado!: string;


}

