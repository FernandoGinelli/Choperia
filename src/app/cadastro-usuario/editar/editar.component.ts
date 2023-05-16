import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { remult } from 'remult';
import { User } from 'src/shared/Users';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {

  @Input() user!: User;
  userRepo = remult.repo(User);
  constructor(public activeModal: NgbActiveModal) {}

  role = ""

  async saveUser(user: User) {
    try {
      await this.userRepo.save(user);
      this.activeModal.close()
    } catch (error: any) {
      alert(error.message);
    }

  }

  ngOnInit():void{

  }
}
