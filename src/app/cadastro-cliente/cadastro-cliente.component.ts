import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult } from 'remult';
import { Clients } from 'src/shared/Clients';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {


  constructor(private router: Router) { }



userRepo = remult.repo(Clients)
users: Clients[] = []

  nome = ""
  email = ""
  cpf = ""
  telefone =""

  async addUser() {
    try {
      const newUser = await this.userRepo.insert({ name: this.nome, email: this.email, cpf: this.cpf, telefone: this.telefone})
      this.users.push(newUser)
      this.nome = ""
      this.email = ""
      this.cpf = ""
      this.telefone =""

    } catch (error: any) {
      alert(error.message)
    }
  }



async saveUser(user: Clients) {
  try {
    await this.userRepo.save(user)
  } catch (error: any) {
    alert(error.message)
  }
  this.ngOnInit()
}
// src/app/todo/todo.component.ts

async deleteUser(user: Clients) {
  await this.userRepo.delete(user);
  this.users = this.users.filter(t => t !== user);
}

navegarParaVincular(cliente: Clients) {
  this.router.navigate(['/vincular'], { state: { cliente } });
}

ngOnInit() {
  this.userRepo.find().then((items) => (this.users = items));
}


}
