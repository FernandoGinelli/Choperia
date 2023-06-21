import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";
import { Cartao } from "./Cartao";

@Entity<Clients>("Clients",{
  allowApiCrud: Allow.everyone,


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
  compras: Compra[] = [];




}



class Compra {


  @Fields.object()
  data!: Data;

  @Fields.object()
  produtos: Produto[] = [];


}



class Data {
  @Fields.string()
  dia: string = '';

  @Fields.string()
  mes: string = '';

  @Fields.string()
  ano: string = '';


}

class Produto {
  @Fields.string()
  ide: string = '';

  @Fields.string()
  nome: string = '';

  @Fields.number()
  preco!: number;

  @Fields.number()
  quantidade!: number;


}


