import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clients } from 'src/shared/Clients';
import { remult } from 'remult';

@Component({
  selector: 'app-vincular-cliente',
  templateUrl: './vincular-cliente.component.html',
  styleUrls: ['./vincular-cliente.component.css']
})
export class VincularClienteComponent implements OnInit {


  @Input() cliente!: Clients;
  userRepo = remult.repo(Clients)

  constructor(private router: Router) { }



async saveUser(cliente: Clients) {
  try {
    await this.userRepo.save(cliente)
    this.router.navigate(['/cadclient']);
  } catch (error: any) {
    alert(error.message)
  }

}

  ngOnInit(): void {
    this.cliente = history.state.cliente;
  }



}
