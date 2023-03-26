import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";

@Entity<Clients>("Clients",{
  allowApiCrud: Allow.everyone,
  //allowApiInsert:["admin"],
  //allowApiDelete:["admin"],
  //allowApiUpdate: ["admin"],

})
export class Clients{

  @Fields.uuid()
  id!: string;

  @Fields.string()
  roles!: string[];

  @Fields.string()
  name!:string;

  @Fields.string()
  password!:string;

}


