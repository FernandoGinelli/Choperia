import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";
import { Cartao } from "./Cartao";

@Entity<Clients>("Clients",{
  allowApiCrud: Allow.everyone,
  //allowApiInsert:["admin"],
  //allowApiDelete:["admin"],
  //allowApiUpdate: ["admin"],

})
export class Clients{


  @Fields.string()
  cpf!:string;

  @Fields.string()
  email!: string;

  @Fields.string()
  name!:string;


  @Fields.string()
  telefone!:string;

  @Fields.string()
  cartao_vinculado!:string;


  @Fields.object()
  produtos: Compra[] = [];




}



class Compra {
  @Fields.uuid()
  id!: string

  @Fields.date()
  data!: string;

  @Fields.object()
  produtos: Produto[] = [];


}



class Produto {
  @Fields.string()
  ide: string = '';

  @Fields.string()
  nome: string = '';

  @Fields.number()
  preco!: number;


}


