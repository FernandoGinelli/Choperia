import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clients } from 'src/shared/Clients';
import { remult } from 'remult';
import { Cartao } from 'src/shared/Cartao';

@Component({
  selector: 'app-vincular-cliente',
  templateUrl: './vincular-cliente.component.html',
  styleUrls: ['./vincular-cliente.component.css'],
})
export class VincularClienteComponent implements OnInit {
  @Input() cliente!: Clients;
  userRepo = remult.repo(Clients);
  cartao = remult.repo(Cartao);
  auxC = "";

  constructor(private router: Router) {}

  async addcartao(cartao: Cartao) {

      await this.cartao.insert({
        cartao_vinculado: this.cliente.cartao_vinculado,produtos: cartao.produtos
      });
      if (cartao.cartao_vinculado != this.auxC) {
        this.cartao.delete({cartao_vinculado: this.auxC})
      }


  }

  async saveUser(cliente: Clients) {
    try {
      if (this.auxC!= "") {
        if (this.cliente.cartao_vinculado == this.auxC) {
        }else{
          const cartao = await this.cartao.find({
            where:{ cartao_vinculado: this.auxC}});

          var cartao1: Cartao = {cartao_vinculado: this.cliente.cartao_vinculado,produtos: cartao[0].produtos }
          await this.addcartao(cartao1)
        }
      }
      else{
        var cartao: Cartao = {cartao_vinculado: this.cliente.cartao_vinculado,produtos:[] }

        await this.addcartao(cartao)
      }



      // Se chegar aqui, significa que o cartão foi adicionado com sucesso
    }catch (error: any) {
      alert("Cartão em uso")
      return; // retorna imediatamente, impedindo que o código abaixo seja executado
    }

    try {
      await this.userRepo.save(cliente)
      this.router.navigate(['/cadclient']);
    } catch (error: any) {
      alert(error.message)
    }
  }


  ngOnInit(): void {
    this.cliente = history.state.cliente;
    this.auxC = this.cliente.cartao_vinculado
  }
}
