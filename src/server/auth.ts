// src/server/auth.ts

import express, { Router } from "express"
import { remult, UserInfo } from "remult"
import { User } from "src/shared/Users"

export const auth = Router()

auth.use(express.json())


const usersRepo = remult.repo(User);
//const arai = new Arai();
//var validUsers =  arai.users
var validUsers: User[] = [  { id: "1", name: "Cozinheiro",password:"Cozinheiro", roles: ["cozin"] },
 { id: "3", name: "Admin",password:"Admin", roles: ["admin"] },
 { id: "2", name: "FiscalSelf",password:"FiscalSelf", roles: ["fisSelf"]  },
 { id: "4", name: "Fiscal de Entrada",password:"Fiscal de Entrada", roles: [ "FiscalEnt" ] },
 { id: "5", name: "Caixa",password:"Caixa", roles: [ "Caixa" ] },
 { id: "6", name: "Repositor de Estoque",password:"Repositor de Estoque", roles: [ "Repositor" ] },
 { id: "7", name: "aaaaaaaaa",password:"aaaaaaaaa", roles: [ "aaaaaaaaaaa" ] },
 { id: "8", name: "aaaaaaaaa",password:"aaaaaaaaa", roles: [ "aaaaaaaaaaa" ] },
 { id: "9", name: "aaaaaaaaa",password:"aaaaaaaaa", roles: [ "aaaaaaaaaaa" ] },
 { id: "10", name: "aaaaaaaaa",password:"aaaaaaaaa", roles: [ "aaaaaaaaaaa" ] },
]



auth.post("/api/signIn", async (req, res) => {

  const user = validUsers.find(user => user.name === req.body.username && user.password === req.body.password)
  if (user) {
    req.session!["user"] = user
    res.json(user)
  } else {
    res.status(404).json("Invalid user")

  }
})


auth.post("/api/signOut", (req, res) => {
  req.session!["user"] = null
  res.json("signed out")
})

auth.get("/api/currentUser", (req, res) => res.json(req.session!["user"]))


async function getUsersFromDatabase() {


}

