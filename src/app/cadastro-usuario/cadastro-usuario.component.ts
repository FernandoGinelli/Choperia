import { Component, OnInit } from '@angular/core';
import { remult } from 'remult';
import { User } from 'src/shared/Users';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {


userRepo = remult.repo(User)
users: User[] = []

  nome = ""
  role = ""
  senha = ""
  async addUser() {
    try {
      const newUser = await this.userRepo.insert({ name: this.nome, roles: [this.role], password: this.senha})
      this.users.push(newUser)
      this.nome = ""
      this.role = ""
      this.senha = ""
    } catch (error: any) {
      alert(error.message)
    }
  }



async saveUser(user: User) {
  try {
    await this.userRepo.save(user)
  } catch (error: any) {
    alert(error.message)
  }
  this.ngOnInit()
}
// src/app/todo/todo.component.ts

async deleteUser(user: User) {
  await this.userRepo.delete(user);
  this.users = this.users.filter(t => t !== user);
}



ngOnInit() {
  this.userRepo.find().then((items) => (this.users = items));
}


}
