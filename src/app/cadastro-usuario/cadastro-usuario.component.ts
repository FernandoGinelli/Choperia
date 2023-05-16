import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { remult } from 'remult';
import { User } from 'src/shared/Users';
import { EditarComponent } from './editar/editar.component';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  userRepo = remult.repo(User);
  users: User[] = [];
  nome = "";
  role = "";
  senha = "";
  editingUser: User | null = null;
  constructor( private modalService: NgbModal){}

  async addUser() {
    try {
      const newUser = await this.userRepo.insert({
        name: this.nome,
        roles: [this.role],
        password: this.senha
      });
      this.users.push(newUser);
      this.nome = "";
      this.role = "";
      this.senha = "";
    } catch (error: any) {
      alert(error.message);
    }
  }

  async saveUser(user: User) {
    try {
      await this.userRepo.save(user);
    } catch (error: any) {
      alert(error.message);
    }

  }

  async deleteUser(user: User) {
    try {
      await this.userRepo.delete(user);
      this.users = this.users.filter((u) => u !== user);
    } catch (error: any) {
      alert(error.message);
    }
  }


  ngOnInit() {
    this.userRepo.find().then((items) => (this.users = items));
  }

  abriModal(user: User){
    //const modalRef = this.modalService.open(EditarComponent)


      const options: NgbModalOptions = {
        backdrop: false, // Configuração para desativar o backdrop
        keyboard: true,
        centered: true,backdropClass: "teste"// Configuração para desativar o fechamento do modal com a tecla ESC
      };
      var modalRef = this.modalService.open(EditarComponent, options);
      modalRef.componentInstance.user = user;
  }
}
