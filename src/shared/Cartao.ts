import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";

@Entity<Cartao>("cartao", {
  allowApiCrud: Allow.everyone,
})
export class Cartao {

  @Fields.string()
  cartao_vinculado!: string;

  @Fields.object()
  produtos: Produto[] = [];



}



class Produto {
  @Fields.string()
  nome!: string;

  @Fields.number()
  preco!: number;

  constructor(nome: string, preco: number) {
    this.nome = nome;
    this.preco = preco;
  }
}

class Bebida {
  @Fields.string()
  nome!: string;

  @Fields.number()
  preco!: number;

  constructor(nome: string, preco: number) {
    this.nome = nome;
    this.preco = preco;
  }
}
