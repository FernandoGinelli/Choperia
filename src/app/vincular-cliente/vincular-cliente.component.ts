import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clients } from 'src/shared/Clients';
import { remult } from 'remult';
import { Cartao } from 'src/shared/Cartao';

@Component({
  selector: 'app-vincular-cliente',
  templateUrl: './vincular-cliente.component.html',
  styleUrls: ['./vincular-cliente.component.css']
})
export class VincularClienteComponent implements OnInit {


  @Input() cliente!: Clients;
  userRepo = remult.repo(Clients)
  cartao = remult.repo(Cartao)

  constructor(private router: Router) { }



async addcartao() {
    try {
      await this.cartao.insert({ cartao_vinculado: this.cliente.cartao_vinculado})

    } catch (error: any) {
      alert(error.message)
    }
  }

async saveUser(cliente: Clients) {
  try {
    await this.userRepo.save(cliente)
    await this.addcartao()
    this.router.navigate(['/cadclient']);
  } catch (error: any) {
    alert(error.message)
  }

}

  ngOnInit(): void {
    this.cliente = history.state.cliente;
  }



}
