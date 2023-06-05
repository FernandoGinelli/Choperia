import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remult } from 'remult';
import { async, timer } from 'rxjs';
import { Cartao } from 'src/shared/Cartao';
import { Clients } from 'src/shared/Clients';
import { PesoService } from './peso.service';

@Component({
  selector: 'app-self-service',
  templateUrl: './self-service.component.html',
  styleUrls: ['./self-service.component.css'],
})
export class SelfServiceComponent implements OnInit {
  lastWeight: number = 0;


  constructor(private router: Router,private pesoService: PesoService) {}

  userRepo = remult.repo(Clients);
  cartaoRepo = remult.repo(Cartao);
  cartoes: Cartao[] = [];
  user: Clients[] = [];

  numero_cartao = '';

  get multiplicado_self_service(){
    return 45
  }  // nova propriedade para armazenar o multiplicado_self_service

  async addCartao() {
    const cartao = await this.cartaoRepo.find({
      where: { cartao_vinculado: this.numero_cartao },
    });

    this.cartoes.push(cartao[0]);
    // limpa o campo após adicionar o cartão
    this.numero_cartao = '';
  }

  peso: number = 1;

  get pesos(){
    return 1
  }

  get valorAPagar() {
    var valorA = Number(this.lastWeight)*Number(this.multiplicado_self_service)
    return valorA
  }


  async saveUser(user: Clients) {
    try {
      await this.userRepo.save(user);
    } catch (error: any) {
      alert(error.message);
    }
  }


  async saveCartao(user: Cartao) {
    try {
      await this.cartaoRepo.save(user);
    } catch (error: any) {
      alert(error.message);
    }
  }

  atualiza_peso(){
    //this.pesoService.getLastWeight().subscribe(lastWeight => {      this.lastWeight = lastWeight;    });
    //this.lastWeight+=0.1

    timer(100).subscribe(() => {
      this.atualiza_peso()
    });
  }
  async adicionarValor(){

    const cartao = await this.cartaoRepo.find({
      where: { cartao_vinculado: this.numero_cartao },
    });

    cartao[0].produtos.push({
      ide: "comida",
      nome: "Comida",
      preco: this.valorAPagar,
      quantidade: 0
    })


    this.saveCartao(cartao[0]);
    // limpa o campo após adicionar o cartão
    this.numero_cartao = '';
  }
  cancelar() {}
  ngOnInit() {
    this.atualiza_peso()

    this.cartoes = [];

    this.userRepo.find().then((items) => (this.user = items));
  }
}
