import { Allow, Entity, Fields, getFields, IdEntity, UserInfo } from "remult";

@Entity<User>("users",{
  allowApiCrud: Allow.everyone,
  //allowApiInsert:["admin"],
  //allowApiDelete:["admin"],
  //allowApiUpdate: ["admin"],

})
export class User implements UserInfo {

  @Fields.string()
  name!:string;

  @Fields.uuid()
  id!: string;

  @Fields.string()
  roles!: string[];



  @Fields.string()
  password!:string;

}


