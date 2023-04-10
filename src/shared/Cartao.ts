import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";

@Entity<Cartao>("cartao",{
  allowApiCrud: Allow.everyone,
  //allowApiInsert:["admin"],
  //allowApiDelete:["admin"],
  //allowApiUpdate: ["admin"],

})
export class Cartao{


  @Fields.string()
  cartao_vinculado!:string;


  @Fields.number()
  conta = ""

}


