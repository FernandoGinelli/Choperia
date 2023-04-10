// src/server/api.ts

import { remultExpress } from "remult/remult-express"
import { Task } from "../shared/Task"
import { TasksController } from "../shared/TasksController"
import { createPostgresConnection } from "remult/postgres"
import { User } from "src/shared/Users"
import { Produtos } from "src/shared/Produtos"
import { Clients } from "src/shared/Clients"
import { Cartao } from "src/shared/Cartao"

const connectionString = "postgres://postgres:123456789@localhost:5432/sistema"



export const api = remultExpress({
  entities: [Task,User,Produtos,Clients,Cartao],
  dataProvider:
      createPostgresConnection({
        connectionString // default: process.env["DATABASE_URL"]
      }),
  controllers: [TasksController],
  getUser: req => req.session!["user"]



})



