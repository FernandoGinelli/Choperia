import { Allow, Entity, Fields, Remult, remult, } from "remult"

@Entity<Produtos>("produtos", {
  allowApiCrud: Allow.everyone,

})



export class Produtos {

  @Fields.string()
  codigoBarras! : string

  @Fields.string()
  nomeProduto = ""


  @Fields.number()
  custo = ""


  @Fields.number()
  valorProduto = ""

  @Fields.integer()
  quantidadeProduto = "0"

  @Fields.string()
  tipoProduto = ""

  @Fields.integer()
  consumidoXVezes = 0

}



