import { Allow, Entity, Fields, Remult, remult, } from "remult"

@Entity<Produtos>("produtos", {
  allowApiCrud: Allow.authenticated,
  allowApiInsert:["admin", "fisSelf"],
  allowApiDelete:["admin","cozin","fisSelf"],
  allowApiUpdate: ["admin", "fisSelf"]
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



