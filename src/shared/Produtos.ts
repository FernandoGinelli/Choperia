import { Allow, Entity, Fields} from "remult"

@Entity<Produtos>("produtos", {
  allowApiCrud: Allow.authenticated,
  allowApiInsert:["admin", "fisSelf"],
  allowApiDelete:["admin","cozin","fisSelf"],
  allowApiUpdate: ["admin", "fisSelf"]
})


export class Produtos {
  @Fields.uuid()
  id!: string

  @Fields.string()
  nomeProduto = ""

  @Fields.string()
  codigoBarras = ""

  @Fields.number()
  valorProduto = ""

  @Fields.integer()
  quantidadeProduto = ""

  @Fields.string()
  tipoProduto = ""
}

