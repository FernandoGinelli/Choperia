import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";

@Entity<Cartao>("cartao", {
  allowApiCrud: Allow.everyone,
})
export class Cartao {

  @Fields.string()
  cartao_vinculado!: string;

  @Fields.object()
  produtos: Produto[] = [];

  @Fields.string()
  total!: string;

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

  constructor(nome: string, preco: number) {
    this.nome = nome;
    this.preco = preco;
  }
}

