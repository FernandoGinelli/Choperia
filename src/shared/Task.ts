// src/shared/Task.ts

import { Allow, Entity, Fields, Validators } from "remult"

@Entity<Task>("tasks", {
  allowApiCrud: Allow.everyone,

})


export class Task {
  @Fields.uuid()
  id!: string

  @Fields.string({
    validate: (task) => {
      if (task.title.length < 3) throw "Too Short"
    },
    allowApiUpdate: ["admin", "fisSelf"]
  })
  title = ""

  @Fields.boolean()
  completed = false
}

